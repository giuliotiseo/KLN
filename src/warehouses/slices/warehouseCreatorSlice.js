import { createSlice } from "@reduxjs/toolkit";
import { starterWindow, windowOppositeTypes } from "../libs/constants";

const reformattedWindows = (windows) => windows.length > 0
  ? windows.reduce((acc, val) => {
    return ({ 
      ...acc, 
      [val?.type || "CARICO"]: acc[val?.type || "CARICO"] 
        ? [...acc[val?.type || "CARICO"], val] 
        : [val]
    })
  }, {})
  : {};

const initialState = {
  name: "",
  contacts: [],
  contactIds: [],
  specialization: "GENERALE",
  scope: [],
  maxLength: 20,
  tools: [],
  automationLevel: "LOW",
  type: "FRIGO",
  warehouseLinkId: "",
  windows: reformattedWindows([{ ...starterWindow, type: "CARICO" }, { ...starterWindow, type: "SCARICO" }]),
  location: {},
  isLinked: "NONE",
  linkedCompany: null,
  linkedWarehouses: [],
  linkedWarehouse: null,
  status: "ACTIVE"
}

export const warehouseCreatorSlice = createSlice({
  name: "warehouseCreatorSlice",
  initialState,
  reducers: {
    // Reset
    resetWarehouseCreator: () => initialState,
    // Content creator
    changeWarehouseCreatorForm(state, { payload }) {
      if(payload?.name === "scope" || payload?.name === "tools") {
        if(state[payload.name].includes(payload.value)) {
          state[payload.name] = state[payload.name].filter(sc => sc !== payload.value)
        } else {
          state[payload.name].push(payload.value)
        }
      } else {
        state[payload.name] = payload.value 
      }
    },
    changeWarehouseCreatorLocation(state, { payload }) {
      if(!payload) {
        state.location = {};
      } else {
        state.location = payload;
      }
    },
    copyPasteWarehouseCreatorWindows(state, { payload }) {
      if(payload) {
        state.windows = {
          ...state.windows,
          [windowOppositeTypes[payload].toUpperCase()]: state.windows[payload].map(wind => ({ ...wind, type: windowOppositeTypes[payload]}))
        }
      }
    },
    addWarehouseCreatorWindow(state, { payload }) {
      if(payload) {
        let target = state.windows[payload];
        if(target?.length <= 1) {
          target.push({ ...starterWindow, type: payload });
        }
      }
    },
    changeWarehouseCreatorWindow(state, { payload }) {
      /*
        Types: 
        remove_window: type, index, windowType
        toggle_day: type, value, windowType, index
        windows_time | start: type, name, value, windowType, index
        windows_time | end: type, name, value, windowType, index
      */

      let target = state.windows[payload.windowType];
      let window_target = target[payload.index];

      if(payload?.type) {
        if(payload.type === "remove_window") {
          target.splice(payload.index, 1);
        }

        if(payload.type === "toggle_day") {
          window_target.days = window_target.days.includes(parseInt(payload.value))
            ?  window_target.days.filter(d => d !== parseInt(payload.value)).sort()
            :  window_target.days.concat(parseInt(payload.value)).sort();
        }

        if(payload.type === "windows_time" && payload?.name) {
          window_target[payload.name] = payload.value;
        }
      }
    },
    changeWarehouseCreatorContacts(state, { payload }) {
      if(state.contactIds.includes(payload.id)) {
        const targetIndex = state.contactIds.indexOf(payload.id);
        state.contacts = state.contacts.filter(contact => contact.contactId !== payload.id);
        state.contactIds.splice(targetIndex, 1);
      } else {
        state.contacts.push({
          contactId: payload.id,
          name: `${payload.name} ${payload.surname}`,
          email: payload?.email,
          phone: payload?.phone,
          job: payload?.job
        });

        state.contactIds.push(payload.id);
      }
    },
    changeWarehouseCreatorIsLinked(state, { payload }) {
      return {
        ...initialState,
        isLinked: payload
      }
    },
    changeWarehouseCreatorLinkedCompany(state, { payload }) {
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
    changeWarehouseCreatorLinkedWarehouse(state, { payload }) {
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
  resetWarehouseCreator,
  copyPasteWarehouseCreatorWindows,
  addWarehouseCreatorWindow,
  changeWarehouseCreatorLocation,
  changeWarehouseCreatorWindow,
  changeWarehouseCreatorForm,
  changeWarehouseCreatorContacts,
  changeWarehouseCreatorIsLinked,
  changeWarehouseCreatorLinkedCompany,
  changeWarehouseCreatorLinkedWarehouse
} = warehouseCreatorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectWarehouseCreator = ({ warehouses: { creator }}) => creator;
export const selectWarehouseCreatorIsLinked = ({ warehouses: { creator }}) => creator.isLinked;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default warehouseCreatorSlice.reducer;