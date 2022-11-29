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

export const employeesListSlice = createSlice({
  name: "employeesListSlice",
  initialState,
  reducers: {
    resetEmployeesList(state) { state = initialState },
    changeEmployeesList(state, { payload }) { state[payload.key] = payload.value },
    changeEmployeesListSearchable(state, { payload }) { state.searchable = payload },
    changeEmployeesListDateRange(state, { payload }) { state.dateRange = payload },
    changeEmployeesListLimit(state, { payload }) { state.limit = payload },
    changeEmployeesListNextToken(state, { payload }) { state.nextToken = payload }
  },
});


// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetEmployeesList,
  changeEmployeesList,
  changeEmployeesListSearchable,
  changeEmployeesListDateRange,
  changeEmployeesListLimit,
  changeEmployeesListNextToken
} = employeesListSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectEmployeesListLimit = ({ contacts: { employees }}) => employees.limit;
export const selectEmployeesListSearchable = ({ contacts: { employees }}) => employees?.searchable ? employees.searchable : undefined;
export const selectEmployeesListNextToken = ({ contacts: { employees }}) => employees?.nextToken ? employees.nextToken : undefined;
export const selectEmployeesListFilter = ({ contacts: { employees }}) => {
  let filter = dataFiltersGenerator({ type: employees.type });
  return filter;
};


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default employeesListSlice.reducer;
