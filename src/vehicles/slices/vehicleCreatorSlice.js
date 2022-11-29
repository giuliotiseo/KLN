import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  licensePlate: "",
  type: "TRATTORE",
  brand: "",
  model: "",
  bulkhead: "NESSUNA",
  tailLift: 0,
  fuel: "DIESEL",
  spot: "",
  axle: "",
  maxWeight: "",
  kilometers: "",
  lastPosition: null,
  dimensions: { x: 0, y: 0, z: 0 },
  status: "DISPONIBILE",
  note: "",
}

export const vehicleCreatorSlice = createSlice({
  name: "vehicleCreatorSlice",
  initialState,
  reducers: {
    // Reset
    resetVehicleCreator: () => initialState,
    // Content creator
    changeVehicleCreatorForm(state, { payload }) {
      if(payload?.name === "type" ) {
        state[payload.name] = payload.value;
        if(payload.value === "TRATTORE") {
          state.dimensions = null;
          state.maxWeight = "";
          state.axle = "";
          state.spot = "";
          state.tailLift = 0;
          state.bulkhead = "NESSUNA";
        } else if(payload.value === "RIMORCHIO" || payload.value === "SEMIRIMORCHIO") {
          state.fuel = "NESSUNO";
        }
      } else {
        state[payload.name] = payload.value;
      }
    },
    changeVehicleCreatorLastPosition(state, { payload }) {
      if(!payload) {
        state.lastPosition = {};
      } else {
        state.lastPosition = payload;
      }
    },
  },
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetVehicleCreator,
  changeVehicleCreatorLastPosition,
  changeVehicleCreatorForm,
} = vehicleCreatorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectVehicleCreator = ({ vehicles: { creator }}) => creator;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default vehicleCreatorSlice.reducer;