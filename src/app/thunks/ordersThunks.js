import { createAsyncThunk } from "@reduxjs/toolkit";
import { createFromForwardOrder, createOrder } from "../../_orders/api/create";
import { getOrderById, searchOrders, searchOrdersByPreOrderId } from "../../_orders/api/fetch";
import { updateOrder, updateOrderStatus } from "../../_orders/api/update";
import { deleteOrder } from "../../_orders/api/delete";
import { convertOrderQueryStatusToStatus } from "../../_orders/libs/helpers";

// Read -----------------------------------------------------------------------------------------------------------------------------------------------------
// All reader
export const getOrderThunk = createAsyncThunk(
  'orders/get',
  async ({ id }, store) => {
    const { company } = store.getState();
    const { type } = company.companyInfo.entity;

    if(type) {
      const result = await getOrderById(id);
      return result;
    } else {
      return null;
    }
  }
);

export const searchOrdersListThunk = createAsyncThunk(
  'orders/list',
  async ({ tenant, queryStatus, queryFrom, queryOptions }, { rejectWithValue }) => {
    let result;
    const safeQueryStatus = (!queryStatus || queryStatus === undefined) ? "incoming" : queryStatus;
    const convertedQueryStatusToStatus = convertOrderQueryStatusToStatus[safeQueryStatus];
  
    try {
      result = await searchOrders({
        tenant,
        status: convertedQueryStatusToStatus,
        ...queryOptions,
        tenantType: queryFrom,
        nextToken: undefined
      });

      if(!result) {
        console.error('Fetch failed', { queryStatus, queryFrom, tenant, convertOrderQueryStatusToStatus });
        throw rejectWithValue({
          error: `No result in search orders by ${queryFrom}`,
          queryOptions, 
          result
        });
      }

      return ({[queryFrom.toLowerCase()]: result });
    } catch(err) {
      console.error(err);
      throw rejectWithValue({
        error: `No result in search orders by ${queryFrom}`,
        queryOptions, 
        result
      });
    }
  }
);

export const searchOrdersByPreOrderThunk = createAsyncThunk(
  'orders/dynamic',
  async (preOrderId, { getState, rejectWithValue }) => {
    let result;
    const { preOrders: { selected }} = getState();

    try {
      result = await searchOrdersByPreOrderId(preOrderId);

      if(!result) {
        console.error('Fetch failed', { result });
        throw rejectWithValue({
          error: `No result in search orders by pre-order ID`,
          result
        });
      }

      return { result, selectedPreOrder: selected };
    } catch(err) {
      console.error(err);
      throw rejectWithValue({
        error: `No result in search orders by pre-order id`,
        result
      });
    }
  }
);

export const nextSearchOrdersThunk = createAsyncThunk(
  'orders/list/next',
  async ({ tenant, queryFrom, queryStatus, nextToken }, { getState, rejectWithValue }) => {
    let result;
    const { orders } = getState();
    const target = orders[queryFrom];
    const { queryOptions } = target;
    console.log("Query status", queryStatus);
    const safeQueryStatus = (!queryStatus || queryStatus === undefined) ? "incoming" : queryStatus;
    const convertedQueryStatusToStatus = convertOrderQueryStatusToStatus[safeQueryStatus];
    
    try {
      result = await searchOrders({
        tenant,
        status: convertedQueryStatusToStatus,
        ...queryOptions,
        tenantType: queryFrom,
        nextToken,
      });

      if(!result) {
        throw rejectWithValue({
          error: `No result in search orders by ${queryFrom}`,
          queryOptions, 
          result
        });
      }

      return ({[queryFrom.toLowerCase()]: result });
    } catch(err) {
      console.error(err);
      throw rejectWithValue({
        error: `No result in search orders by ${queryFrom}`,
        queryOptions, 
        result
      });
    }
  }
);

// Create -----------------------------------------------------------------------------------------------------------------------------------------------------
// Sender case
export const createOrderThunk = createAsyncThunk(
  'orders/create',
  async({ order, displayToast }, { rejectWithValue, getState }) => {
    const modes = ["sender", "carrier", "receiver"];
    const { company: { companyInfo: { entity: { vatNumber }}}} = getState();
    const orderVats = [order.sender.vatNumber, order.carrier.vatNumber, order.receiver.vatNumber ];
    const mode = modes[orderVats.indexOf(vatNumber)];
    try {
      const result = await createOrder({
        ...order,
      }, displayToast, mode);

      return result;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

// Update -----------------------------------------------------------------------------------------------------------------------------------------------------
export const updateOrderThunk = createAsyncThunk(
  'orders/update',
  async({ order, displayToast }, { rejectWithValue, }) => {
    try {
      const result = await updateOrder({
        ...order,
      }, displayToast);
      
      return result;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  'orders/update/status',
  async ({ order, logs, origin, status }, { rejectWithValue }) => {
    try {
      let result = await updateOrderStatus({
        ...order,
        status,
        completedAt: status === "DELIVERED" ? new Date().toISOString() : new Date(0).toISOString(),
        log: logs
      }, origin);

      return result;
    } catch(e) {
      console.error(e);
      return rejectWithValue({ error: "Impossible to update order status", order, origin });
    }
  }
)

export const forwardOrderThunk = createAsyncThunk(
  'orders/forward',
  async ({ order, carrier, mode }, { rejectWithValue }) => {
    try {
      // Delete
      const deleteResult = await deleteOrder(order.id);

      // New send
      let newOrder = {
        ...deleteResult, 
        carrierName: carrier.name,
        tenantCarrier: carrier.tag,
        carrier
      }

      try {     
        const createResult = await createFromForwardOrder(newOrder, mode);
        return createResult.result;
      } catch(e) {
        console.error(e);
        return rejectWithValue({ error: "Impossible to forward (create) new order", order: newOrder });
      }
    } catch(e) {
      console.error(e);
      return rejectWithValue({ error: "Impossible to delete order", order });
    }
  }
)

// export const updateOrderCarrierThunk = createAsyncThunk(
//   'orders/update/carrier',
//   async ({ order, carrier }, { rejectWithValue }) => {
//     try {
//       const result = await updateOrderCarrier(order, carrier);
//       return result;
//     } catch(e) {
//       console.error(e);
//       return rejectWithValue({ error: "Impossible to update order carrier", order });
//     }
//   }
// )

// Update -----------------------------------------------------------------------------------------------------------------------------------------------------
export const deleteOrderThunk = createAsyncThunk(
  'orders/delete',
  async ({ order, queryFrom }, { rejectWithValue }) => {
    try {
      const result = await deleteOrder(order.id, queryFrom);
      return result;
    } catch (err) {
      console.error(err);
      return rejectWithValue({ error: err, order });
    }
  }
)
