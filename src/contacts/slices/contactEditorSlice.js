import { createSlice } from "@reduxjs/toolkit";

const initialState = {}
export const contactEditorSlice = createSlice({
  name: "contactEditorSlice",
  initialState,
  reducers: {
    // Reset
    resetContactEditor: () => initialState,
    // Basic changes related to order
    changeContactEditorWindows(state, { payload }) {
      const { index, windowType, value, name } = payload;
      let windows = { ...payload.windows };
      if(name === "days") {
        windows[windowType] = [
          ...windows[windowType].slice(0, index),
          {
            ...windows[windowType][index],
            [name]: windows[windowType][index].days.includes(value)
              ? windows[windowType][index].days.filter(day => day !== value)
              : windows[windowType][index].days.concat(value)
          },
          ...windows[windowType].slice(index + 1)
        ];
      } else {
        windows[windowType] = [
          ...windows[windowType].slice(0, index),
          {
            ...windows[windowType][index],
            [name]: value
          },
          ...windows[windowType].slice(index + 1)
        ];
      }

      state.windows = windows;
    },
    changeContactEditorJob(state, { payload }) {
      if(state.jobId === payload.id) {
        state.job = {}
        state.jobId = "";
      } else {
        state.jobId = payload.id;
        state.job = {
          id: payload.id,
          name: payload.name
        }
      }
    },
    changeContactEditorEmployee(state, { payload }) {
      state.employee = payload.employee;
      state.job = payload.job
      state.jobId = payload?.job?.id || "";
    },
    // Content editor
    changeContactEditorForm(state, { payload }) {
      state[payload.name] = payload.value 
    },
  },
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetContactEditor,
  changeContactEditorJob,
  changeContactEditorEmployee,
  changeContactEditorWindows,
  changeContactEditorForm,
} = contactEditorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectContactEditor = ({ contacts: { editor }}) => editor;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default contactEditorSlice.reducer;