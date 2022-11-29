import { createEntityAdapter } from '@reduxjs/toolkit';
import { graphqlApiSlice } from '../../app/api/graphql-api-slice';
import { toast } from 'react-toastify';
import { apiDataNormalizer, mergeArrays } from '../../globals/libs/helpers';
import { getOrdersByTenantCreatedAt } from '../../_orders/api/orders-callers';
import { getOrderDataForWaypoint } from '../libs/helpers';
import { TRAVEL_BY_CARRIER, TRAVEL_BY_CARRIER_COMPLETED, TRAVEL_BY_CARRIER_DELIVERY, TRAVEL_BY_CARRIER_DEPOT, TRAVEL_BY_CARRIER_PICKUP, TRAVEL_BY_CARRIER_RETURN, TRAVEL_BY_CARRIER_STATIONARY } from './graphql/queries';
// Callers
import {
  getTravelById,
  updateTravelByTenant,
  getTravelsByStamp,
  createTravelMutation,
  getTravelsByTenantDepartureDate,
  getTravelOrdersByStatusCompanyCreatedAt,
  getPortableOrdersByCarrierStatusCreatedAt,
  removePortableTravelsOrders,
  removePortableTravel,
  updateTravelStatusCaller,
  updateLastPositionTravelCaller,
  updateCompletedWaypointCaller,
} from './travels-callers';
import { DEFAULT_TRAVEL_LIMIT } from '../slices/travelsListSlice';

// Target typename
const _TYPENAME = "Travel"; 

// Tags generator
/* Array di stringhe per invalidare query ferme nella cache dello store */
const tagsGenerator = (ids, list_id) => (
  ids?.length > 0
    ? [
      ...ids.map(id => ({ type: _TYPENAME, id })),
      list_id && { type: _TYPENAME, id: list_id }
    ]
    : list_id ? [{ type: _TYPENAME, id: list_id }] : []
)

// Graphql connection -----------------------------------------------------------------------------------------------------------------------
const allTravelsAdapter = createEntityAdapter();
const initialState = allTravelsAdapter.getInitialState();

// Normalizers generator
/* Utilizzato per permettere una corretta lettura del dato sull'interfaccia, consentendo la 
manipolazione dello stesso all'interno del Redux Store */
const normalizeTravelResponse = (payload) => {
  return ({
    ...payload,
  })
}

// Api
export const extendedTravelsApiSlice = graphqlApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Queries by carrier ------------------------------------------------------------------------------------------------------------------------------------
    travelByCarrier: builder.query({
      query: (args) => ({ body: TRAVEL_BY_CARRIER, args }),
      transformResponse: response => {
        allTravelsAdapter.setAll(initialState, response.items || []);
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
    travelByCarrierStationary: builder.query({
      query: (args) => ({ body: TRAVEL_BY_CARRIER_STATIONARY, args }),
      transformResponse: response => {
        allTravelsAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_STATIONARY' }
        ]
      }
    }),
    travelByCarrierPickup: builder.query({
      query: (args) => ({ body: TRAVEL_BY_CARRIER_PICKUP, args }),
      transformResponse: response => {
        allTravelsAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_PICKUP' }
        ]
      }
    }),
    travelByCarrierDepot: builder.query({
      query: (args) => ({ body: TRAVEL_BY_CARRIER_DEPOT, args }),
      transformResponse: response => {
        allTravelsAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_DEPOT' }
        ]
      }
    }),
    travelByCarrierDelivery: builder.query({
      query: (args) => ({ body: TRAVEL_BY_CARRIER_DELIVERY, args }),
      transformResponse: response => {
        allTravelsAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_DELIVERY' }
        ]
      }
    }),
    travelByCarrierReturn: builder.query({
      query: (args) => ({ body: TRAVEL_BY_CARRIER_RETURN, args }),
      transformResponse: response => {
        allTravelsAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_RETURN' }
        ]
      }
    }),
    travelByCarrierCompleted: builder.query({
      query: (args) => ({ body: TRAVEL_BY_CARRIER_COMPLETED, args }),
      transformResponse: response => {
        allTravelsAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_COMPLETED' }
        ]
      }
    }),
    travelsByStamp: builder.query({
      query: (params) => getTravelsByStamp(params),
      transformResponse: (response) => apiDataNormalizer(response?.items, response?.nextToken),
      providesTags: ({ ids }) => tagsGenerator(ids, "TRAVELS_LIST_BY_STAMP"),
    }),
    travelsByTenantDepartureDate: builder.query({
      query: (params) => getTravelsByTenantDepartureDate(params),
      transformResponse: (response) => apiDataNormalizer(response?.items, response?.nextToken),
      providesTags: ({ ids }) => tagsGenerator(ids, "TRAVELS_LIST_BY_TENANT_DEPARTUREDATE"),
    }),
    travelById: builder.query({
      async queryFn(params) {
        if(!params?.id) return {};
        const data = await getTravelById(params);
        const normalizedData = normalizeTravelResponse(data);
        console.log('NormalizedData', normalizedData)
        return { data: normalizedData };
      },
      providesTags: (result) => tagsGenerator(result?.id ? [result?.id] : [], "TRAVEL_BY_ID"),
    }),
    // Mutations
    addTravel: builder.mutation({
      async queryFn(params) {
        // Push travel
        const travel_return = await createTravelMutation(params);
        console.log("Travel return", travel_return);
        toast.success(`Creazione viaggio ${travel_return.stamp} eseguita con successo`);
        return travel_return;
      },
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        const { travels: { list: { end, start }}} = getState();
        let queryListToUpdate;
          queryListToUpdate = {
            companyId: args.company.id,
            status: "",
            end,
            start,
            filter: { id: { attributeExists: true }},
            limit: DEFAULT_TRAVEL_LIMIT,
          }

          const patchResult = dispatch(
            extendedTravelsApiSlice.util.updateQueryData(
              'travelByCarrier', queryListToUpdate, (draft) => {
                allTravelsAdapter.addOne(draft, { ...args })
            })
          )
  
          try {
            await queryFulfilled;
          } catch(err) {
            console.error(err);
            toast.error(`Non è stato possibile registrare il viaggio cod. ${args.travel?.stamp?.split('-')[1]}`);
            patchResult.undo();
          }
      },
      invalidatesTags: [
        { type: "Order", id: "LIST_BY_CARRIER_TRAVEL" },
        { type: _TYPENAME, id: "LIST_BY_CARRIER" },
      ]
    }),
    updateTravel: builder.mutation({
      async queryFn(params) {
        // Put travel
        const travelUpdate = await updateTravelByTenant(params);
        console.log("Travel return", travelUpdate);
        if(travelUpdate?.stamp) {
          toast.success(`Aggiornamento viaggio ${travelUpdate.stamp} eseguita con successo`);
        }
        
        return travelUpdate;
      },
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }, { type: _TYPENAME, id: "TRAVEL_BY_ID" }]
    }),
    updateTravelStatus: builder.mutation({
      query: (params) => updateTravelStatusCaller(params),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }, { type: _TYPENAME, id: "TRAVEL_BY_ID" }]
    }),
    updateLastPositionTravel: builder.mutation({
      query: (params) => updateLastPositionTravelCaller(params),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }, { type: _TYPENAME, id: "TRAVEL_BY_ID" }]
    }),
    updateCompletedWaypoint: builder.mutation({
      async queryFn(params) {
        // Put travel
        console.log("Vedo i parametri", params);
        const travelUpdate = await updateCompletedWaypointCaller(params);
        return travelUpdate;
      },
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }, { type: _TYPENAME, id: "TRAVEL_BY_ID" }]
    }),
    removeTravelByCarrier: builder.mutation({
      async queryFn(params) {
        const ids = params.orders.items.map(travelsOrders => travelsOrders.id);
        console.groupCollapsed("Inizio rimozione pianificazioni");
        for(const travelsOrdersId of ids) {
          const removedTravelsOrdersResponse = await removePortableTravelsOrders(travelsOrdersId);
          console.log("Pianificazione rimossa", removedTravelsOrdersResponse);
        }
        console.groupEnd();

        const removedTravelResponse = await removePortableTravel(params.id);
        if(removedTravelResponse) {
          console.log("Viaggio eliminato", removedTravelResponse);
          toast.success(`Viaggio ${params.stamp} rimosso con successo`);
        }

        return removedTravelResponse;
      },
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }, { type: _TYPENAME, id: "TRAVEL_BY_ID" }]
    }),
    ordersForTravel: builder.query({
      query: (params) => getOrdersByTenantCreatedAt(params),
      transformResponse: async (response) => {
        // Operazione per escluere tutti gli ordini già pianificati
        const plannedIds = response?.items?.length > 0 
          ? mergeArrays(response.items
            .filter(order => order?.travels?.items?.length > 0)
            .map(filtered_order => filtered_order.travels.items)
          ).map(el => el.id)
          : [];

        let ordersWithPlannedId = [];
        for(let order of response.items) {
          const { plannedId } = await getOrderDataForWaypoint({...order, indexOp: 0 }, Date.now());
          ordersWithPlannedId.push({ ...order, plannedId })
        }

        const allowedOrders = ordersWithPlannedId.filter(order => !plannedIds.includes(order.plannedId))
        const result = apiDataNormalizer(allowedOrders);
        return { ...result }
      },
      providesTags: ({ ids }) => tagsGenerator(ids, "TRAVEL_ALLOWED_ORDERS"),
    }),
    ordersByStatusCompanyForTravel: builder.query({
      async queryFn(params) {
        if(!params?.carrierId || !params?.pickupStorageId || params?.createdAt?.length !== 2) return;
        let response = await getTravelOrdersByStatusCompanyCreatedAt(params);

        // Se si tratta dell'azienda vettore corrente, allora estraggo anche tutti gli ordini stocked
        if(params.isCarrierWaypoint) {
          const carrier_response = await getPortableOrdersByCarrierStatusCreatedAt({
            carrierId: params.carrierId,
            status: "STOCKED",
            filters: null,
            limit: 9999,
          });

          response.items.push(...carrier_response.items);
        }

        // Operazione per escluere tutti gli ordini già pianificati
        const plannedIds = response?.items?.length > 0 
          ? mergeArrays(response.items
            .filter(order => order?.travels?.items?.length > 0)
            .map(filtered_order => filtered_order.travels.items)
          ).map(el => el.id)
          : [];

        let ordersWithPlannedId = [];
        for(let order of response.items) {
          const { plannedId } = await getOrderDataForWaypoint({...order, indexOp: 0 }, Date.now());
          ordersWithPlannedId.push({ ...order, plannedId })
        }
        const allowedOrders = ordersWithPlannedId.filter(order => !plannedIds.includes(order.plannedId))
        const result = apiDataNormalizer(allowedOrders);
        console.log("Il risultato", result);
        return { data: { ...result }}
      },
      providesTags: ({ ids }) => tagsGenerator(ids, "TRAVEL_ALLOWED_ORDERS_STATUS"),
    }),
  })
})

export const {
  useTravelByCarrierQuery,
  useTravelByCarrierStationaryQuery,
  useTravelByCarrierPickupQuery,
  useTravelByCarrierDepotQuery,
  useTravelByCarrierDeliveryQuery,
  useTravelByCarrierReturnQuery,
  useTravelByCarrierCompletedQuery,
  useTravelByIdQuery,
  useTravelsByStampQuery,
  useTravelsByTenantDepartureDateQuery,
  useAddTravelMutation,
  useRemoveTravelByCarrierMutation,
  useUpdateTravelMutation,
  useUpdateTravelStatusMutation,
  useUpdateCompletedWaypointMutation,
  useUpdateLastPositionTravelMutation,
  useOrdersForTravelQuery,
  useOrdersByStatusCompanyForTravelQuery
} = extendedTravelsApiSlice;