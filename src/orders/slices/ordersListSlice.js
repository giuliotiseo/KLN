import { createSlice } from "@reduxjs/toolkit";
import { endOfMonth, sub } from "date-fns";

export const DEFAULT_ORDER_LIMIT = 20;
export const EXCLUDED_STATUS_FOR_TRAVEL = ["PICKEDUP", "DELIVERING", "DELIVERED", "ARCHIVED"];

export const dataFiltersGenerator = (filters) => {
  let dataFilters = [{
    id: "id",
    value: true,
    operation: "attributeExists"
  }];

  if(filters?.senderName) {
    dataFilters.push({
      id: "senderName",
      value: filters.senderName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  if(filters?.carrierName) {
    dataFilters.push({
      id: "carrierName",
      value: filters.carrierName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  if(filters?.receiverName) {
    dataFilters.push({
      id: "receiverName",
      value: filters.receiverName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  if(filters?.pickupAddress) {
    dataFilters.push({
      id: "pickupAddress",
      value: filters.pickupAddress,
      operation: "contains"
    });
  }

  if(filters?.depotAddress) {
    dataFilters.push({
      id: "depotAddress",
      value: filters.depotAddress,
      operation: "contains"
    });
  }

  if(filters?.deliveryAddress) {
    dataFilters.push({
      id: "deliveryAddress",
      value: filters.deliveryAddress,
      operation: "contains"
    });
  }

  if(filters?.stamp) {
    dataFilters.push({
      id: "stamp",
      value: `ORD-${filters.stamp.toUpperCase()}`,
      operation: "eq"
    });
  }


  if(filters?.pickupDateStart && !filters?.pickupDateStart.includes(null)) {
    dataFilters.push({
      id: "pickupDateStart",
      value: [filters.pickupDateStart[0], filters.pickupDateStart[1]],
      operation: "between"
    });
  }

  if(filters?.deliveryDateStart && !filters?.deliveryDateStart.includes(null)) {
    dataFilters.push({
      id: "deliveryDateStart",
      value: [filters.deliveryDateStart[0], filters.deliveryDateStart[1]],
      operation: "between"
    });
  }

  if(filters?.shipmentType && filters?.shipmentType !== "ALL") {
    dataFilters.push({
      id: "shipmentType",
      value: filters.shipmentType,
      operation: "eq"
    });
  }

  if(filters?.quantity && !filters?.quantity.includes("")) {
    dataFilters.push({
      id: "quantity",
      value: filters.quantity.map(q => parseInt(q)),
      operation: "between"
    });
  }

  if(filters?.pickupStorageName) {
    dataFilters.push({
      id: "pickupStorageName",
      value: filters.pickupStorageName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  if(filters?.deliveryStorageName) {
    dataFilters.push({
      id: "deliveryStorageName",
      value: filters.deliveryStorageName.toUpperCase(),
      operation: "beginsWith"
    });
  }

  // Preparo i filtri generati
  let generatedFilter = dataFilters.length !== 0
    ? dataFilters.reduce((acc, filter) => ({
      ...acc,
      [filter.id]: {[filter.operation]: filter.value }
    }), {})
    : null;

  // Exclude status passed in filter (used for travel)
  if(filters?.status?.length > 0) {
    generatedFilter = { ...generatedFilter, and: [] };
    for(let i = 0; i < filters.status.length; i++) {
      generatedFilter.and.push({
        status: { ne: filters.status[i].toUpperCase() }
      });
    }
  }

  // Ritorno i filtri generati
  return generatedFilter;
}

const initialState = {
  type: "ALL",
  limit: 20,
  stamp: "",
  dateRange: [sub(new Date(), { months: 1 }).toISOString(), endOfMonth(new Date()).toISOString()],
  senderName: "",
  carrierName: "",
  receiverName: "",
  pickupStorageName: "",
  deliveryStorageName: "",
  status: "",
  filterStatus: [],
  pickupDateStart: [null, null],
  deliveryDateStart: [null, null],
  pickupAddress: "",
  deliveryAddress: "",
  depotAddress: "",
  quantity: ["", ""],
  sortDirection: 'DESC',
  nextToken: undefined,
}

export const ordersListSlice = createSlice({
  name: "ordersListSlice",
  initialState,
  reducers: {
    resetOrdersList() { return initialState },
    resetOrdersListFromTravel(state) {
      state.filterStatus = [ ...EXCLUDED_STATUS_FOR_TRAVEL ]
    },
    changeOrdersList(state, { payload }) { state[payload.key] = payload.value },
    changeOrdersListStamp(state, { payload }) { state.stamp = payload },
    changeOrdersListDateRange(state, { payload }) { state.dateRange = payload },
    changeOrdersListLimit(state, { payload }) { state.limit = payload },
    changeOrdersListSortDirection(state, { payload }) { state.sortDirection = payload },
    changeOrdersListNextToken(state, { payload }) { state.nextToken = payload }
  },
});


// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetOrdersList,
  resetOrdersListFromTravel,
  changeOrdersList,
  changeOrdersListStamp,
  changeOrdersListDateRange,
  changeOrdersListLimit,
  changeOrdersListSortDirection,
  changeOrdersListNextToken
} = ordersListSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectOrdersListLimit = ({ orders: { list }}) => list.limit;
export const selectOrdersListSortDirection = ({ orders: { list }}) => list.sortDirection;
export const selectOrdersListStamp = ({ orders: { list }}) => list?.stamp ? list.stamp : undefined;
export const selectOrdersListNextToken = ({ orders: { list }}) => list?.nextToken ? list.nextToken : undefined;
export const selectOrdersListStart = ({ orders: { list }}) => list?.dateRange?.[0];
export const selectOrdersListEnd = ({ orders: { list }}) => list?.dateRange?.[1];
export const selectOrdersListFilterObject = ({ orders: { list }}) => {
  return ({
    senderName: list.senderName,
    carrierName: list.carrierName,
    receiverName: list.receiverName,
    pickupStorageName: list.pickupStorageName,
    deliveryStorageName: list.deliveryStorageName,
    pickupAddress: list.pickupAddress,
    deliveryAddress: list.deliveryAddress,
    depotAddress: list.depotAddress,
    status: list.filterStatus,
    stamp: list.stamp,
    pickupDateStart: list.pickupDateStart,
    deliveryDateStart: list.deliveryDateStart,
    quantity: list.quantity,
  })
}

export const selectOrdersListFilter = ({ orders: { list }}) => {
  let filter = dataFiltersGenerator({
    senderName: list.senderName,
    carrierName: list.carrierName,
    receiverName: list.receiverName,
    pickupAddress: list.pickupAddress,
    deliveryAddress: list.deliveryAddress,
    pickupStorageName: list.pickupStorageName,
    deliveryStorageName: list.deliveryStorageName,
    status: list.filterStatus,
    stamp: list.stamp,
    pickupDateStart: list.pickupDateStart,
    deliveryDateStart: list.deliveryDateStart,
    quantity: list.quantity,
  });

  return filter;
};


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default ordersListSlice.reducer;
