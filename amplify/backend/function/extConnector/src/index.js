/* Amplify Params - DO NOT EDIT
	API_KLNGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
	API_KLNGRAPHQL_GRAPHQLAPIIDOUTPUT
	API_KLNGRAPHQL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import crypto from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';
// Api
import { getOrders, getOrdersBySender } from "./api/orders.js";
import { getTravels } from "./api/travels.js";
import { getVehicles } from "./api/vehicles.js";
import { getCustomers } from "./api/customers.js";

const { Sha256 } = crypto;
const GRAPHQL_ENDPOINT = process.env.API_KLNGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT;
const AWS_REGION = process.env.AWS_REGION || 'eu-central-1';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  let query = null;
  let variables = null;
  let statusCode = 200;
  let body;
  let response;

  const bodyVariables = JSON.parse(event.body);
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
  });

  // Query orders
  if(bodyVariables?.type === "Order") {
    query = getOrders;
    variables = {
      carrierId: bodyVariables.id,
      sortDirection: bodyVariables?.sortDirection || "DESC",
      start: new Date(bodyVariables?.start).toISOString(),
      end: new Date(bodyVariables?.end).toISOString(),
      nextToken: bodyVariables?.nextToken || undefined,
      limit: bodyVariables?.limit || 999
    }
  
    if(bodyVariables?.senderVat) {
      variables = {
        ...variables,
        senderVat: bodyVariables?.senderVat
      }
  
      query = getOrdersBySender;
    }
  }

  // Query travels
  if(bodyVariables?.type === "Travel") {
    query = getTravels;
    variables = {
      carrierId: bodyVariables.id,
      sortDirection: bodyVariables?.sortDirection || "DESC",
      start: new Date(bodyVariables?.start).toISOString(),
      end: new Date(bodyVariables?.end).toISOString(),
      nextToken: bodyVariables?.nextToken || undefined,
      limit: bodyVariables?.limit || 999
    }
  }

  // Query vehicles
  if(bodyVariables?.type === "Vehicle") {
    query = getVehicles;
    variables = {
      carrierId: bodyVariables.id,
      sortDirection: bodyVariables?.sortDirection || "DESC",
      nextToken: bodyVariables?.nextToken || undefined,
      limit: bodyVariables?.limit || 999
    }
  }

  // Query customer
  if(bodyVariables?.type === "Customer") {
    query = getCustomers;
    variables = {
      carrierId: bodyVariables.id,
      sortDirection: bodyVariables?.sortDirection || "DESC",
      nextToken: bodyVariables?.nextToken || undefined,
      limit: bodyVariables?.limit || 999
    }
  }

  // Validate query and run it
  if(variables?.carrierId && query) {
    const requestToBeSigned = new HttpRequest({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        host: endpoint.host
      },
      hostname: endpoint.host,
      body: JSON.stringify({ query, variables }),
      path: endpoint.pathname
    });
  
    const signed = await signer.sign(requestToBeSigned);
    const request = new Request(endpoint, signed);
  
    try {
      console.log("Request", request);
      response = await fetch(request);
      body = await response.json();
      console.log("Body", body);
      if (body.errors) statusCode = 400;
    } catch (error) {
      statusCode = 500;
      body = {
        errors: [
          {
            message: error.message
          }
        ]
      };
    }
  } else {
    statusCode = 400
    console.log("Non è stata fornita una query valida o i dati inviati dal client non sono corretti");
  }

  return {
    statusCode,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    }, 
    body: JSON.stringify(body),
  };
};