import { createSlice } from "@reduxjs/toolkit";
import { formatLocationCoords, formatWindowsToDynamoDb } from "../../globals/libs/helpers";
import { addFileToPreOrderEditorThunk } from "../api/pre-orders-thunks";

// Matchers
const isSenderRemoved = (action) => {
  if(action.type.includes('changePreOrderEditorSender') && !action?.payload?.id) {
    return true;
  }
}

const isShipmentTypeChanged = (action) => {
  if(action.type.includes('changePreOrderEditorForm') && action?.payload?.name === "shipmentType") {
    return true;
  }
}

// Constants
const initialState = {}

// Slice
export const preOrderEditorSlice = createSlice({
  name: "preOrderEditorSlice",
  initialState,
  reducers: {
    // Global actions
    resetPreOrderEditor: () => initialState,
    changePreOrderEditorForm(state, { payload }) {
      if(payload.type === "checkbox") {
        state[payload.name] = !payload.value;
        return;
      }

      state[payload.name] = payload.value 
    },
    // Pickup actions
    changePreOrderEditorType: (state, { payload }) => {
      if(payload.type === "SENDER" || payload.type === "CARRIER") {
        state.creatorType = payload.type;
        state[payload.type.toLowerCase] = payload.currentCompany;
      }
    },
    changePreOrderEditorSender(state, { payload }) {
      if(payload?.id === state?.sender?.id) {
        state.sender= null;
      } else {
        state.sender = payload;
      }
    },
    changePreOrderEditorCarrier(state, { payload }) {
      if(payload?.id === state?.carrier?.id) {
        state.carrier= null;
      } else {
        state.carrier = payload;
      }
    },
    changePreOrderEditorCheckpoint(state, { payload }) {
      const { checkpoint, sender } = payload; 
      if(!checkpoint) {
        state.checkpoint= null;
        state.sender = sender
      } else {
        if(state?.checkpoint?.extId === checkpoint?.extId) {
          state.checkpoint= null;
          state.sender = sender;
        } else {
          state.checkpoint = {
            warehouseId: checkpoint?.id,
            extId: checkpoint?.extId,
            name: checkpoint?.name,
            thirdCompanyId: checkpoint?.thirdCompanyId, 
            thirdCompanyOwner: checkpoint?.thirdCompanyOwner, 
            thirdCompanyName: checkpoint?.thirdCompanyName, 
            thirdCompanyVat: checkpoint?.thirdCompanyVat,
            location: checkpoint?.location,
            contacts: checkpoint?.contacts,
            windows: checkpoint?.windows,
            maxLength: checkpoint?.maxLength,
            tools: checkpoint?.tools,
            note: checkpoint?.note
          };
        }
      }
    },
    // Files
    removePreOrderEditorFile(state, { payload: { files, indexToRemove }}) {
      state.files = files.reduce((acc, val, index) => {
        if(index === indexToRemove) {
          return val.online
          ? [
              ...acc ,
              { ...val, keyToRemove: val.db_format.key }
            ]
          : [ ...acc ]
        } else {
          return [...acc, { ...val }]
        }
      }, [])
    },
    restorePreOrderEditorFile(state, { payload: { files, indexToRestore }}) {
      delete state.files[indexToRestore].keyToRemove;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addFileToPreOrderEditorThunk.fulfilled, (state, { payload }) => {
        if(!payload) return null;
        state.files = payload;
      })
      .addMatcher(isSenderRemoved, (state) => {
        state.sender = {};
        state.checkpoint = {};
      })
      .addMatcher(isShipmentTypeChanged, (state) => {
        state.billingType = state.shipmentType
      })
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetPreOrderEditor,
  changePreOrderEditorType,
  changePreOrderEditorForm,
  changePreOrderEditorSender,
  changePreOrderEditorCarrier,
  changePreOrderEditorCheckpoint,
  removePreOrderEditorFile,
  restorePreOrderEditorFile,
} = preOrderEditorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectPreOrderEditor = ({ preOrders: { editor }}) => editor;
export const selectPreOrderEditorCheckpoint = ({ preOrders: { editor }}) => editor.checkpoint;
export const selectPreOrderBeforeUpdate = ({ preOrders: { editor }}) => {
  let dataToReturn = { ...editor };
  if(dataToReturn?.checkpoint?.location?.place_id) {
    dataToReturn.checkpoint = {
      ...dataToReturn.checkpoint,
      windows: formatWindowsToDynamoDb(dataToReturn.checkpoint.windows),
      location: {
        ...dataToReturn.checkpoint.location,
        coordinate: formatLocationCoords(dataToReturn.checkpoint.location.coordinate)
      }
    }
  }

  return dataToReturn;
};

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default preOrderEditorSlice.reducer;