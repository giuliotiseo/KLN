import { portableGraphqlQuery } from "../../app/api/graphql-api-slice";
import { CREATE_PREORDER, UPDATE_PREORDER } from "./graphql/mutations";

// Create --------------------------------------------------------------------------------------------------------------------------------
export const createPreOrderCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: CREATE_PREORDER,
    args: { input: params }
  });
  
  return result;
};


// Update --------------------------------------------------------------------------------------------------------------------------------
export const updatePreOrderCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: UPDATE_PREORDER,
    args: { input: params }
  });
  
  return result;
};