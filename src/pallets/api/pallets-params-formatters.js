import { capitalize } from "../../globals/libs/helpers";

/* 
  * Utility for generate filter variables which will be run in gql
*/
const dataFiltersGenerator = (filters) => {
  let dataFilters = [];

  // Carrier validation
  if(filters?.carrierValidation) {
    dataFilters.push({
    id: "carrierValidation",
      value: filters.carrierValidation,
      operation: "eq"
    });
  }

  // Customer validation
  if(filters?.customerValidation) {
    dataFilters.push({
    id: "customerValidation",
      value: filters.customerValidation,
      operation: "eq"
    });
  }

  // Quantity load
  // if(filters?.loadFrom && filters?.loadTo) {
  //   dataFilters.push({
  //     id: "loadQuantity",
  //     value: [filters.loadFrom, filters.loadTo],
  //     operation: "between"
  //   });
  // }

  // Quantity unload
  // if(filters?.unloadFrom && filters?.unloadTo) {
  //   dataFilters.push({
  //     id: "unloadQuantity",
  //     value: [filters.unloadFrom, filters.unloadTo],
  //     operation: "between"
  //   });
  // }

  // Quantity reversal
  if(filters?.reversalFrom && filters?.reversalTo) {
    dataFilters.push({
      id: "reversalQuantity",
      value: [filters.reversalFrom, filters.reversalTo],
      operation: "between"
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

// For basic query Company / Date
const generateMovementsByCompanyDateSortKey = (data, keyString) => {
  return {
    [keyString]: {
      between: data.operationDate.map(ocd => ocd)
    }
  }
}; 

// For advanced query Type / Company / Date
const generatePalletHandlingsSortKey = (data) => {
  const sortBy = ["type", "carrierName", "customerName", "travelStamp", "operationDate"];
  const data_input = Object.keys(data);
  const sorted = data_input.sort((a,b) => sortBy.indexOf(a) - sortBy.indexOf(b));

  const keyString = sorted
  .reduce((acc, val, index) => index === 0 
    ? acc.concat(val)
    : acc.concat(capitalize(val)),
  "");

  return {
    [keyString]: {
      between: data.operationDate.map(ocd => ({
      ...data,
        operationDate: ocd,
      }))
    }
  }
}; 


/* Format params before queries */
// Fetch list ----------------------------------------------------------------------------------------------------

/*
  * Default queries
    1. Carrier
    2. Customer
*/

// 1.
export function formatParamsPalletHandlingsByCarrier(params) {
  const sortKey = generateMovementsByCompanyDateSortKey(params, "operationDate");
  let dataToReturn = {
    carrierId: params.carrierId,
    ...sortKey,
    limit: params.limit,
    nextToken: params?.nextToken
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  // Return
  return dataToReturn;
}

// 2.
export function formatParamsPalletHandlingsByCustomer(params) {
  const sortKey = generateMovementsByCompanyDateSortKey(params, "operationDate");
  let dataToReturn = {
    customerId: params.customerId,
    ...sortKey,
    limit: params.limit,
    nextToken: params.nextToken
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };
  
  // Return
  return dataToReturn;
}

/*
  * Company queries
    1. Carrier search customer
    2. Carrier search customer when is reversal
    3. Customer search carrier
    3. Customer search carrier when is reversal
*/
// 1.
export function formatParamsPalletHandlingsByCarrierCustomer(params) {
  if(!params)  return {};
  let dataToReturn = {
    companyId: params.companyId,
    customerId: params.customerId,
    start: params.start,
    end: params.end,
    limit: params.limit
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  // Return
  return dataToReturn;
}

// 2.
export function formatParamsPalletHandlingsByCarrierReversal(params) {
  if(!params)  return {};
  let dataToReturn = {
    companyId: params.companyId,
    reversalId: params.customerId,
    start: params.start,
    end: params.end,
    limit: params.limit
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  // Return
  return dataToReturn;
}

// 3.
export function formatParamsPalletHandlingsByCustomerCarrier(params) {
  if(!params)  return {};
  let dataToReturn = {
    companyId: params.companyId,
    carrierId: params.carrierId,
    start: params.start,
    end: params.end,
    limit: params.limit
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  // Return
  return dataToReturn;
}

// 4.
export function formatParamsPalletHandlingsByCustomerReversal(params) {
  if(!params)  return {};
  let dataToReturn = {
    companyId: params.companyId,
    reversalId: params.carrierId,
    start: params.start,
    end: params.end,
    limit: params.limit
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  // Return
  return dataToReturn;
}

// 5.
export function formatParamsPalletHandlingsByReversalCustomer(params) {
  if(!params)  return {};
  let dataToReturn = {
    companyId: params.carrierId,
    reversalId: params.companyId,
    start: params.start,
    end: params.end,
    limit: params.limit
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  // Return
  return dataToReturn;
}

/*
  * Type queries
    1. From Carrier
    2. From Customer
*/
// 1.
export function formatParamsPalletHandlingsByCarrierType(params) {
  const sortKey = generatePalletHandlingsSortKey({
    type: params.type,
    operationDate: params.operationDate
  });

  
  let dataToReturn = {
    carrierId: params.carrierId,
    ...sortKey,
    limit: params.limit,
    nextToken: params.nextToken
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  // Return
  return dataToReturn;
}

// 2.
export function formatParamsPalletHandlingsByCustomerType(params) {
  const sortKey = generatePalletHandlingsSortKey({
    type: params.type,
    operationDate: params.operationDate
  });
  
  let dataToReturn = {
    customerId: params.customerId,
    ...sortKey,
    limit: params.limit,
    nextToken: params.nextToken
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  // Return
  return dataToReturn;
}

/*
  * Travel queries
    1. From Carrier
    2. From Customer
*/

// 1.
export function formatParamsPalletHandlingsByCarrierTravel(params) {
  console.log("leggiamo params...", params);

  const sortKey = generatePalletHandlingsSortKey({
    travelStamp: params.travelStamp,
    operationDate: params.operationDate
  });
    
  let dataToReturn = {
    carrierId: params.carrierId,
    ...sortKey,
    limit: params.limit,
    nextToken: params.nextToken
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  // Return
  return dataToReturn;
}

// 2.
export function formatParamsPalletHandlingsByCustomerTravel(params) {
  const sortKey = generatePalletHandlingsSortKey({
    travelStamp: params.travelStamp,
    operationDate: params.operationDate
  });

  let dataToReturn = {
    customerId: params.customerId,
    ...sortKey,
    limit: params.limit,
    nextToken: params.nextToken
  }

  // Filter generation
  const filter = dataFiltersGenerator(params.filters);
  if(filter) dataToReturn = { ...dataToReturn, filter };

  // Return
  return dataToReturn;
}

// Create item ----------------------------------------------------------------------------------------------------
const getPalletHandlingType = ({
  load,
  unload,
  reversal
}) => {
  let result = "TRADE";
  if(!load && !unload && reversal) result = "REVERSAL";
  if((load || unload) && reversal) result = "REVERSAL_TRADE";
  return result;
}

export function formatParamsCreatePalletHandling(pallet) {
  const dataToSend = {
    id: pallet.id,
    stamp: pallet.stamp,
    carrierId: pallet.carrier.id,
    tenantCarrier: pallet.carrier.tenant,
    carrierName: pallet.carrier.name,
    customerId: pallet.customer.id,
    tenantCustomer: pallet.customer.tenant,
    customerName: pallet.customer.name,
    reversalId: pallet?.reversal?.company?.id || "NO_REVERSAL",
    reversalName: pallet?.reversal?.name,
    tenantReversal: pallet?.reversal?.company?.owner,
    operationDate: pallet.operationDate,
    loadQuantity: pallet.loadQuantity,
    loadNote: pallet.loadNote,
    disposableLoad: pallet.disposableLoad,
    disposableLoadNote: pallet.disposableLoadNote,
    unloadQuantity: pallet.unloadQuantity,
    unloadNote: pallet.unloadNote,
    disposableUnload: pallet.disposableUnload,
    disposableUnloadNote: pallet.disposableUnloadNote,
    reversalQuantity: pallet?.reversal?.value || 0,
    reversalNote: pallet?.reversal?.note || "",
    palletHandlingRefId: pallet?.palletHandlingRefId,
    travelId: pallet.travel.id,
    travelStamp: pallet.travel.stamp,
    waypoint: {
      id: pallet.waypoint.id,
      orders: pallet.waypoint.orders,
      companyName: pallet.waypoint.companyName,
      companyId: pallet.waypoint.companyId,
      tenantCompany: pallet.waypoint.tenantCompany,
      checkpoint: pallet.waypoint.checkpoint,
      estimatedLength: pallet.waypoint.estimatedLength,
      estimatedTime: pallet.waypoint.estimatedTime,
    },
    carrierOperatorName: pallet.travel.driverName?.toLowerCase(),
    carrierOperator: pallet.travel.driver,
    type: getPalletHandlingType({ 
      load: pallet.loadQuantity,
      unload: pallet.unloadQuantity,
      reversal: pallet?.reversal?.value || 0
    }),
    vehicleLicensePlate: pallet.travel.licensePlate,
    vehicleOperator: {
      licensePlate: pallet.travel.licensePlate,
      name: pallet.travel.vehicleName
    },
    status: "BOOKED",
    carrierValidation: pallet?.adminValidation ? "VERIFIED" : "NOT_DECLARED",
    carrierValidatorName: pallet?.adminValidator?.name?.toLowerCase(),
    carrierValidator: pallet?.adminValidator || null,
    carrierValidationMessage: pallet.note,
    isVoucher: pallet?.image ? true : false,
    voucherImage: pallet?.image?.db_format,
    files: pallet?.files?.length > 0 
      ? pallet.files.map(fileElement => fileElement.db_format) 
      : [],
    log: pallet.log,
  }

  return {
    input: dataToSend
  }
}

export function formatParamsCreateReversal(pallet) {
  console.log("ma perche", { pallet });


  const dataToSend = {
    id: pallet.id,
    stamp: pallet?.palletHandlingRef?.stamp
      ? pallet.palletHandlingRef.stamp
      : pallet.stamp,
    carrierId: pallet?.carrier?.id 
      ? pallet.carrier.id 
      : pallet?.palletHandlingRef?.carrierId
        ? pallet?.palletHandlingRef?.carrierId
        : "NO_COMPANY",
    tenantCarrier: pallet?.carrier?.tenant 
      ? pallet.carrier.tenant 
      : pallet?.palletHandlingRef?.tenantCarrier
        ? pallet?.palletHandlingRef?.tenantCarrier
        : "NO_COMPANY",
    carrierName: pallet?.carrier?.name 
      ? pallet.carrier.name 
      : pallet?.palletHandlingRef?.carrierName
        ? pallet.palletHandlingRef.carrierName
        : "NO_COMPANY",
    customerId: pallet?.customer?.id 
      ? pallet.customer.id 
      : pallet?.palletHandlingRef?.customerId
        ? pallet?.palletHandlingRef?.customerId
        : "NO_COMPANY",
    tenantCustomer: pallet?.customer?.tenant 
      ? pallet.customer.tenant 
      : pallet?.palletHandlingRef?.tenantCustomer
        ? pallet?.palletHandlingRef?.tenantCustomer
        : "NO_COMPANY",
    customerName: pallet?.customer?.name 
      ? pallet.customer.name 
      : pallet?.palletHandlingRef?.customerName
        ? pallet.palletHandlingRef.customerName
        : "NO_COMPANY",
    reversalId: pallet.reversal.company.id,
    tenantReversal: pallet.reversal.company.owner,
    reversalName: pallet.reversal.name,
    operationDate: pallet.operationDate,
    reversalQuantity: pallet.reversal.value,
    reversalNote: pallet?.reversal?.note || "",
    palletHandlingRefId: pallet?.palletHandlingRef?.id || "",
    travelId: pallet?.palletHandlingRef?.travelId ||  "NO_TRAVEL",
    travelStamp: pallet?.palletHandlingRef?.travelStamp || "NO_TRAVEL",
    type: getPalletHandlingType({ 
      load: 0,
      unload: 0,
      reversal: pallet.reversal.value
    }),
    status: "BOOKED",
    carrierValidation: pallet?.adminValidation ? "VERIFIED" : "NOT_DECLARED",
    carrierValidatorName: pallet?.adminValidator?.name?.toLowerCase(),
    carrierValidator: pallet?.adminValidator || null,
    carrierValidationMessage: pallet.note,
    isVoucher: pallet?.image ? true : false,
    voucherImage: pallet?.image?.db_format,
    files: pallet?.files?.length > 0 
      ? pallet.files.map(fileElement => fileElement.db_format) 
      : [],
    log: pallet.log,
  }

  return {
    input: dataToSend
  }
}

// Update item ----------------------------------------------------------------------------------------------------
export const formatParamsUpdatePalletHandling = (params) => {
  const fieldsToUpdate = Object.keys(params).filter(key => key !== "validation");
  let input = fieldsToUpdate.reduce((acc, val) => ({
    ...acc,
    [val]: params[val]
  }), {});

  if(fieldsToUpdate.includes("voucherImage")) {
    input.voucherImage = params.voucherImage?.db_format;
  }

  if(fieldsToUpdate.includes("files")) {
    input.files = params.files.filter(file => !file.hasOwnProperty("keyToRemove")).map(file => file.db_format)
  }

  console.log("input che mando", input);
  return { input }
}
