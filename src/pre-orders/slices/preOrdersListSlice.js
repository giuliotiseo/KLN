import { createSlice } from "@reduxjs/toolkit";
import { endOfMonth, sub } from "date-fns";

export const DEFAULT_PREORDER_LIMIT = 20;

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
  stamp: "",
  dateRange: [sub(new Date(), { months: 1 }).toISOString(), endOfMonth(new Date()).toISOString()],
  sortDirection: 'DESC',
  nextToken: undefined,
}

export const preOrdersListSlice = createSlice({
  name: "preOrdersListSlice",
  initialState,
  reducers: {
    resetPreOrdersList(state) { state = initialState },
    changePreOrdersList(state, { payload }) { state[payload.key] = payload.value },
    changePreOrdersListStamp(state, { payload }) { state.stamp = payload },
    changePreOrdersListDateRange(state, { payload }) { state.dateRange = payload },
    changePreOrdersListLimit(state, { payload }) { state.limit = payload },
    changePreOrdersListNextToken(state, { payload }) { state.nextToken = payload }
  },
});


// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetPreOrdersList,
  changePreOrdersList,
  changePreOrdersListStamp,
  changePreOrdersListDateRange,
  changePreOrdersListLimit,
  changePreOrdersListNextToken
} = preOrdersListSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectPreOrdersListLimit = ({ preOrders: { list }}) => list.limit;
export const selectPreOrdersListStamp = ({ preOrders: { list }}) => list?.stamp ? list.stamp : undefined;
export const selectPreOrdersListNextToken = ({ preOrders: { list }}) => list?.nextToken ? list.nextToken : undefined;
export const selectPreOrdersListStart = ({ preOrders: { list }}) => list?.dateRange?.[0];
export const selectPreOrdersListEnd = ({ preOrders: { list }}) => list?.dateRange?.[1];
export const selectPreOrdersListFilter = ({ preOrders: { list }}) => {
  let filter = dataFiltersGenerator({ type: list.type });
  return filter;
};


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default preOrdersListSlice.reducer;
