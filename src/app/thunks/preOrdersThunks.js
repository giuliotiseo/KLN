import { createAsyncThunk } from "@reduxjs/toolkit";
import { createFromForwardPreOrder, createPreOrder } from "../../preOrders/api/create";
import { deletePreOrder } from "../../preOrders/api/delete";
import { fetchAllPreOrders, searchPreOrders } from "../../preOrders/api/fetch";
import { updatePreOrderCarrier, updatePreOrderStatus } from "../../preOrders/api/update";
import { convertQueryStatusToStatus } from "../../preOrders/libs/helpers";

// Read -----------------------------------------------------------------------------------------------------------------------------------------------------
// All reader
export const readPreOrdersThunk = createAsyncThunk(
  'preOrders/read',
  async ({ tenant }, store) => {
    const { company } = store.getState();
    const { type } = company.companyInfo.entity;
    // Get all the pre-orders received or sent on current year
    const yearStart = new Date(new Date().getFullYear(), 0, 1);
    const yearEnd = new Date((new Date().getFullYear() + 1), 0, 1);
    const createdAt = { between: [yearStart, yearEnd]};

    if(type) {
      const result = await fetchAllPreOrders({ 
        tenant, 
        companyType: type,  
        createdAt, 
        sortDirection: "ASC" 
      });

      return result;
    } else {
      return null;
    }
  }
);

export const searchPreOrdersListThunk = createAsyncThunk(
  'preOrders/sender/list',
  async ({ tenant, queryStatus, queryFrom, queryOptions }, { rejectWithValue }) => {
    let result;
    const safeQueryStatus = (!queryStatus || queryStatus === undefined) ? "incoming" : queryStatus;
    const convertedQueryStatusToStatus = convertQueryStatusToStatus[safeQueryStatus];
  
    try {
      result = await searchPreOrders({
        tenant,
        status: convertedQueryStatusToStatus,
        ...queryOptions,
        tenantType: queryFrom,
        nextToken: undefined
      });

      if(!result) {
        console.error('Fetch failed', { queryStatus, queryFrom, tenant, convertQueryStatusToStatus });
        throw rejectWithValue({
          error: `No result in search pre-orders by ${queryFrom}`,
          queryOptions, 
          result
        });
      }

      return ({[queryFrom.toLowerCase()]: result });
    } catch(err) {
      console.error(err);
      throw rejectWithValue({
        error: `No result in search pre-orders by ${queryFrom}`,
        queryOptions, 
        result
      });
    }
  }
);

export const nextSearchPreOrdersThunk = createAsyncThunk(
  'preOrders/list/next',
  async ({ tenant, queryFrom, queryStatus, nextToken }, { getState, rejectWithValue }) => {
    let result;    
    const { preOrders } = getState();
    const target = preOrders[queryFrom];
    const { queryOptions, queryFilters } = target;
    console.log("Vedi queryStatus", queryStatus);

    const safeQueryStatus = (!queryStatus || queryStatus === undefined) ? "incoming" : queryStatus;
    const convertedQueryStatusToStatus = convertQueryStatusToStatus[safeQueryStatus];
    
    console.log("Dispatcho next", {
      tenant,
      status: convertedQueryStatusToStatus,
      ...queryOptions,
      tenantType: queryFrom,
      nextToken,
      queryFilters,
    });

    try {
      result = await searchPreOrders({
        tenant,
        status: convertedQueryStatusToStatus,
        ...queryOptions,
        tenantType: queryFrom,
        nextToken,
        queryFilters,
      });

      if(!result) {
        throw rejectWithValue({
          error: `No result in search pre-orders by ${queryFrom}`,
          queryOptions, 
          result
        });
      }

      return ({[queryFrom.toLowerCase()]: result });
    } catch(err) {
      console.error(err);
      throw rejectWithValue({
        error: `No result in search pre-orders by ${queryFrom}`,
        queryOptions, 
        result
      });
    }
  }
);

// Create -----------------------------------------------------------------------------------------------------------------------------------------------------
// Sender case
export const createPreOrderThunk = createAsyncThunk(
  'preOrders/create',
  async({ preOrder, displayToast, mode }, { rejectWithValue }) => {
    try {
      const result = await createPreOrder({
        ...preOrder,
        checkpoint: {
          ...preOrder.checkpoint,
          contacts: preOrder?.checkpoint?.contacts || null
        }, 
      }, displayToast, mode);

      console.log('Il risultato', result);
      return result;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
);

// Update -----------------------------------------------------------------------------------------------------------------------------------------------------
export const updatePreOrderStatusThunk = createAsyncThunk(
  'preOrder/update/status',
  async ({ preOrder, logs, origin, status }, { rejectWithValue }) => {
    console.log('Invio i dati in questo modo', {...preOrder, status, log: logs }, origin)
    try {
      console.log('Invio i dati in questo modo', {...preOrder, status, log: logs }, origin)
      const result = await updatePreOrderStatus({...preOrder, status, log: logs }, origin);
      return result;
    } catch(e) {
      console.error(e);
      return rejectWithValue({ error: "Impossible to update pre-order status", preOrder, origin });
    }
  }
)

export const forwardPreOrderThunk = createAsyncThunk(
  'preOrder/forward',
  async ({ preOrder, carrier, mode }, { rejectWithValue }) => {
    try {
      // Delete
      const deleteResult = await deletePreOrder(preOrder.id);

      // New send
      let newPreOrder = {
        ...deleteResult, 
        carrierName: carrier.name,
        tenantCarrier: carrier.tag,
        carrier
      }

      try {     
        const createResult = await createFromForwardPreOrder(newPreOrder, mode);
        return createResult.result;

      } catch(e) {
        console.error(e);
        return rejectWithValue({ error: "Impossible to forward (create) new pre-order", preOrder: newPreOrder });
      }

    } catch(e) {
      console.error(e);
      return rejectWithValue({ error: "Impossible to delete pre-order", preOrder });
    }
  }
)

export const updatePreOrderCarrierThunk = createAsyncThunk(
  'preOrder/update/carrier',
  async ({ preOrder, carrier }, { rejectWithValue }) => {
    try {
      const result = await updatePreOrderCarrier(preOrder, carrier);
      return result;
    } catch(e) {
      console.error(e);
      return rejectWithValue({ error: "Impossible to update pre-order carrier", preOrder });
    }
  }
)