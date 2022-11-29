import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { 
  createOrderThunk,
  searchOrdersListThunk,
  nextSearchOrdersThunk,
  forwardOrderThunk,
  getOrderThunk,
  updateOrderThunk,
  updateOrderStatusThunk,
  deleteOrderThunk,
  searchOrdersByPreOrderThunk,
} from '../../app/thunks/ordersThunks';
import { consoleSuccess, normalizeWindows } from '../../globals/libs/helpers';

const initialProperties = {
  ids: [],
  entities: {},
  status: null,
  nextToken: undefined,
  queryOptions: {
    shipmentType: "ALL",
    tenantType: null,
    limit: 100,
    sortDirection: 'DESC',
    createdAt: "",
    carrierName: "",
    senderName: "",
    receiverName: "",
    stamp: "",
    pickupDateStart: [null, null],
    deliveryDateStart: [null, null],
    pickupAddress: "",
    deliveryAddress: "",
    quantity: ["", ""],
  },
}

function showToastMessage (origin, action, payload) {
  if(origin === "carrier") {
    if(action === "create") toast.info(`Ricevuto ${payload.name} da ${payload.senderName} per ${payload.receiverName}`);
    if(action === "delete") toast.info(`Rimosso ${payload.name} da ${payload.senderName}`);
  }

  if(origin === "sender") {
    if(action === "create") toast.info(`${payload.carrierName} ha aggiunto ${payload.name} nella lista degli ordini inviati`);
    if(action === "update") toast.info(`Aggiornato ${payload.name} da ${payload.carrierName}`);
  }

  if(origin === "receiver") {
    if(action === "create") toast.info(`Nuovo ordine in arrivo registrato da ${payload.senderName} e trasportato da ${payload.carrierName}`);
    if(action === "update") toast.info(`Aggiornato ${payload.name} da ${payload.carrierName}`);
    if(action === "delete") toast.info(`Rimosso ${payload.name} da ${payload.senderName}`);
  }
}

// Slice reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    sender: { ...initialProperties },
    carrier: { ...initialProperties },
    receiver: { ...initialProperties },
    dynamic:{ ids: [], entities: {}, status: null, target: null },
    selected: null
  },
  reducers: {
    resetPickupDateStart(state, { payload }) {
      state[payload].pickupDateStart = [null, null];
    },
    resetDeliveryDateStart(state, { payload }) {
      state[payload].deliveryDateStart = [null, null];
    },
    resetOrdersList(state, { payload }) {
      console.log("payload: ", payload);
      state[payload] = { ...initialProperties };
    },
    resetDynamicOrdersSelection(state) {
      state.dynamic = { ids: [], entities: {}, status: null, target: null };
    },
    listenerCreateOrderInList(state, { payload }) {
      state[payload.list].ids = state[payload.list].ids.concat(payload.data.id);
      state[payload.list].entities = {...state[payload.list].entities, [payload.data.id]: { ...payload.data }};
      showToastMessage(payload.list, "create", payload.data);
    },
    listenerUpdateOrderInList(state, { payload }) {
      state[payload.list].entities = {...state[payload.list].entities, [payload.data.id]: { ...payload.data }};
      showToastMessage(payload.list, "update", payload.data);
    },
    listenerDeleteOrderInList(state, { payload }) {
      state[payload.list].ids = state[payload.list].ids.filter(pre_id => pre_id !== payload.data.id);
      delete state[payload.list].entities[payload.data.id];
      showToastMessage(payload.list, "delete", payload.data);
    }
  },
  extraReducers(builder) {
    builder
      // Create -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(createOrderThunk.fulfilled, (state, { payload }) => {
        if(!state[payload.mode].ids.includes(payload.result.id)) {
          state[payload.mode].ids = state[payload.mode].ids.concat(payload.result.id);
          state[payload.mode].entities =  {...state[payload.mode].entities, [payload.result.id]: payload.result };
          state[payload.mode].status = "success";
        }

        if(state?.dynamic?.target?.type === "preOrderId" && state?.dynamic?.target?.value?.id === payload?.result?.preOrderId) {
          state.dynamic.ids = state.dynamic.ids.concat(payload.result.id);
          state.dynamic.entities =  {...state.dynamic.entities, [payload.result.id]: payload.result };
          state.dynamic.status = "success";
        }
      })
      // Read (search) -----------------------------------------------------------------------------------------------------------------------------------------------------
      // Sender search
      .addCase(searchOrdersListThunk.pending, (state, { meta: { arg: { queryOptions, queryFrom }}}) => {
        const {
          sortDirection, shipmentType, limit,
          stamp, createdAt, carrierName, senderName, receiverName,
          pickupDateStart, deliveryDateStart, deliveryAddress, pickupAddress, quantity
        } = queryOptions;

        state[queryFrom].status = "loading";
        state[queryFrom].queryOptions.shipmentType = shipmentType;
        state[queryFrom].queryOptions.sortDirection = sortDirection;
        state[queryFrom].queryOptions.limit = limit;
        state[queryFrom].queryOptions.stamp = stamp;
        state[queryFrom].queryOptions.carrierName = carrierName;
        state[queryFrom].queryOptions.senderName = senderName;
        state[queryFrom].queryOptions.receiverName = receiverName;
        state[queryFrom].queryOptions.createdAt = createdAt;
        // Filters
        state[queryFrom].queryOptions.pickupDateStart = pickupDateStart;
        state[queryFrom].queryOptions.deliveryDateStart = deliveryDateStart;
        state[queryFrom].queryOptions.deliveryAddress = deliveryAddress;
        state[queryFrom].queryOptions.pickupAddress = pickupAddress;
        state[queryFrom].queryOptions.quantity = quantity;
      })
      .addCase(searchOrdersListThunk.fulfilled, (state, { payload }) => {
        consoleSuccess('Success searchOrdersListThunk', payload);
        const queryFrom = Object.keys(payload)[0];
        state[queryFrom].ids = payload[queryFrom].ids;
        state[queryFrom].entities = payload[queryFrom].entities;
        state[queryFrom].nextToken = payload[queryFrom].nextToken;
        state[queryFrom].queryOptions.tenantType = payload[queryFrom].tenantType;
        state[queryFrom].status = "success";
      })
      .addCase(searchOrdersListThunk.rejected, (state, action) => {
        state["sender"].status = "rejected";
      })
      .addCase(getOrderThunk.fulfilled, (state, { payload }) => {
        state.selected = {
          ...payload,
          pickupCheckpoint: {
            ...payload.pickupCheckpoint,
            windows: normalizeWindows(payload.pickupCheckpoint.windows)
          },
          deliveryCheckpoint: {
            ...payload.deliveryCheckpoint,
            windows: normalizeWindows(payload.deliveryCheckpoint.windows)
          } 
        }
      })
      // Next token fetch -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(nextSearchOrdersThunk.pending, (state, { meta: { arg: { queryFrom }}}) => {
        state[queryFrom].nextToken = "loading";
      })
      .addCase(nextSearchOrdersThunk.fulfilled, (state, { payload }) => {
        const queryFrom = Object.keys(payload)[0];
        console.log(payload[queryFrom].nextToken);
        state[queryFrom].nextToken = payload[queryFrom].nextToken;
        state[queryFrom].ids = [...state[queryFrom].ids, ...payload[queryFrom].ids];
        state[queryFrom].entities = {...state[queryFrom].entities, ...payload[queryFrom].entities};
        state[queryFrom].status = "success";
      })
      .addCase(nextSearchOrdersThunk.rejected, (state, { payload }) => {
        console.error('Rejected nextSearchOrdersThunk', payload);
        state.status = "rejected";
        state.nextToken = payload?.result.nextToken;
      })
      // Search for dynamic list results -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(searchOrdersByPreOrderThunk.pending, (state) => {
        state.dynamic.status = "loading";
      })
      .addCase(searchOrdersByPreOrderThunk.fulfilled, (state, { payload: { result, selectedPreOrder }}) => {
        state.dynamic.ids = [...result.ids ];
        state.dynamic.entities = { ...result.entities };
        state.dynamic.target = { type: "preOrderId", value: selectedPreOrder };
        state.dynamic.status = "success";
      })
      .addCase(searchOrdersByPreOrderThunk.rejected, (state) => {
        state.dynamic.target = null;
        state.dynamic.status = "rejected";
      })
      // Update reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(updateOrderThunk.fulfilled, (state, { payload: { result }}) => {
        toast.success(`${result.name} aggiornato correttamente`)
        state.carrier.entities[result.id] = { ...result };
        if(state.selected?.id === result.id) {
          state.selected = { ...result }
        }
      })
      .addCase(updateOrderThunk.rejected, (_, { payload }) => {
        console.error('Rejected updateOrderThunk', payload);
        toast.error(`Aggiornamento fallito`);
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, { payload: { result, origin }}) => {
        toast.success(`${result.name} aggiornato correttamente`);
        if(state?.[origin]?.entities?.[result.id]) {
          state[origin].entities[result.id].status = result.status;
          state[origin].entities[result.id].log = result.log;
          state[origin].entities[result.id].updatedAt = result.updatedAt;
        }

        if(state.selected?.id === result.id) {
          state.selected.status = result.status;
          state.selected.log = result.log;
          state.selected.updatedAt = result.updatedAt;
        }
      })
      // Delete reducer -----------------------------------------------------------------------------------------------------------------------------------------------------
      .addCase(deleteOrderThunk.fulfilled, (state, { payload: { result, queryFrom }}) => {
        state[queryFrom].ids = state[queryFrom].ids.filter(id => id !== result.id);
        delete state[queryFrom].entities[result.id];
        toast.success(`${result.name} cancellato correttamente`);

        if(state?.dynamic?.target?.type === "preOrderId" && state.dynamic?.ids?.length > 0) {
          if(state.dynamic.entities[state.dynamic.ids[0]].preOrderId === result.preOrderId) {
            state.dynamic.ids = state.dynamic.ids.filter(id => id !== result.id);
            delete state.dynamic.entities[result.id];
            state.dynamic.status = "success";
          }
        }
      })
      .addCase(deleteOrderThunk.rejected, (state, { payload }) => {
        console.error('Rejected deletion order in slice', payload);
        toast.error(`Impossibile cancellare ${payload.order.name.toLowerCase()}`)
        state.status = "rejected";
      })
      .addCase(forwardOrderThunk.fulfilled, (state, { payload }) => {
        state.sender.entities[payload.id] = {
          ...state.sender.entities[payload.id],
          tenantCarrier: payload.tenantCarrier,
          carrierName: payload.carrierName,
          status: payload.status
        }
      })
    }
});

// Selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
// PreOrder
export const selectOrdersByPreOrderId = ({ orders: { sender, carrier, receiver }}, preOrderId) => {
  const allOrders = { ...sender.entities, ...carrier.entities, ...receiver.entities };
  return Object.keys(allOrders)
    .filter(order_id => allOrders[order_id].preOrderId === preOrderId)
    .map(order_id => allOrders[order_id]);
}

export const selectOrdersFromDynamicList = ({ orders: { dynamic }}) => {
  if(!dynamic?.ids || dynamic?.ids?.length < 0 ) return [];
  return dynamic.ids.map(order_id => dynamic.entities[order_id]);
}

export const selectLoadingMetersByPreOrderId = ({ orders: { dynamic }}) => {
  return dynamic.ids?.length > 0
    ?  dynamic.ids.map(order_id => dynamic.entities[order_id].loadingMeter)
      .reduce((acc, val) => acc + val, 0)
    : 0;
}

export const selectPreOrderFromDynamicList = ({ orders: { dynamic }}) => {
  if(dynamic?.target?.type === "preOrderId") {
    return dynamic.target.value;
  } else {
    return null;
  } 
};

export const { 
  resetPickupDateStart,
  resetDeliveryDateStart,
  resetOrdersList,
  resetDynamicOrdersSelection,
  listenerCreateOrderInList,
  listenerUpdateOrderInList,
  listenerDeleteOrderInList,
} = ordersSlice.actions;

// Sender
export const selectFullSenderOrdersList = ({ orders: { sender }}) => sender;
export const selectOrdersSenderQueryOptions = ({ orders: { sender }}) => sender.queryOptions;
export const selectSenderOrdersListIds = ({ orders: { sender }}) => sender.ids;
export const selectSenderOrdersList = ({ orders: { sender }}) => sender.entities;
export const selectSenderOrderFromList = (stamp, { orders: { sender }}) => sender.entities[stamp];
export const selectOrdersShipmentType = ({ orders }, type) => orders[type].queryOptions.shipmentType;
export const selectOrdersSenderNextToken = ({ orders: { sender }}) => sender.nextToken;
export const selectOrdersSenderStatus = ({ orders: { sender }}) => sender.status;

// Carrier
export const selectFullCarrierOrdersList = ({ orders: { carrier }}) => carrier;
export const selectOrdersCarrierQueryOptions = ({ orders: { carrier }}) => carrier.queryOptions;
export const selectCarrierOrdersListIds = ({ orders: { carrier }}) => carrier.ids;
export const selectCarrierOrdersList = ({ orders: { carrier }}) => carrier.entities;
export const selectCarrierOrderFromList = (stamp, { orders: { carrier }}) => carrier.entities[stamp];
export const selectOrdersCarrierNextToken = ({ orders: { carrier }}) => carrier.nextToken;
export const selectOrdersCarrierStatus = ({ orders: { carrier }}) => carrier.status;

// Receiver
export const selectFullReceiverOrdersList = ({ orders: { receiver }}) => receiver;
export const selectOrdersReceiverQueryOptions = ({ orders: { receiver }}) => receiver.queryOptions;
export const selectReceiverOrdersListIds = ({ orders: { receiver }}) => receiver.ids;
export const selectReceiverOrdersList = ({ orders: { receiver }}) => receiver.entities;
export const selectReceiverOrderFromList = (stamp, { orders: { receiver }}) => receiver.entities[stamp];
export const selectOrdersReceiverNextToken = ({ orders: { receiver }}) => receiver.nextToken;
export const selectOrdersReceiverStatus = ({ orders: { receiver }}) => receiver.status;

// Global
export const selectOrdersList = ({ orders }, origin) => {
  return orders[origin].ids.map(order_id => orders[origin].entities[order_id]);
}

export const selectSelectedOrder = ({ orders: { selected } }) => {
  return selected;
}

export const selectDynamicStatus = ({ orders: { dynamic }}) => {
  return dynamic.status;
}

export const selectOrdersLoadingStatus = ({ orders }) => {
  return [orders.sender.status, orders.carrier.status, orders.receiver.status].includes("loading");
}

export const selectOrdersQueryOptions = ({ orders }, queryFrom) => {
  return orders[queryFrom].queryOptions;
}

export const selectOrdersNextToken = ({ orders }, queryFrom) => {
  return orders[queryFrom].nextToken
}

export const selectRawOrdersFromList = ({ orders }, queryFrom) => {
  return orders[queryFrom].entities;
}

export const selectOrdersFromList = ({ orders }, queryFrom) => {
  return Object.keys(orders[queryFrom].entities).map(order_id => orders[queryFrom].entities[order_id]);
}

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default ordersSlice.reducer;