import { createEntityAdapter } from "@reduxjs/toolkit";
import { graphqlApiSlice } from "../../app/api/graphql-api-slice";
import { ORDER_BY_CARRIER, ORDER_BY_ID, ORDER_BY_SENDER, ORDER_BY_PICKUP_STORAGE, ORDER_BY_RECEIVER, ORDER_BY_CARRIER_PENDING, ORDER_BY_CARRIER_PICKEDUP, ORDER_BY_CARRIER_STOCKED, ORDER_BY_CARRIER_DELIVERING, ORDER_BY_CARRIER_DELIVERED, ORDER_BY_SENDER_PENDING, ORDER_BY_SENDER_PICKEDUP, ORDER_BY_SENDER_STOCKED, ORDER_BY_SENDER_DELIVERING, ORDER_BY_SENDER_DELIVERED, ORDER_BY_PICKUP_STORAGE_PENDING, ORDER_BY_PICKUP_STORAGE_PICKEDUP, ORDER_BY_PICKUP_STORAGE_STOCKED, ORDER_BY_PICKUP_STORAGE_DELIVERING, ORDER_BY_PICKUP_STORAGE_DELIVERED, ORDER_BY_RECEIVER_PENDING, ORDER_BY_RECEIVER_PICKEDUP, ORDER_BY_RECEIVER_STOCKED, ORDER_BY_RECEIVER_DELIVERING, ORDER_BY_RECEIVER_DELIVERED, ORDER_BY_DELIVERY_STORAGE_DELIVERED, ORDER_BY_DELIVERY_STORAGE_DELIVERING, ORDER_BY_DELIVERY_STORAGE_STOCKED, ORDER_BY_DELIVERY_STORAGE_PICKEDUP, ORDER_BY_DELIVERY_STORAGE_PENDING, ORDER_BY_DELIVERY_STORAGE, ORDER_BY_PREORDERID, ORDER_BY_CARRIER_ARCHIVED, ORDER_BY_SENDER_ARCHIVED, ORDER_BY_PICKUP_STORAGE_ARCHIVED, ORDER_BY_DELIVERY_STORAGE_ARCHIVED, ORDER_BY_RECEIVER_ARCHIVED, ORDER_BY_CARRIER_COLLECTCHECKS, ORDER_BY_RECEIVER_COLLECTCHECKS, ORDER_BY_CARRIER_TRAVEL } from "./graphql/queries";
import { formatFilesToApp, formatWindowsToApp, formatWindowsToDynamoDb, generateLegacyLogList, mergeArrays } from "../../globals/libs/helpers";
import { formatLocationCoords } from "../../warehouses/libs/helpers";
import { DEFAULT_ORDER_LIMIT } from "../slices/ordersListSlice";
import { createOrderCaller, updateOrderCaller } from "./orders-callers";
import { DELETE_ORDER } from "./graphql/mutations";
import { toast } from "react-toastify";
import { STANDARD_DIMENSIONS } from "../libs/constants";
import { v4 } from "uuid";
import { formatISO } from "date-fns";
import { addFileToOrderEditorThunk } from "./orders-thunks";
import { isSenderRemoved, isShipmentTypeChanged } from "../slices/matchers";
import { getOrderDataForWaypoint } from "../../travels/libs/helpers";

// Target typename
const _TYPENAME = "Order"; 

// Graphql connection -----------------------------------------------------------------------------------------------------------------------
const allOrdersAdapter = createEntityAdapter();
const initialState = allOrdersAdapter.getInitialState();

// Api
export const extendedOrdersApiSlice = graphqlApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query -----------------------------------------------------------------------------------------------------------------------------------------------
    // Carrier query
    orderByCarrier: builder.query({
      query: (args) => ({ body: ORDER_BY_CARRIER, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items || []);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_CARRIER' }
        ]
      }
    }),
    orderByCarrierPending: builder.query({
      query: (args) => ({ body: ORDER_BY_CARRIER_PENDING, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_PENDING' }
        ]
      }
    }),
    orderByCarrierPickedup: builder.query({
      query: (args) => ({ body: ORDER_BY_CARRIER_PICKEDUP, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_PICKEDUP' }
        ]
      }
    }),
    orderByCarrierStocked: builder.query({
      query: (args) => ({ body: ORDER_BY_CARRIER_STOCKED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_STOCKED' }
        ]
      }
    }),
    orderByCarrierDelivering: builder.query({
      query: (args) => ({ body: ORDER_BY_CARRIER_DELIVERING, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_DELIVERING' }
        ]
      }
    }),
    orderByCarrierDelivered: builder.query({
      query: (args) => ({ body: ORDER_BY_CARRIER_DELIVERED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_DELIVERED' }
        ]
      }
    }),
    orderByCarrierArchived: builder.query({
      query: (args) => ({ body: ORDER_BY_CARRIER_ARCHIVED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_ARCHIVED' }
        ]
      }
    }),
    // Sender query
    orderBySender: builder.query({
      query: (args) => ({ body: ORDER_BY_SENDER, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_SENDER' }
        ]
      }
    }),
    orderBySenderPending: builder.query({
      query: (args) => ({ body: ORDER_BY_SENDER_PENDING, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_SENDER_PENDING' }
        ]
      }
    }),
    orderBySenderPickedup: builder.query({
      query: (args) => ({ body: ORDER_BY_SENDER_PICKEDUP, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_SENDER_PICKEDUP' }
        ]
      }
    }),
    orderBySenderStocked: builder.query({
      query: (args) => ({ body: ORDER_BY_SENDER_STOCKED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_SENDER_STOCKED' }
        ]
      }
    }),
    orderBySenderDelivering: builder.query({
      query: (args) => ({ body: ORDER_BY_SENDER_DELIVERING, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_SENDER_DELIVERING' }
        ]
      }
    }),
    orderBySenderDelivered: builder.query({
      query: (args) => ({ body: ORDER_BY_SENDER_DELIVERED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_SENDER_DELIVERED' }
        ]
      }
    }),
    orderBySenderArchived: builder.query({
      query: (args) => ({ body: ORDER_BY_SENDER_ARCHIVED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_SENDER_ARCHIVED' }
        ]
      }
    }),
    // Pickup Storage query
    orderByPickupStorage: builder.query({
      query: (args) => ({ body: ORDER_BY_PICKUP_STORAGE, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_PICKUP_STORAGE' }
        ]
      }
    }),
    orderByPickupStoragePending: builder.query({
      query: (args) => ({ body: ORDER_BY_PICKUP_STORAGE_PENDING, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_PICKUP_STORAGE_PENDING' }
        ]
      }
    }),
    orderByPickupStoragePickedup: builder.query({
      query: (args) => ({ body: ORDER_BY_PICKUP_STORAGE_PICKEDUP, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_PICKUP_STORAGE_PICKEDUP' }
        ]
      }
    }),
    orderByPickupStorageStocked: builder.query({
      query: (args) => ({ body: ORDER_BY_PICKUP_STORAGE_STOCKED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_PICKUP_STORAGE_STOCKED' }
        ]
      }
    }),
    orderByPickupStorageDelivering: builder.query({
      query: (args) => ({ body: ORDER_BY_PICKUP_STORAGE_DELIVERING, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_PICKUP_STORAGE_DELIVERING' }
        ]
      }
    }),
    orderByPickupStorageDelivered: builder.query({
      query: (args) => ({ body: ORDER_BY_PICKUP_STORAGE_DELIVERED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_PICKUP_STORAGE_DELIVERED' }
        ]
      }
    }),
    orderByPickupStorageArchived: builder.query({
      query: (args) => ({ body: ORDER_BY_PICKUP_STORAGE_ARCHIVED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_PICKUP_STORAGE_ARCHIVED' }
        ]
      }
    }),
    // Delivery Storage query
    orderByDeliveryStorage: builder.query({
      query: (args) => ({ body: ORDER_BY_DELIVERY_STORAGE, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_DELIVERY_STORAGE' }
        ]
      }
    }),
    orderByDeliveryStoragePending: builder.query({
      query: (args) => ({ body: ORDER_BY_DELIVERY_STORAGE_PENDING, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_DELIVERY_STORAGE_PENDING' }
        ]
      }
    }),
    orderByDeliveryStoragePickedup: builder.query({
      query: (args) => ({ body: ORDER_BY_DELIVERY_STORAGE_PICKEDUP, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_DELIVERY_STORAGE_PICKEDUP' }
        ]
      }
    }),
    orderByDeliveryStorageStocked: builder.query({
      query: (args) => ({ body: ORDER_BY_DELIVERY_STORAGE_STOCKED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_DELIVERY_STORAGE_STOCKED' }
        ]
      }
    }),
    orderByDeliveryStorageDelivering: builder.query({
      query: (args) => ({ body: ORDER_BY_DELIVERY_STORAGE_DELIVERING, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_DELIVERY_STORAGE_DELIVERING' }
        ]
      }
    }),
    orderByDeliveryStorageDelivered: builder.query({
      query: (args) => ({ body: ORDER_BY_DELIVERY_STORAGE_DELIVERED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_DELIVERY_STORAGE_DELIVERED' }
        ]
      }
    }),
    orderByDeliveryStorageArchived: builder.query({
      query: (args) => ({ body: ORDER_BY_DELIVERY_STORAGE_ARCHIVED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_DELIVERY_STORAGE_ARCHIVED' }
        ]
      }
    }),
    // Receiver query
    orderByReceiver: builder.query({
      query: (args) => ({ body: ORDER_BY_RECEIVER, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_RECEIVER' }
        ]
      }
    }),
    orderByReceiverPending: builder.query({
      query: (args) => ({ body: ORDER_BY_RECEIVER_PENDING, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_RECEIVER_PENDING' }
        ]
      }
    }),
    orderByReceiverPickedup: builder.query({
      query: (args) => ({ body: ORDER_BY_RECEIVER_PICKEDUP, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_RECEIVER_PICKEDUP' }
        ]
      }
    }),
    orderByReceiverStocked: builder.query({
      query: (args) => ({ body: ORDER_BY_RECEIVER_STOCKED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_RECEIVER_STOCKED' }
        ]
      }
    }),
    orderByReceiverDelivering: builder.query({
      query: (args) => ({ body: ORDER_BY_RECEIVER_DELIVERING, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_RECEIVER_DELIVERING' }
        ]
      }
    }),
    orderByReceiverDelivered: builder.query({
      query: (args) => ({ body: ORDER_BY_RECEIVER_DELIVERED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_RECEIVER_DELIVERED' }
        ]
      }
    }),
    orderByReceiverArchived: builder.query({
      query: (args) => ({ body: ORDER_BY_RECEIVER_ARCHIVED, args }),
      transformResponse: response => {
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_RECEIVER_ARCHIVED' }
        ]
      }
    }),
    // Order by ids
    orderById: builder.query({
      query: (args) => args?.id ? ({ body: ORDER_BY_ID, args }) : null,
      transformResponse: response => {
        if(!response) return null;
        const palletInfo = response.palletInfo.reduce((acc,val) => {
          return ({
            ...acc,
            [val.type]: response.palletInfo.filter(plt => plt.type === val.type)
          })
        }, { EPAL: [], EUR: []});

        const docs = response?.docs?.length > 0
          ? response.docs.map(doc => ({
            ...doc,
            files: doc?.files?.length > 0 ? formatFilesToApp(doc.files) : []
          }))
          : []

        return {
          ...response,
          sender: {
            id: response.senderId,
            name: response.senderName,
            vatNumber: response.senderVat,
            company: {
              id: response.senderId,
              name: response.senderName,
              vatNumber: response.senderVat,
              owner: response.tenantSender,
            }
          },
          carrier: {
            id: response.carrierId,
            name: response.carrierName,
            vatNumber: response.carrierVat,
            company: {
              id: response.carrierId,
              name: response.carrierName,
              vatNumber: response.carrierVat,
              owner: response.tenantCarrier,
            }
          },
          receiver: {
            id: response.receiverId,
            name: response.receiverName,
            vatNumber: response.receiverVat,
            company: {
              id: response.receiverId,
              name: response.receiverName,
              vatNumber: response.receiverVat,
              owner: response.tenantReceiver,
            }
          },
          pickupCheckpoint: {
            ...response.pickupCheckpoint,
            windows: formatWindowsToApp(response.pickupCheckpoint.windows),
            thirdCompany: response.pickupStorageId !== response.senderId
            ? {
              id: response.pickupStorageId,
              vatNumber: response.pickupStorageVat,
              name: response.pickupStorageName,
              company: {
                id: response.pickupStorageId,
                owner: response.tenantPickupStorage,
                name: response.pickupStorageName,
                vatNumber: response.pickupStorageVat,
              }
            }
            : null,
          },
          depotCheckpoint: response?.depotCheckpoint 
          ? {
            ...response.depotCheckpoint,
            windows: response.depotCheckpoint?.windows?.length > 0
              ? formatWindowsToApp(response.depotCheckpoint.windows)
              : [],
          }
          : null,
          deliveryCheckpoint: {
            ...response.deliveryCheckpoint,
            windows: formatWindowsToApp(response.deliveryCheckpoint.windows),
            thirdCompany: response.deliveryStorageId !== response.receiverId
            ? {
              id: response.deliveryStorageId,
              vatNumber: response.deliveryStorageVat,
              name: response.deliveryStorageName,
              company: {
                id: response.deliveryStorageId,
                owner: response.tenantDeliveryStorage,
                name: response.deliveryStorageName,
                vatNumber: response.deliveryStorageVat,
              }
            }
            : null,
          },
          docs: response.docs.map(doc => ({
            ...doc,
            files: doc?.files?.length > 0
              ? doc.files.map(file => ({
                db_format: {...file},
                raw_format: {
                  key: file.key,
                  identityId: file.identityId
                },
                remote: true
              }))
              : []
          })),
          palletInfo
        };
      },
      providesTags: (result) => {
        if(!result?.id) return [];
        return [{ type: _TYPENAME, id: result.id }]
      }
    }),
    orderByPreOrderId: builder.query({
      query: (args) => args?.preOrderId ? ({ body: ORDER_BY_PREORDERID, args }) : null,
      transformResponse: response => {
        if(!response) return null;
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: [{ type: _TYPENAME, id: 'LIST_BY_PREORDERID' }]
    }),
    orderByCarrierCollectChecks: builder.query({
      query: (args) => ({ body: ORDER_BY_CARRIER_COLLECTCHECKS, args }),
      transformResponse: response => {
        if(!response) return null;
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: [{ type: _TYPENAME, id: 'LIST_BY_CARRIER_COLLECTCHECKS' }]
    }),
    orderByReceiverCollectChecks: builder.query({
      query: (args) => ({ body: ORDER_BY_RECEIVER_COLLECTCHECKS, args }),
      transformResponse: response => {
        if(!response) return null;
        allOrdersAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: [{ type: _TYPENAME, id: 'LIST_BY_RECEIVER_COLLECTCHECKS' }]
    }),
    orderByCarrierForTravel: builder.query({
      query: (args) => {
        return ({ body: ORDER_BY_CARRIER_TRAVEL, args })
      },
      transformResponse: async (response) => {
        if(!response) return null;
        
        // Operazione per escluere tutti gli ordini già pianificati
        const plannedIds = response?.items?.length > 0 
          ? mergeArrays(response.items
            .filter(order => order?.travels?.items?.length > 0)
            .map(filtered_order => filtered_order.travels.items)
          ).map(el => el.id)
          : [];

        let ordersWithPlannedId = [];
        for(let order of response.items) {
          const response = await getOrderDataForWaypoint({...order, indexOp: 0 }, Date.now());
          if(response?.plannedId) {
            ordersWithPlannedId.push({ ...order, plannedId: response.plannedId })
          }
        }

        console.log("Confronto", {
          plannedIds,
          ordersWithPlannedId
        })

        const allowedOrders = ordersWithPlannedId.filter(order => !plannedIds.includes(order.plannedId))
        allOrdersAdapter.setAll(initialState, allowedOrders);



        // Per avere next token in lista:
        return {
          ids: allowedOrders.length > 0 ? allowedOrders.map(item => item.id) : [],
          entities: allowedOrders.length > 0 ? allowedOrders.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: [{ type: _TYPENAME, id: 'LIST_BY_CARRIER_TRAVEL' }]
    }),
    // Mutations -----------------------------------------------------------------------------------------------------------------------------------------------
    createOrder: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        const { order, orderId } = args;
        try {
          let dataToSend = {
            id: orderId,
            extId: v4(),
            preOrderId: order?.selectedPreOrder?.id || "STANDALONE",
            stamp: order.stamp,
            name: `Ordine ${order.stamp.split("-")[1]}`,
            // Carrier
            carrierId: order.carrier?.company?.id || order.carrier.id,
            tenantCarrier: order.carrier?.company?.owner || order.carrier.owner,
            carrierName: order?.carrier?.company?.name || order.carrier.name,
            carrierVat: order?.carrier?.company?.vatNumber || order.carrier.vatNumber,
            // Sender
            senderId: order?.sender?.company?.id || order.sender.id,
            tenantSender: order?.sender?.company?.owner || order.sender.owner,
            senderName: order.sender.name,
            senderVat: order.sender.vatNumber,
            // Receiver
            receiverId: order?.receiver?.company?.id || order.receiver.id,
            tenantReceiver: order?.receiver?.company?.owner || order.receiver.owner,
            receiverName: order.receiver.name,
            receiverVat: order.receiver.vatNumber,
            // Delivery Storage
            deliveryStorageId: order?.deliveryCheckpoint?.thirdCompanyId || order?.receiver?.company?.id || order.receiver.id,
            tenantDeliveryStorage: order?.deliveryCheckpoint?.thirdCompanyOwner || order?.receiver?.company?.owner || order.receiver.owner,
            deliveryStorageName: order?.deliveryCheckpoint?.thirdCompanyName || order.receiver.name,
            deliveryStorageVat: order?.deliveryCheckpoint?.thirdCompanyVat || order.receiver.vatNumber,
            // Pickup Storage
            pickupStorageId: order?.pickupCheckpoint?.thirdCompanyId || order?.sender?.company?.id || order.sender.id,
            tenantPickupStorage: order?.pickupCheckpoint?.thirdCompanyOwner || order?.sender?.company?.owner || order.sender.owner,
            pickupStorageName: order?.pickupCheckpoint?.thirdCompanyName || order.sender.name,
            pickupStorageVat: order?.pickupCheckpoint?.thirdCompanyVat || order.sender.vatNumber,
            billingType: order?.selectedPreOrder ? order.selectedPreOrder.billingType : order?.billingType,
            // Other
            paymentCondition: order.paymentCondition,
            shipmentType: order.shipmentType,
            // Checkpoints
            pickupCheckpoint: {
              ...order.pickupCheckpoint,
              windows: formatWindowsToDynamoDb(order.pickupCheckpoint.windows),
              location: {
                ...order.pickupCheckpoint.location,
                coordinate: formatLocationCoords(order.pickupCheckpoint.location.coordinate)
              }
            },
            pickupDateStart: order.pickupDateStart,
            pickupDateEnd: order.pickupDateEnd,
            depotCheckpoint: order?.depotCheckpoint?.location?.place_id 
              ? {
                ...order.depotCheckpoint,
                windows: formatWindowsToDynamoDb(order.depotCheckpoint.windows),
                location: {
                  ...order.depotCheckpoint.location,
                  coordinate: formatLocationCoords(order.depotCheckpoint.location.coordinate)
                }
              }
              : null,
            depotDateStart: order?.depotDateStart,
            depotDateEnd: order?.depotDateEnd,
            deliveryCheckpoint: {
              ...order.deliveryCheckpoint,
              windows: formatWindowsToDynamoDb(order.deliveryCheckpoint.windows),
              location: {
                ...order.deliveryCheckpoint.location,
                coordinate: formatLocationCoords(order.deliveryCheckpoint.location.coordinate)
              }
            },
            deliveryDateStart: order.deliveryDateStart,
            deliveryDateEnd: order.deliveryDateEnd,
            pickupAddress: order.pickupCheckpoint.location.address,
            depotAddress: order?.depotCheckpoint?.location?.address || "",
            deliveryAddress: order.deliveryCheckpoint.location.address,
            completedAt: null,
            // Meta data
            availability: { from: new Date().toISOString(), to: order.deliveryDateEnd },
            status: "PENDING",
            orderNumber: order?.orderNumber,
            trades: order?.trades || [],
            docs: order.docs.map(doc => ({
              ...doc,
              date: doc?.date ? formatISO(new Date(doc.date), { representation: 'date' }) : null,
              files: doc?.files?.length > 0 ? doc.files.map(file => file.db_format) : []
            })),
            support: order.support,
            warnings: order?.warnings || [],
            quantity: parseInt(order.quantity),
            size: STANDARD_DIMENSIONS[order.support][order.size].text,
            temperature: order?.temperature ? parseFloat(order.temperature) : null,
            loadingMeter: parseFloat(order.loadingMeter),
            grossWeight: order?.grossWeight ? parseFloat(order.grossWeight) : null,
            netWeight: order?.netWeight ? parseFloat(order.netWeight) : null,
            packages: order?.packages ? parseInt(order.packages) : null,
            perishable: order.perishable,
            stackable: order.stackable,
            palletInfo: [].concat.apply([], Object.keys(order.palletInfo).map(p => order.palletInfo[p])).map(plt => ({
              value: plt.value,
              type: plt.type,
              size: plt.size,
              system: plt.system
            })),
            lastPosition: order.pickupCheckpoint?.location ? ({ ...order.pickupCheckpoint.location, coordinate: formatLocationCoords(order.pickupCheckpoint.location.coordinate) }) : null,
            customer: {
              id: order?.customer?.id,
              name: order?.customer?.name,
              vatNumber: order?.customer?.company?.vatNumber,
              uniqueCode: order?.customer?.company?.uniqueCode || order?.customer?.customUniqueCode,
              pec: order?.customer?.company?.pec || order?.customer?.customPec
            },
            collectChecks: parseInt(order?.collectChecks),
            checksAmount: order?.checksAmount ? parseFloat(order.checksAmount) : null,
            note: order?.note
          }

          dataToSend.log = await generateLegacyLogList({
            list: [],
            action: 'Creazione',
            subject: `nuovo ordine codice: ${order?.stamp}`
          });

          const response = await createOrderCaller(dataToSend);
          if(!response?.error) toast.success(`Ordine ${order.stamp} inviato con successo`);
          return { data: response };
        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante l'invio dell'ordine cod. ${order.stamp}`);
          return null;
        }
      },
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        const { orders: { list: { type, limit, end, start }}} = getState();
        let queryListToUpdate;
        if(args.companyType === "CARRIER") {
          queryListToUpdate = {
            companyId: args.order.carrier.id,
            filter: { id: { attributeExists: true }},
            limit: type.status === "ALL" ? limit : DEFAULT_ORDER_LIMIT,
          }

          const patchResult = dispatch(
            extendedOrdersApiSlice.util.updateQueryData(
              'orderByCarrier', queryListToUpdate, (draft) => {
                allOrdersAdapter.addOne(draft, {
                  ...args.order,
                  id: args.orderId,
                })
            })
          )
  
          try {
            await queryFulfilled;
          } catch(err) {
            console.error(err);
            toast.error(`Non è stato possibile registrare l'ordine cod. ${args.order?.stamp}`);
            patchResult.undo();
          }
        }

        if(args.companyType === "SENDER") {
          queryListToUpdate = {
            companyId: args.order.sender.id,
            start,
            end,
            filter: { id: { attributeExists: true }},
            limit: type === "ALL" ? limit : DEFAULT_ORDER_LIMIT,
          }

          const patchResult = dispatch(
            extendedOrdersApiSlice.util.updateQueryData(
              'orderBySender', queryListToUpdate, (draft) => {
                allOrdersAdapter.addOne(draft, {
                  ...args.order,
                  id: args.orderId,
                })
            })
          )
  
          try {
            await queryFulfilled;
          } catch(err) {
            console.error(err);
            toast.error(`Non è stato possibile inviare l'ordine cod. ${args.order?.stamp}`);
            patchResult.undo();
          }
        }
      },
      invalidatesTags: [
        { type: _TYPENAME, id: 'LIST_BY_CARRIER'},
        { type: _TYPENAME, id: 'LIST_BY_SENDER'},
        { type: _TYPENAME, id: 'LIST_BY_PREORDERID'},
      ]
    }),
    updateOrder: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        try {
          console.log("Aggiorno l'ordine: ", { order: args });
          const response = await updateOrderCaller(args);

          if(!response?.error) toast.success(`${args.name} è stato aggiornato con successo`);
          return { data: response };

        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante l'aggiornamento di ${args.name}`);
          return null;
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: _TYPENAME, id: `LIST_BY_CARRIER`},
        { type: _TYPENAME, id: `LIST_BY_RECEIVER`},
        { type: _TYPENAME, id: `LIST_BY_SENDER`},
        { type: _TYPENAME, id: `LIST_BY_PREORDERID`},
        { type: _TYPENAME, id },
      ]
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        body: DELETE_ORDER,
        args: { input: { id }}
      }),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }]
    })
  }),
  extraReducers(builder) {
    builder
      .addCase(addFileToOrderEditorThunk.fulfilled, (state, { payload }) => {
        if(!payload) return null;
        state.files = payload;
      })
      .addMatcher(isSenderRemoved, (state) => {
        state.sender = {};
        state.checkpoint = {};
      })
      .addMatcher(isShipmentTypeChanged, (state) => {
        state.billingType = state.shipmentType
      })
  }
})

export const {
  // Carrier
  useOrderByCarrierQuery,
  useOrderByCarrierPendingQuery,
  useOrderByCarrierPickedupQuery,
  useOrderByCarrierStockedQuery,
  useOrderByCarrierDeliveringQuery,
  useOrderByCarrierDeliveredQuery,
  useOrderByCarrierArchivedQuery,
  // Sender
  useOrderBySenderQuery,
  useOrderBySenderPendingQuery,
  useOrderBySenderPickedupQuery,
  useOrderBySenderStockedQuery,
  useOrderBySenderDeliveringQuery,
  useOrderBySenderDeliveredQuery,
  useOrderBySenderArchivedQuery,
  // Receiver
  useOrderByReceiverQuery,
  useOrderByReceiverPendingQuery,
  useOrderByReceiverPickedupQuery,
  useOrderByReceiverStockedQuery,
  useOrderByReceiverDeliveringQuery,
  useOrderByReceiverDeliveredQuery,
  useOrderByReceiverArchivedQuery,
  // Pickup Storage
  useOrderByPickupStorageQuery,
  useOrderByPickupStoragePendingQuery,
  useOrderByPickupStoragePickedupQuery,
  useOrderByPickupStorageStockedQuery,
  useOrderByPickupStorageDeliveringQuery,
  useOrderByPickupStorageDeliveredQuery,
  useOrderByPickupStorageArchivedQuery,
  // Delivery Storage
  useOrderByDeliveryStorageQuery,
  useOrderByDeliveryStoragePendingQuery,
  useOrderByDeliveryStoragePickedupQuery,
  useOrderByDeliveryStorageStockedQuery,
  useOrderByDeliveryStorageDeliveringQuery,
  useOrderByDeliveryStorageDeliveredQuery,
  useOrderByDeliveryStorageArchivedQuery,
  // Orders by ids
  useOrderByPreOrderIdQuery,
  useOrderByIdQuery,
  useOrderByCarrierCollectChecksQuery,
  useOrderByReceiverCollectChecksQuery,
  useOrderByCarrierForTravelQuery,
  // Mutations
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = extendedOrdersApiSlice;
