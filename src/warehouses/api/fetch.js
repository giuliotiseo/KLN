import { API, graphqlOperation } from 'aws-amplify';
// Queries
import {
  SEARCH_WAREHOUSES_FROM_SEARCHABLE,
  SEARCH_WAREHOUSES_FROM_STATUS,
  SEARCH_WAREHOUSES,
  WAREHOUSE_BY_TENANT,
  GET_WAREHOUSE_BY_ID,
} from './graphql/queries';
// Helpers
import { consoleFetch, dataNormalizer } from '../../globals/libs/helpers';
import { WarehouseStatus } from '../libs/helpers';

// ====== Get all warehouses ======
export const fetchWarehouses = async ({ tenant, sortDirection = "ASC" }) => {
  let results;
  const variables = { tenant, sortDirection };

  try {
    results = await API.graphql(graphqlOperation(WAREHOUSE_BY_TENANT, variables));
    consoleFetch('Fetch warehouses', results);
  } catch(e) {
    console.error('Errore', e);
  }
  
  return dataNormalizer(results?.data?.warehouseByTenant.items);
}

export const fetchWarehousesByStatus = async ({ tenant, status, sortDirection = "ASC" }) => {
  let results;
  const variables = {
    tenant,
    status: WarehouseStatus[status], 
    sortDirection 
  };

  try {
    results = await API.graphql(graphqlOperation(SEARCH_WAREHOUSES_FROM_STATUS, variables));
    consoleFetch('Fetch warehouses by status', results);
  } catch(e) {
    console.error('Errore', e);
  }
  
  return dataNormalizer(results?.data?.warehouseByTenantStatus.items);
}

// ====== Get specific warehousee ======
export const fetchWarehouse = async ({ id }) => {
  let result = await API.graphql(graphqlOperation(GET_WAREHOUSE_BY_ID, { id }));
  return result?.data?.getWarehouse;
}

// ====== Search warehouses list by query options ======
export const searchWarehouses = async ({ tenant, searchable, status, type, scope, specialization, contactId, limit, sortDirection, nextToken }) => {
    const gsi = status !== 'ALL' ? "status" : "searchable";

    // Costruisco il formato corretto di chiavi e filtri per la lettura in gql
    let dataFilters = [];
    var statusToSend = gsi === 'searchable' ? undefined : status;
    let results;
  
    if(type && type !== 'ALL') dataFilters.push({ id: "type", value: type.toUpperCase(), operation: "eq" });
    if(scope && scope !== 'ALL') dataFilters.push({ id: "scope", value: scope.toUpperCase(), operation: "contains" });
    if(specialization && specialization !== 'ALL') dataFilters.push({ id: "specialization", value: specialization.toUpperCase(), operation: "eq" });
    if(contactId && contactId !== 'ALL') dataFilters.push({ id: "contactIds", value: contactId, operation: "contains" });
  
    const filter = dataFilters.length !== 0 
      ? dataFilters.reduce((acc, filter) => ({
        ...acc,
        [filter.id]: { [filter.operation]: filter.value }
      }), {})
      : null;
  
    let variables = { tenant, limit, sortDirection, nextToken };
    if(filter) {
      variables = {...variables, filter };
    }

    // Condizioni impostate sulla chiave secondaria scelta: status o searchable
    if(gsi === 'searchable' || status === undefined) {
      /* Se la chiave secondaria è impostata su searchable ma quest'ultimo non dovesse presentare valori, 
        allora fai una query generica su warehouses by tenant + eventuali filtri 
      */
      if(!searchable) {
        results = await API.graphql(graphqlOperation(SEARCH_WAREHOUSES, { ...variables }));
        consoleFetch('Search warehouses', results);
        results = results?.data?.warehouseByTenant;
      } else { // Se invece sono presenti dei valori in searchable, imposta la proprietà searchableStatus nella chiamata
        results = await API.graphql(graphqlOperation(SEARCH_WAREHOUSES_FROM_SEARCHABLE, {
          ...variables,
          searchableStatus: { beginsWith: { status: undefined, searchable: searchable.toLowerCase() }},
          sortDirection,
        }));
    
        consoleFetch('Fetch di warehouses by filters', results);
        results = results?.data?.warehouseBySerchableStatus;
      }
    } else { // Se la chiave secondaria è impostata su status
      results = await API.graphql(graphqlOperation(SEARCH_WAREHOUSES_FROM_STATUS, {
        tenant,
        statusSearchable: { beginsWith: { status: statusToSend, searchable }},
        sortDirection,
        filter,
      }));

      consoleFetch('Fetch di filtered warehouse by filters', results);
      results =  results?.data?.warehouseByTenantStatus;
    }


  return {
    ...dataNormalizer(results.items),
    nextToken: results.nextToken,
    queryOptions: { 
      status, searchable, sortDirection, ...filter
    },
  };
}