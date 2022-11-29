import { createSlice } from "@reduxjs/toolkit";

export const DEFAULT_CUSTOMERS_LIMIT = 20;

const dataFiltersGenerator = (filters) => {
  let dataFilters = [{
    id: "id",
    value: true,
    operation: "attributeExists"
  }];

  // Example
  if(filters?.name) {
    dataFilters.push({
      id: "name",
      value: filters.name,
      operation: "beginsWith"
    });
  }

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
  name: "",
  limit: DEFAULT_CUSTOMERS_LIMIT,
  searchable: "",
  sortDirection: 'DESC',
  nextToken: undefined,
}

export const customersListSlice = createSlice({
  name: "customersListSlice",
  initialState,
  reducers: {
    resetCustomersList: () => initialState,
    changeCustomersList(state, { payload }) { state[payload.key] = payload.value },
    changeCustomersListLimit(state, { payload }) { state.limit = payload },
    changeCustomersListNextToken(state, { payload }) { state.nextToken = payload },
    changeCustomersListName(state, { payload }) { state.name = payload },
    changeCustomersListSearchable(state, { payload }) {
      state.searchable = payload;
      state.nextToken = undefined;
    },
  },
});


// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetCustomersList,
  changeCustomersList,
  changeCustomersListSearchable,
  changeCustomersListLimit,
  changeCustomersListNextToken,
  changeCustomersListName,
} = customersListSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectCustomersListLimit = ({ customers: { list }}) => list.limit;
export const selectCustomersListSearchable = ({ customers: { list }}) => list?.searchable ? list.searchable : undefined;
export const selectCustomersListNextToken = ({ customers: { list }}) => list?.nextToken ? list.nextToken : undefined;
export const selectCustomersListFilter = ({ customers: { list }}) => {
  let filter = dataFiltersGenerator({
    type: list.type,
    name: list.name,
  });

  return filter;
};


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default customersListSlice.reducer;
