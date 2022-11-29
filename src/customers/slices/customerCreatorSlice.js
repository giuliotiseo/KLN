import { createSlice } from "@reduxjs/toolkit";
import { getCompaniesByVatThunk } from "../api/thunks/getCompaniesByVatThunk";
import { toast } from "react-toastify";
import { formatWindowsToApp } from "../../globals/libs/helpers";

const initialState = {
  status: null,
  companies: null,
  searchedVat: "",
  selectedCustomer: null
}

export const customerCreatorSlice = createSlice({
  name: "customerCreatorSlice",
  initialState,
  reducers: {
    changeCreatorSelectedCustomer(state, { payload }) {
      console.log('Payload', payload);
      if(payload === state?.selectedCustomer?.id) {
        state.selectedCustomer = null;
      } else {
        const customer = state.companies.filter(c => c.id === payload)?.[0];
        state.selectedCustomer = {
          ...customer,
          emails: customer.emails.map(em => ({ ...em, imported: true })),
          phones: customer.phones.map(ph => ({ ...ph, imported: true })),
          warehouses: customer.warehouses.items?.length > 0
            ? customer.warehouses.items.map(warehouse => ({
              ...warehouse,
              windows: formatWindowsToApp(warehouse.windows)
            }))
            : []
        };
      }
    },
    clearSelectedCustomer(state) {
      state.companies = null;
    },
    clearCustomerCreator(state) {
      state.status = initialState.status;
      state.companies = initialState.companies;
      state.searchedVat = initialState.searchedVat;
      state.selectedCustomer = initialState.selectedCustomer;
    },
  },
  extraReducers(builder) {
  builder
    .addCase(getCompaniesByVatThunk.pending, (state) => {
      state.status = "loading"
    })
    .addCase(getCompaniesByVatThunk.fulfilled, (state, { payload }) => {
      state.status = "success";
      console.log("Payload", payload);
      if(!payload?.[0]?.vatNumber) {
        toast.info(`L'azienda ricercata non è presente nel sistema. Compila il form per crearla da zero.`);
        state.status = "manual-compiling"
      } else {
        state.searchedVat = payload[0].vatNumber;
        state.companies = payload;
      }
    })
    .addCase(getCompaniesByVatThunk.rejected, (state, { payload: { error }}) => {
      state.status = "error";
      state.companies = null
      if(error?.payload === "NO_DATA") {
        toast.info(`L'azienda ricercata non è presente nel sistema. Compila il form per crearla da zero.`);
        state.status = "manual-compiling"
      } else {
        toast.error(`Impossibile effettuare la ricerca`);
      }
    })
  }
});


// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  changeCreatorSelectedCustomer,
  clearSelectedCustomer,
  clearCustomerCreator,
} = customerCreatorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectCustomerCreatorCompanies = ({ customers: { creator }}) => creator.companies;
export const selectedCustomerCreatorSearched = ({ customers: { creator }}) => creator.searchedVat;
export const selectCustomerCreatorStatus = ({ customers: { creator }}) => creator.status;
export const selectCustomerCreatorSelectedCustomer = ({ customers: { creator }}) => creator.selectedCustomer;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default customerCreatorSlice.reducer;