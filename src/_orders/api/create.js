import { API, graphqlOperation, Storage } from "aws-amplify";
import { formatISO } from "date-fns";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { GET_TENANT_BY_VATNUMBER } from "../../company/api/graphql/queries";
import { UPDATE_CONTACT } from "../../contacts/api/graphql/mutations";
import { capitalize, consoleInfo, consoleSuccess, exposeTenantRecord, formatWindowsToDynamoDb, generateFileObj, generateLegacyLogList, generateUid, tagVatMixer } from "../../globals/libs/helpers";
import { encodePreOrderId } from "../../preOrders/libs/helpers";
import { formatLocationCoords } from "../../warehouses/libs/helpers";
import { encodeOrderId, STANDARD_DIMENSIONS } from "../libs/helpers";
import { validateOrderCreation } from "../libs/validations";
import { CREATE_ORDER } from "./graphql/mutations";

export async function createOrder(order, displayToast = true, mode, validityCheck = true) {
  const roles = ["sender", "carrier", "receiver"];
  let {
    preOrderId: inputPreOrderId,
    pickup, delivery,
    sender, carrier, receiver,
    paymentCondition,
    shipmentType,
    orderNumber,
    collectChecks,
    trades,
    support, warnings, quantity, size, 
    temperature, loadingMeter, grossWeight, netWeight, packages, perishable, stackable,
    palletInfo,
    customer,
    note
  } = order;

  let oppositeCompanies = roles.filter(role => role !== mode);
  let tenants = {
    tenantCarrier: carrier?.tenant || carrier?.tag,
    tenantSender: sender?.tenant || sender?.tag,
    tenantReceiver: receiver?.tenant || receiver?.tag
  };

  /* 
    Loop: verifications and indirect updates of granular data (typename: Contact)
    Nello snippet sottotante vado ad eseguire un check sulle aziende clienti per accertarmi della presenza del tenant.
    Il caso in esame è quello in cui vado ad inserire un ordine basandomi su un dato registrato in rubrica, che però non risulta aggiornato
    con le informazioni in rete. Questa discrepanza causerebbe l'invio di un ordine privo del tenant cliente, nonostante quest'ultimo sia 
    regolarmente registrato. La verifica consiste in una ricerca dell'azienda e l'eventuale aggiornamento del contatto in rubrica, andando a
    modificare anche quello che è il dato del relativo tenant all'interno dell'ordine.
  */
  for (let oppositeCompany of oppositeCompanies) {
    let playableOrder = {...order[oppositeCompany]};

    if(playableOrder?.tenant) {
      playableOrder.tag = playableOrder.tenant;
    }

    if(!playableOrder?.tag) {
      const getTenantResult = await API.graphql(graphqlOperation(GET_TENANT_BY_VATNUMBER, { vatNumber: playableOrder.vatNumber }));
      const tag = getTenantResult.data.companyByVatNumber.items[0]?.tag;
      tenants[`tenant${capitalize(oppositeCompany)}`] =  getTenantResult?.data?.companyByVatNumber?.items?.length > 0 
        ? tag 
        : `local:${playableOrder.id}`;
     
      // Update contact tag in addressbook
      if(tag) {
        try {
          const indirectContactUpdate = await API.graphql(graphqlOperation(UPDATE_CONTACT, { input: { id: playableOrder.id, tag }}));
          consoleInfo('Aggiornamento indiretto tag contatto', indirectContactUpdate);
        } catch(err) {
          console.error('Impossible to run indirect update of contact tag');
        }
      }
    }
  }

  /* 
    Convert files to DynamoDB format
  */
  let dynamoDocs = [];
  for(let i = 0; i < order.docs.length; i++) {
    let dynamoDocsFiles = [];
    for(let file of order.docs[i].files) {
      const fileObj = await generateFileObj(file.filename, file.fileType);
      dynamoDocsFiles.push(fileObj);
    }

    dynamoDocs.push({...order.docs[i], files: dynamoDocsFiles });
  }

  /* 
    Prepare data to send
  */
  const uuid = generateUid();
  const timestamp = Date.now();
  const id =  await encodeOrderId({ sender, carrier, receiver, tenants, uuid, timestamp });
  const preOrderId = inputPreOrderId
    ? inputPreOrderId
    : await encodePreOrderId({ prefix: "standalone:PRE", sender, carrier, receiver, tenants, uuid, timestamp })

  let dataToSend = {
    id,
    extId: v4(),
    // id: `ORD_${uuid}_${tagVatMixer(tenants.tenantSender, sender.vatNumber)}_${tagVatMixer(tenants.tenantCarrier, carrier.vatNumber)}_${tagVatMixer(tenants.tenantReceiver, receiver.vatNumber)}_${timestamp}`,
    stamp: `ORD-${uuid}`,
    name: `Ordine ${uuid}`,
    createdAt: new Date(timestamp).toISOString(),
    preOrderId,
    tenantCarrier: exposeTenantRecord(tenants.tenantCarrier),
    tenantSender: exposeTenantRecord(tenants.tenantSender),
    tenantReceiver: exposeTenantRecord(tenants.tenantReceiver),
    completedAt: new Date(0).toISOString(),
    carrierName: carrier.name,
    senderName: sender.name,
    receiverName: receiver.name,
    senderVat: sender.vatNumber,
    carrierVat: carrier.vatNumber,
    receiverVat: receiver.vatNumber,
    paymentCondition,
    shipmentType,
    pickupCheckpoint: {
      warehouseId: pickup.checkpoint?.warehouseId,
      extId: pickup?.checkpoint?.extId || v4(),
      name: pickup.checkpoint.name,
      contacts: pickup.checkpoint.contacts,
      windows: formatWindowsToDynamoDb(pickup?.checkpoint?.windows),
      maxLength: pickup.checkpoint?.maxLength,
      enabledVehicles: pickup.checkpoint?.enabledVehicles,
      tools: pickup.checkpoint?.tools,
      note: pickup.checkpoint.note,
      location: {
        ...pickup.checkpoint.location, 
        coordinate: pickup.checkpoint?.location?.coordinate ? formatLocationCoords(pickup.checkpoint.location.coordinate) : null
      }
    },
    pickupDateStart: pickup.start,
    pickupDateEnd: pickup.end,
    pickupSlots: [{ from: pickup.start, to: pickup.end }],
    pickupAddress: pickup.checkpoint.location.address.toLowerCase(),
    deliveryCheckpoint: {
      warehouseId: delivery.checkpoint?.warehouseId,
      extId: delivery.checkpoint?.extId || v4(),
      name: delivery.checkpoint.name,
      contacts: delivery.checkpoint.contacts,
      maxLength: delivery.checkpoint?.maxLength,
      enabledVehicles: delivery.checkpoint?.enabledVehicles,
      tools: delivery.checkpoint?.tools,
      note: delivery.checkpoint.note,
      windows: formatWindowsToDynamoDb(delivery?.checkpoint?.windows),
      location: {
        ...delivery.checkpoint.location, 
        coordinate: delivery.checkpoint?.location?.coordinate ? formatLocationCoords(delivery.checkpoint.location.coordinate) : null
      }
    },
    deliveryDateStart: delivery.start,
    deliveryDateEnd: delivery.end,
    deliverySlots: [{ from: pickup.start, to: pickup.end }],
    deliveryAddress: delivery.checkpoint.location.address.toLowerCase(),
    availability: { from: new Date(), to: pickup.end },
    status: "PENDING",
    collectChecks,
    checksAmount: order.checksAmount ? parseFloat(order.checksAmount) : null,
    orderNumber: orderNumber.toUpperCase(),
    trades,
    docs: dynamoDocs.map(doc => ({ ...doc, date: formatISO(new Date(doc.date), { representation: 'date' })})),
    support,
    warnings,
    quantity: parseInt(quantity),
    size: STANDARD_DIMENSIONS[support][size].text,
    temperature: parseFloat(temperature),
    loadingMeter: parseFloat(loadingMeter),
    grossWeight: parseFloat(grossWeight),
    netWeight: parseFloat(netWeight),
    packages: parseInt(packages),
    perishable,
    stackable,
    palletInfo: [].concat.apply([], Object.keys(palletInfo).map(p => palletInfo[p])).map(plt => ({
      value: plt.value,
      type: plt.type,
      size: plt.size,
      system: plt.system
    })),
    customer,
    lastPosition: pickup.checkpoint?.location 
      ? ({
          ...pickup.checkpoint.location,
          coordinate: formatLocationCoords(pickup.checkpoint.location.coordinate)
        }) 
      : null,
    note
  }

  // Generate logs stack
  dataToSend.log = await generateLegacyLogList({
    list: [],
    action: "Registrazione", 
    subject: `ordine ID: ${uuid}, mittente: ${sender.name}, trasportatore: ${carrier.name}, destinatario: ${receiver.name}`,
  }); 

  // Validate all data fields
  if(validityCheck) {
    const { errors } = validateOrderCreation(dataToSend);
    console.log('Risultato validazione', validityCheck);
    if(!validityCheck) {
      toast.error("Procedura di inserimento ordine annullata");
      console.error('Validity check failed from create.js - order', { result: validityCheck, data: order });
      return null;
    }

    if(errors.length > 0) {
      for(let i = 0; i < errors.length; i++) {
        toast.error(errors[i].text);
      }

      throw new Error("Creation process canceled");
    }
  }

  // Save order entry inside ddb
  let result;
  try {
    console.log('Order to send:', dataToSend);
    result = await API.graphql(graphqlOperation(CREATE_ORDER, { input: dataToSend }));
    (displayToast && result?.data?.createOrder) && toast.success(`${result?.data?.createOrder.stamp} registrato con successo`);
  } catch (err) {
    toast.error('Non è stato possibile creare l\'ordine');
    console.error('[E] Error creating order:', err);
    throw new Error("Mutation failed (create.js): revoke order creation");
  }

  /* 
    Save all files on S3
  */
  if(order.docs.length > 0) {
    for(let doc of order.docs) {
      if(doc?.files?.length !== 0) {
        for (let file of doc.files) {
          let keyNameFile = file.filename;
          try {
            await Storage.put(keyNameFile, file.file, {
              level: 'protected',
              contentType: file.fileType
            });
            consoleSuccess('File saved on S3', file.file);
          } catch(err) {
            toast.error('Impossibile caricare l\'allegato sul server');
            console.error(err);
            throw new Error("Error while saving data on storage (order/create.js)");
          }
        }
      }
    }
  }

  return { result: result?.data?.createOrder, mode };
}


// Creation triggered from forwarding operation
export async function createFromForwardOrder(order, mode) {
  // let {
  //   id,
  //   name,
  //   stamp,
  //   tenantSender,
  //   senderName,
  //   tenantCarrier,
  //   carrierName,
  //   carrier,
  //   status,
  //   slot,
  //   vehicle,
  //   pickupDateStart,
  //   pickupDateEnd,
  //   shipmentType,
  //   deliveryAreas,
  //   deliveryRegions,
  //   perishable,
  //   checkpoint,
  //   trades,
  //   files,
  //   note
  // } = preOrder;

  // const oppositeCompany = mode === "sender" ? "carrier" : "sender";
  // let tenants = { tenantCarrier: null, tenantSender: null };

  // // Verifications and indirect updates of granular data (typename: Contact)
  // if(!preOrder[oppositeCompany]?.tag) {
  //   const getTenantResult = await API.graphql(graphqlOperation(GET_TENANT_BY_VATNUMBER, { vatNumber: preOrder[oppositeCompany].vatNumber }));
  //   const { tag } = getTenantResult.data.companyByVatNumber.items[0];
  //   tenants[`tenant${capitalize(oppositeCompany)}`] =  getTenantResult?.data?.companyByVatNumber?.items?.length > 0 
  //     ? tag 
  //     : `local:${preOrder[oppositeCompany].id}`;
   
  //   // Update contact tag in addressbook
  //   try {
  //     const indirectContactUpdate = await API.graphql(graphqlOperation(UPDATE_CONTACT, { input: { id: preOrder[oppositeCompany].id, tag }}));
  //     consoleInfo('Aggiornamento indiretto tag contatto', indirectContactUpdate);
  //   } catch(err) {
  //     console.error('Impossible to run indirect update of contact tag');
  //   }
    
  //   tenants[`tenant${capitalize(mode)}`] = preOrder[mode].tag;
  // } else {
  //   tenants.tenantCarrier = tenantCarrier;
  //   tenants.tenantSender = tenantSender;
  // }

  // let dataToSend = {
  //   id,
  //   stamp,
  //   name,
  //   tenantCarrier,
  //   tenantSender,
  //   carrierName,
  //   senderName,
  //   pickupDateStart,
  //   pickupDateEnd,
  //   status: PreOrderStatus.PENDING,
  //   opened: true,
  //   vehicle,
  //   slot,
  //   perishable,
  //   shipmentType,
  //   deliveryAreas,
  //   deliveryRegions,
  //   checkpoint,
  //   address: checkpoint.location.address,
  //   trades,
  //   files,
  //   note,
  // }

  // // Generate logs stack
  // dataToSend.log = await generateLegacyLogList({
  //   list: [],
  //   action: mode === "sender" ? `Invio` : `Inserimento`, 
  //   subject: `pre-ordine ${preOrder.stamp} attraverso operazione di reinoltro, mittente: ${preOrder.senderName}, trasportatore: ${carrier.name}`,
  // }); 

  // // Save pre-order entry inside ddb
  // let result;
  // try {
  //   result = await API.graphql(graphqlOperation(CREATE_PREORDER, { input: dataToSend }));
  // } catch (err) {
  //   toast.error('Non è stato possibile inoltrare il pre-ordine');
  //   console.error('[E] Error forwarding pre-order:', err);
  //   throw new Error("Mutation failed (create.js): revoke pre-order forwarding");
  // }

  // return { result: result?.data?.createPreOrder, mode };
}