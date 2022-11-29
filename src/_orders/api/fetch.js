import { API, graphqlOperation } from 'aws-amplify';

// Queries
import {
  GET_ORDER,
  LIST_ORDERS_BY_PREORDER,
  SEARCH_ORDERS_BY_CARRIER_STATUS_CREATEDAT,
  SEARCH_ORDERS_BY_RECEIVER_STATUS_CREATEDAT,
  SEARCH_ORDERS_BY_SENDER_STATUS_CREATEDAT,
} from "./graphql/queries";

// Helpers
import { capitalize, consoleFetch, dataNormalizer } from "../../globals/libs/helpers";

// Get specific order --------------------------------------------------------------------------------------------------------------------------------------------
export const getOrderById = async (id) => {
  let result = null;
  try {
    result = await API.graphql(graphqlOperation(GET_ORDER, { id }));
    console.log("Get order: ", result);
    result = result?.data?.getOrder;
  } catch(e) {
    console.error('Error:', e);
  }

  return result;
}


// Search orders for specific uses --------------------------------------------------------------------------------------------------------------------------------------------
export const searchOrdersByPreOrderId = async (preOrderId) => {
  let results = null;
  console.log("PreOrderId", preOrderId);
  
  try {
    results = await API.graphql(graphqlOperation(LIST_ORDERS_BY_PREORDER, { preOrderId }));
    results = results?.data?.ordersByPreOrderId;
    console.log('List orders by pre-order', { results });
  } catch(e) {
    console.error('Error:', e);
  }

  return dataNormalizer(results.items);
}

// Search orders for list component --------------------------------------------------------------------------------------------------------------------------------------------
export const searchOrders = async (allOptions) => {
  if(!allOptions.tenantType) return null;
  /* 
    * Build right structure with keys and filters for gql query
  */

  // Keys
  // partitionKey and clusteringKey_1 are fixed (because of routing)
  let partitionKey = `tenant${capitalize(allOptions.tenantType)}`;
  let clusteringKey_1 = `status`;
  let clusteringKey_2 =  "createdAt";
  let clusteringKey_3 = null;

  // Filters
  let dataFilters = dataFiltersGenerator(allOptions);
  const filter = dataFilters.length !== 0
    ? dataFilters.reduce((acc, filter) => ({
      ...acc,
      [filter.id]: {[filter.operation]: filter.value }
    }), {})
    : null;

  // Merge keys and filters inside `variables` object
  let compositeKey;
  if(clusteringKey_3) {
    compositeKey = `${clusteringKey_1}${capitalize(clusteringKey_2)}${capitalize(clusteringKey_3)}`;
  } else {
    compositeKey = `${clusteringKey_1}${capitalize(clusteringKey_2)}`;
  }

  let variables = queryVariablesGenerator(allOptions, { partitionKey, clusteringKey_1, clusteringKey_2, clusteringKey_3, compositeKey });
  if(filter) {
    variables = {...variables, filter };
  }

  console.groupCollapsed("Variables")
  console.log('Options', allOptions);
  console.log('partitionKey', partitionKey);
  console.log('clusteringKey_1', clusteringKey_1);
  console.log('clusteringKey_2', clusteringKey_2);
  console.log('clusteringKey_3', clusteringKey_3);
  console.log('compositeKey', compositeKey);
  console.log('Filters', filter);
  console.log('ALL Variables', variables);
  console.groupEnd();

  /* 
    * Run query system
  */
  const results = await queryOrders(variables, partitionKey, compositeKey);
  return {
    ...dataNormalizer(results.items),
    nextToken: results.nextToken,
    tenantType: allOptions.tenantType,
    queryOptions: { ...variables, },
  };
}

/* 
  * Utility for generate filter variables which will be run in gql
*/
const dataFiltersGenerator = (allOptions) => {
  let dataFilters = [];

  // PickupDateStart
  if(allOptions?.pickupDateStart && !allOptions?.pickupDateStart.includes(null)) {
    dataFilters.push({
      id: "pickupDateStart",
      value: [allOptions.pickupDateStart[0], allOptions.pickupDateStart[1]],
      operation: "between"
    });
  }

  // DeliveryDateStart
  if(allOptions?.deliveryDateStart && !allOptions?.deliveryDateStart.includes(null)) {
    dataFilters.push({
      id: "deliveryDateStart",
      value: [allOptions.deliveryDateStart[0], allOptions.deliveryDateStart[1]],
      operation: "between"
    });
  }

  // ShipmentType
  if(allOptions.shipmentType !== "ALL") {
    dataFilters.push({
      id: "shipmentType",
      value: allOptions.shipmentType,
      operation: "eq"
    });
  }

  // Quantity
  if(allOptions.quantity && !allOptions.quantity.includes("")) {
    dataFilters.push({
      id: "quantity",
      value: allOptions.quantity,
      operation: "between"
    });
  }

  // SenderName
  if(allOptions.senderName) {
    dataFilters.push({
      id: "senderName",
      value: allOptions.senderName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  // CarrierName
  if(allOptions.carrierName) {
    dataFilters.push({
      id: "carrierName",
      value: allOptions.carrierName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  // ReceiverName
  if(allOptions.receiverName) {
    dataFilters.push({
      id: "receiverName",
      value: allOptions.receiverName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  // PickupAddress
  if(allOptions.pickupAddress) {
    dataFilters.push({
      id: "pickupAddress",
      value: allOptions.pickupAddress.toLowerCase(),
      operation: "contains"
    });
  }

  // DepotAddress
  if(allOptions.depotAddress) {
    dataFilters.push({
      id: "depotAddress",
      value: allOptions.depotAddress.toLowerCase(),
      operation: "contains"
    });
  }

  // DeliveryAddress
  if(allOptions.deliveryAddress) {
    dataFilters.push({
      id: "deliveryAddress",
      value: allOptions.deliveryAddress.toLowerCase(),
      operation: "contains"
    });
  }

  return dataFilters;
}

/* 
  * Utility for generate query variables which will be run in gql
*/
const queryVariablesGenerator = (allOptions, keys) => {
  const { partitionKey, clusteringKey_1, clusteringKey_2, clusteringKey_3, compositeKey } = keys;
  const { tenant, sortDirection, limit, nextToken } = allOptions;

  // Se non fornisco valori per createdAt (clusteringKey_2)
  let variables = {
    [partitionKey]: tenant,
    limit: limit,
    [compositeKey]: { beginsWith: {[clusteringKey_1]: allOptions[clusteringKey_1] }},
    sortDirection: sortDirection,
    nextToken: nextToken
  };

  // Verifico se vi sono valori nella clustering key 2 e se il valore è diverso da ALL
  if(allOptions[clusteringKey_2] && allOptions[clusteringKey_2].length === 2) {
    delete variables[compositeKey].beginsWith;
    variables = {
      ...variables,
      [compositeKey]: { 
        between: allOptions[clusteringKey_2].map(value => ({
          [clusteringKey_1]: allOptions[clusteringKey_1],
          [clusteringKey_2]: value, 
        }))
      }
    }
  }

  // DA VEDERE SE FUNZIONA!! : Verifico se vi sono valori nella clustering key 3 e se il valore è diverso da ALL
  if(allOptions[clusteringKey_3] && allOptions[clusteringKey_3] !== "ALL") {
    variables[compositeKey].beginsWith[clusteringKey_3] = allOptions[clusteringKey_3];
  }

  return variables;
}

/* 
  * Utility to run query for every specific case
*/
async function queryOrders(variables, partitionKey, compositeKey) {
  let searchResult;
  const searchFinder = {
    "tenantCarrier": {
      statusCreatedAt: {
        query: SEARCH_ORDERS_BY_CARRIER_STATUS_CREATEDAT,
        stringRes: "ordersByCarrierStatusCreatedAt",
      },
    },
    "tenantReceiver": {
      statusCreatedAt: {
        query: SEARCH_ORDERS_BY_RECEIVER_STATUS_CREATEDAT,
        stringRes: "ordersByReceiverStatusCreatedAt"
      },
    },
    "tenantSender": {
      statusCreatedAt: {
        query: SEARCH_ORDERS_BY_SENDER_STATUS_CREATEDAT,
        stringRes: "ordersBySenderStatusCreatedAt"
      },
    },
  }

  try {
    searchResult = await API.graphql(graphqlOperation(searchFinder[partitionKey][compositeKey].query, {
      ...variables
    }));
    consoleFetch(`Search orders by ${partitionKey} status`, searchResult);
    searchResult = searchResult?.data?.[searchFinder[partitionKey][compositeKey].stringRes];
  } catch(err) {
    searchResult = null;
    console.error('queryOrders failure', err)
  }

  return searchResult;
}