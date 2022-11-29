import { createSlice } from "@reduxjs/toolkit";
import { addFileToPalletEditorThunk, addImageToPalletEditorThunk } from "../api/pallets-thunks";

// Slice reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
const initialState = {}

export const palletEditorSlice = createSlice({
  name: "palletEditorSlice",
  initialState,
  reducers: {
    // Reset fields
    resetPalletEditor: () => initialState,
    // Content editor
    changePalletEditorForm(state, { payload: { id, value }}) {
      state[id] = value
    },
    changePalletEditorLicensePlate(state, { payload }) {
      const indexToChange = payload.id;
      let modifiedLicensePlate = payload?.licensePlate?.split("+"); 
      modifiedLicensePlate[indexToChange] = payload.value;
      state.vehicleOperator =  state?.vehicleOperator 
        ? { ...state.vehicleOperator, licensePlate: modifiedLicensePlate.join("+") }
        : { licensePlate: modifiedLicensePlate.join("+") }
    },
    changePalletEditorVehicleName(state, { payload }) {
      const indexToChange = payload.id;
      let modifiedVehicleName = payload?.vehicleName?.split(";"); 
      modifiedVehicleName[indexToChange] = payload.value;
      state.vehicleOperator =  state?.vehicleOperator 
        ? { ...state.vehicleOperator, name: modifiedVehicleName.join(";") }
        : { name: modifiedVehicleName.join(";") }
    },
    changePalletEditorCarrierOperator(state, { payload }) {
      state.carrierOperator = state.carrierOperator
        ? { ...state.carrierOperator, [payload.id]: payload.value }
        : { ...payload.carrierOperator, [payload.id]: payload.value }
    },
    changePalletEditorValidation(state, { payload }) {
      if(!payload) {
        state[`${payload.name}Validator`] = null;
        state[`${payload.name}ValidatorName`] = null;
      } else {
        state[`${payload.name}Validation`] = payload.value;
        state[`${payload.name}Validator`] = payload.profile;
        state[`${payload.name}ValidatorName`] = payload.profile.name;
      }
    },
    changePalletEditorMessage(state, { payload }) {
      if(!payload.value) {
        state[`${payload.id}ValidationMessage`] = '';
      } else {
        state[`${payload.id}ValidationMessage`] = payload.value;
      }
    },
    // Attachements
    removePalletEditorImage(state, { payload }) {
      // Se è già stato eseguito il remove, non vado ad agire sul keyToRemove precendentemente indicato:
      if(state?.image) {
        state.image = {
          ...state.image,
          raw_format: null,
          db_format: null,
          online: true,
        }
      } else {
        state.voucherImage = {
          keyToRemove: payload.db_format.key,
          raw_format: null,
          db_format: null,
          online: true,
        }
      }
    },
    removePalletEditorFile(state, { payload: { files, indexToRemove }}) {
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
  },
  extraReducers(builder) {
    builder
    .addCase(addImageToPalletEditorThunk.fulfilled, (state, { payload }) => {
      if(!payload) return null;
      // Se sono state già effettuate delle modifiche allo state che comprendono image:
      if(state?.voucherImage) { state.voucherImage = { ...state.voucherImage, ...payload }}
      else { state.voucherImage = { ...payload } }
    })
    .addCase(addFileToPalletEditorThunk.fulfilled, (state, { payload }) => {
      if(!payload) return null;
      // Se sono state già effettuate delle modifiche allo state che comprendono files:
      if(state?.files) {
        state.files = state.files.concat(payload)
      } else {
        state.files = [payload]
      }
    })
    // Matchers for validations -----------------------------------------------------------------------------------------------------------------------------------------------------
    // .addMatcher(isCheckDateChangedFromEditor, (state, { payload }) => {
    //   const result = checkValidityDate(payload);
    //   state.validation = { ...state?.validation, [result.id]: result }
    // })
    // .addMatcher(isCheckIbanChanged, (state, { payload }) => {
    //   const result = checkIbanValidity(payload);
    //   state.validation = { ...state?.validation, [result.id]: result }
    // })
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetPalletEditor,
  changePalletEditorForm,
  changePalletEditorLicensePlate,
  changePalletEditorVehicleName,
  changePalletEditorCarrierOperator,
  changePalletEditorValidation,
  changePalletEditorMessage,
  removePalletEditorImage,
  removePalletEditorFile
} = palletEditorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectPalletEditor = ({ pallets: { editor }}) => editor;
export const selectIsPalletEdited = ({ pallets: { editor }}) => Object.keys(editor).length ? true : false;

// Reducer export ----------------------------------------------------------------------------------------------------------------------------------------------------
export default palletEditorSlice.reducer;