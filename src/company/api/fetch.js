import { API, graphqlOperation } from 'aws-amplify';
import { consoleFetch, dataNormalizer } from '../../globals/libs/helpers';
import { 
  getCompanyByTagForContacts,
  getCompanyByVatNumberForContacts,
  GET_COMPANY,
  SEARCH_EMPLOYERS,
} from './graphql/queries';

// ====== Get companies by owner ======
export async function fetchCompanyByAdmin (companyId) {
  if(!companyId) throw new Error("CompanyId is missing");
  let results = await API.graphql(graphqlOperation(GET_COMPANY, { companyId }));

  consoleFetch('Fetch company', results);
  return results?.data?.getCompany;
}

export async function fetchCompanyByVatNumberForContactsControls (vatNumber) {
  let results = await API.graphql(graphqlOperation(getCompanyByVatNumberForContacts,
    { vatNumber }
  ));

  consoleFetch('Fetch di company by vatNumber', results);
  return results?.data?.companyByVatNumber?.items;
}

export async function fetchCompanyByTagForContactsControls (tag) {
  let results = await API.graphql(graphqlOperation(getCompanyByTagForContacts,
    { tag }
  ));

  consoleFetch('Fetch di company by tag', results);
  return results?.data?.companyByTag.items;
}

export const searchEmployers = async ({ companyId, searchable, email, type, sortDirection, nextToken, limit }) => {
  // Costruisco il formato corretto di chiavi e filtri per la lettura in gql
  let result;
  let dataFilters = [];
  if(email && email !== "") dataFilters.push({ id: "email", value: email.toLowerCase(), operation: "beginsWith" });
  if(type && type !== "ALL") dataFilters.push({ id: "type", value: type.toUpperCase(), operation: "eq" });

  const filter = dataFilters.length !== 0 
  ? dataFilters.reduce((acc, filter) => ({
    ...acc,
    [filter.id]: { [filter.operation]: filter.value }
  }), {})
  : null;

  let variables = { companyId, searchable, sortDirection, limit, nextToken };
  if(filter) {
    variables = {...variables, filter };
  }

  await API.graphql(graphqlOperation(SEARCH_EMPLOYERS, { 
    ...variables,
    employeeSearchable: { beginsWith: { employee: 1, searchable: searchable.toLowerCase() }},
  }))
    .then(res => {
      consoleFetch('Search employers', res);
      result = res.data.getCompany.contacts
    })
    .catch(e => {
      console.error('Error while get contacts by tenant', e);
      throw new Error('Error while get contacts by tenant'); 
    });

  return {
    ...dataNormalizer(result.items),
    nextToken: result?.nextToken,
    queryOptions: { 
      companyId, searchable, sortDirection, ...filter
    },
  };
}
