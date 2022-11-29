import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { createContactThunk, deleteContactThunk, importXlsInContactsThunk, readContactsThunk, trackingContactLocationThunk, updateContactThunk } from '../../app/thunks/contactsThunks';
import { toastBasicConfig } from '../../globals/libs/helpers';
import { CONTACT_TYPES_SCOPE } from '../libs/helpers';

// Reducers slice -----------------------------------------------------------------------------------------------------------------------------------------------------
const contactsAdapter = createEntityAdapter()
const initialState = contactsAdapter.getInitialState()
export const allContactsSlice = createSlice({
  name: 'allContacts',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(readContactsThunk.fulfilled, (state, { payload }) => {
        state.entities = payload;
        state.ids = Object.keys(payload);
      })
      .addCase(readContactsThunk.rejected, (_, { payload }) => {
        console.error('Error while fetching all contacts data', payload);
      })
      .addCase(createContactThunk.fulfilled, (state, { payload }) => {
        state.ids = [...state.ids, payload.id];
        state.entities = {
          ...state.entities,
          [payload.id]: {
            id: payload.id,
            name: payload.name,
            type: payload.type,
            checkpoints: payload.checkpoints,
            tag: payload.tag,
            email: payload.email,
            phone: payload.phone,
            vatNumber: payload.vatNumber,
            job: payload.job,
          }
        };
      })
      .addCase(updateContactThunk.fulfilled, (state, { payload }) => {
        state.entities[payload.id] = {
          id: payload.id,
          name: payload.name,
          type: payload.type,
          checkpoints: payload.checkpoints,
          tag: payload.tag,
          email: payload.email,
          phone: payload.phone,
          vatNumber: payload.vatNumber,
          job: payload.job,
        };
      })
      .addCase(deleteContactThunk.fulfilled, (state, { payload: { contact: { id }}}) => {
        delete state.entities[id];
        state.ids = state.ids.filter(c_id => c_id !== id);  
      })
      // Import reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(importXlsInContactsThunk.fulfilled, (state, { payload: { ids, entities }}) => {
        state.ids = [...state.ids, ...ids];
        state.entities = {...state.entities, ...entities };
      })
      // Tracking contact reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(trackingContactLocationThunk.pending, (state) => {
        state.status = "pending";
        state.toastId = toast.loading("Rintracciamento coordiante in corso", { autoClose: false })
      })
      .addCase(trackingContactLocationThunk.fulfilled, (state, { payload }) => {
        if(state.entities?.[payload.id]) {
          state.entities[payload.id].checkpoints = payload.checkpoints;
          state.entities[payload.id].log = payload.log;
        }

        state.status = "success";
        toast.update(state.toastId, { 
          render: "Coordinate aggiornate con successo",
          type: "success",
          ...toastBasicConfig
        })
      })
      .addCase(trackingContactLocationThunk.rejected, (state, { payload }) => {
        state.status = "rejected";
        toast.update(state.toastId, { 
          render: "Errore durante l'aggiornamento delle coordinate",
          type: "error",
          ...toastBasicConfig
        })
      })
  }
});

// Actions -----------------------------------------------------------------------------------------------------------------------------------------------------
// Empty...

// Selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectAllContactsIds = ({ contacts: { allContacts }}) => allContacts.ids;
export const selectAllContactsTags = ({ contacts: { allContacts }}) => {
  return allContacts.ids
    .map(c_id => allContacts.entities[c_id].tag)
    .filter(tag => tag !== null);
};

export const selectAllContacts = ({ contacts: { allContacts } }) => allContacts.entities;
export const selectAllCompaniesContacts = ({ contacts: { allContacts } }) => {
  return allContacts.ids
    .filter(id => allContacts.entities[id].type === 'TRANSPORT' || allContacts.entities[id].type === 'CLIENT')
    .map(filter_id => allContacts.entities[filter_id])
};

export const selectAllTrackedContactsCheckpoints = ({ contacts: { allContacts } }) => {
  return allContacts.ids
    .filter(id => allContacts.entities[id].type === 'TRANSPORT' || allContacts.entities[id].type === 'CLIENT')
    .map(filter_id => allContacts.entities[filter_id].checkpoints
      .filter(checkpoint => checkpoint?.location?.coordinate?.length === 2
    ))
};

export const selectAllTransportersContacts = ({ contacts: { allContacts } }) => {
  return allContacts.ids
    .filter(id => allContacts.entities[id].type === 'TRANSPORT')
    .map(filter_id => allContacts.entities[filter_id])
};

export const selectAllClientsContacts = ({ contacts: { allContacts } }) => {
  return allContacts.ids
    .filter(id => allContacts.entities[id].type === 'CLIENT' || allContacts.entities[id].type === 'CLIENT')
    .map(filter_id => allContacts.entities[filter_id])
};

export const selectAllUsersContacts = ({ contacts: { allContacts } }) => {
  return allContacts.ids
    .filter(id => CONTACT_TYPES_SCOPE[allContacts.entities[id].type] === "USER")
    .map(filter_id => allContacts.entities[filter_id])
};

export const selectExternalEmployees = (origin, { contacts: { allContacts: { ids, entities }}}) => {
  if(!origin) return null;
  return ids
    .filter(c_id => entities[c_id].job === origin.toUpperCase())
    .map(map_c_id => entities[map_c_id]);
};

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default allContactsSlice.reducer;