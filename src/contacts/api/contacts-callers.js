import { portableGraphqlQuery } from "../../app/api/graphql-api-slice";
import {  formatParamsEmployeesByType, formatContactsByTypeName } from "./contacts-params-formatters";
import { CREATE_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from "./graphql/mutations";
import { CONTACTS_BY_TYPE_NAME_FOR_SEARCH, EMPLOYEES_BY_TYPE } from "./graphql/queries";

// Callers
// Create --------------------------------------------------------------------------------------------------------------------------------
export const createContactCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: CREATE_CONTACT,
    args: { input: params }
  });
  
  return result;
};

// Update --------------------------------------------------------------------------------------------------------------------------------
export const updateContactCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: UPDATE_CONTACT,
    args: { input: params }
  });
  
  return result;
};

// Delete --------------------------------------------------------------------------------------------------------------------------------
export const deleteContactCaller = (id) => ({
  body: DELETE_CONTACT,
  args: { input: { id }}
})


// Get --------------------------------------------------------------------------------------------------------------------------------
export const getEmployeesByType = (params) => ({
  body: EMPLOYEES_BY_TYPE,
  args: formatParamsEmployeesByType(params)
});

export const getContactsByTypeName = async (params) => {
  const result = await portableGraphqlQuery({
    body: CONTACTS_BY_TYPE_NAME_FOR_SEARCH,
    args: formatContactsByTypeName(params)
  });

  if(result) {
    return result?.data;
  } else {
    return {}
  }
}