import { createSlice} from '@reduxjs/toolkit';
// Api
import { consoleSuccess, formatPayloadWithCheckpoint, sortMapOfSearchableElements } from '../../globals/libs/helpers';
// Thunks
import { 
  createContactThunk,
  searchContactsThunk,
  nextSearchContactsThunk,
  updateContactThunk,
  sendInviteToContactThunk,
  synchronizeContactThunk,
  importXlsInContactsThunk,
  trackingContactLocationThunk,
  deleteContactThunk
} from '../../app/thunks/contactsThunks';

// Slice reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
export const listContactsSlice = createSlice({
  name: 'listContacts',
  initialState: {
    ids: [],
    entities: {},
    selected: null,
    status: null,
    nextToken: undefined,
    toastId: null,
    queryOptions: {
      type: 'ALL',
      sortDirection: 'ASC',
      sort: "searchable",
      searchable: '',
      email: '',
      vatNumber: '',
      job: 0,
      employee: false,
      limit: 20
    }
  },
  reducers: {
    insertContactInSelected(state, { payload }) {
      state.selected = payload;
    }
  },
  extraReducers(builder) {
    builder
      // Create -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(createContactThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createContactThunk.fulfilled, (state, { payload }) => {
        const addAndSortContacts = sortMapOfSearchableElements({...state.entities, [payload.id]: payload }, state.queryOptions.sortDirection)
        state.ids = Object.keys(addAndSortContacts);
        state.entities = {...state.entities, [payload.id]: formatPayloadWithCheckpoint(payload) };
        state.status = "success";
      })
      .addCase(createContactThunk.rejected, (state) => {
        state.status = "rejected";
      })
      // Read -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(searchContactsThunk.pending, (state, { meta: { arg: { queryOptions }}}) => {
        const { type, email, employee, job, searchable, sortDirection, vatNumber, limit } = queryOptions;
        state.status = "loading";
        state.queryOptions.email = email;
        state.queryOptions.employee = employee;
        state.queryOptions.job = job;
        state.queryOptions.searchable = searchable;
        state.queryOptions.sortDirection = sortDirection;
        state.queryOptions.vatNumber = vatNumber;
        state.queryOptions.type = type;
        state.queryOptions.limit = limit
      })
      .addCase(searchContactsThunk.fulfilled, (state, { payload }) => {
        consoleSuccess('Success searchContactsByTenant', payload);
        state.ids = payload.ids;
        state.entities = payload.entities;
        state.nextToken = payload.nextToken
        state.status = "success";
      })
      .addCase(searchContactsThunk.rejected, (state, { payload: { queryOptions }}) => {
        console.error('Rejected searchContactsByTenant', queryOptions);
        state.status = "rejected";
        state.queryOptions.email = queryOptions.email;
        state.queryOptions.employee = queryOptions.employee;
        state.queryOptions.job = queryOptions.job;
        state.queryOptions.searchable = queryOptions.searchable;
        state.queryOptions.sortDirection = queryOptions.sortDirection;
        state.queryOptions.vatNumber = queryOptions.vatNumber;
        state.queryOptions.type = queryOptions.type;
        state.queryOptions.sort = queryOptions.sort;
      })
      // Update reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(updateContactThunk.fulfilled, (state, { payload }) => {
        state.entities[payload.id] = formatPayloadWithCheckpoint({ ...payload }); 
      })
      .addCase(updateContactThunk.rejected, (_, { payload }) => { 
        console.error(payload); 
      })
      // Delete -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(deleteContactThunk.fulfilled, (state, { payload: { contact: { id }}}) => {
        if(state.ids.includes(id)) {
          delete state.entities[id];
          state.ids = state.ids.filter(c_id => c_id !== id);
        }
      })
      // Next token fetch -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(nextSearchContactsThunk.pending, (state) => {
        state.nextToken = "loading";
      })
      .addCase(nextSearchContactsThunk.fulfilled, (state, { payload }) => {
        state.ids = [...state.ids, ...payload.ids];
        state.entities = {...state.entities, ...payload.entities };
        state.nextToken = payload.nextToken;
        state.status = "success";
      })
      .addCase(nextSearchContactsThunk.rejected, (state, { payload }) => {
        console.error('Rejected nextSearchContactsByTenant', payload);
        state.status = "rejected";
        state.nextToken = payload?.nextToken;
      })
      // Send invite reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(sendInviteToContactThunk.fulfilled, (state, { payload }) => {
        state.entities[payload.data.id].invited = payload.data.invited;
      })
      .addCase(sendInviteToContactThunk.rejected, (_, { payload }) => {
        console.error(payload);
      })
      // Synchronization reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(synchronizeContactThunk.pending, (state, { meta: { arg: { contact }} }) => {
        state.entities[contact.id].sync = true;
      })
      .addCase(synchronizeContactThunk.fulfilled, (state, { payload }) => {
        console.log('Payload da sync', payload);
        state.entities[payload.id] = {
          ...state.entities[payload.id], 
          ...formatPayloadWithCheckpoint(payload)
        };
      })
      .addCase(synchronizeContactThunk.rejected, (state, { payload }) => {
        console.error(payload);
        state.entities[payload.contact.id].sync = false;
      })
      // Import reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(importXlsInContactsThunk.fulfilled, (state, { payload: { ids, entities }}) => {
        state.ids = [...state.ids, ...ids];
        state.entities = {...state.entities, ...entities };
      })
      .addCase(importXlsInContactsThunk.rejected, (_, { payload }) => {
        console.error(payload);
      })
      // Tracking contact reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(trackingContactLocationThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(trackingContactLocationThunk.fulfilled, (state, { payload }) => {
        if(state.entities?.[payload.id]) {
          state.entities[payload.id].checkpoints = payload.checkpoints;
          state.entities[payload.id].log = payload.log;
        }

        if(state.selected?.id === payload.id) {
          state.selected.checkpoints = payload.checkpoints;
        }
        state.status = "success";
      })
      .addCase(trackingContactLocationThunk.rejected, (state, { payload }) => {
        state.status = "rejected";
      })
    }
});


// Actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  insertContactInSelected
} = listContactsSlice.actions;

// Selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectStatusContactsList = ({ contacts: { listContacts: { status }}}) => status; 
export const selectSelectedContact = ({ contacts: {  listContacts: { selected }}}) => selected;
export const selectContactsQueryOptions = ({ contacts: { listContacts } }) => listContacts.queryOptions;
export const selectContactsList = ({ contacts: { listContacts } }) => listContacts.entities;
export const selectContactsListStatus = ({ contacts: { listContacts }}) => listContacts.status;
export const selectContactsFiltersNextToken = ({ contacts: { listContacts }}) => listContacts.nextToken;
export const selectContactListIds = ({ contacts: { listContacts }}) => listContacts.ids;
export const selectContactFromList = (id, { contacts: { listContacts: { entities }}}) => entities[id];
export const selectContactFromAllLists = (id, store) => {
  const contactsList = store.contacts.listContacts.entities;
  const employersList = store.company.employersList.entities;
  const allLists = {...contactsList, ...employersList };
  return allLists[id];
}


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default listContactsSlice.reducer;