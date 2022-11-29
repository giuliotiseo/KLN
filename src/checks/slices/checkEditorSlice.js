import { createSlice } from "@reduxjs/toolkit";
import { addFileToCheckEditorThunk, addImageToCheckEditorThunk } from "../api/check-thunks";
import { CheckStatus } from "../libs/helpers";
import { isCheckDateChangedFromEditor, isCheckIbanChanged } from "./matchers";
import { checkIbanValidity, checkValidityDate } from "./validation";

const initialState = {}
export const checkEditorSlice = createSlice({
  name: "checkEditorSlice",
  initialState,
  reducers: {
    // Reset
    resetCheckEditor: () => initialState,
    resetCheckEditorOrder: (state) => state.order = {},
    // Basic changes related to order
    changeCheckEditorStatus(state, { payload }) { if(CheckStatus.includes(payload)) state.status = payload },
    changeCheckEditorCheckOrder(state, { payload }) { if(payload) state.order = payload },
    changeCheckEditorDocsRef(state, { payload: { docsRef, keyDocNum, value }}) {
      console.log("docsRef", docsRef)
      console.log("keyDocNum", docsRef)
      console.log("value", value)

      const ids = docsRef?.length > 0 ? docsRef.map(doc => doc.id) : [];
      if(ids.length > 0) {
        if(ids.includes(value.id)) {
          state.docsRef = docsRef.filter(({ id }) => id !== value.id);
          state.keyDocNum = value.id.includes(keyDocNum) 
            ? docsRef?.[0]?.number || null
            : keyDocNum;
        } else {
          state.docsRef = docsRef.concat(value);
        }
      } else {
        state.docsRef = [value];
        state.keyDocNum = value.number; 
      }
    },
    changeCheckEditorKeyDocNum(state, { payload: { docsRef, value }}) {
      const validKeyDocNum = docsRef?.length > 0 
        ? docsRef.filter(doc => doc.id.includes(value)).length 
        : false;

        if(validKeyDocNum) {
          state.keyDocNum = value;
        }
    },
    // Content editor
    changeCheckEditorForm(state, { payload: { id, value }}) {
      state[id] = value
    },
    // Attachements
    removeCheckEditorImage(state, { payload }) {
      // Se è già stato eseguito il remove, non vado ad agire sul keyToRemove precendentemente indicato:
      if(state?.image) {
        state.image = {
          ...state.image,
          raw_format: null,
          db_format: null,
          online: true,
        }
      } else {
        state.image = {
          keyToRemove: payload.db_format.key,
          raw_format: null,
          db_format: null,
          online: true,
        }
      }
    },
    removeCheckEditorFile(state, { payload: { files, indexToRemove }}) {
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
    .addCase(addImageToCheckEditorThunk.fulfilled, (state, { payload }) => {
      if(!payload) return null;
      // Se sono state già effettuate delle modifiche allo state che comprendono image:
      if(state?.image) { state.image = { ...state.image, ...payload }}
      else { state.image = { ...payload } }
    })
    .addCase(addFileToCheckEditorThunk.fulfilled, (state, { payload }) => {
      if(!payload) return null;
      // Se sono state già effettuate delle modifiche allo state che comprendono files:
      if(state?.files) {
        state.files = state.files.concat(payload)
      } else {
        state.files = [payload]
      }
    })
    // Matchers for validations -----------------------------------------------------------------------------------------------------------------------------------------------------
    .addMatcher(isCheckDateChangedFromEditor, (state, { payload }) => {
      const result = checkValidityDate(payload);
      state.validation = { ...state?.validation, [result.id]: result }
    })
    .addMatcher(isCheckIbanChanged, (state, { payload }) => {
      const result = checkIbanValidity(payload);
      state.validation = { ...state?.validation, [result.id]: result }
    })
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  changeCheckEditorStatus,
  changeCheckEditorCheckOrder,
  changeCheckEditorDocsRef,
  changeCheckEditorKeyDocNum,
  changeCheckEditorForm,
  removeCheckEditorImage,
  removeCheckEditorFile,
  resetCheckContentEditor,
  resetCheckEditor,
  resetCheckEditorOrder,
} = checkEditorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectCheckEditor = ({ checks: { editor }}) => editor;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default checkEditorSlice.reducer;