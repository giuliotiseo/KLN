import { createApi } from '@reduxjs/toolkit/query/react';
import graphqlBaseQuery from '../../app/services/graphqlBaseQuery';
import { getOrdersByTenantStatus, getOrdersByTenantCreatedAt } from './orders-callers';
import { apiDataNormalizer } from '../../globals/libs/helpers';

// Target typename
const _TYPENAME = "Order_Legacy"; 

// Tags generator
const tagsGenerator = (ids, list_id) => (
  ids?.length > 0
    ? [
      ...ids.map(id => ({ type: _TYPENAME, id })),
      list_id && { type: _TYPENAME, id: list_id }
    ]
    : list_id ? [{ type: _TYPENAME, id: list_id }] : []
)

export const apiOrdersLegacy = createApi({
  reducerPath: "orders_legacy_api",
  baseQuery: graphqlBaseQuery(),
  tagTypes: [_TYPENAME],
  endpoints: (build) => ({
    // Queries
    // Continua...
    // ordersByCarrier: build.query({
    //   query: (params) => {
    //     // Meglio se implemento questo dentro orders-callers:
    //     if(params?.sortKey?.senderName) return getOrdersByCarrierStatusSender(params);
    //     if(params?.sortKey?.receiverName) return getOrdersByCarrierStatusReceiver(params);
    //     return getOrdersByCarrierStatus(params);
    //   },
    //   transformResponse: (response) => apiDataNormalizer(response?.items, response?.nextToken),
    //   providesTags: ({ ids }) => tagsGenerator(ids, "ORDERS_LIST_BY_CARRIER"),
    // }),
    // ordersBySender: build.query({
    //   query: (params) => getOrdersBySenderStatus(params),
    //   transformResponse: (response) => apiDataNormalizer(response?.items),
    //   providesTags: ({ ids }) => tagsGenerator(ids, "ORDERS_LIST_BY_SENDER"),
    // }),
    // ordersByReceiver: build.query({
    //   query: (params) => getOrdersByReceiverStatus(params),
    //   transformResponse: (response) => apiDataNormalizer(response?.items),
    //   providesTags: ({ ids }) => tagsGenerator(ids, "ORDERS_LIST_BY_RECEIVER"),
    // }),
    ordersByTenantStatus: build.query({
      query: (params) => getOrdersByTenantStatus(params),
      transformResponse: (response) => apiDataNormalizer(response.items),
      providesTags: ({ ids }) => tagsGenerator(ids, "ORDERS_LIST_BY_TENANT_STATUS"),
    }),
    ordersByTenantCreatedAt: build.query({
      query: (params) => getOrdersByTenantCreatedAt(params),
      transformResponse: (response) => apiDataNormalizer(response.items),
      providesTags: ({ ids }) => tagsGenerator(ids, "ORDERS_LIST_BY_TENANT_CREATEDAT"),
    }),
    // ordersByStamp: build.query({
    //   query: (params) => getOrdersByStamp(params),
    //   transformResponse: (response) => apiDataNormalizer(response.items),
    //   providesTags: ({ ids }) => tagsGenerator(ids, "ORDERS_LIST_BY_STAMP"),
    // }),
  })
})

export const {
  useOrdersByTenantStatusQuery,
  useOrdersByTenantCreatedAtQuery,
} = apiOrdersLegacy;