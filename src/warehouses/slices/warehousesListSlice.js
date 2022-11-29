import { createSlice } from '@reduxjs/toolkit';

export const DEFAULT_WAREHOUSES_LIMIT = 20;

const dataFiltersGenerator = (filters) => {
  let dataFilters = [{
    id: "id",
    value: true,
    operation: "attributeExists"
  }];

  // Example
  if(filters?.searchable) {
    dataFilters.push({
      id: "searchable",
      value: filters.searchable,
      operation: "contains"
    });
  }

  if(filters?.status && filters?.status !== "ALL") {
    dataFilters.push({
      id: "status",
      value: filters.status,
      operation: "eq"
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
  limit: DEFAULT_WAREHOUSES_LIMIT,
  status: "ALL",
  searchable: "",
  sortDirection: 'DESC',
  nextToken: undefined,
}

// Slice reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
export const warehousesListSlice = createSlice({
  name: 'warehousesListSlice',
  initialState,
  reducers: {
    resetWarehousesList() { return initialState },
    changeWarehousesList(state, { payload }) { state[payload.key] = payload.value },
    changeWarehousesListSearchable(state, { payload }) { state.searchable = payload },
    changeWarehousesListStatus(state, { payload }) { state.status = payload },
    changeWarehousesListLimit(state, { payload }) { state.limit = payload },
    changeWarehousesListNextToken(state, { payload }) { state.nextToken = payload }

  }
});

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetWarehousesList,
  changeWarehousesList,
  changeWarehousesListSearchable,
  changeWarehousesListLimit,
  changeWarehousesListNextToken,
  changeWarehousesListStatus
} = warehousesListSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectWarehousesListLimit = ({ warehouses: { list }}) => list.limit;
export const selectWarehousesListSearchable = ({ warehouses: { list }}) => list?.searchable ? list.searchable : undefined;
export const selectWarehousesListNextToken = ({ warehouses: { list }}) => list?.nextToken ? list.nextToken : undefined;
export const selectWarehousesListFilter = ({ warehouses: { list }}) => {
  let filter = dataFiltersGenerator({
    type: list.type,
    searchable: list?.searchable,
    status: list?.status,
  });

  return filter;
};


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default warehousesListSlice.reducer;
