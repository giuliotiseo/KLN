import { createSlice } from '@reduxjs/toolkit';
import {
  createWarehouseThunk,
  readWarehousesThunk,
  updateWarehouseThunk,
  updateWarehouseStatusThunk,
  deleteWarehouseThunk,
  importWarehousesThunk,
  updateWarehouseLocationThunk
} from '../../app/thunks/warehousesThunks';
import { toast } from 'react-toastify';
import { isStorekeeperDeleted } from './matchers';

// Reducers slice -----------------------------------------------------------------------------------------------------------------------------------------------------
export const allWarehousesSlice = createSlice({
  name: 'allWarehouses',
  initialState: {
    ids: [],
    entities: {},
  },
  extraReducers(builder) {
    builder
    // Create -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addCase(createWarehouseThunk.fulfilled, (state, { payload }) => {
      state.ids = [...state.ids, payload.id];
      state.entities = {
        ...state.entities,
        [payload.id]: payload
      }
    })
    .addCase(importWarehousesThunk.fulfilled, (state, { payload }) => {
      toast.success('Importazione eseguita con successo');
      state.ids = [...state.ids, ...Object.keys(payload)]
      state.entities = { ...state.entities, ...payload };
    })
    .addCase(importWarehousesThunk.rejected, (_, action) => {
      toast.error('Importazione fallita');
      console.error('Failure while data import', action);
    })
    // Read (search) -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addCase(readWarehousesThunk.fulfilled, (state, { payload }) => {
      state.ids = payload.ids;
      state.entities = payload.entities;
    })
    // Update reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addCase(updateWarehouseThunk.fulfilled, (state, { payload }) => {
      state.entities[payload.id] = {
        ...state.entities[payload.id],
        ...payload
      }
    })
    .addCase(updateWarehouseStatusThunk.fulfilled, (state, { payload }) => {
      state.entities[payload.id].status =  payload.status;
      state.entities[payload.id].log = payload.log;
    })
    .addCase(updateWarehouseLocationThunk.fulfilled, (state, { payload }) => {
      state.entities[payload.id] = {
        ...state.entities[payload.id],
        location: payload.location,
        log: payload.log
      }
    })
    // Delete reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addCase(deleteWarehouseThunk.fulfilled, (state, { payload }) => {
      toast.success(`${payload.name} rimosso con successo`);
      state.ids = state.ids.filter(id => id !== payload.id);
      delete state.entities[payload.id];
    })
    .addMatcher(isStorekeeperDeleted, (state, { payload: { changes, contact }}) => {
      const { warehouses } = changes;
      const { id } = contact;
      warehouses.forEach(w_id => {
        state.entities[w_id].contactIds = state.entities[w_id].contactIds.filter(c_id => c_id !== id);
      })
    })
  }
});

// Actions -----------------------------------------------------------------------------------------------------------------------------------------------------


// Selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectAllWarehousesIds = ({ warehouses: { allWarehouses }}) => allWarehouses.ids;
export const selectAllWarehouses = ({ warehouses: { allWarehouses }}) => allWarehouses.entities;
export const selectWarehousesLogs = ({ warehouses: { allWarehouses }}) => {
  let logs = [];
  for(let wh_id in allWarehouses.entities) {
    logs.push(allWarehouses.entities[wh_id].log);
  }

  return logs;
}

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default allWarehousesSlice.reducer;