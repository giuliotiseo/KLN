import { format } from "date-fns";
import { toast } from "react-toastify";
import writeXlsxFile from "write-excel-file";
import { ORDER_STATUS_DESCRIPTION, SHIPMENT_METHOD_DESCRIPTION } from "./constants";

// Constants -----------------------------------------------------------------------------------------------
const getOrderAction = {
  "PENDING#GROUPAGE": "Pickup",
  "STOCKED#GROUPAGE": "Delivery",
  "PENDING#DIRETTO": "AB",
  "STOCKED#DIRETTO": "AB-2",
}

const dateFormat = 'dd/mm/yyyy hh:mm:ss';
const doubleFormat = '0.00';

const SIGNATURE = {
  Pickup: "pckp",
  Delivery: "dely",
  AB: "abab"
}

// Schema -----------------------------------------------------------------------------------------------

const PTVSchema = [
  {
    column: 'CreationDate',
    type: Date,
    format: dateFormat,
    value: (val) => new Date(val.createdAt),
    width: 20 // Column width (in characters).
  },
  {
    column: 'ImportAction',
    type: String,
    value: () => "create"
  },
  {
    column: 'ImportType',
    type: String,
    value: () => "OrderImport"
  },
  {
    column: 'ExtId1',
    type: String,
    value: (val) => `${val.extId}-${SIGNATURE[val.orderAction]}`
  },
  {
    column: 'OrderAction',
    type: String,
    value: (val) => val.orderAction
  },
  {
    column: 'Taskfield1ExtId',
    type: String,
    value: () => ""
  },
  {
    column: 'PrecombinedTourId',
    type: String,
    value: () => ""
  },
  {
    column: 'Weight',
    type: Number,
    format: doubleFormat,
    value: (val) => Number(val.netWeight || 0),
  },
  {
    column: 'Volume',
    type: Number,
    format: 'General',
    value: () => ""
  },
  {
    column: 'LoadingMeter',
    type: Number,
    format: doubleFormat,
    value: (val) => Number(val.loadingMeter)
  },
  {
    column: 'Quantity1',
    type: Number,
    format: doubleFormat,
    value: (val) => Number(getQuantityFromLDM(val.loadingMeter))
  },
  {
    column: 'EarliestDateTime',
    type: Date,
    format: dateFormat,
    value: (val) => new Date(val.createdAt),
    width: 20 // Column width (in characters).
  },
  {
    column: 'LatestDateTime',
    type: Date,
    format: dateFormat,
    value: (val) => new Date(val.deliveryDateEnd),
    width: 20 // Column width (in characters).
  },
  {
    column: 'EarliestPickupTime',
    type: Date,
    format: dateFormat,
    value: (val) => new Date(val.createdAt),
    width: 20 // Column width (in characters).
  },
  {
    column: 'LatestPickupTime',
    type: Date,
    format: dateFormat,
    value: (val) => new Date(val.deliveryDateEnd),
    width: 20 // Column width (in characters).
  },
  {
    column: 'EarliestDeliveryTime',
    type: Date,
    format: dateFormat,
    value: (val) => new Date(val.createdAt),
    width: 20 // Column width (in characters).
  },
  {
    column: 'LatestDeliveryTime',
    type: Date,
    format: dateFormat,
    value: (val) => new Date(val.deliveryDateEnd),
    width: 20 // Column width (in characters).
  },
  {
    column: 'PickupLocationID',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup.extId
  },
  {
    column: 'PickupIsDepot',
    type: Number,
    value: (val) => targetizedCheckpoint(val).pickupIsDepot
  },
  {
    column: 'PickupLocationName',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup.companyName
  },
  {
    column: 'PickupPostCode',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup.postCode.toString()
  },
  {
    column: 'PickupCity',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup?.location?.city || ""
  },
  {
    column: 'PickupStreet',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup?.location?.address || ""
  },
  {
    column: 'PickupCoordFormat',
    type: String,
    value: () => "GEODEC"
  },
  {
    column: 'PickupLongitude',
    type: Number,
    format: 'General',
    value: (val) => targetizedCheckpoint(val).pickup.location.coordinate[1]
  },
  {
    column: 'PickupLatitude',
    type: Number,
    format: 'General',
    value: (val) => targetizedCheckpoint(val).pickup.location.coordinate[0]
  },
  {
    column: 'PickupOpeningHour1Start',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup.windows?.length > 0
    ? targetizedCheckpoint(val).pickup?.windows?.[0]?.start 
      ? `${format(new Date(targetizedCheckpoint(val).pickup.windows[0].start), "HH:mm")}`
      : ""
    : "",
  },
  {
    column: 'PickupOpeningHour1End',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup.windows?.length > 0
    ? targetizedCheckpoint(val).pickup?.windows?.[0]?.end
      ? `${format(new Date(targetizedCheckpoint(val).pickup.windows[0].end), "HH:mm")}`
      : ""
    : "",
  },
  {
    column: 'PickupOpeningHour1Days',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup.windows?.length > 0
    ? targetizedCheckpoint(val).pickup?.windows?.[0]?.days?.length > 0
      ? String(targetizedCheckpoint(val).pickup.windows[0].days.join(","))
      : ""
    : "",
  },
  {
    column: 'PickupOpeningHour2Start',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup.windows?.length === 2
    ? targetizedCheckpoint(val).pickup?.windows?.[1]?.start
      ? `${format(new Date(targetizedCheckpoint(val).pickup.windows[1].start), "HH:mm")}`
      : ""
    : "",
  },
  {
    column: 'PickupOpeningHour2End',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup.windows?.length === 2
    ? targetizedCheckpoint(val).pickup?.windows?.[1]?.end
      ? `${format(new Date(targetizedCheckpoint(val).pickup.windows[1].end), "HH:mm")}`
      : ""
    : "",
  },
  {
    column: 'PickupOpeningHour2Days',
    type: String,
    value: (val) => targetizedCheckpoint(val).pickup.windows?.length === 2
    ? targetizedCheckpoint(val).pickup?.windows?.[1]?.days?.length > 0
      ? String(targetizedCheckpoint(val).pickup.windows[1].days.join(","))
      : ""
    : "",
  },
  {
    column: 'DeliveryLocationID',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery.extId,
  },
  {
    column: 'DeliveryIsDepot',
    type: Number,
    value: (val) => targetizedCheckpoint(val).deliveryIsDepot,
  },
  {
    column: 'DeliveryLocationName',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery.companyName,
  },
  {
    column: 'DeliveryPostCode',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery.postCode.toString(),
  },
  {
    column: 'DeliveryCity',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery?.location?.city || ""
  },
  {
    column: 'DeliveryStreet',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery?.location?.address || ""
  },
  {
    column: 'DeliveryCoordFormat',
    type: String,
    value: () => "GEODEC",
  },
  {
    column: 'DeliveryLongitude',
    type: Number,
    format: 'General',
    value: (val) => targetizedCheckpoint(val).delivery.location.coordinate[1]
  },
  {
    column: 'DeliveryLatitude',
    type: Number,
    format: 'General',
    value: (val) => targetizedCheckpoint(val).delivery.location.coordinate[0]
  },
  {
    column: 'DeliveryOpeningHour1Start',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery.windows?.length > 0
    ? targetizedCheckpoint(val).delivery?.windows[0]?.start
      ? `${format(new Date(targetizedCheckpoint(val).delivery.windows[0].start), "HH:mm")}`
      : ""
    : "",
  },
  {
    column: 'DeliveryOpeningHour1End',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery.windows?.length > 0
    ? targetizedCheckpoint(val).delivery?.windows?.[0]?.end
      ? `${format(new Date(targetizedCheckpoint(val).delivery.windows[0].end), "HH:mm")}`
      : ""
    : "",
  },
  {
    column: 'DeliveryOpeningHour1Days',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery.windows?.length > 0
    ? targetizedCheckpoint(val).delivery?.windows?.[0]?.days?.length > 0
      ? targetizedCheckpoint(val).delivery.windows[0].days.map(day => day.toString()).join(",")
      : ""
    : "",
  },
  {
    column: 'DeliveryOpeningHour2Start',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery.windows?.length === 2
    ? targetizedCheckpoint(val).delivery?.windows?.[1]?.start
      ? `${format(new Date(targetizedCheckpoint(val).delivery.windows[1].start), "HH:mm")}`
      : ""
    : "",
  },
  {
    column: 'DeliveryOpeningHour2End',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery.windows?.length === 2
    ? targetizedCheckpoint(val).delivery?.windows?.[1]?.end
      ? `${format(new Date(targetizedCheckpoint(val).delivery.windows[1].end), "HH:mm")}`
      : ""
    : "",
  },
  {
    column: 'DeliveryOpeningHour2Days',
    type: String,
    value: (val) => targetizedCheckpoint(val).delivery.windows?.length > 0
    ? targetizedCheckpoint(val).delivery?.windows?.[1]?.days?.length > 0
      ? targetizedCheckpoint(val).delivery.windows[1].days.map(day => day.toString()).join(",")
      : ""
    : "",
  },
  {
    column: 'Text_1',
    type: String,
    value: (val) => val.id,
  },
  {
    column: 'Text_2',
    type: String,
    value: (val) => val.preOrderId,
  },
  {
    column: 'Text_3',
    type: String,
    value: (val) => val.senderId,
  },
  {
    column: 'Text_4',
    type: String,
    value: (val) => val.carrierId,
  },
  {
    column: 'Text_5',
    type: String,
    value: (val) => val.receiverId
  },
  {
    column: 'Text_6',
    type: String,
    value: (val) => val.pickupStorageId
  },
  {
    column: 'Text_7',
    type: String,
    value: (val) => val.deliveryStorageId
  },
]

// Functions -----------------------------------------------------------------------------------------------
const getCAPFromAddress = (address) => {
  let result = address
    .split(',')
    .map(addressWithSpaces => addressWithSpaces.replace(/ /g, ""))
    .filter(addressItem => addressItem.length === 5 && typeof Number(addressItem) === "number" && !isNaN(Number(addressItem)))
  
    return result ? String(result) : '';
}


const targetizedCheckpoint = (val) => {
  if(val.orderAction === "Pickup") {
    return {
      pickup: {
        ...val.pickupCheckpoint,
        windows: val.pickupCheckpoint.windows?.filter(wind => wind.type === "CARICO") || [],
        companyName: val.pickupStorageName,
        postCode: val?.pickupCheckpoint?.location?.address ? getCAPFromAddress(val.pickupCheckpoint.location.address) : "",
      },
      delivery: {
        ...val.depotCheckpoint,
        windows: val.depotCheckpoint.windows?.filter(wind => wind.type === "SCARICO") || [],
        companyName: val.carrierName,
        postCode: val?.depotCheckpoint?.location?.address ? getCAPFromAddress(val.depotCheckpoint.location.address) : "",
      },
      pickupIsDepot: 0,
      deliveryIsDepot: 1,
    }
  }

  if(val.orderAction === "Delivery") {
    return { 
      pickup: {
        ...val.depotCheckpoint,
        windows: val.depotCheckpoint.windows?.filter(wind => wind.type === "CARICO") || [],
        companyName: val.carrierName,
        postCode: val?.depotCheckpoint?.location?.address ? getCAPFromAddress(val.depotCheckpoint.location.address) : "",
      },
      delivery: {
        ...val.deliveryCheckpoint,
        windows: val.deliveryCheckpoint.windows?.filter(wind => wind.type === "SCARICO") || [],
        companyName: val.deliveryStorageName,
        postCode: val?.deliveryCheckpoint?.location?.address ? getCAPFromAddress(val.deliveryCheckpoint.location.address) : "",
      },
      pickupIsDepot: 1,
      deliveryIsDepot: 0,
    }
  }

  if(val.orderAction === "AB") {
    return { 
      pickup: { 
        ...val.pickupCheckpoint,
        windows: val.pickupCheckpoint.windows?.filter(wind => wind.type === "CARICO") || [],
        companyName: val.pickupStorageName,
        postCode: val?.pickupCheckpoint?.location?.address ? getCAPFromAddress(val.pickupCheckpoint.location.address) : "",

      },
      delivery: {
        ...val.deliveryCheckpoint,
        windows: val.deliveryCheckpoint.windows?.filter(wind => wind.type === "SCARICO") || [],
        companyName: val.deliveryStorageName,
        postCode: val?.deliveryCheckpoint?.location?.address ? getCAPFromAddress(val.deliveryCheckpoint.location.address) : "",
      },
      pickupIsDepot: 0,
      deliveryIsDepot: 0,
    }
  }
}

const getQuantityFromLDM = (loadingMeter, size = [80, 120]) => {
  const calculateLoadingMeter = parseFloat((loadingMeter / size.reduce((acc, val) => ((acc / 100) * (val / 100))/2.4)).toFixed(2));
  return calculateLoadingMeter;
}

// Generator -----------------------------------------------------------------------------------------------
export async function generateOrdersForPTVExport(inputOrders) {
  console.log("esporto questo elenco", inputOrders);

  let error = false;
  let orders = [];

  for (const order of inputOrders) {
    if(error) break;
    if(!order?.depotCheckpoint?.name && order.shipmentType !== "DIRETTO") {
      error = true;
      toast.error(`Nell'ordine ${order.stamp} mancano le informazioni relative al luogo di deposito`);
      console.error("Non puoi esportare gli ordini che non hanno dichiarato un punto di deposito valido", order);
    }

    if(!getOrderAction?.[`${order.status}#${order.shipmentType}`]) {
      console.log("Non vi sono metodi di esportazioni disponibili per ordini nello status di:", order?.status, order);
      continue;
    }

    orders.push(order);
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
      { ...val, orderAction: getOrderAction[`${val.status}#${val.shipmentType}`]}
    ]
  }, []);


  console.log(formattedData, PTVSchema);

  await writeXlsxFile(formattedData, {
    schema: PTVSchema,
    fileName: `ROSTExport-${Date.now()}.xlsx`,
    sheet: 'OrderImport'
  })
}