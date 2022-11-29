import { createSlice } from '@reduxjs/toolkit';

export const DEFAULT_VEHICLES_LIMIT = 20;

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
  limit: DEFAULT_VEHICLES_LIMIT,
  licensePlate: "",
  sortDirection: 'DESC',
  nextToken: undefined,
}

// Slice reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
export const vehiclesListSlice = createSlice({
  name: 'vehiclesList',
  initialState,
  reducers: {
    resetVehiclesList(state) { state = initialState },
    changeVehiclesList(state, { payload }) { state[payload.key] = payload.value },
    changeVehiclesListLicensePlate(state, { payload }) { state.licensePlate = payload ? payload.toUpperCase() : "" },
    changeVehiclesListLimit(state, { payload }) { state.limit = payload },
    changeVehiclesListNextToken(state, { payload }) { state.nextToken = payload }
  },
});


// Actions -----------------------------------------------------------------------------------------------------------------------------------------------------
// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetVehiclesList,
  changeVehiclesList,
  changeVehiclesListLicensePlate,
  changeVehiclesListLimit,
  changeVehiclesListNextToken
} = vehiclesListSlice.actions;


// Selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectVehiclesListLimit = ({ vehicles: { list }}) => list.limit;
export const selectVehiclesListLicensePlate = ({ vehicles: { list }}) => list?.licensePlate ? list.licensePlate : undefined;
export const selectVehiclesListNextToken = ({ vehicles: { list }}) => list?.nextToken ? list.nextToken : undefined;
export const selectVehiclesListFilter = ({ vehicles: { list }}) => {
  let filter = dataFiltersGenerator({ type: list.type });
  return filter;
};


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default vehiclesListSlice.reducer;