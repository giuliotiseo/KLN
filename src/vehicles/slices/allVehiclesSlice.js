import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createVehicleThunk, deleteVehicleThunk, readVehiclesThunk, updateVehicleStatusThunk, updateVehicleThunk } from '../../app/thunks/vehiclesThunks';
import { VEHICLE_STATUS_DESCRIPTION } from '../libs/helpers';

// Reducers slice -----------------------------------------------------------------------------------------------------------------------------------------------------
export const allVehiclesSlice = createSlice({
  name: 'allVehicles',
  initialState: {
    ids: [],
    entities: {}
  },
  extraReducers(builder) {
    builder
    // Create -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addCase(createVehicleThunk.fulfilled, (state, { payload }) => {
      state.ids = [...state.ids, payload.licensePlate];
      state.entities = {
        ...state.entities,
        [payload.licensePlate]: { ...payload }
      };
    })
    // Read -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addCase(readVehiclesThunk.fulfilled, (state, { payload }) => {
      state.entities = payload.entities || {};
      state.ids = payload.ids || [];
    })
    // Update reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addCase(updateVehicleStatusThunk.pending, (state, { meta: { arg: { status, vehicle }}}) => {
      console.log('Update', vehicle);
      state.entities[vehicle.licensePlate].status = status;
    })
    .addCase(updateVehicleStatusThunk.fulfilled, (state, { payload }) => {
      state.entities[payload.licensePlate].log = payload.log;
      toast.success(`Status di ${payload.brand} ${payload.model} aggiornato a ${VEHICLE_STATUS_DESCRIPTION[payload.status].toLowerCase()}`);
    })
    .addCase(updateVehicleStatusThunk.rejected, (state, { payload: { vehicle }}) => {
      state.entities[vehicle.licensePlate].status = vehicle.status;
      toast.error('Impossibile aggiornare lo status del veicolo');
    })
    .addCase(updateVehicleThunk.fulfilled, (state, { payload }) => {
      toast.success('Veicolo aggiornato con successo');
      state.entities[payload.licensePlate] = {
        ...state.entities[payload.licensePlate],
        ...payload
      }
    })
    .addCase(updateVehicleThunk.rejected, () => {
      toast.error('Non è stato possibile aggiornare il veicolo');
    })
    // Delete reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addCase(deleteVehicleThunk.fulfilled, (state, { payload }) => {
      toast.success(`${payload.brand} ${payload.model} rimosso con successo`);
      state.ids = state.ids.filter(id => id !== payload.licensePlate);
      delete state.entities[payload.licensePlate];
    })
  }
});


// Selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectAllVehiclesIds = ({ vehicles: { allVehicles } }) => allVehicles.ids;
export const selectAllVehicles = ({ vehicles: { allVehicles } }) => allVehicles.entities;
export const selectVehiclesLogs = ({ vehicles: { allVehicles }}) => {
  let logs = [];
  for(let vh_licensePlate in allVehicles.entities) {
    logs.push(allVehicles.entities[vh_licensePlate].log);
  }

  return logs;
}

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default allVehiclesSlice.reducer;