import { API, graphqlOperation } from "aws-amplify";

const graphqlBaseQuery = () => async ({ body, args }) => {
  let results = null;
  if(!args || Object.keys(args)?.length <= 0) return { data: [] };

  try {
    results = await API.graphql(graphqlOperation(body, { ...args }));

    console.groupCollapsed("GraphQL Base Query")
    console.log("Query eseguita: ", { ...args });
    console.log("Risultato", results);

    const mainKey = Object.keys(results?.data)[0];
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
    console.log("Args", args);
    console.error('Error:', e);
    return { error: e }
  }
}

export const portableGraphqlQuery = async ({ body, args }) => {
  let results = null;
  if(!args || Object.keys(args)?.length <= 0) return { data: [] };

  try {
    results = await API.graphql(graphqlOperation(body, { ...args }));

    console.groupCollapsed("GraphQL Base Query")
    console.log("Query eseguita: ", { ...args });
    console.log("Risultato", results);

    const mainKey = Object.keys(results?.data)[0];
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
    console.error('Error:', e);
    return { error: e }
  }
}

export default graphqlBaseQuery;