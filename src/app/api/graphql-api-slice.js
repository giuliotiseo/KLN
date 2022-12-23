import { createApi } from '@reduxjs/toolkit/query/react'
import { API } from "aws-amplify";

// Api slice settings ---------------------------------------------------------------------------------------------------------------------
// Custom base query
const graphqlBaseQuery = async (params) => {
  // console.log('vedo params', { params })
  if(!params?.body || (!params?.args && params?.skipInCaseOfNullArgs)) return { data: {}};
  const { body, args } = params;
  let results = {};

  try {
    results = await API.graphql(({
      query: body, 
      variables: args, 
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }));

    const mainKey = Object.keys(results?.data)[0];
    console.groupCollapsed(`GraphQL Base Query ${mainKey}`)
    console.log("Variables provided: ", { ...args });
    console.log("Result", results);

    console.log("Main key", mainKey);

    if(!mainKey) {
      console.log("No data found in query", { args });
      return { data: [] }
    }

    const dataToReturn = Object.keys(results.data[mainKey]).includes("items")
      ? { items: results.data[mainKey].items, nextToken: results.data[mainKey].nextToken }
      : results.data[mainKey];

    console.log("Data to return", dataToReturn);
    console.groupEnd();
    return { data: dataToReturn };
  } catch(e) {
    console.error('Nessun risultato:', { error: e, params });
    console.groupEnd();
    return {}
  }
}

// Custom query used for queryFn implementation
export const portableGraphqlQuery = async ({ body, args }) => {
  let results = {};
  try {
    results = await API.graphql(({
      query: body, 
      variables: args,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    }));

    const mainKey = Object.keys(results?.data)[0];
    console.groupCollapsed(`GraphQL Base Query ${mainKey}`)
    console.log("Query eseguita: ", { ...args });
    console.log("Risultato", results);

    console.log("Main key", mainKey);

    if(!mainKey) {
      console.log("No data found in query", { args });
      return { data: [] }
    }

    const dataToReturn = Object.keys(results.data[mainKey]).includes("items")
      ? { items: results.data[mainKey].items, nextToken: results.data[mainKey].nextToken }
      : results.data[mainKey];

    console.groupEnd();
    return { data: dataToReturn };
  } catch(e) {
    console.error('Nessun risultato:', e);
    return {}
  }
}

// Api slice ---------------------------------------------------------------------------------------------------------------------
export const graphqlApiSlice = createApi({
  reducerPath: "graphql_api",
  baseQuery: graphqlBaseQuery,
  tagTypes: [
    'Company',
    'Profile',
    'Customer',
    'Contact',
    'Warehouse',
    'Vehicle',
    'PreOrder',
    'Order',
    'Travel',
    'Check',
    'Pallet'
  ],
  endpoints: builder => ({})
});