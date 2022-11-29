import { portableGraphqlQuery } from "../../app/api/graphql-api-slice";

import {
  formatParamsVehiclesByLicensePlate
} from "./vehicles-params-formatters";

import { VEHICLE_BY_LICENSEPLATE } from "./graphql/queries";
import { CREATE_VEHICLE, DELETE_VEHICLE, UPDATE_VEHICLE } from "./graphql/mutations";

// Callers
// Get --------------------------------------------------------------------------------------------------------------------------------
export const getVehicleByLicensePlate = (params) => ({
  body: VEHICLE_BY_LICENSEPLATE,
  args: formatParamsVehiclesByLicensePlate(params)
});

// Create --------------------------------------------------------------------------------------------------------------------------------
export const createVehicleCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: CREATE_VEHICLE,
    args: { input: params }
  });
  
  return result;
};

// Update --------------------------------------------------------------------------------------------------------------------------------
export const updateVehicleCaller =  async (params) => {
  const result = await portableGraphqlQuery({
    body: UPDATE_VEHICLE,
    args: { input: params }
  });
  
  return result;
};

// Delete --------------------------------------------------------------------------------------------------------------------------------
export const deleteVehicleCaller = (id) => ({
  body: DELETE_VEHICLE,
  args: { input: { id }}
})
