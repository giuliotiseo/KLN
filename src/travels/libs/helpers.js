import { capitalize, round } from "../../globals/libs/helpers";
import { digestMessage } from "../../globals/libs/sha256";
import { changeTravelCreatorTimeLength } from "../slices/travelCreatorSlice";

// Constants -----------------------------------------------------------------------------------------------
export const TravelStatus = ["STATIONARY", "PICKUP", "DEPOT", "DELIVERY", "RETURN", "COMPLETED", "ARCHIVED"];
export const orderStatusToTravelOperation = {
  "PENDING": "Carico",
  "STOCKED": "Scarico"
}

export const TRAVEL_DESCRIPTOR = {
  STATIONARY: "fermo",
  PICKUP: "in ritiro",
  DEPOT: "a deposito",
  DELIVERY: "in consegna",
  RETURN: "di rientro",
  COMPLETED: "completati",
  ARCHIVED: "archiviato"
}

export const OPERATION_DESCRIPTION = {
  PICKUP: "ritiro",
  DELIVERY: "consegna",
  LOAD_CARRIER: "carico vettore",
  UNLOAD_CARRIER: "scarico vettore"
}

export const TRAVEL_TYPE_DESCRIPTION = {
  MIXED: "Misto",
  DELIVERY: "Consegna",
  PICKUP: "Ritiro"
}

export const REQUIRED_TRAVEL_FIELDS = [
  "id",
  "stamp",
  "tenant",
  "status",
  "createdAt",
  "departureDate",
]

export const TRAVEL_PROPS_GLOSSARY = {
  id: "ID viaggio",
  stamp: "codice viaggio",
  status: "stato viaggio",
  createdAt: "data di creazione",
  departureDate: "data di partenza",
  licensePlate: "targa veicolo",
  vehicleName: "nome del veicolo",
  driver: "info autista",
  towing: "mezzo trainante",
  towed: "mezzo trainato",
  estimatedTravelTime: "tempi di percorrenza",
  estimatedTravelLength: "lunghezza del viaggio",
  estimatedTransportCosts: "costi di trasporto",
  start: "partenza del viaggio",
  waypoints: "punti di interesse",
  end: "punto di ritorno",
  plannedOrderIds: "ordini pianificati",
  travelType: "tipo di viaggio",
  note: "note",
}

// Processors -----------------------------------------------------------------------------------------------
export const encodeTravelId = async ({
  prefix = "TRV",
  licensePlate,
  companyId,
  uuid,
  timestamp,
}) => {
  const legibleTravelId = `${prefix}_${uuid}_${companyId}_${licensePlate}_${timestamp}`;
  const cripted = await digestMessage(legibleTravelId)
  return cripted;
}

// Formatters -----------------------------------------------------------------------------------------------
const getCompanyByCheckpointKey = {
  pickupCheckpoint: "pickupStorage",
  depotCheckpoint: "carrier",
  deliveryCheckpoint: "deliveryStorage"
}

export const waypointTargetByStatusShipment = {
  "PENDING#GROUPAGE": {
    checkpoint: ["pickupCheckpoint", "depotCheckpoint"],
    operation: ["PICKUP", "UNLOAD_CARRIER"]
  },
  "STOCKED#GROUPAGE": {
    checkpoint: ["depotCheckpoint", "deliveryCheckpoint"],
    operation: ["LOAD_CARRIER", "DELIVERY"]
  },
  "PENDING#DIRETTO": {
    checkpoint: ["pickupCheckpoint", "deliveryCheckpoint"],
    operation: ["PICKUP", "DELIVERY"]
  },
}

// Helpers for travel planner -----------------------------------------------------------------------------------------------
// Helpers  ------------------------------------------------------------------------------------------------------------------------------
export async function calculateRoute (trip, callback, setDirections) {
  if (trip.length <= 2 || !trip[0]?.coordinate === '' || !trip.at(-1)?.coordinate) {
    clearRoute(callback, setDirections);
    return
  } else {
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: trip[0].coordinate,
      destination: trip.at(-1).coordinate, // nuovo modo per ottenere ultimo elemento di un array
      waypoints: trip.slice(1, trip.length - 1).map(waypoint => ({ location: waypoint.coordinate, stopover: true })),
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    function computeTotalDistance() {
      let totalDist = 0;
      let totalTime = 0;
      let route = results.routes[0];
      let waypointsEstimatedTime = [];
      let waypointsEstimatedDistance = [];

      for (let i = 0; i < route.legs.length; i++) {
        totalDist += route.legs[i].distance.value;
        totalTime += route.legs[i].duration.value;

        // Dispongo i dati per waypoint
        waypointsEstimatedTime.push(route.legs[i].duration);
        waypointsEstimatedDistance.push(route.legs[i].distance);
      }

      function secondsToTime(e){
        const h = Math.floor(e / 3600).toString().padStart(2,'0');
        const m = Math.floor(e % 3600 / 60).toString().padStart(2,'0');
        // const s = Math.floor(e % 60).toString().padStart(2,'0');
        
        return `${h} ore ${m} minuti`;
      }

      const estimatedTime = secondsToTime(totalTime);

      if(callback) {
        callback({
          totalTime: { value: totalTime, text: estimatedTime },
          totalLength: { value: totalDist, text: `${round(parseFloat(totalDist/1000))} km` },
          timeLegs: waypointsEstimatedTime,
          distanceLegs: waypointsEstimatedDistance,
          trip
        })
      }
    }

    computeTotalDistance(results);
    setDirections(results);
  }
};

export function clearRoute(callback, setDirections) {
  setDirections(null);
  if(callback) {
    callback(null);
  }
}


export const getOrderDataForWaypoint = async (order, timestamp) => {
  let orderDataForWaypoint = null;
  if(waypointTargetByStatusShipment?.[`${order.status}#${order.shipmentType}`]) {
    const target = waypointTargetByStatusShipment[`${order.status}#${order.shipmentType}`];
    const targetCheckpoint = target.checkpoint[order.indexOp];
    const targetOperation =  target.operation[order.indexOp]
    const targetCompany = getCompanyByCheckpointKey[targetCheckpoint];
    const plannedId = await digestMessage(`${order.indexOp}_${order.status}_${order[targetCheckpoint].location.place_id}_${order.id}`);

    console.log("Target company", targetCompany);

    orderDataForWaypoint = {
      id: `${order[targetCheckpoint].location.place_id}_${timestamp}`,
      orderId: order.id,
      plannedId,
      stamp: order.stamp,
      orderStatus: order.status,
      shipmentType: order.shipmentType,
      palletInfo: order.palletInfo,
      companyName: order[`${targetCompany}Name`],
      companyId: order[`${targetCompany}Id`],
      tenantCompany: order[`tenant${capitalize(targetCompany)}`],
      quantity: order.quantity,
      support: order.support,
      size: order.size,
      senderName: order.senderName,
      carrierName: order.carrierName,
      receiverName: order.receiverName,
      ...order[targetCheckpoint].location,
      checkpoint: { ...order[targetCheckpoint] },
      operation: targetOperation,
      operationValue: order.indexOp
    }
  }

  return orderDataForWaypoint;
}

export const addOrderToWaypoint = async (inputWaypoints, order) => {
  let waypoints = { ...inputWaypoints };
  const timestamp = Date.now();
  let orderDataForWaypoint = await getOrderDataForWaypoint(order, timestamp);
  orderDataForWaypoint.valid = true;

  if(Object.keys(waypoints).length > 0) {
    const lastCheckpointKey = Object.keys(waypoints).at(-1);
    if(lastCheckpointKey.includes(orderDataForWaypoint.place_id)) {
      console.log(waypoints[lastCheckpointKey]);
      waypoints[lastCheckpointKey] = waypoints[lastCheckpointKey].concat(orderDataForWaypoint);
    } else {
      waypoints[`${orderDataForWaypoint.id}`] = [orderDataForWaypoint]
    }
  } else {
    waypoints[`${orderDataForWaypoint.id}`] = [orderDataForWaypoint]
  }

  return { waypoints, plannedId: orderDataForWaypoint.plannedId };
}

export const addOrderToSpecificWaypoint = async (inputWaypoint, order, inputTimeStamp) => {
  const timestamp = inputTimeStamp ? inputTimeStamp : Date.now();
  let waypoint = inputWaypoint;
  let orderDataForWaypoint = await getOrderDataForWaypoint(order, timestamp);
  orderDataForWaypoint.valid = true;
  if(waypoint.length > 0) {
    const lastCheckpointKey = waypoint.at(-1);
    if(lastCheckpointKey.id.includes(orderDataForWaypoint.place_id)) {
      waypoint = waypoint.concat(orderDataForWaypoint);
    } else {
      waypoint = [orderDataForWaypoint]
    }
  } else {
    waypoint = [orderDataForWaypoint]
  }

  return waypoint;
}

export const removeOrderFromWaypoint = async (inputWaypoints, order) => {
  let waypoints = { ...inputWaypoints };
  const status = order?.status || order?.orderStatus || null;
  if(status === null) return;

  const target = waypointTargetByStatusShipment[`${status}#${order.shipmentType}`];
  const targetCheckpoint = target.checkpoint[order.indexOp];
  let placeIdTarget = null;
  let plannedIdTarget = null;
  let operationsInCheckpointIds = [];

  if(order?.orderStatus) {
    placeIdTarget = order.place_id;
    operationsInCheckpointIds = Object.keys(waypoints).filter(id => id.includes(placeIdTarget));
    plannedIdTarget = order.plannedId;
  } else {
    placeIdTarget = order[targetCheckpoint].location.place_id;
    operationsInCheckpointIds = Object.keys(waypoints).filter(id => id.includes(placeIdTarget));
    plannedIdTarget = await digestMessage(`${order.indexOp}_${order.status}_${placeIdTarget}_${order.id}`);
  }

  operationsInCheckpointIds.forEach(id => {
    waypoints[id] = waypoints[id].filter(waypointOrder => waypointOrder.plannedId !== plannedIdTarget)
  });

  operationsInCheckpointIds.forEach(id => {
    if(waypoints[id].length <= 0) delete waypoints[id];
  });

  return { waypoints, plannedIdTarget };
}