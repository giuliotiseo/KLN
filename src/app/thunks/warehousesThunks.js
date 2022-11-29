import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createWarehouse, importWarehouses } from "../../warehouses/api/create";
import { deleteWarehouse } from "../../warehouses/api/delete";
import { fetchWarehouses, searchWarehouses } from "../../warehouses/api/fetch";
import { updateWarehouse, updateWarehouseLocation, updateWarehouseStatus } from "../../warehouses/api/update";

// Create -----------------------------------------------------------------------------------------------------------------------------------------------------
export const createWarehouseThunk = createAsyncThunk(
  'warehouses/create',
  async({ warehouse, displayToast }, { rejectWithValue }) => {
    try {
      const result = await createWarehouse(warehouse, displayToast);
      return result;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
)

export const importWarehousesThunk = createAsyncThunk(
  'warehouses/import',
  async ({ warehouses, callback }, store) => {
    const state = store.getState();
    const { tenant } = state.company.companyInfo;
    const contacts = state.contacts.allContacts.entities;

    try {
      const result = await importWarehouses(warehouses, contacts, tenant)
      callback();
      return result;
    } catch(err) {
      console.error(err);
      toast.error("Si è verificato un errore durante l'importazione")
      callback();
      return store.rejectWithValue(err);
    }
  }
)

// Read -----------------------------------------------------------------------------------------------------------------------------------------------------
export const readWarehousesThunk = createAsyncThunk(
  'warehouses/read',
  async ({ tenant }) => {
    const result = await fetchWarehouses({ tenant });
    return result;
  }
)

export const searchWarehousesThunk = createAsyncThunk(
  'warehouses/list',
  async ({ tenant, queryOptions }, { rejectWithValue }) => {
    const result = await searchWarehouses({ tenant, ...queryOptions, nextToken: undefined });
    if(!result) throw rejectWithValue({ error: "No result in search warehouses by tenant", queryOptions, result })
    return result;
  }
);

export const nextSearchWarehousesThunk = createAsyncThunk(
  'warehouses/list/next',
  async ({ tenant, nextToken }, { getState, rejectWithValue }) => {
    const { warehouses: { warehousesList: { queryOptions }}} = getState();
    const result = await searchWarehouses({ tenant, ...queryOptions, nextToken });
    if(!result) throw rejectWithValue({ error: "No result next search warehouses by tenant", result })
    return result;
  }
)
// Update -----------------------------------------------------------------------------------------------------------------------------------------------------
export const updateWarehouseThunk = createAsyncThunk(
  'warehouses/update',
  async ({ warehouse }, { getState }) => {
    const { warehouses: { allWarehouses: { entities }}} = getState();
    const result = await updateWarehouse({...warehouse, status: entities[warehouse.id].status });
    if(result === 500) return null;
    return result;
  }
)

export const updateWarehouseLocationThunk = createAsyncThunk(
  'warehouses/update/location',
  async ({ warehouse, tracking }) => {
    const result = await updateWarehouseLocation(warehouse, tracking);
    if(result === 500) return null;
    return result;
  }
)

export const updateWarehouseStatusThunk = createAsyncThunk(
  'warehouses/update/status',
  async ({ warehouse, rollback }) => {
    const result = await updateWarehouseStatus(warehouse, rollback);
    if(result === 500) return null;
    return result;
  }
)

// Delete -----------------------------------------------------------------------------------------------------------------------------------------------------
export const deleteWarehouseThunk = createAsyncThunk(
  'warehouses/delete',
  async ({ id }, { rejectWithValue }) => {
    try {
      const result = await deleteWarehouse(id);
      return result;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
)
