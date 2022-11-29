import { createSlice } from "@reduxjs/toolkit";
import { addFileToPreOrderCreatorThunk } from "../api/pre-orders-thunks";

// Matchers
const isSenderRemoved = (action) => {
  if(action.type.includes('changePreOrderCreatorSender') && !action?.payload?.id) {
    return true;
  }
}

const isShipmentTypeChanged = (action) => {
  if(action.type.includes('changePreOrderCreatorForm') && action?.payload?.name === "shipmentType") {
    return true;
  }
}


// Constants
const initialState = {
  creatorType: {},
  carrier: null,
  sender: null,
  shipmentType: "GROUPAGE",
  vehicleType: "NONE",
  pickupDateStart: null,
  pickupDateEnd: null,
  deliveryAreas: [],
  deliveryRegions: [],
  slot: 1,
  perishable: false,
  checkpoint: null,
  trades: [],
  files: [],
  note: "",
  status: "PENDING",
  billingType: "GROUPAGE",
}

// Slice
export const preOrderCreatorSlice = createSlice({
  name: "preOrderCreatorSlice",
  initialState,
  reducers: {
    // Global actions
    resetPreOrderCreator: () => initialState,
    changePreOrderCreatorForm(state, { payload }) {
      if(payload.type === "checkbox") {
        state[payload.name] = !state[payload.name];
        return;
      }

      state[payload.name] = payload.value 
    },
    // Pickup actions
    changePreOrderCreatorType: (state, { payload }) => {
      if(payload.type === "SENDER" || payload.type === "CARRIER") {
        state.creatorType = payload.type;
        state[payload.type.toLowerCase] = payload.currentCompany;
      }
    },
    changePreOrderCreatorSender(state, { payload }) {
      if(payload?.id === state?.sender?.id) {
        state.sender= null;
      } else {
        state.sender = payload;
      }
    },
    changePreOrderCreatorCarrier(state, { payload }) {
      if(payload?.id === state?.carrier?.id) {
        state.carrier= null;
      } else {
        state.carrier = payload;
      }
    },
    changePreOrderCreatorCheckpoint(state, { payload }) {
      if(!payload) {
        state.checkpoint= null;
      } else {
        if(state?.checkpoint?.extId === payload?.extId) {
          state.checkpoint= null;
        } else {
          state.checkpoint = {
            warehouseId: payload?.id,
            extId: payload?.extId,
            name: payload?.name,
            thirdCompanyId: payload?.thirdCompanyId, 
            thirdCompanyOwner: payload?.thirdCompanyOwner, 
            thirdCompanyName: payload?.thirdCompanyName, 
            thirdCompanyVat: payload?.thirdCompanyVat,
            location: payload?.location,
            contacts: payload?.contacts,
            windows: payload?.windows,
            maxLength: payload?.maxLength,
            tools: payload?.tools,
            note: payload?.note
          };
        }
      }
    },
    // Cargo actions
    changePreOrderCreatorTrades(state, { payload }) {
      if(state.trades.includes(payload)) {
        const indexToRemove = state.trades.indexOf(payload);
        state.trades.splice(indexToRemove, 1);
      } else {
        state.trades.push(payload);
      }
    },
    // Files
    removePreOrderCreatorFile(state, { payload: { indexToRemove }}) {
      state.files = [...state.files.slice(0, indexToRemove), ...state.files.slice(indexToRemove, state.files.length - 1)]
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addFileToPreOrderCreatorThunk.fulfilled, (state, { payload }) => {
        if(!payload) return null;
        state.files = state.files.concat(payload)
      })
      .addMatcher(isSenderRemoved, (state) => state = { ...initialState })
      .addMatcher(isShipmentTypeChanged, (state) => {
        state.billingType = state.shipmentType
      })
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetPreOrderCreator,
  changePreOrderCreatorType,
  changePreOrderCreatorForm,
  changePreOrderCreatorSender,
  changePreOrderCreatorCarrier,
  changePreOrderCreatorCheckpoint,
  changePreOrderCreatorTrades,
  removePreOrderCreatorFile,
} = preOrderCreatorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectPreOrderCreator = ({ preOrders: { creator }}) => creator;
export const selectPreOrderCreatorCheckpoint = ({ preOrders: { creator }}) => creator.checkpoint;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default preOrderCreatorSlice.reducer;