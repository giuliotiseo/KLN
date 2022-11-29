import { API, graphqlOperation } from "aws-amplify";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { exposeTenantRecord, formatWindowsToDynamoDb, generateFileObj, generateLegacyLogList } from "../../globals/libs/helpers";
import { formatLocationCoords } from "../../warehouses/libs/helpers";
import { ORDER_STATUS_DESCRIPTION, STANDARD_DIMENSIONS } from "../libs/helpers";
import { validateOrderCreation } from "../libs/validations";
import { UPDATE_ORDER } from "./graphql/mutations";

// Update carrier from status
export async function updateOrder(order, validityCheck = true) {
  let tenants = {
    tenantCarrier: order.carrier?.tenant || order.carrier?.tag || order.tenantCarrier || `local:${order.carrier.id}`,
    tenantSender: order.sender?.tenant || order.sender?.tag || order.tenantSender || `local:${order.sender.id}`,
    tenantReceiver: order.receiver?.tenant || order.receiver?.tag || order.tenantReceiver || `local:${order.receiver.id}`
  };

  /* 
    Convert files to DynamoDB format
    To do: occorre sviluppare l'aggiornamento dei documenti
  */
  // let dynamoDocs = [];
  // for(let i = 0; i < order.docs.length; i++) {
  //   let dynamoDocsFiles = [];
  //   for(let file of order.docs[i].files) {
  //     const fileObj = await generateFileObj(file.filename, file.fileType);
  //     dynamoDocsFiles.push(fileObj);
  //   }

  //   dynamoDocs.push({...order.docs[i], files: dynamoDocsFiles });
  // }

  console.log("Order", order);

  let dataToSend = {
    id: order.id,
    stamp: order.stamp,
    name: order.name,
    preOrderId: order.preOrderId,
    tenantCarrier: exposeTenantRecord(tenants.tenantCarrier),
    tenantSender: exposeTenantRecord(tenants.tenantSender),
    tenantReceiver: exposeTenantRecord(tenants.tenantReceiver),
    createdAt: order.createdAt,
    completedAt: order?.completedAt ? new Date(order.completedAt).toISOString() : new Date(0).toISOString(),
    carrierName: order.carrier.name,
    senderName: order.sender.name,
    receiverName: order.receiver.name,
    senderVat: order.senderVat,
    carrierVat: order.carrierVat,
    receiverVat: order.receiverVat,
    paymentCondition: order.paymentCondition,
    shipmentType: order.shipmentType,
    pickupCheckpoint: {
      warehouseId: order.pickup.checkpoint?.warehouseId,
      extId: order.pickup.checkpoint?.extId,
      name: order.pickup.checkpoint.name,
      contacts: order.pickup.checkpoint.contacts,
      windows: formatWindowsToDynamoDb(order.pickup?.checkpoint?.windows),
      maxLength: order.pickup.checkpoint?.maxLength,
      enabledVehicles: order.pickup.checkpoint?.enabledVehicles,
      tools: order.pickup.checkpoint?.tools,
      note: order.pickup.checkpoint.note,
      location: {
        ...order.pickup.checkpoint.location, 
        coordinate: order.pickup.checkpoint?.location?.coordinate ? formatLocationCoords(order.pickup.checkpoint.location.coordinate) : null
      }
    },
    pickupDateStart: order.pickup.start,
    pickupDateEnd: order.pickup.end,
    pickupSlots: [{ from: order.pickup.start, to: order.pickup.end }],
    pickupAddress: order.pickup.checkpoint.location.address.toLowerCase(),
    deliveryCheckpoint: {
      warehouseId: order.delivery.checkpoint?.warehouseId,
      extId: order.delivery.checkpoint?.extId,
      name: order.delivery.checkpoint.name,
      contacts: order.delivery.checkpoint.contacts,
      windows: formatWindowsToDynamoDb(order.delivery?.checkpoint?.windows),
      maxLength: order.delivery.checkpoint?.maxLength,
      enabledVehicles: order.delivery.checkpoint?.enabledVehicles,
      tools: order.delivery.checkpoint?.tools,
      note: order.delivery.checkpoint.note,
      location: {
        ...order.delivery.checkpoint.location, 
        coordinate: order.delivery.checkpoint?.location?.coordinate ? formatLocationCoords(order.delivery.checkpoint.location.coordinate) : null
      }
    },
    deliveryDateStart: order.delivery.start,
    deliveryDateEnd: order.delivery.end,
    deliverySlots: [{ from: order.delivery.start, to: order.delivery.end }],
    deliveryAddress: order.delivery.checkpoint.location.address.toLowerCase(),
    availability: { from: new Date(), to: order.delivery.end },
    status: order.status,
    collectChecks: order.collectChecks,
    checksAmount: order.checksAmount ? parseFloat(order.checksAmount) : null,
    orderNumber: order.orderNumber.toUpperCase(),
    trades: order.trades,
    support: order.support,
    warnings: order.warnings,
    quantity: parseInt(order.quantity),
    size: STANDARD_DIMENSIONS[order.support][order.size].text,
    temperature: parseFloat(order.temperature),
    loadingMeter: parseFloat(order.loadingMeter),
    grossWeight: parseFloat(order.grossWeight),
    netWeight: parseFloat(order.netWeight),
    packages: parseInt(order.packages),
    perishable: order.perishable,
    stackable: order.stackable,
    palletInfo: [].concat.apply([], Object.keys(order.palletInfo).map(p => order.palletInfo[p])).map(plt => ({
        value: plt.value,
        type: plt.type,
        size: plt.size,
        system: plt.system
      }
    )),
    customer: order.customer,
    lastPosition: order.pickup.checkpoint?.location 
      ? ({
          ...order.pickup.checkpoint.location,
          coordinate: formatLocationCoords(order.pickup.checkpoint.location.coordinate)
        }) 
      : null,
    note: order.note
  }

  // Se fornisco le info di deposito dell'ordine
  if(order?.depot?.checkpoint?.name && order?.depot?.start && order?.depot?.end) {
    dataToSend = {
      ...dataToSend,
      depotCheckpoint: {
        warehouseId: order.depot.checkpoint?.warehouseId,
        extId: order?.depot?.checkpoint?.extId || v4(),
        name: order.depot.checkpoint.name,
        contacts: order.depot.checkpoint.contacts,
        windows: formatWindowsToDynamoDb(order.depot?.checkpoint?.windows),
        maxLength: order.depot.checkpoint?.maxLength,
        enabledVehicles: order.depot.checkpoint?.enabledVehicles,
        tools: order.depot.checkpoint?.tools,
        note: order.depot.checkpoint.note,
        location: {
          ...order.depot.checkpoint.location, 
          coordinate: order.depot.checkpoint?.location?.coordinate ? formatLocationCoords(order.depot.checkpoint.location.coordinate) : null
        }
      },
      depotDateStart: order.depot.start,
      depotDateEnd: order.depot.end,
      depotSlots: [{ from: order.depot.start, to: order.depot.end }],
      depotAddress: order.depot.checkpoint.location.address.toLowerCase(),
    }
  }

  // Generate logs stack
  const log = await generateLegacyLogList({
    list: order.log,
    action: 'Aggiornamento dall\'editor',
    subject: `${order.name}`
  });

  // Validate all data fields
  if(validityCheck) {
    const { errors } = validateOrderCreation(dataToSend);
    console.log('Risultato validazione', validityCheck);
    if(!validityCheck) {
      toast.error("Procedura di aggiornamento ordine annullata");
      console.error('Validity check failed from update.js - order', { result: validityCheck, data: order });
      return null;
    }

    if(errors.length > 0) {
      for(let i = 0; i < errors.length; i++) {
        toast.error(errors[i].text);
      }

      throw new Error("Update process canceled");
    }
  }

  // Update pre-order carrier inside ddb
  try {
    const res = await API.graphql(graphqlOperation(UPDATE_ORDER, {
      input: {
        ...dataToSend,
        log
      }
    }));

    return { result: res?.data?.updateOrder };
  } catch (err) {
    console.log('Errore aggiornamento status ordine', err);
    throw new Error('Error while updating status order', err);
  }
}

// Update status from carrier
export async function updateOrderStatus(order, origin) {
  let tenants = {
    tenantCarrier: order.carrier?.tenant || order.carrier?.tag || order.tenantCarrier || `local:${order.carrier.id}`,
    tenantSender: order.sender?.tenant || order.sender?.tag || order.tenantSender || `local:${order.sender.id}`,
    tenantReceiver: order.receiver?.tenant || order.receiver?.tag || order.tenantReceiver || `local:${order.receiver.id}`
  };

  console.log("Verifica order - 0", {order, origin});

  const log = await generateLegacyLogList({
    list: order.log,
    action: 'Aggiornamento',
    subject: `status di ${order.stamp} a "${ORDER_STATUS_DESCRIPTION[order.status].toLowerCase()}" dal dominio di ${order.carrierName}`
  });

  // Update order status inside ddb
  try {
    const res = await API.graphql(graphqlOperation(UPDATE_ORDER, {
      input: {
        id: order.id,
        stamp: order.stamp,
        name: order.name,
        preOrderId: order.preOrderId,
        completedAt: order?.completedAt ? new Date(order.completedAt).toISOString() : new Date(0).toISOString(),
        tenantReceiver: exposeTenantRecord(tenants.tenantReceiver),
        tenantSender: exposeTenantRecord(tenants.tenantSender),
        tenantCarrier: exposeTenantRecord(tenants.tenantCarrier),
        carrierName: order.carrierName,
        senderName: order.senderName,
        receiverName: order.receiverName,
        senderVat: order.senderVat,
        carrierVat: order.carrierVat,
        receiverVat: order.receiverVat,
        createdAt: order.createdAt,
        shipmentType: order.shipmentType,
        pickupDateStart: order.pickupDateStart,
        deliveryDateStart: order.deliveryDateStart,
        status: order.status,
        log
      }}
    ));

    console.log('Aggiornamento status ordine', order);

    return { result: res?.data?.updateOrder, origin };
  } catch (err) {
    console.log('Errore aggiornamento status ordine', err);
    throw new Error('Error while updating status order', err);
  }
}