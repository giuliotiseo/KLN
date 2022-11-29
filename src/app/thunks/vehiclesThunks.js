import { createAsyncThunk } from "@reduxjs/toolkit";
import { createVehicle } from "../../vehicles/api/create";
import { deleteVehicle } from "../../vehicles/api/delete";
import { fetchAllVehicles, searchVehicles } from "../../vehicles/api/fetch";
import { updateVehicle, updateVehicleStatus } from "../../vehicles/api/update";

// Create -----------------------------------------------------------------------------------------------------------------------------------------------------
export const createVehicleThunk = createAsyncThunk(
  'vehicles/create',
  async({ vehicle, displayToast }, { getState, rejectWithValue }) => {
    const { company } = getState();
    const tenant = company.companyInfo.tenant;
    vehicle.tenant = tenant;
    try {
      const result = await createVehicle(vehicle, displayToast);
      return result;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
)

// Read -----------------------------------------------------------------------------------------------------------------------------------------------------
export const readVehiclesThunk = createAsyncThunk(
  'vehicles/read',
  async ({ tenant }) => {
    const result = await fetchAllVehicles({ tenant });
    return result;
  }
)

export const searchVehiclesThunk = createAsyncThunk(
  'vehicles/list',
  async ({ tenant, queryOptions }, { rejectWithValue }) => {
    let result;
    try {
      result = await searchVehicles({ tenant, ...queryOptions, nextToken: undefined });
      return result;
    } catch(err) {
      console.error(err);
      throw rejectWithValue({ 
        error: "No result in search vehicles by tenant",
        queryOptions, 
        result
      });
    }
  }
);

  export const nextSearchVehiclesThunk = createAsyncThunk(
  'vehicles/list/next',
  async ({ tenant, nextToken }, { getState, rejectWithValue }) => {
    const { vehicles: { vehiclesList: { queryOptions }}} = getState();
    const result = await searchVehicles({ tenant, ...queryOptions, nextToken });
    if(!result) throw rejectWithValue({ error: "No result next search vehicles by tenant", result })
    return result;
  }
)

// Update -----------------------------------------------------------------------------------------------------------------------------------------------------
export const updateVehicleThunk = createAsyncThunk(
  'vehicles/update',
  async ({ vehicle }, { getState, rejectWithValue }) => {
    try {
      const { vehicles: { allVehicles: { entities }}} = getState();
      const result = await updateVehicle({...vehicle, status: entities[vehicle.licensePlate].status });
      return result;
    } catch(e) {
      console.error(e);
      return rejectWithValue({ vehicle })
    }
  }
)


export const updateVehicleStatusThunk = createAsyncThunk(
  'vehicles/update/status',
  async ({ vehicle, status }, { rejectWithValue, getState }) => {
    const { company: { companyInfo:  { tenant }} } = getState();
    try {
      const result = await updateVehicleStatus({...vehicle, status, tenant });
      return result;
    } catch(e) {
      console.error(e);
      return rejectWithValue({ error: "Impossible to update vehicle status", vehicle });
    }
  }
)

// Delete -----------------------------------------------------------------------------------------------------------------------------------------------------
export const deleteVehicleThunk = createAsyncThunk(
  'vehicles/delete',
  async ({ licensePlate }, { rejectWithValue }) => {
    try {
      const result = await deleteVehicle(licensePlate);
      return result;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
)

