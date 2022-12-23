import { generateLegacyLogList, generateLogList, generateUid } from "../../globals/libs/helpers";
import { calculateRoute, encodeTravelId, TRAVEL_PROPS_GLOSSARY } from "../libs/helpers";
import { resetTravelCreator } from "../slices/travelCreatorSlice";

// Create ------------------------------------------------------------------------------------------------------------------------------------------------------------------
export const handleCreateTravel = async ({
  travel,
  company,
  createTravel,
  dispatch,
  validation,
  setModal
}) => {
  const validation_ids = validation ? Object.keys(validation) : [];
  let error = "";
  if(validation_ids.length > 0) {
    for(let id of validation_ids) {
      if(error === true) return;
      if(validation[id].status === "ERROR") {
        error = true;
        setModal(true);
      } else {
        error = false;
      }
    }
  } else {
    error = false;
  }

  // Se supera la validazione
  if(error === false) {
    // Data log generation
    const uuid = generateUid(16);
    const timestamp = Date.now();
    const id =  await encodeTravelId({
      licensePlate: travel.licensePlate,
      companyId: company.id,
      uuid, 
      timestamp
    });

    const stamp = `TRV-${uuid}`;

    // Verificare se conviene utilizzare il nuovo metodo di generazione!!!
    const log = await generateLegacyLogList({
      list: [],
      action: 'Creazione',
      subject: `viaggio da ${travel.start.location.address} a ${travel.end.location.address}, guidato da ${travel.driver.searchable.toUpperCase()}.`
    });

    // Registra i dati nel database
    await createTravel({
      ...travel,
      id,
      stamp,
      createdAt: new Date(timestamp).toISOString(),
      company,
      log
    });
    
    // Resetta i valori salvati
    dispatch(resetTravelCreator());
    // setModal(false);
  }
}

export const handleUpdateTravel = async ({
  travelEditor,
  fetchedTravel,
  skipValidation,
  cognitoUser,
  profile,
  updateTravel,
  domain,
  dispatch,
  setModal
}) => {
  // let error = "";
  // const validation = skipValidation ? null : travelEditor?.validation;
  // const validation_ids = validation ? Object.keys(validation) : [];
  // const previousLogs = fetchedTravel.log;

  console.log("Lavoriamo su questo", travelEditor);
  let travelToSend = { ...travelEditor };

  // Inizio ricalcolando il percorso e stimando di nuovo tempi di percorrenza e distanza di tutta la pianificazione
  const startLocation = { 
    ...travelEditor.start.checkpoint.location,
    coordinate: travelEditor.start.checkpoint.location.coordinate?.length >= 0
      ? { lat: travelEditor.start.checkpoint.location.coordinate[0], lng: travelEditor.start.checkpoint.location.coordinate[1] }
      : travelEditor.start.checkpoint.location.coordinate
  }

  const endLocation = { 
    ...travelEditor.end.checkpoint.location,
    coordinate: travelEditor.end.checkpoint.location.coordinate?.length >= 0
      ? { lat: travelEditor.end.checkpoint.location.coordinate[0], lng: travelEditor.end.checkpoint.location.coordinate[1] }
      : travelEditor.end.checkpoint.location.coordinate
  }

  const waypointsList = Object.keys(travelEditor.waypoints)?.length > 0 
    ? Object.keys(travelEditor.waypoints).map(w_id => ({
        ...travelEditor.waypoints[w_id][0],
        coordinate: {
          lat: travelEditor.waypoints[w_id][0].checkpoint.location.coordinate[0],
          lng: travelEditor.waypoints[w_id][0].checkpoint.location.coordinate[1],
        }
    }))
    : [];

  let trip = [].concat({...startLocation}).concat(...waypointsList).concat({...endLocation});
  
  const updateTrip = (payload) => {
    const { totalTime, totalLength, timeLegs, distanceLegs } = payload;
    const waypointsTimeLegs = timeLegs.splice(0, timeLegs.length - 1);
    const waypointsDistanceLegs = distanceLegs.splice(0, distanceLegs.length - 1);
    const waypoints_ids = Object.keys(travelEditor.waypoints);

    // Get all changed check keys and exclude validation key
    const dataForLogs = Object.keys(travelEditor)
    .filter(key => travelEditor.changes.includes(key))
    .reduce((acc, val) => ({
      ...acc,
      [val]: travelEditor[val]
    }), {});

    const log = generateLogList({
      action: "Aggiornamento",
      domain,
      cognitoUser,
      profile,
      data: dataForLogs,
      previousLogs: travelEditor.travel.log,
      propsGlossary: TRAVEL_PROPS_GLOSSARY,
      excludedKeys: ["towing", "towed"], // questo perché occorre fixare l'inizializzazione dei mezzi, dato che va a registrare il change dall'editor per poter funzionare
      limit: 20,
    });
  

    travelToSend = {
      ...travelToSend,
      estimatedTravelLength: totalLength,
      estimatedTravelTime: totalTime,
      log,
      end: {
        ...travelToSend.end,
        estimatedTime: timeLegs.at(-1).text,
        estimatedLength: distanceLegs.at(-1).text
      },
      waypoints: waypoints_ids.reduce((acc, val, index) => ({
        ...acc,
        [val]: {
          id: val,
          companyName: travelEditor.waypoints[val][0].companyName,
          companyId: travelEditor.waypoints[val][0].companyId,
          tenantCompany: travelEditor.waypoints[val][0].tenantCompany,
          checkpoint: travelEditor.waypoints[val][0].checkpoint,
          estimatedLength: waypointsDistanceLegs[index].text,
          estimatedTime: waypointsTimeLegs[index].text,
          orders: travelEditor.waypoints[val].map(orderInWaypoint => ({
            orderId: orderInWaypoint.orderId,
            plannedId: orderInWaypoint.plannedId,
            orderStamp: orderInWaypoint.orderStamp || orderInWaypoint.stamp,
            orderStatus: orderInWaypoint.orderStatus || orderInWaypoint.status,
            operation: orderInWaypoint.operation,
            operationValue: orderInWaypoint.operationValue            
          }))
        }
      }), {})
    }
  }
  
  // Avvio il calcolo e riformatto la struttura del viaggio secondo la struttura impostata su database
  await calculateRoute(
    trip,
    (payload) => updateTrip(payload),
    (results) => console.log("Risultati calcolo", results)
  );

  // Reimposto l'ordine corretto dei waypoints
  travelToSend.waypoints = Object.keys(travelEditor.waypoints).map(wp_id => travelToSend.waypoints[wp_id]);

  // Cerco i TravelsOrders da aggiornare
  let dirtyOrders = [];
  let travelsOrdersToUpdate = [];

  // Cerco all'interno dei waypoint le operazioni associate a quell'ordine
  // Aggiungo la pianificazione aggiornata all'interno di un array
  for(const waypoint of travelToSend.waypoints) {
    for(const order of waypoint.orders) {
      const idsToUpdateTracker = travelsOrdersToUpdate?.length > 0 ? travelsOrdersToUpdate.map(totu => totu.id) : [];
      if(
        !travelEditor.plannedIdToRemove.includes(order.plannedId)
        && !travelEditor.plannedIdToCreate.includes(order.plannedId)
        && !idsToUpdateTracker.includes(order.plannedId)
      ) {
        travelsOrdersToUpdate.push({
          id: order.plannedId,
          departureDate: travelEditor.travel.departureDate, 
          arrivalDate: travelEditor.travel.departureDate, // da sostituire con arrivalDate corretto calcolato da google
          tenantCarrier: travelEditor.travel.tenant,
          carrierId: travelEditor.travel.carrierId,
          customerId: waypoint.companyId,
          tenantCustomer: waypoint.tenantCompany,
          orderId: order.orderId,
          travelId: travelEditor.travel.id,
          waypoint: waypoint,
          operation: order.operation,
          operationValue: order.operationValue
        });
      }
    }
  }

  let travelsOrdersToCreate = [];
  for(const waypoint of travelToSend.waypoints) {
    for(const order of waypoint.orders) {
      if(travelEditor.plannedIdToCreate.includes(order.plannedId) && !travelEditor.plannedIdToRemove.includes(order.plannedId)) {
        travelsOrdersToCreate.push({
          id: order.plannedId,
          departureDate: travelEditor.travel.departureDate, 
          arrivalDate: travelEditor.travel.departureDate, // da sostituire con arrivalDate corretto calcolato da google
          tenantCarrier: travelEditor.travel.tenant,
          carrierId: travelEditor.travel.carrierId,
          tenantCustomer: waypoint.tenantCompany,
          customerId: waypoint.companyId,
          orderId: order.orderId,
          travelId: travelEditor.travel.id,
          waypoint: waypoint,
          operation: order.operation,
          operationValue: order.operationValue
        });
      }
    }
  }

  console.groupCollapsed("Controllo livello pre-process");
  console.log("Ecco i dirtyOrders", dirtyOrders);
  console.log("Ecco i travelsOrdersToUpdate", travelsOrdersToUpdate);
  console.groupEnd();


  // if(validation_ids.length > 0) {
  //   for(let validation_id of validation_ids) {
  //     if(error === true) return;
  //     if(validation[validation_id].response === "ERROR") {
  //       error = true;
  //       setModal(true);
  //     } else {
  //       error = false;
  //     }
  //   }
  // } else {
  //   error = false;
  // }

  // // Se supera la validazione
  // if(error === false) {
  //   // Extract required values
  //   const required = REQUIRED_TRAVEL_FIELDS.reduce((acc, val) => {
  //     return ({
  //       ...acc,
  //       [val]: fetchedTravel[val]
  //     })
  //   }, {});


    // Save changes on DB
    await updateTravel({
      ...travelToSend,
      travelsOrdersToUpdate,
      travelsOrdersToCreate,
    });

    // dispatch(resetTravelEditor());
    // setModal(false);
  // }
}