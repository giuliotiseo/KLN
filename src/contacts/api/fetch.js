import { API, graphqlOperation } from 'aws-amplify';
// Queries
import { GET_PROFILE } from '../../user/api/graphql/queries';
import { getCompanyByVatNumberForContacts } from '../../company/api/graphql/queries';
import {
  CONTACTS_BY_COMPANY,
  GET_CONTACT_BY_ID,
  INIT_CONTACTS_BY_TENANT,
  LIST_FILTERED_CONTACTS,
  LIST_FILTERED_CONTACTS_FROM_TYPE,
} from './graphql/queries';
// Helpers
import { consoleFetch, dataNormalizer, normalizeWindows } from '../../globals/libs/helpers';

// ====== Get all contacts ======
export const fetchContacts = async ({ tenant, sortDirection }) => {
  let results;
  const variables = {
    tenant,
    sortDirection,
  }

  try {
    results = await API.graphql(graphqlOperation(INIT_CONTACTS_BY_TENANT, variables));
    consoleFetch('Fetch generic contacts by tenant', results);
  } catch(e) {
    console.error('Errore', e);
  }
  
  return results?.data?.contactsByTenant;
}

// ====== Get specific contact ======
export const fetchContact = async ({ id }) => {
  let result = await API.graphql(graphqlOperation(GET_CONTACT_BY_ID, { id }));
  return result?.data?.getContact;
}

// Contact from profiles or companies
export const fetchContactFromProfileOrCompany = async ({ type, variable }) => {
  console.log({ type, variable });
  let result = type === 'USER' 
    ? await API.graphql(graphqlOperation(GET_PROFILE, { username: variable.email }))
    : await API.graphql(graphqlOperation(getCompanyByVatNumberForContacts, { vatNumber: variable.vatNumber }))
  
  consoleFetch('Fetch single contact', result);
  return type === 'USER' ? result?.data?.getProfile : result?.data?.companyByVatNumber?.items;
}

// Fetch using GSI
export const searchContacts = async ({ tenant, type, searchable, job, employee,  email, vatNumber, sortDirection, nextToken, limit }) => {
  // Costruisco il formato corretto di chiavi e filtri per la lettura in gql
  const gsi = type !== 'ALL' ? "type" : "searchable";
  let dataFilters = [];
  var typeToSend = gsi === 'searchable' ? undefined : type;
  let result;

  if(job && parseInt(job) !== 0 && job !== 'ALL') dataFilters.push({ id: "job", value: job, operation: "eq" });
  if(employee === true) dataFilters.push({ id: "employee", value: employee, operation: "eq" });
  if(email && email !== "") dataFilters.push({ id: "email", value: email.toLowerCase(), operation: "eq" });
  if(vatNumber && vatNumber !== "") dataFilters.push({ id: "vatNumber", value: vatNumber, operation: "eq" });

  const filter = dataFilters.length !== 0 
  ? dataFilters.reduce((acc, filter) => ({
    ...acc,
    [filter.id]: { [filter.operation]: filter.value }
  }), {})
  : null;

  let variables = { tenant, sortDirection, limit, nextToken };
  if(filter) {
    variables = {...variables, filter };
  }

  // Condizioni impostate sulla chiave secondaria scelta: type o searchable
  if(gsi === 'searchable' || type === undefined) {
    /* Se la chiave secondaria è impostata su searchable ma quest'ultimo non dovesse presentare valori, 
      allora fai una query generica su contacts by tenant + eventuali filtri 
    */
    if(!searchable) {
      result = await API.graphql(graphqlOperation(CONTACTS_BY_COMPANY, { ...variables }))
        .then(res => {
          consoleFetch('Risultato della fetch CONTACTS_BY_COMPANY', res);
          return res.data.contactByCompany
        })
        .catch(e => {
          throw new Error('Error while get contacts by tenant', e); 
        });
    } else { // Se invece sono presenti dei valori in searchable, imposta la proprietà searchableType nella chiamata
      result = await API.graphql(graphqlOperation(LIST_FILTERED_CONTACTS, {
        ...variables,
        searchableType: { beginsWith: { type: typeToSend, searchable: searchable.toLowerCase() }},
      })).then(res => {
        consoleFetch('Risultato della fetch LIST_FILTERED_CONTACTS', res);
        return res.data.contactByCompany
      })
        .catch(e => { 
          throw new Error('Error while get filtered contacts by tenant', e);
      });
    }
  } else { // Se la chiave secondaria è impostata su type
    result = await API.graphql(graphqlOperation(LIST_FILTERED_CONTACTS_FROM_TYPE, {
      ...variables,
      typeSearchable: { beginsWith: { type: typeToSend, searchable }},
      filter,
    })).then(res => {
      consoleFetch('Risultato della fetch LIST_FILTERED_CONTACTS_FROM_TYPE', res);
      return res.data.contactsByTenantType
    })
    .catch(e => { 
      throw new Error('Error while get filtered contacts by tenant', e);
    });
  }

  console.log("Result", result);
  // console.log("Normalizzo", {
  //   ...dataNormalizer(result.items.map(item => ({
  //     ...item,
  //     checkpoints: item?.checkpoints?.length > 0
  //       ? item.checkpoints.map(checkpoint => ({
  //         ...checkpoint,
  //         windows: normalizeWindows(checkpoint.windows)
  //       }))
  //       : []
  //   })))
  // });

  return {
    ...dataNormalizer(result.items.map(item => ({
      ...item,
      checkpoints: item?.checkpoints?.length > 0
        ? item.checkpoints.map(checkpoint => ({
          ...checkpoint,
          windows: normalizeWindows(checkpoint.windows)
        }))
        : []
    }))),
    nextToken: result?.nextToken,
    queryOptions: { 
      type, searchable, sortDirection, ...filter
    },
  };
}


/*
Appunti composizione filtri
  let dataFilters = []; // For building the filters in the right format, specific for gql reading
  let filter = null;

  // Filters producing:
  if(type && type !==  'ALL') dataFilters.push({ id: "type", value: type, operation: "eq" })
  const filter = dataFilters.reduce((acc, filter) => ({
    ...acc,
    [filter.id]: { [filter.operation]: filter.value }
  }), {});

  // Assign filter into variables
  variables.filter = filter;

  // Run the expression
  if(filter && Object.keys(variables.filter).length === 0) {
    try {
      console.log('Eseguo LIST_FILTERED_CONTACTS');
      results = await API.graphql(graphqlOperation(LIST_FILTERED_CONTACTS, variables));
    } catch(e) {
      console.error('Impossibile eseguire operazione di filtraggio', e);
    }
  } else {
    try {
      console.log('Eseguo LIST_CONTACTS_BY_TENANTSEARCHABLE', variables);
      results = await API.graphql(graphqlOperation(LIST_CONTACTS_BY_TENANTSEARCHABLE, variables));
    } catch(e) {
      console.error('Impossibile eseguire operazione di filtraggio', e);
    }
  }
*/