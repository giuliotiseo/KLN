import { createSlice, } from '@reduxjs/toolkit';
import { nextSearchEmployersThunk, searchEmployersThunk } from '../../app/thunks/companyThunks';
import { isEmployeeCreated, isEmployeeCreatedFromXls, isEmployeeDeleted } from './matchers';

// Slice reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
export const employersListSlice = createSlice({
  name: 'employersList',
  initialState: {
    ids: [],
    entities: {},
    status: null,
    nextToken: undefined,
    queryOptions: {
      type: 'ALL',
      sortDirection: 'ASC',
      searchable: '',
      email: '',
      limit: 10
    }
  },
  extraReducers: (builder) => {
    builder
    // Main search -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addCase(searchEmployersThunk.pending, (state, { meta: { arg: { queryOptions }}}) => {
      const { type, email, searchable, sortDirection, limit } = queryOptions;
      state.status = "loading";
      state.queryOptions.email = email;
      state.queryOptions.searchable = searchable;
      state.queryOptions.sortDirection = sortDirection;
      state.queryOptions.type = type;
      state.queryOptions.limit = limit
    })
    .addCase(searchEmployersThunk.fulfilled, (state, { payload }) => {
      state.ids = payload.ids;
      state.entities = payload.entities;
      state.nextToken = payload.nextToken;
      state.status = "success";
    })
    .addCase(searchEmployersThunk.rejected, (state) => { state.status = "rejected"})
    // Next token fetch -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addCase(nextSearchEmployersThunk.pending, (state) => {
      state.nextToken = "loading";
    })
    .addCase(nextSearchEmployersThunk.fulfilled, (state, { payload }) => {
      state.ids = [...state.ids, ...payload.ids];
      state.entities = {...state.entities, ...payload.entities };
      state.nextToken = payload.nextToken;
      state.status = "success";
    })
    .addCase(nextSearchEmployersThunk.rejected, (state, { payload }) => {
      console.error('Rejected nextSearchContactsByTenant', payload);
      state.status = "rejected";
      state.nextToken = payload?.nextToken;
    })
    // Matchers for specific actions -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addMatcher(isEmployeeCreated, (state, { payload }) => {
      state.ids = [ ...state.ids, payload.id ];
    })
    .addMatcher(isEmployeeCreatedFromXls, (state, { payload: { ids, entities }}) => {
      const employersIds = ids.filter(id => entities[id].employee === 1);
      state.ids = [...state.ids, ...employersIds];
    })
    .addMatcher(isEmployeeDeleted, (state, { payload }) => {
      if(state.ids.includes(payload.contact.id)) {
        state.ids = state.ids.filter(id => id !== payload.contact.id);
        delete state.entities[payload.contact.id];
      }
    })
  },
})

// Actions -----------------------------------------------------------------------------------------------------------------------------------------------------

// Selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectEmployersList = ({ company: { employersList }}) => employersList.entities;
export const selectEmployersIdsList = ({ company: { employersList }}) => employersList.ids;
export const selectEmployersQueryOptions = ({ company: { employersList: { queryOptions }}}) => queryOptions;
export const selectEmployersListNextToken = ({ company: { employersList }}) => employersList.nextToken;
export const selectEmployersListStatus = ({ company: { employersList }}) => employersList.status;
export const selectEmployersLogs = ({ company: { employersList }}) => {
  let logs = [];
  for(let emp_id in employersList.entities) {
    logs.push(employersList.entities[emp_id].log);
  }
  return logs;
}




// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default employersListSlice.reducer;