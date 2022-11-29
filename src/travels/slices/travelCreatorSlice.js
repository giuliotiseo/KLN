import { createSlice } from "@reduxjs/toolkit";
import { endOfMonth, sub } from "date-fns";
import { toast } from "react-toastify";
import { formatWindowsToDynamoDb, removeDuplicates, round } from "../../globals/libs/helpers";
import { addTravelCreatorOperationThunk, removeTravelCreatorOperationThunk } from "../api/travels-thunks";
import { addOrderToWaypoint, removeOrderFromWaypoint } from "../libs/helpers";

// Slice reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
const formatWarehouseToCheckpoint = warehouse => {
  return {
    warehouseId: warehouse.id,
    extId: warehouse.extId,
    thirdCompanyId: warehouse?.thirdCompanyId,
    thirdCompanyOwner: warehouse?.thirdCompanyOwner,
    thirdCompanyName: warehouse?.thirdCompanyName,
    thirdCompanyVat: warehouse?.thirdCompanyVat,
    name: warehouse?.name,
    contacts: warehouse?.contacts,
    maxLength: warehouse?.maxLength,
    tools: warehouse?.tools,
    note: warehouse?.note,
    windows: formatWindowsToDynamoDb(warehouse?.windows),
    location: {
      ...warehouse.location,
      coordinate: {
        lat: warehouse.location.coordinate[0],
        lng: warehouse.location.coordinate[1]
      }
    }
  }
}

const initialFilter = {
  status: ["PICKEDUP", "DELIVERING", "DELIVERED"],
  shipmentType: "ALL",
  senderName: "",
  receiverName: "",
}

const initialState = {
  createdAtRange: [sub(new Date(), { months: 1 }).toISOString(), endOfMonth(new Date()).toISOString()],
  departureDate: null,
  towingVehicle: null,
  towedVehicle: null,
  driver: null,
  estimatedTravelTime: "", // es. 23 h 47 min
  estimatedTravelLength: "", // es. 843,00 Km
  start: null,
  ordersIds: [],
  orders: [], // da tradurre in waypoints successivamente,
  waypoints: {},
  waypointsForesight: {},
  orderDetails: null,
  end: null,
  travelType: "",
  note: "",
  directions: null,
  filter: initialFilter
}

export const travelCreatorSlice = createSlice({
  name: "travelCreatorSlice",
  initialState,
  reducers: {
    // Reset fields
    resetTravelCreator: () => initialState,
    // Orders section (picker)
    addTravelCreatorOperation(state, { payload: { order, waypoints }}) {
      if(!order?.id) return;
      state.ordersIds = removeDuplicates(state.ordersIds.concat(order.id));
      state.orders = { ...state.orders, [order.id]: order };
      const newWaypoints = addOrderToWaypoint(waypoints, order)
      state.waypoints = newWaypoints.waypoints;
    },
    removeTravelCreatorOperation(state, { payload: { order, waypoints }}) {
      if(!order) return;
      // Remove orders from add orders list
      if(order?.indexOp === 0) {
        state.ordersIds = state.ordersIds.filter(id => id !== order.id);
        delete state.orders[order.id];
      } else {
        state.orders[order.id].indexOp = order.indexOp -1
      }

      const { waypoints: inputWaypoints } = removeOrderFromWaypoint(waypoints, order);
      state.waypoints = inputWaypoints;
    },
    changeTravelCreatorOrderDetails(state, { payload }) {
      if(!payload?.id) {
        state.orderDetails = null
      } else {
        state.orderDetails = payload;
      }
    },
    changeTravelCreatorCreatedAtRange(state, { payload }) {
      state.createdAtRange = payload
    },
    // Waypoint section
    changeTravelCreatorStart(state, { payload }) {
      if(!payload) {
        state.start = null
      } else {
        state.start = formatWarehouseToCheckpoint(payload);
      } 
    },
    changeTravelCreatorEnd(state, { payload }) {
      if(!payload) {
        state.end = null
      } else {
        state.end = formatWarehouseToCheckpoint(payload);
      } 
    },
    changeTravelCreatorDriver(state, { payload }) {
      if(!payload?.value) {
        state.driver = null
      } else {
        state.driver = payload.value;
      } 
    },
    changeTravelCreatorTowingVehicle(state, { payload }) {
      if(!payload) {
        state.towingVehicle = null
      } else {
        state.towingVehicle = payload;
      } 
    },
    changeTravelCreatorTowedVehicle(state, { payload }) {
      if(!payload) {
        state.towedVehicle = null
      } else {
        state.towedVehicle = payload;
      } 
    },
    // Info section
    changeTravelCreatorTravelType(state, { payload }) {
      if(!payload) {
        state.travelType = null
      } else {
        state.travelType = payload;
      } 
    },
    changeTravelCreatorDepartureDate(state, { payload }) {
      if(!payload) {
        state.departureDate = null
      } else {
        state.departureDate = payload;
      } 
    },
    changeTravelCreatorTimeLength(state, { payload }) {
      if(!payload) {
        state.waypointsForesight = {};
        state.end.distance = "";
        state.end.time = "";
        state.estimatedTravelLength = "";
        state.estimatedTravelTime = "";
        return state;
      }

      const { totalTime, totalLength, timeLegs, distanceLegs } = payload;
      const waypointsTimeLegs = timeLegs.splice(0, timeLegs.length - 1);
      const waypointsDistanceLegs = distanceLegs.splice(0, distanceLegs.length - 1);
      const waypoints_ids = Object.keys(state.waypoints);
      state.estimatedTravelLength = totalLength;
      state.estimatedTravelTime = totalTime;
      state.end.distance = distanceLegs.at(-1);
      state.end.time = timeLegs.at(-1)
      state.waypointsForesight = waypoints_ids.reduce((acc, val, index) => ({
        ...acc,
        [val]: { distance: waypointsDistanceLegs[index], time: waypointsTimeLegs[index]}
      }), {});
    },
    changeTravelCreatorDirections(state, { payload }) {
      if(!payload) {
        state.directions = null;
      } else {
        state.directions = payload;
      }
    },
    // Filters
    changeTravelCreatorFilterOrders(state, { payload }) {
      if(!payload.key) return state;
      if(payload.key === "status") {
        if(payload.value === "ALL") {
          state.filter[payload.key] = ["PICKEDUP", "DELIVERING", "DELIVERED"];
        } else {
          state.filter[payload.key] = ["PICKEDUP", "DELIVERING", "DELIVERED"].concat(payload.value);
        }
      } else {
        state.filter[payload.key] = payload.value;
      }
    },
    resetTravelCreatorFilter(state) {
      state.filter = {...initialFilter};
    }
  },
  extraReducers(builder) {
    builder
    .addCase(addTravelCreatorOperationThunk.fulfilled, (state, { payload: { order, waypoints }}) => {
      if(!order?.id) return;
      state.ordersIds = removeDuplicates(state.ordersIds.concat(order.id));
      state.orders = { ...state.orders, [order.id]: order };
      state.waypoints = waypoints;
    })
    .addCase(removeTravelCreatorOperationThunk.fulfilled, (state, { payload: { order, waypoints }}) => {
      const orderId = order?.orderId || order?.id;
      if(!order || !orderId) return;
      let rebuildWaypoints = { ...waypoints };

      /*
        * Remove orders from waypoints and orders list
      */

      /* 
        Intercetto il momento in cui l'utente elimina un carico dopo aver inserito anche il relativo scarico
        Nel caso in cui questo dovesse avvenire, devo eliminare sia il carico, sia lo scarico e allertare
        l'utente che quest'operazione è stata eseguita automaticamente.
      */
        if(order?.operationValue === 0 || order?.indexOp === 0) {
        // Controllo se l'ordine nello stack presenta il valore 1 come indexOp, che indica la presenza di carico e scarico nella tabella di marcia
        if(state.orders[orderId].indexOp === 1) {
          // Raggruppo tutti gli id dei waypoints
          const waypointsIdx = Object.keys(rebuildWaypoints);
          // Mappo gli id dei waypoints per avere un array di id di waypoint con all'interno un array di id di ordini
          const ordersInWaypoints = waypointsIdx.map(wp => rebuildWaypoints[wp].map(el => el.orderId));
          // Inizializzo la variabile che mi permette di tracciare la posizione dell'ordine di scarico e il relativo controllo sul ciclo
          let foundWaypointIndex = null;
          let isFoundWp = false;
          // Ciclo tutti i waypoint
          ordersInWaypoints.forEach((ord, index) => {
            // Osservo tutti gli id ordine in ciascun waypoint
            ord.forEach((item) => {
              // Se trovo la coincidenza con l'id dell'ordine di carico che sto rimuovendo mi salvo l'index del waypoint su cui dovrò andare ad agire 
              if(!isFoundWp && item === orderId) {
                foundWaypointIndex = index;
                isFoundWp = true;
              }
            })
          });

          // Ricostruisco il waypoint eliminando l'ordine di scarico
          const newWaypoint = rebuildWaypoints[waypointsIdx[foundWaypointIndex]]
            .filter(el => el.orderId !== orderId)
            .reduce((acc, val) => ({
              ...acc,
              [val.id]: val
            }), {});

          // Se il nuovo waypoint aveva solo l'ordine di scarico e ora è vuoto, elimino completamente la chiave
          if(Object.keys(newWaypoint)?.length <= 0) {
            delete rebuildWaypoints[waypointsIdx[foundWaypointIndex]];
          } else {
            // ...altrimenti sovrascrivo il waypoint precedente con quello nuovo senza scarico
            rebuildWaypoints[waypointsIdx[foundWaypointIndex]] = [...Object.keys(newWaypoint).map(wp_id => newWaypoint[wp_id])];
          }

          // Informo l'utente dell'eliminazione automatica avvenuta
          toast.warn(`Lo scarico dell'ordine ${state.orders[orderId].stamp.split("-")[1]} previsto presso ${state.orders[orderId].receiverName} è stato rimosso in conseguenza dell'eliminazione del carico`);
        }

        state.ordersIds = state.ordersIds.filter(id => id !== orderId);
        delete state.orders[orderId];
      } else {
        state.orders[orderId].indexOp = order.indexOp - 1;
      }

      state.waypoints = Object.keys(rebuildWaypoints) ? rebuildWaypoints : {};
    })
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  resetTravelCreator,
  addTravelCreatorOperation,
  removeTravelCreatorOperation,
  changeTravelCreatorOrderDetails,
  changeTravelCreatorCreatedAtRange,
  changeTravelCreatorStart,
  changeTravelCreatorEnd,
  changeTravelCreatorDriver,
  changeTravelCreatorTowingVehicle,
  changeTravelCreatorTowedVehicle,
  changeTravelCreatorTravelType,
  changeTravelCreatorDepartureDate,
  changeTravelCreatorTimeLength,
  changeTravelCreatorDirections,
  changeTravelCreatorFilterOrders,
  resetTravelCreatorFilter
} = travelCreatorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectTravelCreator = ({ travels: { creator }}) => creator;
export const selectTravelCreatorOrdersIds = ({ travels: { creator }}) => creator.ordersIds;
export const selectTravelCreatorOrderDetails = ({ travels: { creator }}) => creator.orderDetails;
export const selectTravelCreatorOrders = ({ travels: { creator }}) => Object.keys(creator.orders).map(id => creator.orders[id]);
export const selectTravelCreatorWaypoints = ({ travels: { creator }}) => creator.waypoints;
export const selectTravelCreatorCreatedAtRange = ({ travels: { creator }}) => creator.createdAtRange;
export const selectTravelCreatorStart = ({ travels: { creator }}) => creator.start;
export const selectTravelCreatorEnd = ({ travels: { creator }}) => creator.end;
export const selectTravelCreatorDriver = ({ travels: { creator }}) => creator.driver;
export const selectTravelCreatorTowingVehicle = ({ travels: { creator }}) => creator.towingVehicle;
export const selectTravelCreatorTowedVehicle = ({ travels: { creator }}) => creator.towedVehicle;
export const selectTravelCreatorTravelType = ({ travels: { creator }}) => creator.travelType;
export const selectTravelCreatorDepartureDate = ({ travels: { creator }}) => creator.departureDate;
export const selectTravelCreatorTrip = ({ travels: { creator: { start, end, waypoints } }}) => {
  const startLocation = start?.location ? start.location : {};
  const endLocation = end?.location ? end.location : {};
  const waypointsList = Object.keys(waypoints)?.length > 0 
    ? Object.keys(waypoints).map(w_id => ({
        ...waypoints[w_id][0],
        coordinate: {
          lat: waypoints[w_id][0].coordinate[0],
          lng: waypoints[w_id][0].coordinate[1],
        }
    }))
    : [];

  return [].concat({...startLocation}).concat(...waypointsList).concat({...endLocation});
}

export const selectTravelCreatorForesightById = ({ travels: { creator }}, id) => creator.waypointsForesight?.[id] || null;
export const selectTravelCreatorOrderById = ({ travels: { creator }}, id) => creator.orders?.[id] || null;
export const selectTravelCreatorEstimatedTravelTime = ({ travels: { creator }}) => creator.estimatedTravelTime;
export const selectTravelCreatorEstimatedTravelLength = ({ travels: { creator }}) => creator.estimatedTravelLength;
export const selectTravelCreatorDirections = ({ travels: { creator }}) => creator.directions;
export const selectTravelCreatorIndexOp = ({ travels: { creator }}, orderId) => {
  if(!orderId) {
    return null;
  } else {
    const order_id = Object.keys(creator.orders).filter(id => id === orderId)[0];
    if(creator.orders[order_id]?.hasOwnProperty("indexOp")) {
      return creator.orders[order_id].indexOp;
    } else {
      return null
    }
  }
};

export const selectTravelCreatorFilterOrders = ({ travels: { creator }}) => creator.filter;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default travelCreatorSlice.reducer;