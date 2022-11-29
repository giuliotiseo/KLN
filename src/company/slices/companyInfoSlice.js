import { createSlice} from '@reduxjs/toolkit';
import { normalizeRemoteData } from '../../globals/libs/helpers';
import { isEmployeeCreated, isEmployeeCreatedFromXls, isEmployeeDeleted } from './matchers';
// Thunks
import { 
  getCompanyInfoThunk,
  importLogsIntoCompanyThunk,
  updateCompanyInfoThunk
} from '../../app/thunks/companyThunks';

// Reducers slice -----------------------------------------------------------------------------------------------------------------------------------------------------
export const companyInfoSlice = createSlice({
  name: 'company',
  initialState: {
    id: null,
    tenant: null,
    entity: null,
    status: null,
    employers: { ids: [], entities: {}}
  },
  extraReducers: (builder) => {
    builder
    // Get Contacts 
    .addCase(getCompanyInfoThunk.pending, (state) => {state.status = 'loading'})
    .addCase(getCompanyInfoThunk.rejected, (state) => {state.status = 'rejected'})
    .addCase(getCompanyInfoThunk.fulfilled, (state, { payload }) => {
      state.id = payload.companyId;
      state.tenant = payload.tag;
      state.entity = payload;
      state.employers.ids = payload.contacts.items.map(emp => emp.id);
      state.employers.entities = normalizeRemoteData(payload.contacts.items);
      state.status = 'success';
    })
    .addCase(updateCompanyInfoThunk.fulfilled, (state, { payload }) => {
      state.entity.logo = payload.logo;
      state.entity.email = payload.email;
      state.entity.phone = payload.phone;
      state.entity.pec = payload.pec;
      state.entity.uniqueCode = payload.uniqueCode;
      state.entity.log = payload.log;
    })
    .addCase(importLogsIntoCompanyThunk.fulfilled, (state, { payload }) => {
      state.entity.log = payload;
    })
    .addCase(importLogsIntoCompanyThunk.rejected, (_, { payload }) => {
      console.error('Import logs data failed', payload);
    })
    .addMatcher(isEmployeeCreated, (state, { payload }) => {
      state.employers.ids = [ ...state.employers.ids, payload.id ];
      state.employers.entities = {
        ...state.employers.entities,
        [payload.id]: { id: payload.id, name: payload.name, type: payload.type, avatar: payload.avatar, email: payload?.email ? payload.email : null, phone: payload?.phone ? payload.phone : null }
      }
    })
    .addMatcher(isEmployeeCreatedFromXls, (state, { payload: { ids, entities }}) => {
      const employersObjects = ids
      .filter(id => entities[id].employee === 1)
      .reduce((acc, val) => ({
        ...acc, [val]: entities[val]
      }), {});

      state.employers.ids = [...state.employers.ids, ...Object.keys(employersObjects)];
      state.employers.entities = {...state.employers.entities, ...employersObjects };
    })
    .addMatcher(isEmployeeDeleted, (state, { payload }) => {
      state.employers.ids = state.employers.ids.filter(id => id !== payload.contact.id);
      delete state.employers.entities[payload.contact.id];
    })
  },
});

// Actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const { 
  changeCompanyInfo,
} = companyInfoSlice.actions;

// Selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectCompanyInfo = ({ company: { companyInfo }}) => companyInfo.entity;
export const selectTenant = ({ company: { companyInfo }}) => companyInfo.tenant;
export const selectCompanyId = ({ company: { companyInfo }}) => companyInfo.id;
export const selectEmployers = ({ company: { companyInfo }}) => companyInfo.employers.entities;
export const selectEmployersIds = ({ company: { companyInfo }}) => companyInfo.employers.ids;
export const selectStorekeepers = ({ company: { companyInfo }}) => {
  let { employers } = companyInfo; 
  if(employers.ids.length > 0) {
    employers = employers.ids
      .filter(c_id => employers.entities[c_id].type === 'WAREHOUSE')
      .reduce((acc, c_id) => ({ ...acc, [c_id]: {...employers.entities[c_id]}}), {})

    return employers;
  } else {
    return [];
  }
}

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default companyInfoSlice.reducer;