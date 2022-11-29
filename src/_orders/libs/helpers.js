import { consoleInfo, DAYS_ENG, InputTypes, removeDuplicates, tagVatMixer } from "../../globals/libs/helpers";
import { createContactThunk } from "../../app/thunks/contactsThunks";
import icon_fragile from '../../globals/assets/icon_fragile.png';
import icon_nocalore from '../../globals/assets/icon_nocalore.png';
import icon_noganci from '../../globals/assets/icon_noganci.png';
import icon_temeumidita from '../../globals/assets/icon_temeumidita.png';
import icon_alto from '../../globals/assets/icon_alto.png';
import Base64 from '../../globals/libs/base64';
import { addDays, format, getHours, getMinutes, isWithinInterval, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { days } from "../../contacts/libs/reducers";
import { SHIPMENT_METHOD_DESCRIPTION } from "../../globals/libs/models";
import { digestMessage } from "../../globals/libs/sha256";

// Constants, models and types -----------------------------------------------------------------------------------------------
export const PaymentCondition = {
  "FRANCO": "FRANCO",
  "ASSEGNATO": "ASSEGNATO",
}

export const OrderStatus = {
  "PENDING": "PENDING",
  "PICKEDUP": "PICKEDUP",
  "STOCKED": "STOCKED",
  "DELIVERING": "DELIVERING",
  "DELIVERED": "DELIVERED",
}

export const PalletType = {
  "EPAL": "EPAL",
  "EUR": "EUR",
}

export const TRANSPORT_SUPPORTS = {
  "PALLET": "Pallet",
  "ROLL": "Roll container",
  "CASSA": "Cassa / Barile",
  "SACCO": "Sacco",
  "CONTAINER": "Container",
}

export const STANDARD_DIMENSIONS = {
 "PALLET": [
   { text: "CP2 - 80x120", values: [80, 120]},
   { text: "CP1 - 100x120", values: [100, 120]},
   { text: "CP3 - 114x114", values: [114, 114]},
   { text: "CP4 - 110x130", values: [110, 130]},
   { text: "CP5 - 76x114", values: [76, 114]},
   { text: "CP6 - 120x100", values: [120, 100]},
   { text: "CP7 - 130x110", values: [130, 110]},
   { text: "CP8 - 114x114", values: [114, 114]},
   { text: "CP9 - 114x114", values: [114, 114]},
  ],
  "ROLL": [
    { text: "80x120", values: [ 80, 120 ]},
    { text: "100x120", values: [ 100, 120 ]},
    { text: "72x70", values: [ 72, 80 ]},
    { text: "200x80", values: [ 200, 80 ]},
    { text: "60x74", values: [ 60, 74 ]},
    { text: "60x80", values: [ 60, 80 ]},
    { text: "137x67", values: [ 137, 67 ]},
    { text: "72x81", values: [ 72, 81 ]},
  ],
  "CASSA": [
    { text: "80x120", values: [ 80, 120 ]},
    { text: "100x120", values: [ 100, 120 ]},
    { text: "102x123", values: [ 102, 123 ]},
    { text: "82x123", values: [ 82, 123 ]},
    { text: "103x121", values: [ 103, 121 ]},
    { text: "100x100", values: [ 100, 100 ]},
    { text: "102x120", values: [ 102, 120 ]},
    { text: "105x125", values: [ 105, 125 ]},
    { text: "113x145", values: [ 113, 145 ]},
    { text: "120x165", values: [ 120, 165 ]},
  ],
  "SACCO": [
    { text: "80x120", values: [ 80, 120 ]},
    { text: "100x120", values: [ 100, 120 ]},
    { text: "102x123", values: [ 102, 123 ]},
    { text: "82x123", values: [ 82, 123 ]},
    { text: "103x121", values: [ 103, 121 ]},
    { text: "100x100", values: [ 100, 100 ]},
    { text: "102x120", values: [ 102, 120 ]},
    { text: "105x125", values: [ 105, 125 ]},
    { text: "113x145", values: [ 113, 145 ]},
    { text: "120x165", values: [ 120, 165 ]},
  ],
  "CONTAINER": [
    { text: "80x120", values: [ 80, 120 ]},
    { text: "100x120", values: [ 100, 120 ]},
    { text: "102x123", values: [ 102, 123 ]},
    { text: "82x123", values: [ 82, 123 ]},
    { text: "103x121", values: [ 103, 121 ]},
    { text: "100x100", values: [ 100, 100 ]},
    { text: "102x120", values: [ 102, 120 ]},
    { text: "105x125", values: [ 105, 125 ]},
    { text: "113x145", values: [ 113, 145 ]},
    { text: "120x165", values: [ 120, 165 ]},
  ],
  "CUSTOM": [
    { text: "Imposta valore manuale", value: [null, null ]}
  ]
}

export const STANDARD_DIMENSIONS_INDEXES = Object.keys(STANDARD_DIMENSIONS)
  .reduce((acc, val) => {
    return ({
      ...acc,
      [val]: STANDARD_DIMENSIONS[val].map(el => el.text)
    })
  }, []);

export const DANGER_LABELS = {
  "FRAGILE": { img: icon_fragile, text: "Maneggiare con cura"},
  "NOHUMIDITY": { img: icon_temeumidita, text: "Teme l'umidità"},
  "NOHEAT": { img: icon_nocalore, text: "Teme il calore"},
  "NOHOOKS": { img: icon_noganci, text: "Non sollevare con argani"},
  "POSITION": { img: icon_alto, text: "Verso di trasporto"},
}

export const ORDER_STATUS_DESCRIPTION = {
  "PENDING": "Da ritirare",
  "PICKEDUP": "Ritirato",
  "STOCKED": "In giacenza",
  "DELIVERING": "In consegna",
  "DELIVERED": "Consegnato"
}

export const convertOrderQueryStatusToStatus = {
  "pending": "PENDING",
  "pickedup": "PICKEDUP",
  "stocked": "STOCKED",
  "delivering": "DELIVERING",
  "delivered": "DELIVERED",
}

export const PAYMENT_CONDITION_DESCRIPTION = {
  "FRANCO": { 
    short: "Porto franco",
    long: "Porto franco: con questo tipo di spedizione il pagamento del trasporto è a carico del mittente."
  },
  "ASSEGNATO": { 
    short: "Porto assegnato",
    long: "Porto assegnato: con questo tipo di spedizione il pagamento del trasporto è a carico del destinatario."
  }
}

export const orderStatusColorsBorders = {
  "PENDING":  "border-amber-500 dark:border-amber-300",
  "PICKEDUP": "border-cyan-500 dark:border-cyan-300",
  "STOCKED": "border-violet-500 dark:border-violet-300",
  "DELIVERING": "border-yellow-500 dark:border-yellow-300",
  "DELIVERED": "border-emerald-500 dark:border-emerald-300",
}

export const orderStatusBackgrounds = {
  "PENDING":  "bg-amber-500 dark:bg-amber-300",
  "PICKEDUP": "bg-cyan-500 dark:bg-cyan-300",
  "STOCKED": "bg-violet-500 dark:bg-violet-300",
  "DELIVERING": "bg-yellow-500 dark:bg-yellow-300",
  "DELIVERED": "bg-emerald-500 dark:bg-emerald-300",
}

export const ORDERS_LABELS = {
  "carrier": {
    headingAction: "Ricevuto da",
    counterpart: "sender",
    action: "Registrato",
    date: "Ricevuto in data: "
  }, 
  "sender": {
    headingAction: "Inviato a",
    counterpart: "carrier",
    action: "Inviato",
    date: "Inviato in data: "
  },
  "receiver": {
    headingAction: "In consegna da",
    counterpart: "carrier",
    action: "Ricevuto",
    date: "Registrato in data: "
  },
}


// Processors -----------------------------------------------------------------------------------------------
export const encodeOrderId = async ({ sender, carrier, receiver, tenants, uuid, timestamp }) => {
  const legibleOrderId = `ORD_${uuid}_${tagVatMixer(tenants.tenantSender, sender.vatNumber)}_${tagVatMixer(tenants.tenantCarrier, carrier.vatNumber)}_${tagVatMixer(tenants.tenantReceiver, receiver.vatNumber)}_${timestamp}`;
  const cripted = await digestMessage(legibleOrderId)
  return cripted;
}

export const encodeOrderIdBase64 = ({ sender, carrier, receiver, tenants, uuid, timestamp }) => {
  const legibleOrderId = `ORD_${uuid}_${tagVatMixer(tenants.tenantSender, sender.vatNumber)}_${tagVatMixer(tenants.tenantCarrier, carrier.vatNumber)}_${tagVatMixer(tenants.tenantReceiver, receiver.vatNumber)}_${timestamp}`;
  return Base64.btoa(legibleOrderId);
}

export const decodeOrderIdBase64 = (id) => {
  return Base64.atob(id);
}

export const processSearchTextValues = ({ listType, senderState, carrierState, receiverState, stampState, createdAtState, callback }) => {
  const [senderName, setSenderName] = senderState;
  const [carrierName, setCarrierName] = carrierState;
  const [receiverName, setReceiverName] = receiverState;
  const [stamp, setStamp] = stampState;
  const [createdAt, setCreatedAt] = createdAtState;

  const receiverObject = {
    id: "receiverName",
    text: "Nome azienda destiantaria",
    input: {
      placeholder: "es. LTS SRL",
      componentId: InputTypes.TEXT,
      value: receiverName,
      onChange: setReceiverName,
      onPressEnter: () => callback({ key: "receiverName", value: receiverName.toUpperCase() })
    }
  }

  const senderObject =  {
    id: "senderName",
    text: "Nome azienda cliente",
    input: {
      placeholder: "es. LTS SRL",
      componentId: InputTypes.TEXT,
      value: senderName,
      onChange: setSenderName,
      onPressEnter: () => callback({ key: "senderName", value: senderName.toUpperCase() })
    }
  }

  const carrierObject =  {
    id: "carrierName",
    text: "Nome azienda trasporti",
    input: {
      placeholder: "es. LTS SRL",
      componentId: InputTypes.TEXT,
      value: carrierName,
      onChange: setCarrierName,
      onPressEnter: () => callback({ key: "carrierName", value: carrierName.toUpperCase() })
    }
  }

  let finalOptions = [{
    id: "id",
    text: "ID ordine",
    input: {
      placeholder: "es. Z12ABCDE",
      componentId: InputTypes.TEXT,
      value: stamp,
      onChange: setStamp,
      onPressEnter: () => callback({ key: "stamp", value: stamp ? `ORD-${stamp}` : ""})
    }
  }, {
    id: "createdAt",
    text: "Data di invio ordine",
    input: {
      placeholder: null,
      componentId: InputTypes.DATE,
      value: createdAt,
      onChange: setCreatedAt,
      onBlur: (value) => callback({ key: "createdAt", value }),
      onPressEnter: (value) => callback({ key: "createdAt", value })
    }
  }];
  
  if(listType === "carrier") finalOptions.push({...senderObject }, {...receiverObject });
  if(listType === "sender") finalOptions.push({ ...carrierObject }, { ...receiverObject });
  if(listType === "receiver") finalOptions.push({ ...carrierObject }, { ...senderObject });

  return finalOptions;
}

export const saveAbsentCompaniesInContacts = async ({ companiesInOrder, allCompaniesContactsVats, myCompany, dispatch }) => {
  const vatNumbers = companiesInOrder.map(comp => comp.vatNumber);
  const companiesToAdd = removeDuplicates(
    vatNumbers
    .filter(v => !allCompaniesContactsVats.includes(v))
    .filter(v => v !== myCompany.vatNumber)
  );

  if(companiesToAdd.length > 0) {
    for(let companyVat of companiesToAdd) {
      const companyTargetIndex = vatNumbers.indexOf(companyVat);
      const companyTarget = companiesInOrder[companyTargetIndex];
      consoleInfo(`${companyTarget.name} non presente in rubrica: inizio del processo di creazione indiretta del contatto`, companyTarget);
      try {
        await dispatch(createContactThunk({
          type: "COMPANY", 
          contact: {
            ...companyTarget,
            tenant: myCompany.tag,
          },
          enabledToast: true,
          fromRemote: false,
          indirect: true
        }))
      } catch(err) {
        throw new Error("Failed contact creation process");
      }
    }
  }
}

// Excel -----------------------------------------------------------------------------------------------
const getOrderAction = {
  "PENDING#GROUPAGE": "Pickup",
  "STOCKED#GROUPAGE": "Delivery",
  "PENDING#DIRETTO": "AB-1",
  "STOCKED#DIRETTO": "AB-2",
}

export async function getGeocodingDataFromPlaceId(place_id, coordinate) {
  // This is making the Geocode request
  var geocoder = new window.google.maps.Geocoder();
  let result = null;

  // Geocoder
  const geocode = await geocoder.geocode({ placeId: place_id });

  if (geocode?.results?.[0]) {
    const postCode = geocode.results[0].address_components.filter(el => el.types.includes("postal_code"))
    const route = geocode.results[0].address_components.filter(el => el.types.includes("route")); 
    const street_number = geocode.results[0].address_components.filter(el => el.types.includes("street_number")); 
    const city = geocode.results[0].address_components.filter(el => el.types.includes("administrative_area_level_3")); 
    
    result = {
      postCode: postCode?.length > 0 ? postCode[0].long_name : "",
      city : city?.length > 0 ? city[0].long_name : "",
      street: `${route?.length > 0 ? route[0].long_name : ""} ${street_number?.length > 0 ? street_number[0].long_name : ""}`,
      lat: coordinate[0],
      lng: coordinate[1],
      locationId: place_id,
    }

    return result;
  } else {
    console.log("No  results find with current place_id", place_id);
  }
}

export async function generateOrdersForGulliverDataCell(orders) {
  let error = false;
  for (const order of orders) {
    if(error) return;
    if(!order?.depotCheckpoint?.name && order.shipmentType !== "DIRETTO") {
      error = true;
      toast.error(`Nell'ordine ${order.stamp} mancano le informazioni relative al luogo di deposito`);
      console.error("Non puoi esportare gli ordini che non hanno dichiarato un punto di deposito valido", order);
    }

    if(!getOrderAction?.[`${order.status}#${order.shipmentType}`]) {
      error = true;
      toast.error(`Esportazione per gulliver non disponibile per l'elenco selezionato ${order.status}`);
      console.error("Non vi sono metodi di esportazioni disponibili per ordini nello status di:", order?.status, order);
    }
  }

  if(error) {
    toast.error("Impossibile esportare l'elenco selezionato");
    return
  };

  const formattedData = orders.reduce((acc, val, index) => {
    if(getOrderAction[`${val.status}#${val.shipmentType}`] === "AB-2") {
      toast.warn(`${val.stamp} escluso dall'esportazione: ${ORDER_STATUS_DESCRIPTION[val.status]} non compatibile con tipo ${SHIPMENT_METHOD_DESCRIPTION[val.shipmentType]}`)
      return [...acc]
    }; // rendo impossibile esportare STOCKED#DIRETTO

    return [
      ...acc,
      generateGulliverRaw(getOrderAction[`${val.status}#${val.shipmentType}`], val)
    ]
  }, []);

  return formattedData;
}

const generateGulliverRaw = (orderAction, val) => {
  if(orderAction === "Pickup") {
    return [
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // CreationDate
      "create", // ImportAction
      "OrderImport", // ImportType
      val.extId, // ExtId1
      orderAction, // OrderAction
      "", // Taskfield1ExtId
      "", // PrecombinedTourId
      val.netWeight, // Weight
      "", // Volume
      val.loadingMeter, // LoadingMeter
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // EarliestDateTime
      format(new Date(val.deliveryDateEnd), "dd/MM/yyyy' 'HH:mm:ss"), // LatestDateTime
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // EarliestPickupTime
      format(new Date(val.deliveryDateEnd), "dd/MM/yyyy' 'HH:mm:ss"), // LatestPickupTime
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // EarliestDeliveryTime
      format(new Date(val.deliveryDateEnd), "dd/MM/yyyy' 'HH:mm:ss"), // LatestDeliveryTime
      val?.pickupCheckpoint?.extId, // PickupLocationID
      0,  // PickupIsDepot
      "", // PickupLocationName
      "", // PickupPostCode
      "", // PickupPostCity
      "", // PickupStreet
      "GEODEC", // PickupCoordFormat
      val.pickupCheckpoint.location.coordinate[1], // PickupLongitude
      val.pickupCheckpoint.location.coordinate[0], // PickupLatitude
      val.pickupCheckpoint.windows?.length > 0
        ? val?.pickupCheckpoint?.windows?.[0]?.start 
          ? `${format(new Date(val.pickupCheckpoint.windows[0].start), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour1Start
      val.pickupCheckpoint.windows?.length > 0
        ? val?.pickupCheckpoint?.windows?.[0]?.end
          ? `${format(new Date(val.pickupCheckpoint.windows[0].end), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour1End
      val.pickupCheckpoint.windows?.length > 0
        ? val?.pickupCheckpoint?.windows?.[0]?.days?.length > 0
          ? val.pickupCheckpoint.windows[0].days.join(",")
          : ""
        : "", // PickupOpeningHour1Days
      val.pickupCheckpoint.windows?.length === 2
        ? val?.pickupCheckpoint?.windows?.[1]?.start
          ? `${format(new Date(val.pickupCheckpoint.windows[1].start), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour2Start
      val.pickupCheckpoint.windows?.length === 2
        ? val?.pickupCheckpoint?.windows?.[1]?.end
          ? `${format(new Date(val.pickupCheckpoint.windows[1].end), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour2End
      val.pickupCheckpoint.windows?.length === 2
        ? val?.pickupCheckpoint?.windows?.[1]?.days?.length > 0
          ? val.pickupCheckpoint.windows[1].days.join(",")
          : ""
        : "", // PickupOpeningHour2Days
      val?.depotCheckpoint?.extId, // DeliveryLocationID
      1, // DeliveryIsDepot
      "", // DeliveryLocationName
      "", // DeliveryPostCode
      "", // DeliveryCity
      "", // DeliveryStreet
      "GEODEC", // DeliveryCoordFormat
      val.depotCheckpoint.location.coordinate[1], // DeliveryLongitude
      val.depotCheckpoint.location.coordinate[0], // DeliveryLatitude
      val.depotCheckpoint.windows?.length > 0
        ? val?.depotCheckpoint?.windows[0]?.start
          ? `${format(new Date(val.depotCheckpoint.windows[0].start), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour1Start
      val.depotCheckpoint.windows?.length > 0
        ? val?.depotCheckpoint?.windows?.[0]?.end
          ? `${format(new Date(val.depotCheckpoint.windows[0].end), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour1End
      val.depotCheckpoint.windows?.length > 0
        ? val?.depotCheckpoint?.windows?.[0]?.days?.length > 0
          ? val.depotCheckpoint.windows[0].days.join(",")
          : ""
        : "", // DeliveryOpeningHour1Days
      val.depotCheckpoint.windows?.length === 2
        ? val?.depotCheckpoint?.windows?.[1]?.start
          ? `${format(new Date(val.depotCheckpoint.windows[1].start), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour2Start
      val.depotCheckpoint.windows?.length === 2
        ? val.depotCheckpoint?.windows[1]?.end
          ? `${format(new Date(val.depotCheckpoint.windows[1].end), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour2End
      val.depotCheckpoint.windows?.length === 2
        ? val?.depotCheckpoint?.windows?.[1]?.days?.length > 0
          ? val.depotCheckpoint.windows[1].days.join(",")
          : ""
        : "", // DeliveryOpeningHour2Days
      val.id,             // Text_1 campo aggiuntivo/opzionale dell'excel 
      val.preOrderId,     // Text_2 campo aggiuntivo/opzionale dell'excel 
      val.tenantSender,   // Text_3 campo aggiuntivo/opzionale dell'excel
      val.tenantCarrier,  // Text_4 campo aggiuntivo/opzionale dell'excel
      val.tenantReceiver  // Text_5 campo aggiuntivo/opzionale dell'excel
    ]
  }

  if(orderAction === "Delivery") {
    return [
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // CreationDate
      "create", // ImportAction
      "OrderImport", // ImportType
      val.extId, // ExtId1
      orderAction, // OrderAction
      "", // Taskfield1ExtId
      "", // PrecombinedTourId
      val.netWeight, // Weight
      "", // Volume
      val.loadingMeter, // LoadingMeter
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // EarliestDateTime
      format(new Date(val.deliveryDateEnd), "dd/MM/yyyy' 'HH:mm:ss"), // LatestDateTime
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // EarliestPickupTime
      format(new Date(val.deliveryDateEnd), "dd/MM/yyyy' 'HH:mm:ss"), // LatestPickupTime
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // EarliestDeliveryTime
      format(new Date(val.deliveryDateEnd), "dd/MM/yyyy' 'HH:mm:ss"), // LatestDeliveryTime
      val?.depotCheckpoint?.extId, // PickupLocationID
      1,  // PickupIsDepot
      "", // PickupLocationName
      "", // PickupPostCode
      "", // PickupPostCity
      "", // PickupStreet
      "GEODEC", // PickupCoordFormat
      val.depotCheckpoint.location.coordinate[1], // PickupLongitude
      val.depotCheckpoint.location.coordinate[0], // PickupLatitude
      val.depotCheckpoint.windows?.length > 0
        ? val?.depotCheckpoint?.windows?.[0]?.start
          ? `${format(new Date(val.depotCheckpoint.windows[0].start), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour1Start
      val.depotCheckpoint.windows?.length > 0
        ? val?.depotCheckpoint?.windows?.[0]?.end
          ? `${format(new Date(val.depotCheckpoint.windows[0].end), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour1End
      val.depotCheckpoint.windows?.length > 0
        ? val.depotCheckpoint.windows[0].days?.length > 0
          ? val.depotCheckpoint.windows[0].days.join(",")
          : ""
        : "", // PickupOpeningHour1Days
      val.depotCheckpoint.windows?.length === 2
        ? val?.depotCheckpoint?.windows?.[1]?.start 
          ? `${format(new Date(val.depotCheckpoint.windows[1].start), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour2Start
      val.depotCheckpoint.windows?.length === 2
        ? val?.depotCheckpoint?.windows?.[1]?.end
          ? `${format(new Date(val.depotCheckpoint.windows[1].end), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour2End
      val.depotCheckpoint.windows?.length === 2
        ? val?.depotCheckpoint?.windows?.[1]?.days?.length > 0
          ? val.depotCheckpoint.windows[1].days.join(",")
          : ""
        : "", // PickupOpeningHour2Days
      val?.deliveryCheckpoint?.extId, // DeliveryLocationID
      0, // DeliveryIsDepot
      "", // DeliveryLocationName
      "", // DeliveryPostCode
      "", // DeliveryCity
      "", // DeliveryStreet
      "GEODEC", // DeliveryCoordFormat
      val.deliveryCheckpoint.location.coordinate[1], // DeliveryLongitude
      val.deliveryCheckpoint.location.coordinate[0], // DeliveryLatitude
      val?.deliveryCheckpoint?.windows?.length > 0
        ? val?.deliveryCheckpoint?.windows?.[0]?.start
          ? `${format(new Date(val.deliveryCheckpoint.windows[0].start), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour1Start
      val?.deliveryCheckpoint?.windows?.length > 0
        ? val?.deliveryCheckpoint?.windows?.[0]?.end
          ? `${format(new Date(val.deliveryCheckpoint.windows[0].end), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour1End
      val?.deliveryCheckpoint?.windows?.length > 0
        ? val?.deliveryCheckpoint?.windows?.[0]?.days?.length > 0
          ? val.deliveryCheckpoint.windows[0].days.join(",")
          : ""
        : "", // DeliveryOpeningHour1Days
      val.deliveryCheckpoint.windows?.length === 2
        ? val?.deliveryCheckpoint?.windows?.[1]?.start
          ? `${format(new Date(val.deliveryCheckpoint.windows[1].start), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour2Start
      val?.deliveryCheckpoint?.windows?.length === 2
        ? val?.deliveryCheckpoint?.windows?.[1]?.end 
          ? `${format(new Date(val.deliveryCheckpoint.windows[1].end), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour2End
      val.deliveryCheckpoint.windows?.length === 2
        ? val.deliveryCheckpoint.windows[1].days?.length > 0
          ? val.deliveryCheckpoint.windows[1].days.join(",")
          : ""
        : "", // DeliveryOpeningHour2Days
      val.id,             // Text_1 campo aggiuntivo/opzionale dell'excel 
      val.preOrderId,     // Text_2 campo aggiuntivo/opzionale dell'excel 
      val.tenantSender,   // Text_3 campo aggiuntivo/opzionale dell'excel
      val.tenantCarrier,  // Text_4 campo aggiuntivo/opzionale dell'excel
      val.tenantReceiver  // Text_5 campo aggiuntivo/opzionale dell'excel
    ]
  }

  if(orderAction === "AB-1") {
    return [
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // CreationDate
      "create", // ImportAction
      "OrderImport", // ImportType
      val.extId, // ExtId1
      "AB", // OrderAction
      "", // Taskfield1ExtId
      "", // PrecombinedTourId
      val.netWeight, // Weight
      "", // Volume
      val.loadingMeter, // LoadingMeter
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // EarliestDateTime
      format(new Date(val.deliveryDateEnd), "dd/MM/yyyy' 'HH:mm:ss"), // LatestDateTime
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // EarliestPickupTime
      format(new Date(val.deliveryDateEnd), "dd/MM/yyyy' 'HH:mm:ss"), // LatestPickupTime
      format(new Date(val.createdAt), "dd/MM/yyyy' 'HH:mm:ss"), // EarliestDeliveryTime
      format(new Date(val.deliveryDateEnd), "dd/MM/yyyy' 'HH:mm:ss"), // LatestDeliveryTime
      val?.pickupCheckpoint?.extId, // PickupLocationID
      0,  // PickupIsDepot
      "", // PickupLocationName
      "", // PickupPostCode
      "", // PickupPostCity
      "", // PickupStreet
      "GEODEC", // PickupCoordFormat
      val.pickupCheckpoint.location.coordinate[1], // PickupLongitude
      val.pickupCheckpoint.location.coordinate[0], // PickupLatitude
      val.pickupCheckpoint.windows?.length > 0
        ? val?.pickupCheckpoint?.windows?.[0]?.start 
          ? `${format(new Date(val.pickupCheckpoint.windows[0].start), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour1Start
      val?.pickupCheckpoint?.windows?.length > 0
        ? val?.pickupCheckpoint?.windows?.[0]?.end
          ? `${format(new Date(val.pickupCheckpoint.windows[0].end), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour1End
      val?.pickupCheckpoint?.windows?.length > 0
        ? val?.pickupCheckpoint?.windows?.[0]?.days?.length > 0
          ? val?.pickupCheckpoint?.windows?.[0]?.days.join(",")
          : ""
        : "", // PickupOpeningHour1Days
      val?.pickupCheckpoint?.windows?.length === 2
        ? val?.pickupCheckpoint?.windows?.[1]?.start 
          ? `${format(new Date(val.pickupCheckpoint.windows[1].start), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour2Start
      val?.pickupCheckpoint?.windows?.length === 2
        ? val?.pickupCheckpoint?.windows?.[1]?.end
          ? `${format(new Date(val.pickupCheckpoint.windows[1].end), "HH:mm")}`
          : ""
        : "", // PickupOpeningHour2End
      val?.pickupCheckpoint?.windows?.length === 2
        ? val?.pickupCheckpoint?.windows?.[1]?.days?.length > 0
          ? val.pickupCheckpoint.windows[1].days.join(",")
          : ""
        : "", // PickupOpeningHour2Days
      val?.deliveryCheckpoint?.extId, // DeliveryLocationID
      0,  // DeliveryIsDepot
      "", // DeliveryLocationName
      "", // DeliveryPostCode
      "", // DeliveryCity
      "", // DeliveryStreet
      "GEODEC", // DeliveryCoordFormat
      val.deliveryCheckpoint.location.coordinate[1], // DeliveryLongitude
      val.deliveryCheckpoint.location.coordinate[0], // DeliveryLatitude
      val?.deliveryCheckpoint?.windows?.length > 0
        ? val?.deliveryCheckpoint?.windows[0]?.start 
          ? `${format(new Date(val.deliveryCheckpoint.windows[0].start), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour1Start
      val?.deliveryCheckpoint?.windows?.length > 0
        ? val?.deliveryCheckpoint?.windows[0]?.end 
          ? `${format(new Date(val.deliveryCheckpoint.windows[0].end), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour1End
      val?.deliveryCheckpoint.windows?.length > 0
        ? val?.deliveryCheckpoint?.windows?.[0]?.days?.length > 0
          ? val.deliveryCheckpoint.windows[0].days.join(",")
          : ""
        : "", // DeliveryOpeningHour1Days
      val.deliveryCheckpoint.windows?.length === 2
        ? val?.deliveryCheckpoint?.windows[1]?.start 
          ? `${format(new Date(val.deliveryCheckpoint.windows[1].start), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour2Start
      val?.deliveryCheckpoint?.windows?.length === 2
        ? val?.deliveryCheckpoint?.windows?.[1]?.end 
          ? `${format(new Date(val.deliveryCheckpoint.windows[1].end), "HH:mm")}`
          : ""
        : "", // DeliveryOpeningHour2End
      val?.deliveryCheckpoint?.windows?.length === 2
        ? val?.deliveryCheckpoint?.windows?.[1].days?.length > 0
          ? val.deliveryCheckpoint.windows[1].days.join(",")
          : ""
        : "", // DeliveryOpeningHour2Days
      val.id,             // Text_1 campo aggiuntivo/opzionale dell'excel 
      val.preOrderId,     // Text_2 campo aggiuntivo/opzionale dell'excel 
      val.tenantSender,   // Text_3 campo aggiuntivo/opzionale dell'excel
      val.tenantCarrier,  // Text_4 campo aggiuntivo/opzionale dell'excel
      val.tenantReceiver  // Text_5 campo aggiuntivo/opzionale dell'excel
    ]
  }
}

// Datetime comparison with windows start and end -----------------------------------------------------------------------------------------------
function getSelectedDays(startDate, stopDate) {
  var dateArray = [];
  var currentDate = startDate;
  while (new Date(currentDate) <= new Date(stopDate)) {
    const day = format(new Date(currentDate), "eeee");
    const intDay = DAYS_ENG.indexOf(day) + 1;
    dateArray.push(intDay);
    currentDate = addDays(new Date(currentDate) , 1);
  }

  return dateArray;
}

function validityTimeCheck(day, deliveryDate) {
  let result = true;
  day.forEach((time) => {
    if(!result) return;
    if(!time?.start  || !time?.end) return;

    const start = [getHours(parseISO(time.start)), getMinutes(parseISO(time.start))];
    const end = [getHours(parseISO(time.end)), getMinutes(parseISO(time.end))];
    
    if(!isWithinInterval(new Date(deliveryDate), {
      start: new Date(new Date(deliveryDate).setHours(...start)),
      end: new Date(new Date(deliveryDate).setHours(...end)),
    })) {
      result = false;
      return;
    }
  });

  return result;
}

export function runDateTimeVerifications(windows, dateStart, dateEnd, callback) {
  let error = false; 
  const selectedDays = getSelectedDays(dateStart, dateEnd);

  // Format data from contact's windows
  const windowsDaysTimes = windows.reduce((acc, window) => {
    const days = window.days.reduce((daysAcc, day) => ({
      ...daysAcc,
      [day]: acc?.[day]?.length > 0
        ? acc[day].concat({ start: window?.start, end: window?.end })
        : [{ start: window?.start, end: window?.end }]
    }), {});

    return ({ ...acc, ...days })
  }, {});

  // Exit if there isn't data in contact's windows
  if(Object.keys(windowsDaysTimes)?.length <= 0) return;

  // Loop over all the selected days and check validity
  selectedDays.forEach((day, index) => {
    if(error) return;

    // Controllo se è presente nei giorni di disponibilità
    const dayString = day.toString();

    if(!Object.keys(windowsDaysTimes).includes(dayString)) {
      error = true;
      // toast.warn(`${days[day - 1]} non presente fra le disponibilità associate al punto di interesse`);
      callback(`${days[day - 1]} non presente fra le disponibilità associate al punto di interesse`);
      return;
    }

    // Controllo la corrispondenza con gli orari presenti in windows (solo sul primo e l'ultimo giorno selezionato)
    if(!error && index === 0) {
      if(!validityTimeCheck(windowsDaysTimes[day], dateStart )) {
        error = true;
        // toast.warn(`L'orario di inizio operazione non combacia con l'indicazione registrata nel punto di interesse`);
        callback(`L'orario di inizio operazione non combacia con l'indicazione registrata nel punto di interesse`);
        return;
      }
    }

    if(!error && (index === selectedDays.length - 1)) {
      if(!validityTimeCheck(windowsDaysTimes[day], dateEnd )) {
        error = true;
        // toast.warn(`L'orario di fine operazione non combacia con l'indicazione registrata nel punto di interesse`);
        callback(`L'orario di fine operazione non combacia con l'indicazione registrata nel punto di interesse`);
        return;
      }
    }
  });
}