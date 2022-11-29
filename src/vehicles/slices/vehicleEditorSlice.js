import { createSlice } from "@reduxjs/toolkit";

const initialState = {}
export const vehicleEditorSlice = createSlice({
  name: "vehicleEditorSlice",
  initialState,
  reducers: {
    // Reset
    resetVehicleEditor: () => initialState,
    // Content creator
    changeVehicleEditorForm(state, { payload }) {
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
    changeVehicleEditorLastPosition(state, { payload }) {
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
  resetVehicleEditor,
  changeVehicleEditorForm,
  changeVehicleEditorLastPosition,
} = vehicleEditorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectVehicleEditor = ({ vehicles: { editor }}) => editor;
export const selectVehicleEditorToUpdate = ({ vehicles: { editor }}) => {
  const dataToUpdate = { ...editor };
  return dataToUpdate;
};
// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default vehicleEditorSlice.reducer;