import { createSlice } from "@reduxjs/toolkit";
import { starterWindow, windowOppositeTypes } from "../../customers/libs/constants";
import { reformattedWindows } from "../../customers/libs/helpers";

const companyInitialState = {
  name: "",
  vatNumber: "",
  fiscalCode: "",
  location: {},
  city: "",
  address: "",
  emails: [{ name: "", value: ""}],
  phones: [{ name: "", value: ""}],
  pec: "",
  uniqueCode: "",
  trades: []
}

const warehouseInitialState = {
  name: "",
  type: "FRIGO",
  location: {},
  windows: reformattedWindows([{ ...starterWindow, type: "CARICO" }, { ...starterWindow, type: "SCARICO" }]),
  specialization: "GENERALE",
  scope: [],
  maxLength: "20",
  tools: [],
  automationLevel: "LOW",
  note: ""
}

const initialState = {
  company: companyInitialState,
  warehouses: [warehouseInitialState],
  selectedWarehouse: 0,
  validation: { company: [], warehouses: [] }
}

export const subscribeSlice = createSlice({
  name: "subscribeSlice",
  initialState,
  reducers: {
    resetSubscribeSlice: () => initialState,
    // Company ------------------------------------------------------------------------------------------------------------------------------
    changeSubscribeCompany(state, { payload }) {
      state.company[payload.name] = payload.value
    },
    changeSubscribeCompanyLocation(state, { payload }) {
      if(!payload) {
        state.company.location = {};
        state.company.address = "";
        state.company.city = "";
      } else {
        state.company.location = payload;
        state.company.address = payload.address;
        state.company.city = payload.city;
      }
    },
    addEmailToSubscribeCompany(state) {
      if(state.company.emails.length <= 3) {
        state.company.emails.push({ name: "", value: ""})
      }
    },
    changeEmailSubscribeCompany(state, { payload: { index, target, val }}) {
      state.company.emails[index][target] = val;
    },
    removeEmailToSubscribeCompany(state, { payload }) {
      if(state.company.emails.length > 1) {
        state.company.emails.splice(payload, 1);
      }
    },
    addPhoneToSubscribeCompany(state) {
      if(state.company.phones.length <= 3) {
        state.company.phones.push({ name: "", value: ""})
      }
    },
    changePhoneSubscribeCompany(state, { payload: { index, target, val }}) {
      state.company.phones[index][target] = val;
    },
    removePhoneToSubscribeCompany(state, { payload }) {
      if(state.company.phones.length > 1) {
        state.company.phones.splice(payload, 1);
      }
    },
    // Warehouse ------------------------------------------------------------------------------------------------------------------------------
    changeSubscribeSelectedWarehouse(state, { payload }) {
      state.selectedWarehouse = payload;
    },
    changeSubscribeWarehouse(state, { payload }) {
      if(payload.data.name === "scope" || payload.data.name === "tools") {
        if(state.warehouses[state.selectedWarehouse][payload.data.name].includes(payload.data.value)) {
          state.warehouses[state.selectedWarehouse][payload.data.name] = state.warehouses[state.selectedWarehouse][payload.data.name].filter(sc => sc !== payload.data.value)
        } else {
          state.warehouses[state.selectedWarehouse][payload.data.name].push(payload.data.value)
        }
      } else {
        state.warehouses[state.selectedWarehouse][payload.data.name] = payload.data.value
      }
    },
    changeSubscribeLocationWarehouse(state, { payload }) {
      if(payload.data) {
        state.warehouses[state.selectedWarehouse].location = payload.data;
      }
    },
    addSubscribeWarehouse(state) {
      state.warehouses.push(warehouseInitialState);
      state.selectedWarehouse = state.warehouses.length - 1;
    },
    removeSubscribeWarehouse(state, { payload }) {
      if(payload) { // impossibile eliminare il primo magazzino
        state.warehouses.splice(payload, 1);
        state.selectedWarehouse = payload - 1;
      }
    },
    copyPasteSubscribeWindow(state, { payload }) {
      if(payload) {
        state.warehouses[state.selectedWarehouse].windows = {
          ...state.warehouses[state.selectedWarehouse].windows,
          [windowOppositeTypes[payload].toUpperCase()]: state.warehouses[state.selectedWarehouse].windows[payload].map(wind => ({ ...wind, type: windowOppositeTypes[payload]}))
        }
      }
    },
    updateSubscribeWindow(state, { payload }) {
      /*
        Types: 
        remove_window: type, index, windowType
        toggle_day: type, value, windowType, index
        windows_time | start: type, name, value, windowType, index
        windows_time | end: type, name, value, windowType, index
      */

      let target = state.warehouses[state.selectedWarehouse].windows[payload.windowType];
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
    addSubscribeWindow(state, { payload }) {
      if(payload) {
        let target = state.warehouses[state.selectedWarehouse].windows[payload];
        if(target?.length <= 1) {
          target.push({ ...starterWindow, type: payload });
        }
      }
    },
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetSubscribeSlice,
  changeSubscribeCompany,
  changeSubscribeCompanyLocation,
  addEmailToSubscribeCompany,
  addPhoneToSubscribeCompany,
  removeEmailToSubscribeCompany,
  removePhoneToSubscribeCompany,
  changeEmailSubscribeCompany,
  changePhoneSubscribeCompany,
  changeSubscribeSelectedWarehouse,
  changeSubscribeWarehouse,
  changeSubscribeLocationWarehouse,
  addSubscribeWarehouse,
  removeSubscribeWarehouse,
  copyPasteSubscribeWindow,
  updateSubscribeWindow,
  addSubscribeWindow,
} = subscribeSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectSubscribeCompany = ({ subscribe: { company }}) => company;
export const selectSubscribeWarehousesList = ({ subscribe: { warehouses }}) => warehouses;
export const selectSubscribeWarehouse = ({ subscribe: { warehouses, selectedWarehouse }}) => warehouses[selectedWarehouse];
export const selectSelectedSubcribeWarehouse = ({ subscribe: { selectedWarehouse }}) => selectedWarehouse;
export const selectSubscribeContacts = ({ subscribe: { contacts }}) => contacts;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default subscribeSlice.reducer;