import { portableGraphqlQuery } from "../../app/api/graphql-api-slice";
import { createCustomerCompanyFormatter, createCustomerFormatter, updateCustomerFormatter } from "./customers-params-formatters";
import { CREATE_CUSTOMER, CREATE_CUSTOMER_COMPANY, DELETE_CUSTOMER, UPDATE_CUSTOMER } from "./graphql/mutations";
import { CUSTOMER_BY_COMPANYID } from "./graphql/queries";

// Get --------------------------------------------------------------------------------------------------------------------------------
export const getCustomerByCompanyIdCaller =  async (args) => {
  const result = await portableGraphqlQuery({
    body: CUSTOMER_BY_COMPANYID,
    args: { ownerCompanyId: args.companyId },
    skipInCaseOfNullArgs: true 
  });

  console.log("Vedo result", result);
  
  return result;
};

// Create --------------------------------------------------------------------------------------------------------------------------------
export const createCustomerCaller =  async (params) => {
  const dataToReturn = createCustomerFormatter(params);
  console.log("Data to return ", dataToReturn);
  const result = await portableGraphqlQuery({
    body: CREATE_CUSTOMER,
    args: dataToReturn
  });
  
  return result;
};

export const createCustomerCompanyCaller =  async (params) => {
  const dataToReturn = createCustomerCompanyFormatter(params);
  const result = await portableGraphqlQuery({
    body: CREATE_CUSTOMER_COMPANY,
    args: dataToReturn
  });
  
  return result;
};

// Update --------------------------------------------------------------------------------------------------------------------------------
export const updateCustomerCaller =  async (params) => {
  const dataToReturn = updateCustomerFormatter(params);
  const result = await portableGraphqlQuery({
    body: UPDATE_CUSTOMER,
    args: dataToReturn
  });
  
  return result;
};

// Delete --------------------------------------------------------------------------------------------------------------------------------
export const deleteCustomerCaller = (id) => ({
  body: DELETE_CUSTOMER,
  args: { input: { id }}
})