import { createSlice } from "@reduxjs/toolkit";
import { formatWindowsToApp, formatWindowsToDynamoDb } from "../../globals/libs/helpers";
import { starterWindow, windowOppositeTypes } from "../libs/constants";

const initialState = {}
export const warehouseEditorSlice = createSlice({
  name: "warehouseEditorSlice",
  initialState,
  reducers: {
    // Reset
    resetWarehouseEditor: () => initialState,
    // Content creator
    changeWarehouseEditorForm(state, { payload }) {
      if(payload?.name === "scope" || payload?.name === "tools") {
        if(payload?.prev?.includes(payload.value)) {
          state[payload.name] = payload.prev.filter(sc => sc !== payload.value)
        } else {
          state[payload.name] = payload?.prev?.length > 0
            ? [...payload.prev, payload.value]
            : [ payload.value ]
        }
      } else {
        state[payload.name] = payload.value 
      }
    },
    changeWarehouseEditorLocation(state, { payload }) {
      if(!payload) {
        state.location = {};
      } else {
        state.location = payload;
      }
    },
    copyPasteWarehouseEditorWindows(state, { payload }) {
      if(payload) {
        state.windows = {
          ...state.windows,
          [windowOppositeTypes[payload].toUpperCase()]: state.windows[payload].map(wind => ({ ...wind, type: windowOppositeTypes[payload]}))
        }
      }
    },
    addWarehouseEditorWindow(state, { payload }) {
      if(payload?.windowType) {
        let windows_array = formatWindowsToDynamoDb(payload.windows);
        windows_array.push({ ...starterWindow, type: payload.windowType })
        state.windows = formatWindowsToApp(windows_array);
      }
    },
    removeWarehouseEditorWindow(state, { payload }) {
      state.windows[payload.windowType].splice(payload.index, 1);
    },
    // Basic changes related to order
    changeWarehouseEditorWindow(state, { payload }) {
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
    changeWarehouseEditorContacts(state, { payload }) {
      const { value, prev, prevIds } = payload;
      if(prevIds.includes(value.id)) {
        state.contacts = prev.filter(contact => contact.contactId !== value.id);
        state.contactIds = prevIds.filter(id => id !== value.id)
      } else {
        let contacts = prev?.length > 0 ? prev : [];
        contacts.push({
          contactId: value.id,
          name: `${value.name} ${value.surname}`,
          email: value?.email,
          phone: value?.phone,
          job: value?.job
        });

        if(state?.contactIds?.length > 0) {
          state.contactIds.push(value.id);
        } else {
          state.contactIds = [value.id];
        }

        state.contacts = contacts;
        state.contactIds = state.contacts.map(contact => contact.contactId)
      }
    },
    changeWarehouseEditorIsLinked(state, { payload }) {
      return {
        ...initialState,
        isLinked: payload
      }
    },
    changeWarehouseEditorLinkedCompany(state, { payload }) {
      if(state.isLinked) {
        if(payload?.companyId) {
          state.linkedCompany = {
            id: payload.companyId,
            name: payload.name,
            vatNumber: payload.company.vatNumber,
            city: payload.company.location.city,
            province: payload.company.location.province,
          };
        } else {
          state.linkedCompany = null;
          state.linkedWarehouses = [];
          state.linkedWarehouse = null;
        }
      } else {
        state.linkedCompany = null;
        state.linkedWarehouses = [];
        state.linkedWarehouse = null;
      }
    },
    changeWarehouseEditorLinkedWarehouse(state, { payload }) {
      if(state.isLinked) {
        if(state?.linkedWarehouse?.id === payload.id) {
          state.linkedWarehouse = null;
        } else {
          state.linkedWarehouse = payload;
          state.name = payload.name;
        }
      } else {
        state.linkedWarehouse = null;
      }
    }
  },
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetWarehouseEditor,
  copyPasteWarehouseEditorWindows,
  addWarehouseEditorWindow,
  removeWarehouseEditorWindow,
  changeWarehouseEditorLocation,
  changeWarehouseEditorWindow,
  changeWarehouseEditorForm,
  changeWarehouseEditorContacts,
  changeWarehouseEditorIsLinked,
  changeWarehouseEditorLinkedCompany,
  changeWarehouseEditorLinkedWarehouse
} = warehouseEditorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectWarehouseEditor = ({ warehouses: { editor }}) => editor;
export const selectWarehouseEditorToUpdate = ({ warehouses: { editor }}) => {
  const dataToUpdate = { ...editor };
  if(Object.keys(editor).includes("windows")) {
    dataToUpdate.windows = formatWindowsToDynamoDb(dataToUpdate.windows)
  }

  return dataToUpdate;
};

export const selectWarehouseEditorIsLinked = ({ warehouses: { editor }}) => editor.isLinked;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default warehouseEditorSlice.reducer;