import { v4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";
import { endOfMonth, sub } from "date-fns";
import { addTravelEditorNewOperationThunk, addTravelEditorOperationThunk, removeTravelEditorOperationThunk } from "../api/travels-thunks";
import { TravelStatus } from "../libs/helpers";
import { toast } from "react-toastify";
import { removeDuplicates, round } from "../../globals/libs/helpers";

export const isTravelEditorChanged = (action) => {
  if(action.type.includes('changeTravelEditorForm')) {
    return action.payload;
  }
}

// Slice helpers -----------------------------------------------------------------------------------------------------------------------------------------------------
const isLoadingOperation = (order) => order?.operationValue === 0 ? true : false; 
const isUnloadingOperation = (order) => order?.operationValue === 1 ? true : false; 
const isEmptyWaypoint = (waypoint) => Object.keys(waypoint)?.length <= 0 ? true : false;
const isStoredPlan = (order, initialPlannedIds) => initialPlannedIds?.includes(order.plannedId) ? true : false;
const reshapeWaypointAfterRemoveOperation = (waypoints, orderId) => {
  // Inizializzo la variabile che mi permette di tracciare la posizione dell'ordine di scarico e il relativo controllo sul ciclo
  let foundWaypointIndex = null;
  let isFoundWp = false;
  // Raggruppo tutti gli id dei waypoints
  const waypointsIdx = Object.keys(waypoints);
  // Mappo gli id dei waypoints per avere un array di id di waypoint con all'interno un array di id di ordini
  const ordersInWaypoints = waypointsIdx.map(wp => waypoints[wp].map(el => el.orderId));
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

  // Ritorno i dati necessari allo slice
  return {
    waypointKeyTarget: waypointsIdx[foundWaypointIndex],
    // Ricostruisco il waypoint eliminando l'ordine di scarico
    newWaypoint: waypoints[waypointsIdx[foundWaypointIndex]]
      .filter(el => el?.orderId !== orderId)
      .reduce((acc, val) => ({
        ...acc,
        [val.id]: val
      }), {}),
  }
}

const findPlannedIdToRemove = (order, initialPlannedIds, plannedIdToRemove) => {
  let result = plannedIdToRemove?.length > 0 ? [...plannedIdToRemove] : [];
  if(initialPlannedIds.includes(order.plannedId) && !plannedIdToRemove.includes(order.plannedId)) {
    result.push(order.plannedId);
  }

  return result;
}

const updatePlannedIdToCreateAfterRemove = (order, initialPlannedIds, plannedIdToCreate) => {
  let result = plannedIdToCreate?.length > 0 ? [...plannedIdToCreate ] : [];
  if(!initialPlannedIds.includes(order.plannedId) && plannedIdToCreate.includes(order.plannedId)) {
    result = result.filter(id => id !== order.plannedId);
  }

  return result
}

const findPlannedIdToCreate = (order, initialPlannedIds, plannedIdToCreate) => {
  let result = plannedIdToCreate?.length > 0 ? [...plannedIdToCreate ] : [];
  if(!initialPlannedIds.includes(order.plannedId) && !plannedIdToCreate.includes(order.plannedId)) {
    result.push(order.plannedId);
  }

  return result;
}

const updatePlannedIdToRemoveAfterCreate = (order, initialPlannedIds, plannedIdToRemove) => {
  let result = plannedIdToRemove?.length > 0 ? [...plannedIdToRemove ] : [];
  if(initialPlannedIds.includes(order.plannedId) && plannedIdToRemove.includes(order.plannedId)) {
    result = result.filter(id => id !== order.plannedId);
  }

  return result;
}



// Slice reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
const operationToStatus = {
  "GROUPAGE#PICKUP": "PENDING",
  "GROUPAGE#LOAD_CARRIER": "STOCKED",
  "GROUPAGE#UNLOAD_CARRIER": "PENDING",
  "GROUPAGE#DELIVERY": "STOCKED",
  "DIRETTO#PENDING": "PENDING",
  "DIRETTO#DELIVERY": "PENDING"
} 

const initialFilter = {
  status: ["PICKEDUP", "DELIVERING", "DELIVERED"],
  shipmentType: "ALL",
  senderName: "",
  receiverName: "",
}

const initialState = {
  travel: null,
  ordersIds: [],
  orders: null,
  driver: null,
  towed: null,
  towing: null,
  start: {},
  waypoints: {},
  end: {},
  travelType: "",
  departureDate: null,
  estimatedTravelLength: null,
  estimatedTravelTime: null,
  selectedWaypointId: false,
  selectedCompany: null,
  removedPlannedIds: [],
  waypointsForesight: {},
  createdAtRange: [sub(new Date(), { months: 1 }).toISOString(), endOfMonth(new Date()).toISOString()],
  filter: initialFilter,
  selectedCheckpoint: null,
  pendingOrders: {},
  plannedIdToCreate: [],
  plannedIdToRemove: [],
  initialPlannedIds: [],
  orderDetails: null,
  changes: []
}

export const travelEditorSlice = createSlice({
  name: "travelEditorSlice",
  initialState,
  reducers: {
    // Init
    initTravelEditor(state, { payload }) {
      /* Scrivo gli ordini per mostrarli nell'elenco a sinistra tentando di riscriverlo nel formato del creator */
      /*
        Devo prendere travels orders e mergeare gli ordini all'interno di una singola scheda con le relative operazioni
      */

      // Inserisci tutti i plannedId all'interno di uno stack di id con cui dovrò confrontarmi quando effettuo operazione add o remove (vedi i thunk successivi)
      console.log("Todo: Inserisci tutti i plannedId all'interno di uno stack di id con cui dovrò confrontarmi quando effettuo operazione add o remove ");

      if(payload?.orders?.items?.length <= 0) return
      const orders = payload?.orders?.items?.filter(item => item.operationValue > 0)?.reduce((acc, val) => ({
        ...acc,
        [val.orderId]: {
          ...val.order,
          plannedId: val.id,
          operation: val.operation,
          operationValue: val.operationValue,
          status: operationToStatus[`${val.order.shipmentType}#${val.operation}`]
        }, 
      }), {});

      state.travel = payload;
      state.orders = orders;
      state.ordersIds = Object.keys(orders || {});
      state.initialPlannedIds = payload.orders.items.map(planned => planned.id);
      state.start = payload.start;
      state.end = payload.end;
      state.driver = payload.driver;
      state.travelType = payload.travelType;
      state.departureDate = payload.departureDate;
      state.waypoints = payload?.waypoints?.length > 0
        ? payload.waypoints.reduce((acc, val) => ({
            ...acc,
            [val.id]: acc?.[val.id]?.length > 0
              ? acc[val.id].concat(val.orders.map(order => ({
                  ...orders[order.orderId],
                  companyId: val.companyId,
                  companyName: val.companyName,
                  tenantCompany: val.tenantCompany,
                  checkpoint: val.checkpoint,
                  ...order,
                  valid: true,
                })))
              : val.orders.map(order => ({
                ...orders[order.orderId],
                companyId: val.companyId,
                companyName: val.companyName,
                tenantCompany: val.tenantCompany,
                checkpoint: val.checkpoint,
                ...order,
                valid: true,
              }))
          }), {})
        : {}
    },
    initTravelEditorPendingOrders(state, { payload }) {
      state.pendingOrders = payload;
    },
    // Basic add
    addEmptyWaypointAfterStart(state) {
      const newTempId = v4();

      let waypointsObjectArray = {
        [newTempId]: [{
          id: newTempId,
          valid: false
        }],
        ...state.waypoints,
      };

      state.waypoints = waypointsObjectArray;
      state.selectedWaypointId = newTempId;
      state.selectedCompany = null;
    },
    addEmptyWaypointToTravelEditor(state, { payload: { index, waypoints }}) {
      const newTempId = v4();

      let waypointsObjectArray = {
        ...waypoints,
        [newTempId]: [{
          id: newTempId,
          valid: false
        }]
      };

      let waypointsIds = Object.keys(waypoints);
      waypointsIds = [
        ...waypointsIds.slice(0, index + 1),
        newTempId,
        ...waypointsIds.slice(index + 1, waypointsIds.length)
      ];

      state.waypoints = waypointsIds.reduce((acc, val) => ({
        ...acc,
        [val]: waypointsObjectArray[val]
      }), {});

      state.selectedWaypointId = newTempId;
      state.selectedCompany = null;
    },
    // Basic changes related to order
    changeTravelEditorStatus(state, { payload }) {
      if(TravelStatus.includes(payload)) {
        state.status = payload 
        if(!state.changes.includes("status")) {
          state.changes.push("status");
        }
      }
    },
    // Content editor
    changeTravelEditorDriver(state, { payload }) {
      if(!payload?.value?.name) {
        return state;
      } else {
        state.driver = {
          username: payload?.value?.id,
          companyId: payload?.value?.jobId,
          job: payload?.value?.jobName,
          name: payload?.value?.searchable?.toUpperCase(),
          email: payload?.value?.email,
          phone: payload?.value?.phone,
          task: payload?.value?.type,
          tenant: payload?.value?.tenant,
        };

        if(!state.changes.includes("driver")) {
          state.changes.push("driver");
        }
      }
    },
    changeTravelEditorTowingVehicle(state, { payload }) {
      if(!payload) {
        state.towing = null;
      } else {
        state.towing = payload
      }

      if(!state.changes.includes("towing")) {
        state.changes.push("towing");
      }
    },
    changeTravelEditorTowedVehicle(state, { payload }) {
      if(!payload) {
        state.towed = null;
      } else {
        state.towed = payload
      }

      if(!state.changes.includes("towed")) {
        state.changes.push("towed");
      }
    },
    changeTravelEditorStart(state, { payload }) {
      if(!payload) {
        state.start = null;
      } else {
        state.start = {
          ...state.travel.start,
          checkpoint: {
            warehouseId: payload.id,
            name: payload.name,
            location: {
              ...payload.location,
              coordinate: [payload.location.coordinate.lat, payload.location.coordinate.lng]
            },
            contacts: payload.contacts,
            maxLength: payload.maxLength,
            tools: payload.tools,
            note: payload.note
          }
        };
      }

      if(!state.changes.includes("start")) {
        state.changes.push("start");
      }
    },
    changeTravelEditorEnd(state, { payload }) {
      if(!payload) {
        state.end = null;
      } else {
        state.end = {
          ...state.travel.end,
          checkpoint: {
            warehouseId: payload.id,
            name: payload.name,
            location: {
              ...payload.location,
              coordinate: [payload.location.coordinate.lat, payload.location.coordinate.lng]
            },
            contacts: payload.contacts,
            maxLength: payload.maxLength,
            tools: payload.tools,
            note: payload.note
          }
        };
      }

      if(!state.changes.includes("end")) {
        state.changes.push("end");
      }
    },
    changeTravelEditorSelectedCompany(state, { payload }) {
      if(!payload?.company) {
        return state;
      } else {
        state.waypoints[payload.waypoint[0].id] = payload.waypoint.map(wp => ({
          ...wp,
          companyName: payload.company.name,
          company: payload.company,
          availableCheckpoints: payload.company.warehouses.filter(warehouse => warehouse.status === 'ACTIVE'),
        }));
  
        state.selectedCompany = payload.company;
      }
    },
    changeTravelEditorSelectedCheckpoint(state, { payload }) {
      if(!payload?.checkpoint?.location?.place_id) {
        state.waypoints[payload.waypoint[0].id] = payload.waypoint.map(wp => ({
          id: wp.id,
          valid: false,
          availableCheckpoints: wp?.availableCheckpoints,
        }));

        state.selectedCheckpoint = null;
      } else {
        state.waypoints[payload.waypoint[0].id] = payload.waypoint.map(wp => ({
          ...wp,
          checkpoint: payload.checkpoint
        }));

        state.selectedCheckpoint = {
          ...payload.checkpoint,
          id: payload.checkpoint.location.place_id
        }
      }
    },
    changeTravelEditorSelectedWaypoint(state, { payload }) {
      console.log("Vedi payload", payload);
      if(state.selectedWaypointId === payload) {
        state.selectedWaypointId = null;
      } else {
        state.selectedWaypointId = payload;
        if(state.waypoints[payload][0].companyId) {
          state.selectedCompany = {
            id: state.waypoints[payload][0].companyId,
            name: state.waypoints[payload][0].companyName,
            tenant: state.waypoints[payload][0].tenantCompany,
          };
        }
  
        if(state.waypoints[payload][0].checkpoint) {
          state.selectedCheckpoint = state.waypoints[payload][0].checkpoint
        }
      }
    },
    // Reset
    resetTravelEditor: () => initialState,
    resetTravelEditorSelectedCompany(state, { payload }) {
      state.waypoints[payload.waypoint[0].id] = [{
        id: payload.waypoint[0].id,
        valid: false
      }];

      state.selectedWaypointId = false;
      state.selectedCompany = null;
      state.selectedCheckpoint = null;
    },
    removeEmptyWaypoint(state, { payload }) {
      state.selectedWaypointId = false;
      state.selectedCompany = null;
      state.selectedCheckpoint = null;
      delete state.waypoints[payload];
    },
    clearSelectedCompany(state) {
      state.selectedWaypointId = false;
      state.selectedCompany = null;
      state.selectedCheckpoint = null;
    },
    clearSelectedWaypoint(state) {
      state.selectedWaypointId = false;
      state.selectedCompany = null;
      state.selectedCheckpoint = null;
    },
    // Info section
    changeTravelEditorTravelType(state, { payload }) {
      if(!payload) {
        state.travelType = null
      } else {
        state.travelType = payload;
      }

      if(!state.changes.includes("travelType")) {
        state.changes.push("travelType");
      }
    },
    changeTravelEditorDepartureDate(state, { payload }) {
      if(!payload) {
        state.departureDate = null
      } else {
        state.departureDate = payload;
      }

      if(!state.changes.includes("departureDate")) {
        state.changes.push("departureDate");
      }
    },
    changeTravelEditorTimeLength(state, { payload }) {
      if(!payload) {
        state.waypointsForesight = {};
        state.end.estimatedLength = "";
        state.end.estimatedTime = "";
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
      state.end.estimatedLength = distanceLegs.at(-1);
      state.end.estimatedTime = timeLegs.at(-1)
      state.waypointsForesight = waypoints_ids.reduce((acc, val, index) => ({
        ...acc,
        [val]: { distance: waypointsDistanceLegs[index], time: waypointsTimeLegs[index]}
      }), {});

      if(!state.changes.includes("estimatedTravelTime")) {
        state.changes.push("estimatedTravelTime");
      }

      if(!state.changes.includes("estimatedTravelLength")) {
        state.changes.push("estimatedTravelLength");
      }
    },
    changeTravelEditorOrderDetails(state, { payload }) {
      if(!payload?.id) {
        state.orderDetails = null
      } else {
        state.orderDetails = payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addTravelEditorOperationThunk.fulfilled, (state, { payload: { order, waypoints }}) => {
        if(!order?.id) return;
        state.ordersIds = removeDuplicates(state.ordersIds.concat(order.id));
        state.orders = {
          ...state.orders,
          [order.id]: {
            ...order,
            orderStamp: order.stamp,
            operationValue: order.indexOp,
            valid: true,
          }
        };

        state.waypoints = waypoints;

        // Aggiungo il planned id a un elenco di plannedIds che dovrò creare/aggiornare al salvataggio
        if(state.initialPlannedIds.includes(order.plannedId)) {
          if(state.plannedIdToRemove.includes(order.plannedId)) {
            state.plannedIdToRemove = state.plannedIdToRemove.filter(id => id !== order.plannedId);
          }
        } else {
          if(!state.plannedIdToCreate.includes(order.plannedId)) {
            state.plannedIdToCreate.push(order.plannedId)
          }
        }

        if(!state.changes.includes("waypoints")) {
          state.changes.push("waypoints");
        }
      })
      .addCase(addTravelEditorNewOperationThunk.fulfilled, (state, { payload: {
        order,
        waypoints,
        newWaypoint
      }}) => {
        if(!order?.id) return;
        // Aggiungo l'ordine alla lista
        state.ordersIds = removeDuplicates(state.ordersIds.concat(order.id));
        const updatedOrder = {
          ...order,
          orderStamp: order.stamp,
          operationValue: order.indexOp,
          valid: true,
          plannedId: newWaypoint[0].plannedId
        }

        state.orders = {
          ...state.orders,
          [order.id]: updatedOrder
        };

        if(Object.keys(state.pendingOrders).includes(order.id)) {
          state.pendingOrders[order.id] = {
            ...state.pendingOrders[order.id],
            operationValue: order.indexOp,
            valid: true,
            orderStamp: order.stamp,
          }
        }

        state.waypoints = waypoints;
        state.selectedWaypointId = newWaypoint[0].id;

        // Aggiungo il planned id a un elenco di plannedIds che dovrò creare al salvataggio
        state.plannedIdToCreate = findPlannedIdToCreate(updatedOrder, state.initialPlannedIds, state.plannedIdToCreate);
        state.plannedIdToRemove = updatePlannedIdToRemoveAfterCreate(updatedOrder, state.initialPlannedIds, state.plannedIdToRemove);
      
        if(!state.changes.includes("waypoints")) {
          state.changes.push("waypoints");
        }
      })
      .addCase(removeTravelEditorOperationThunk.fulfilled, (state, { payload: { order, waypoints }}) => {
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

        // Se l'ordine che sto eliminando è un carico (operationValue === 0)
        if(isLoadingOperation(order)) {
          // Controllo se l'ordine contenuto nella collezione orders ha il valore 1 come operationValue, che indica la presenza di carico e scarico nella tabella di marcia
          if(isUnloadingOperation(state.orders[orderId])) {
            // Ricostruisco un nuovo waypoint escludendo l'operazione di scarico dell'ordine selezionato
            const { waypointKeyTarget, newWaypoint } = reshapeWaypointAfterRemoveOperation(rebuildWaypoints, orderId);
            
            // Se il nuovo waypoint aveva solo l'ordine di scarico e ora è vuoto, elimino completamente quella fermata
            if(isEmptyWaypoint(newWaypoint)) {
              delete rebuildWaypoints[waypointKeyTarget];
            } else {
              // ...altrimenti sovrascrivo il waypoint precedente con quello nuovo senza scarico
              rebuildWaypoints[waypointKeyTarget] = [...Object.keys(newWaypoint).map(wp_id => newWaypoint[wp_id])];
            }

            // Aggiorno elenco delle pianificazione da rimuovere e creare. Qui prendo in esame l'ordine di scarico che sto eliminando indirettamente
            state.plannedIdToRemove = findPlannedIdToRemove(state.orders[orderId], state.initialPlannedIds, state.plannedIdToRemove);
            state.plannedIdToCreate = updatePlannedIdToCreateAfterRemove(state.orders[orderId], state.initialPlannedIds, state.plannedIdToCreate);

            // Informo l'utente dell'eliminazione automatica avvenuta
            toast.warn(`Lo scarico dell'ordine ${state.orders[orderId].stamp.split("-")[1]} previsto presso ${state.orders[orderId].receiverName} è stato rimosso in conseguenza dell'eliminazione del carico`);
          }

          // Aggiorno l'elenco di id degli ordini, escludendolo completamente (essendo questa la rimozione di un carico, l'ordine non viene più preso in considerazione nell'elenco attuale di fermate)
          state.ordersIds = state.ordersIds.filter(id => id !== orderId);

          /* Se si tratta di un ordine che è stato aggiunto nel corso di questa sessione di edit (quindi ha la proprietà onTheFly),
             scegli di eliminare interamente l'ordine dallo stack.
          */
          if(state.orders[orderId]?.onTheFly) {
            delete state.orders[orderId];
          } else { // ...altrimenti elimina solo le proprietà che determinano la collocazione dell'ordine in tabella di marcia
            delete state.orders[orderId].operationValue;
            delete state.orders[orderId].operation;
            delete state.orders[orderId].plannedId;
          }
        } else {
          // Se l'ordine che sto eliminando NON è un carico, lo converto in carico nella collezione di ordini (che è sempre impostato sull'ultima operazione effettuata in tabella di marcia: operationValue 1 se vi è lo scarico, operationValue 0 se vi è solo il carico)
          state.orders[orderId].operationValue = order.operationValue - 1; 
        }
        
        // Aggiorno elenco delle pianificazione da rimuovere e creare. Qui prendo in esame la pianificazione ordine che sto eliminando attivamente
        state.plannedIdToRemove = findPlannedIdToRemove(order, state.initialPlannedIds, state.plannedIdToRemove);
        state.plannedIdToCreate = updatePlannedIdToCreateAfterRemove(order, state.initialPlannedIds, state.plannedIdToCreate);
        state.waypoints = Object.keys(rebuildWaypoints) ? rebuildWaypoints : {};

        if(!state.changes.includes("waypoints")) {
          state.changes.push("waypoints");
        }
      })
  }
})

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  initTravelEditor,
  initTravelEditorPendingOrders,
  resetTravelEditor,
  addEmptyWaypointAfterStart,
  addEmptyWaypointToTravelEditor,
  changeTravelEditorStatus,
  changeTravelEditorForm,
  changeTravelEditorDriver,
  changeTravelEditorTowingVehicle,
  changeTravelEditorTowedVehicle,
  changeTravelEditorStart,
  changeTravelEditorVehicle,
  changeTravelEditorEnd,
  changeTravelEditorSelectedWaypoint,
  changeTravelEditorSelectedCompany,
  resetTravelEditorSelectedCompany,
  removeEmptyWaypoint,
  changeTravelEditorSelectedCheckpoint,
  clearSelectedCompany,
  clearSelectedWaypoint,
  changeTravelEditorTimeLength,
  changeTravelEditorTravelType,
  changeTravelEditorDepartureDate,
  changeTravelEditorOrderDetails,
} = travelEditorSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectTravelEditor = ({ travels: { editor }}) => {
  const excludedKeys = ["createdAtRange", "filter", "orderDetails"];
  const validKeys = Object.keys(editor).filter(key => !excludedKeys.includes(key));
  return validKeys?.length > 0
    ? validKeys.reduce((acc, val) => ({ ...acc, [val]: editor[val] }), {})
    : {}
};

export const selectTravelEditorOrders = ({ travels: { editor }}) => editor.orders;
export const selectTravelEditorWaypoints = ({ travels: { editor }}) => editor.waypoints;
export const selectTravelEditorStart = ({ travels: { editor }}) => ({
  // ...editor?.travel?.start,
  driver: editor?.driver || editor?.travel?.driver,
  towing: editor?.towing 
    ? editor.towing 
    : editor?.travel?.licensePlate?.split("+")?.length > 0
      ? { licensePlate: editor.travel.licensePlate.split("+")[0] }
      : null,
  towed: editor?.towed 
    ? editor.towed 
    : editor?.travel?.licensePlate?.split("+")?.length === 2
      ? { licensePlate: editor.travel.licensePlate.split("+")[1] }
      : null,
  vehicleName: editor?.vehicleName || editor?.travel?.vehicleName,
  ...editor.start
});

export const selectTravelEditorEnd = ({ travels: { editor }}) => ({
  ...editor?.travel?.end,
  ...editor.end
});

export const selectIsTravelEdited = ({ travels: { editor }}) => Object.keys(editor).length ? true : false;
export const selectTravelEditorCreatedAtRange = ({ travels: { editor }}) => editor.createdAtRange;
export const selectTravelEditorFilterOrders = ({ travels: { editor }}) => editor.filter;
export const selectTravelEditorOrderById = ({ travels: { editor }}, id) => editor.orders?.[id] || null;
export const selectTravelEditorPendingOrders = ({ travels: { editor }}) => editor.pendingOrders; 
export const selectNewWaypointRunning = ({ travels: { editor }}) => {
  return editor.waypoints[editor.selectedWaypointId]
}

export const selectIsSelectedWaypointId = ({ travels: { editor }}) => {
  return editor.selectedWaypointId && editor.selectedCompany && editor.selectedCheckpoint 
    ? true 
    : false;
}

export const selectSelectedWaypointId = ({ travels: { editor }}) => {
  return editor.selectedWaypointId;
}

export const selectTravelEditorSelectedCompany = ({ travels: { editor }}) => editor.selectedCompany; 
export const selectTravelEditorSelectedCheckpoint = ({ travels: { editor }}) => editor.selectedCheckpoint; 
export const selectTravelEditorTrip = ({ travels: { editor: { start, end, waypoints } }}) => {
  const startLocation = start?.checkpoint?.location ? {...start.checkpoint.location, coordinate: { lat: start.checkpoint.location.coordinate[0], lng: start.checkpoint.location.coordinate[1] }} : {};
  const endLocation = end?.checkpoint?.location ? {...end.checkpoint.location, coordinate: { lat: end.checkpoint.location.coordinate[0], lng: end.checkpoint.location.coordinate[1] } }: {};
  const waypointsList = Object.keys(waypoints)?.length > 0 
    ? Object.keys(waypoints)
      .filter(w_id => waypoints[w_id]?.[0]?.checkpoint?.location?.coordinate[0] && waypoints[w_id]?.[0]?.checkpoint?.location?.coordinate[1])
      .map(filtered_w_id => ({
        ...waypoints[filtered_w_id][0],
        coordinate: {
          lat: waypoints[filtered_w_id][0].checkpoint.location.coordinate[0],
          lng: waypoints[filtered_w_id][0].checkpoint.location.coordinate[1],
        }
    }))
    : [];

  return [].concat({...startLocation}).concat(...waypointsList).concat({...endLocation});
}

export const selectTravelEditorForesightById = ({ travels: { editor }}, id) => editor.waypointsForesight?.[id] || null;
export const selectTravelEditorTravelType = ({ travels: { editor }}) => editor.travelType;
export const selectTravelEditorDepartureDate = ({ travels: { editor }}) => editor.departureDate;
export const selectTravelEditorEstimatedTravelTime = ({ travels: { editor }}) => editor.estimatedTravelTime;
export const selectTravelEditorEstimatedTravelLength = ({ travels: { editor }}) => editor.estimatedTravelLength;

export const selectTravelEditorOrderDetails = ({ travels: { editor }}) => editor.orderDetails;


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default travelEditorSlice.reducer;