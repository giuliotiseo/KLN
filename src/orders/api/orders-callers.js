import { portableGraphqlQuery } from "../../app/api/graphql-api-slice";
import { CREATE_ORDER, UPDATE_ORDER } from "./graphql/mutations";

// Create --------------------------------------------------------------------------------------------------------------------------------
export const createOrderCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: CREATE_ORDER,
    args: { input: params }
  });
  
  return result;
};


// Update --------------------------------------------------------------------------------------------------------------------------------
export const updateOrderCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: UPDATE_ORDER,
    args: { input: params }
  });
  
  return result;
};