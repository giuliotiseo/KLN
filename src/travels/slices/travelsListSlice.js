import { createSlice } from "@reduxjs/toolkit";
import { endOfMonth, sub } from "date-fns";

export const DEFAULT_TRAVEL_LIMIT = 20;

const dataFiltersGenerator = (filters) => {
  let dataFilters = [{
    id: "id",
    value: true,
    operation: "attributeExists"
  }];


  if(filters?.estimatedTransportCosts?.length > 0) {
    let estimated = filters.estimatedTransportCosts.map(est => Number(est) || 0)
    if(!estimated.every(filter => filter === 0)) {
      dataFilters.push({
        id: "estimatedTransportCosts",
        value: estimated,
        operation: "between"
      });
    }
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
  tenant: "",
  status: "",
  licensePlate: "",
  driverName: "",
  sortParam: "",
  departureDateRange: [sub(new Date(), { months: 1 }).toISOString(), endOfMonth(new Date()).toISOString()],
  estimatedTransportCosts: [0, 0],
  limit: DEFAULT_TRAVEL_LIMIT,
  items: [],
  nextToken: undefined,
}

export const travelsListSlice = createSlice({
  name: "travelsListSlice",
  initialState,
  reducers: {
    resetTravelsList: () => initialState,
    changeTravelsListTenant(state, { payload }) { state.tenant = payload },
    changeTravelsListStatus(state, { payload }) { state.status = payload },
    changeTravelsListDepartureDateRange(state, { payload }) { state.departureDateRange = payload },
    changeTravelsListCostsFrom(state, { payload }) {state.estimatedTransportCosts = [ payload.value, state.estimatedTransportCosts[1]] },
    changeTravelsListCostsTo(state, { payload }) { state.estimatedTransportCosts = [ state.estimatedTransportCosts[0], payload.value ] },
    changeTravelsListLimit(state, { payload }) { state.limit = payload },
    changeTravelsListNextToken(state, { payload }) { state.nextToken = payload },
    changeTravelsListSortParam(state, { payload }) {
      if(!payload) return null;
      state.nextToken = undefined;
      state.sortParam = payload;
      state.licensePlate = "";
      state.driverName = "";
    },
  }
});

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetTravelsList,
  changeTravelsListTenant,
  changeTravelsListStatus,
  changeTravelsListDepartureDateRange,
  changeTravelsListCostsFrom,
  changeTravelsListCostsTo,
  changeTravelsListLimit,
  changeTravelsListNextToken,
  changeTravelsListSortParam
} = travelsListSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectTravelsListFilters = ({ travels: { list }}) => {
  let filter = dataFiltersGenerator({
    estimatedTransportCosts: list?.estimatedTransportCosts,
  });

  return filter;
}

export const selectTravelsSortKey = ({ travels: { list }}) => {
  const basicReturn = {
    status: list.status.toUpperCase(),
    departureDate: list.departureDateRange,
  }

  if(!list.sortParam || !list[`${list.sortParam}`]) {
    return basicReturn
  }

  return {
    ...basicReturn,
    [`${list.sortParam}`]: list[`${list.sortParam}`]
  }
}



export const selectTravelsListTenant = ({ travels: { list }}) => list.tenant;
export const selectTravelsListStatus = ({ travels: { list }}) => list.status;
export const selectTravelsListEstimatedCosts = ({ travels: { list }}) => list.estimatedTransportCosts;
export const selectTravelsListDepartureDateRange = ({ travels: { list }}) => list.departureDateRange;
export const selectTravelsListLimit = ({ travels: { list }}) => list.limit;
export const selectTravelsListNextToken = ({ travels: { list }}) => list.nextToken;
export const selectTravelsListSortParam = ({ travels: { list }}) => list?.sortParam || "";

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default travelsListSlice.reducer;
