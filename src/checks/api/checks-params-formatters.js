import { capitalize } from "../../globals/libs/helpers";
import { encodeCheckId } from "../libs/helpers";

/* 
  * Utility for generate filter variables which will be run in gql
*/
const dataFiltersGenerator = (filters) => {
  let dataFilters = [];

  // Amount
  if(filters?.amountRange) {
    if(!filters.amountRange.some(amount => !amount)) {
      dataFilters.push({
        id: "amount",
        value: filters.amountRange.map(am => parseFloat(am)),
        operation: "between"
      });
    }
  }

  // Doc num
  if(filters?.docNum) {
    dataFilters.push({
      id: "keyDocNum",
      value: filters.docNum.toUpperCase(),
      operation: "eq"
    });
  }

  // Order stamp
  if(filters?.orderStamp) {
    dataFilters.push({
      id: "orderStamp",
      value: `ORD-${filters.orderStamp.toUpperCase()}`,
      operation: "beginsWith"
    });
  }

  // Return formatted filters
  return dataFilters.length !== 0
    ? dataFilters.reduce((acc, filter) => ({
      ...acc,
      [filter.id]: {[filter.operation]: filter.value }
    }), {})
    : null;
}

/* 
  * Utility to generate sort keys dynamically
*/
const generateChecksSortKey = (data) => {
  const sortBy = ["status", "senderName", "receiverName", "orderCreationDate"];
  const data_input = Object.keys(data);
  const sorted = data_input.sort((a,b) => sortBy.indexOf(a) - sortBy.indexOf(b));

  const keyString = sorted
  .reduce((acc, val, index) => index === 0 
    ? acc.concat(val)
    : acc.concat(capitalize(val)),
  "");

  return {
    [keyString]: {
      between: data.orderCreationDate.map(ocd => ({
        status: data.status.toUpperCase(),
        ...data,
        orderCreationDate: ocd,
      }))
    }
  }
}; 

/* Format params before queries */
// Fetch list ----------------------------------------------------------------------------------------------------
export function formatParamsChecksByTenant(params, key) {
  const sortKey = generateChecksSortKey(params.sortKey);
  let dataToReturn = {
    [key]: params[key],
    ...sortKey,
    limit: params.limit,
    nextToken: params.nextToken
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  console.log("dataToReturn: ", { dataToReturn });

  // Return
  return dataToReturn;
}

// Controllare se questa funzione è in uso da qualche parte:
export function formatParamsChecksByOrder(orderId) {
  return {
    orderId
  }
}

// Get item ----------------------------------------------------------------------------------------------------
export function formatGetCheckById(id) {
  return { id }
}

// Create item ----------------------------------------------------------------------------------------------------
export function formatParamsCreateCheck(params) {
  console.log('Siamo nel format: ', { params });

  return {
    input: {
      id: params.id,
      stamp: params.stamp,
      orderCreationDate: params.order.createdAt,
      orderId: params.order.id,
      orderStamp: params.order.stamp,
      keyDocNum: params.keyDocNum,
      docsRef: params.docsRef.map(docRef => ({
        date: docRef.date,
        number: docRef.number,
        files: docRef?.files || null,
        type: docRef.type
      })),
      receiverId: params.order.receiverId,
      senderId: params.order.senderId,
      carrierId: params.order.carrierId,
      tenantReceiver: params.order.tenantReceiver,
      tenantSender: params.order.tenantSender,
      tenantCarrier: params.order.tenantCarrier,
      receiverName: params.order.receiverName,
      senderName: params.order.senderName,
      carrierName: params.order.carrierName,
      beneficiary: params.beneficiary,
      issuingDate: params.issuingDate,
      pickupDate: params.pickupDate,
      checkInDate: params.checkInDate,
      checkOutDate: params.checkOutDate,
      deliveryDate: params.deliveryDate,
      expiration: params.expiration,
      checkNum: params.checkNum,
      amount: isNaN(parseFloat(params.amount)) 
        ? parseFloat(0)
        : parseFloat(params.amount.replace(/,/g, '.')),
      iban: params.iban,
      log: params.log,
      status: params.status,
      image: params.image?.db_format || null,
      files: params.files?.length > 0 ? params.files.map(file => file.db_format) : [],
      note: params.note,
    }
  }
}

// Update item ----------------------------------------------------------------------------------------------------
export function formatParamsUpdateCheck(params) {
  const fieldsToUpdate = Object.keys(params).filter(key => key !== "validation");
  let input = fieldsToUpdate.reduce((acc, val) => ({
    ...acc,
    [val]: params[val]
  }), {});

  // Reformat some particular fields
  if(fieldsToUpdate.includes("docsRef")) {
    input.docsRef = params.docsRef.map(docRef => ({
      date: docRef.date,
      number: docRef.number,
      files: docRef?.files || null,
      type: docRef.type
    }))
  }

  if(fieldsToUpdate.includes("amount")) {
    input.amount = isNaN(parseFloat(params.amount)) 
      ? parseFloat(0)
      : parseFloat(params.amount.replace(/,/g, '.'))
  }

  if(fieldsToUpdate.includes("image")) {
    input.image = params.image?.db_format;
  }

  if(fieldsToUpdate.includes("files")) {
    input.files = params.files.filter(file => !file.hasOwnProperty("keyToRemove")).map(file => file.db_format)
  }

  console.log("input che mando", input);
  return { input }
}

// Remove item ----------------------------------------------------------------------------------------------------
export function formatRemoveCheckById(id) {
  return { input: { id }}
}