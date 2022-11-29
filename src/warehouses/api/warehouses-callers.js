import { portableGraphqlQuery } from "../../app/api/graphql-api-slice";
import {  formatParamsWarehousesByTenantStatus } from "./warehouses-params-formatters";
import { WAREHOUSES_BY_COMPANY_STATUS } from "./graphql/queries";
import { CREATE_WAREHOUSE, CREATE_WAREHOUSELINK, DELETE_WAREHOUSE, DELETE_WAREHOUSELINK, UPDATE_WAREHOUSE } from "./graphql/mutations";

// Callers
// Get --------------------------------------------------------------------------------------------------------------------------------
export const getWarehousesByTenantStatus = (params) => ({
  body: WAREHOUSES_BY_COMPANY_STATUS,
  args: formatParamsWarehousesByTenantStatus(params)
});

// Create --------------------------------------------------------------------------------------------------------------------------------
export const createWarehouseCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: CREATE_WAREHOUSE,
    args: { input: params }
  });
  
  return result;
};

export const createWarehouseLinkCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: CREATE_WAREHOUSELINK,
    args: { input: params }
  });
  
  return result;
};

// Update --------------------------------------------------------------------------------------------------------------------------------
export const updateWarehouseCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: UPDATE_WAREHOUSE,
    args: { input: params }
  });
  
  return result;
};

// Delete --------------------------------------------------------------------------------------------------------------------------------
export const deleteWarehouseCaller = (id) => ({
  body: DELETE_WAREHOUSE,
  args: { input: { id }}
})

export const deleteWarehouseLinkCaller = async (id) => {
  const result = await portableGraphqlQuery({
    body: DELETE_WAREHOUSELINK,
    args: { input: { id }}
  });
  
  return result;
}
