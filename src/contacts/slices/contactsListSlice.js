import { createSlice } from "@reduxjs/toolkit";

export const DEFAULT_CONTACTS_LIMIT = 20;

const dataFiltersGenerator = (filters) => {
  let dataFilters = [{
    id: "id",
    value: true,
    operation: "attributeExists"
  }];

  // Example
  // if(filters?.type && filters?.type !== "ALL") {
  //   dataFilters.push({
  //     id: "type",
  //     value: filters.type,
  //     operation: "eq"
  //   });
  // }

  // Return formatted filters
  return dataFilters.length !== 0
    ? dataFilters.reduce((acc, filter) => ({
      ...acc,
      [filter.id]: {[filter.operation]: filter.value }
    }), {})
    : null;
}

const initialState = {
  type: "ALL",
  limit: 20,
  searchable: "",
  sortDirection: 'DESC',
  nextToken: undefined,
}

export const contactsListSlice = createSlice({
  name: "contactsListSlice",
  initialState,
  reducers: {
    resetContactsList() { return initialState },
    changeContactsList(state, { payload }) { state[payload.key] = payload.value },
    changeContactsListSearchable(state, { payload }) { state.searchable = payload },
    changeContactsListLimit(state, { payload }) { state.limit = payload },
    changeContactsListNextToken(state, { payload }) { state.nextToken = payload }
  },
});


// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetContactsList,
  changeContactsList,
  changeContactsListSearchable,
  changeContactsListLimit,
  changeContactsListNextToken
} = contactsListSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectContactsListLimit = ({ contacts: { list }}) => list.limit;
export const selectContactsListSearchable = ({ contacts: { list }}) => list?.searchable ? list.searchable : undefined;
export const selectContactsListNextToken = ({ contacts: { list }}) => list?.nextToken ? list.nextToken : undefined;
export const selectContactsListFilter = ({ contacts: { list }}) => {
  let filter = dataFiltersGenerator({ type: list.type });
  return filter;
};


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default contactsListSlice.reducer;
