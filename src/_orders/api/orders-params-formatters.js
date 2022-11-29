/* Format params before queries */

/* 
  * Utility for generate filter variables which will be run in gql
*/

const dataFiltersGenerator = (inputFilter) => {
  let dataFilters = [];

  if(inputFilter?.stamp) {
    dataFilters.push({
      id: "status",
      value: inputFilter.status.toUpperCase(),
      operation: "eq"
    });
  }

  // PickupDateStart
  if(inputFilter?.stamp) {
    dataFilters.push({
      id: "stamp",
      value: `ORD-${inputFilter.stamp}`,
      operation: "beginsWith"
    });
  }

  if(inputFilter?.pickupDateStart && !inputFilter?.pickupDateStart.includes(null)) {
    dataFilters.push({
      id: "pickupDateStart",
      value: [inputFilter.pickupDateStart[0], inputFilter.pickupDateStart[1]],
      operation: "between"
    });
  }

  // DeliveryDateStart
  if(inputFilter?.deliveryDateStart && !inputFilter?.deliveryDateStart.includes(null)) {
    dataFilters.push({
      id: "deliveryDateStart",
      value: [inputFilter.deliveryDateStart[0], inputFilter.deliveryDateStart[1]],
      operation: "between"
    });
  }

  // ShipmentType
  if(inputFilter.shipmentType !== "ALL") {
    dataFilters.push({
      id: "shipmentType",
      value: inputFilter.shipmentType,
      operation: "eq"
    });
  }

  // Quantity
  if(inputFilter?.quantity && !inputFilter?.quantity.includes("")) {
    dataFilters.push({
      id: "quantity",
      value: inputFilter.quantity,
      operation: "between"
    });
  }

  // SenderName
  if(inputFilter?.senderName) {
    dataFilters.push({
      id: "senderName",
      value: inputFilter.senderName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  // CarrierName
  if(inputFilter?.carrierName) {
    dataFilters.push({
      id: "carrierName",
      value: inputFilter.carrierName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  // ReceiverName
  if(inputFilter?.receiverName) {
    dataFilters.push({
      id: "receiverName",
      value: inputFilter.receiverName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  // PickupAddress
  if(inputFilter?.pickupAddress) {
    dataFilters.push({
      id: "pickupAddress",
      value: inputFilter.pickupAddress.toLowerCase(),
      operation: "contains"
    });
  }

  // DeliveryAddress
  if(inputFilter?.deliveryAddress) {
    dataFilters.push({
      id: "deliveryAddress",
      value: inputFilter.deliveryAddress.toLowerCase(),
      operation: "contains"
    });
  }

  // DepotAddress
  if(inputFilter?.depotAddress) {
    dataFilters.push({
      id: "depotAddress",
      value: inputFilter.depotAddress.toLowerCase(),
      operation: "contains"
    });
  }

  return dataFilters;
}

// Fetch list ----------------------------------------------------------------------------------------------------
export function formatParamsOrdersByTenant(params, key) {
  return {
    [key]: params[key],
    statusOrderCreationDate:{
      between: params.statuses
    },
    filter: params?.filter,
    limit: params?.limit,
    nextToken: params?.nextToken 
  }
}

export function formatParamsOrdersByTenantCreatedAt(params, key) {
  let generatedFilter = {}
  let query = {
    [key]: params[key],
    createdAt:{
      between: params.createdAt
    },
    // filter: params.filter,
    limit: params?.limit,
    nextToken: params?.nextToken 
  }
  
  if(params?.filter) {
    let filterFields = dataFiltersGenerator(params.filter);
    if(filterFields.length > 0) {
      generatedFilter = filterFields.reduce((acc, filter) => ({
        ...acc,
        [filter.id]: {[filter.operation]: filter.value }
      }), {});
    }

    // // Exclude status passed in filter (used for travel)
    if(params?.filter?.status?.length > 0) {
      generatedFilter = { ...generatedFilter, and: [] };
      for(let i = 0; i < params.filter.status.length; i++) {
        generatedFilter.and.push({
          status: { ne: params.filter.status[i].toUpperCase() }
        });
      }
    }
  }

  if(Object.keys(generatedFilter)?.length > 0) query.filter = generatedFilter;
  return query;
}

// Get item ----------------------------------------------------------------------------------------------------


// Create item ----------------------------------------------------------------------------------------------------


// Update item ----------------------------------------------------------------------------------------------------


// Remove item ----------------------------------------------------------------------------------------------------
