import { createSlice } from "@reduxjs/toolkit";
import { endOfMonth, startOfMonth } from "date-fns";
import { statusOptions } from "../libs/helpers";

export const isPalletCreatorReversal = (action) => {
  if(action.type.includes('changePalletCreatorReversal') && action?.payload?.id) {
    return action.payload;
  }
}

const initialState = {
  showReversals: true,
  partitionKeyParam: "",
  carrierId: "",
  tenantCarrier: "",
  customerId: "",
  tenantCustomer: "",
  sortKeyParam: "",
  customerName: "", // old
  carrierName: null, //old
  carrier: null,
  customer: null,
  type: "TRADE",
  travelStamp: null,
  status: null,
  operationDate: [startOfMonth(new Date()).toISOString(), endOfMonth(new Date()).toISOString()],
  limit: 1000,
  items: [],
  nextToken: null,
  // Filters
  carrierValidation: null,
  customerValidation: null,
  loadFrom: null,
  loadTo: null,
  unloadFrom: null,
  unloadTo: null,
  reversalFrom: null,
  reversalTo: null,
}

export const palletsListSlice = createSlice({
  name: "palletsListSlice",
  initialState,
  reducers: {
    resetPalletsList: () => initialState,
    initPalletListParam(state, { payload }) {
      const companyKeyToQuery = `${payload.key}Id`;
      state.nextToken = null;
      state.partitionKeyParam = companyKeyToQuery;
      state[companyKeyToQuery] = payload.value;
    },
    changePalletsListOperationDateRange(state, { payload }) {
      const end = endOfMonth(new Date(payload)).toISOString();
      state.operationDate = [ payload, end ];
    },
    changePalletsListLimit(state, { payload }) { state.limit = payload },
    changePalletsListNextToken(state, { payload }) {
      if(payload) {
        state.nextToken = payload
      } else {
        state.nextToken = null
      }
    },
    changePalletsListShowReversals(state) { state.showReversals = !state.showReversals },
    changePalletsListCompanyName(state, { payload }) {
      if(!payload || !payload?.key || !payload?.value?.name) {
        state.customerName = "";
        state.carrierName = null;
      } else {
        state[payload.key] = payload.value.name
      }
    },
    changePalletsListCompany(state, { payload }) {
      if(!payload || !payload?.key || !payload?.value) {
        state.carrier = null;
        state.customer = null;
      } else {
        state[payload.key] = { ...payload.value, ...payload.value.company}
      }
    },
    changePalletsListType(state, { payload }) {
      state.type = payload;
    },
    changePalletsListTravelStamp(state, { payload }) {
      if(!payload) {
        state.travelStamp = null;
      } else {
        state.travelStamp = payload;
      }
    },
    changeCarrierValidationFilter(state, { payload }) {
      if(!statusOptions.includes(payload)) {
        state.carrierValidation = null;
      };

      state.carrierValidation = payload;
    },
    changeCustomerValidationFilter(state, { payload }) {
      if(!statusOptions.includes(payload)) {
        state.customerValidation = null;
      };
      
      state.customerValidation = payload;
    },
    changeLoadQuantityFrom(state, { payload }) {
      const value = parseInt(payload);
      if(typeof value !== "number") return;
      state.loadFrom = value;
    },
    changeLoadQuantityTo(state, { payload }) {
      const value = parseInt(payload);
      if(typeof value !== "number") return;
      state.loadTo = value;
    },
    changeUnloadQuantityFrom(state, { payload }) {
      const value = parseInt(payload);
      if(typeof value !== "number") return;
      state.unloadFrom = value;
    },
    changeUnloadQuantityTo(state, { payload }) {
      const value = parseInt(payload);
      if(typeof value !== "number") return;
      state.unloadTo = value;
    },
    changeReversalQuantityFrom(state, { payload }) {
      const value = parseInt(payload);
      if(typeof value !== "number") return;
      state.reversalFrom = value;
    },
    changeReversalQuantityTo(state, { payload }) {
      const value = parseInt(payload);
      if(typeof value !== "number") return;
      state.reversalTo = value;
    },
    clearLoadQuantityFilter(state) {
      state.loadFrom = null;
      state.loadTo = null;
    },
    clearUnloadQuantityFilter(state) {
      state.unloadFrom = null;
      state.unloadTo = null;
    },
    clearReversalQuantityFilter(state) {
      state.reversalFrom = null;
      state.reversalTo = null;
    }
  },
  extraReducers(builder) {
    builder
    // Matchers for validations -----------------------------------------------------------------------------------------------------------------------------------------------------
    // Se creo uno storno eseguo la lista per visualizzare le movimentazioni per quell'azienda
    .addMatcher(isPalletCreatorReversal, (state, { payload }) => {
      console.log("ma quindi", payload.company);
      state.customer = payload.company
    })
  }
});

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetPalletsList,
  initPalletListParam,
  changePalletsListOperationDateRange,
  changePalletsListLimit,
  changePalletsListNextToken,
  changePalletsListShowReversals,
  changePalletsListCompanyName,
  changePalletsListCompany,
  changePalletsListType,
  changePalletsListTravelStamp,
  changeCarrierValidationFilter,
  changeCustomerValidationFilter,
  changeLoadQuantityFrom,
  changeLoadQuantityTo,
  changeUnloadQuantityFrom,
  changeUnloadQuantityTo,
  changeReversalQuantityFrom,
  changeReversalQuantityTo,
  clearLoadQuantityFilter,
  clearUnloadQuantityFilter,
  clearReversalQuantityFilter
} = palletsListSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectPalletsListTenantCarrier = ({ pallets: { list }}) => list.tenantCarrier;
export const selectPalletsListCarrierId = ({ pallets: { list }}) => list.carrierId;
export const selectPalletsListOperationDateRange = ({ pallets: { list }}) => list.operationDate;
export const selectPalletsListPartitionKeyParam = ({ pallets: { list }}) => list.partitionKeyParam;
export const selectPalletsListSortKeyParam = ({ pallets: { list }}) => list?.sortKeyParam;
export const selectPalletsListLimit = ({ pallets: { list }}) => list.limit;
export const selectPalletsListNextToken = ({ pallets: { list }}) => list.nextToken;
export const selectPalletsListCarrierName = ({ pallets: { list }}) => list.carrierName;
export const selectPalletsListCustomerName = ({ pallets: { list }}) => list.customerName;
export const selectPalletsListType = ({ pallets: { list }}) => list.type;
export const selectPalletsListTravelStamp = ({ pallets: { list }}) => list.travelStamp;
export const selectPalletsListIsShowRev = ({ pallets: { list }}) => list.showReversals;
export const selectPalletsListPartitionKey = ({ pallets: { list }}) => {
  if(!list?.partitionKeyParam) {
    return {}
  };

  return {
    [`${list.partitionKeyParam}`]: list[`${list.partitionKeyParam}`]
  }
}

export const selectPalletsListFilters = ({ pallets: { list }}) => ({
  carrierValidation: list.carrierValidation,
  customerValidation: list.customerValidation,  
  loadFrom: list.loadFrom,
  loadTo: list.loadTo,
  unloadFrom: list.unloadFrom,
  unloadTo: list.unloadTo,
  reversalFrom: list.reversalFrom,
  reversalTo: list.reversalTo,
});

export const selectPalletsListCarrier = ({ pallets: { list }}) => list.carrier;
export const selectPalletsListCustomer = ({ pallets: { list }}) => list.customer;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default palletsListSlice.reducer;
