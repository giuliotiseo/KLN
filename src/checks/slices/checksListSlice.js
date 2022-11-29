import { createSlice } from "@reduxjs/toolkit";
import { endOfMonth, sub } from "date-fns";

export const DEFAULT_CHECK_LIMIT = 20;

const dataFiltersGenerator = (filters) => {
  let dataFilters = [{
    id: "id",
    value: true,
    operation: "attributeExists"
  }];

  if(filters?.docNum) {
    dataFilters.push({
      id: "docNum",
      value: filters.type,
      operation: "eq"
    });
  }

  if(filters?.docNum) {
    dataFilters.push({
      id: "amount",
      value: filters.amountRange,
      operation: "between"
    });
  }

  if(filters?.orderStamp) {
    dataFilters.push({
      id: "orderStamp",
      value: filters.orderStamp,
      operation: "eq"
    });
  }

  if(filters?.companySearch) {
    const key = Object.keys(filters.companySearch)[0];
    dataFilters.push({
      id: key,
      value: filters.companySearch[key].name.toUpperCase(),
      operation: 'beginsWith'
    })
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
  tenantType: "",
  tenant: "",
  status: "",
  dateRange: [sub(new Date(), { months: 1 }).toISOString(), endOfMonth(new Date()).toISOString()],
  amount: ["", ""],
  amountRange: ["", ""],
  docNum: "",
  orderStamp: "",
  companySearch: null,
  limit: DEFAULT_CHECK_LIMIT,
  items: [],
  nextToken: undefined,
}

export const checksListSlice = createSlice({
  name: "checksListSlice",
  initialState,
  reducers: {
    resetChecksList(state) { state = initialState },
    changeChecksList(state, { payload }) { state[payload.key] = payload.value },
    changeChecksListTenant(state, { payload }) { state.tenant = payload },
    changeChecksListStatus(state, { payload }) { state.status = payload },
    changeChecksListDateRange(state, { payload }) { state.dateRange = payload },
    changeChecksListAmountFrom(state, { payload }) {state.amountRange = [ payload.value, state.amountRange[1]] },
    changeChecksListAmountTo(state, { payload }) { state.amountRange = [ state.amountRange[0], payload.value ] },
    changeChecksListDocNum(state, { payload }) { state.docNum = payload },
    changeChecksListOrderStamp(state, { payload }) { state.orderStamp = payload },
    changeChecksListLimit(state, { payload }) { state.limit = payload },
    changeChecksListNextToken(state, { payload }) { state.nextToken = payload || undefined },
    changeChecksCompanySearch(state, { payload }) {
      console.log("leggi per dio", payload);
      if(payload) {
        state.companySearch = payload;
      } else {
        state.companySearch = null;
      }
    },
  }
});

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetChecksList,
  changeChecksList,
  changeChecksListTenant,
  changeChecksListStatus,
  changeChecksListDateRange,
  changeChecksListAmountFrom,
  changeChecksListAmountTo,
  changeChecksListDocNum,
  changeChecksListOrderStamp,
  changeChecksListLimit,
  changeChecksListNextToken,
  changeChecksCompanySearch,
} = checksListSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectChecksListFilters = ({ checks: { list }}) => {
  let filter = dataFiltersGenerator({
    docNum: list?.docNum,
    amountRange: list?.amountRange,
    companySearch: list?.companySearch
  });

  return filter;
};

export const selectChecksSortKey = ({ checks: { list }}) => {
  const basicReturn = {
    status: list.status.toUpperCase(),
    orderCreationDate: list.dateRange,
  }

  if(!list.companyRole || !list[`${list.companyRole}Name`]) {
    return basicReturn
  }

  return {
    ...basicReturn,
    [`${list.companyRole}Name`]: list[`${list.companyRole}Name`]
  }
}

export const selectChecksListTenantType = ({ checks: { list }}) => list.tenantType;
export const selectChecksListTenant = ({ checks: { list }}) => list.tenant;
export const selectChecksListStatus = ({ checks: { list }}) => list.status;
export const selectChecksListDateRange = ({ checks: { list }}) => list.dateRange;
export const selectChecksListStart = ({ checks: { list }}) => list?.dateRange?.[0];
export const selectChecksListEnd = ({ checks: { list }}) => list?.dateRange?.[1];
export const selectChecksListLimit = ({ checks: { list }}) => list.limit;
export const selectChecksListNextToken = ({ checks: { list }}) => list.nextToken;
export const selectChecksListCompanySearch = ({ checks: { list }}) => {
  if(list.companySearch) {
    const key = Object.keys(list.companySearch)[0]
    return list.companySearch[key]
  } else {
    return null;
  }
};

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default checksListSlice.reducer;
