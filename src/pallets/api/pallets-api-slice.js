import { graphqlApiSlice } from '../../app/api/graphql-api-slice';
import { toast } from 'react-toastify';
import { apiDataNormalizer } from '../../globals/libs/helpers';
import { apiPalletCompanyReversalNormalizer } from '../libs/helpers';
// Callers
import {
  createPalletHandlingCaller,
  updatePalletHandlingCaller,
  getPalletHandlingsByCarrierCustomer,
  getPalletHandlingsByCarrierTravel,
  getPalletHandlingsByCarrierType,
  getPalletHandlingsByCustomerCarrier,
  getPalletHandlingsByCustomerOperationDate,
  getPalletHandlingsByCustomerTravel,
  getPalletHandlingsByCustomerType,
  createReversalCaller,
  getPalletHandlingByIdCustomer,
  getPalletHandlingByIdCarrier,
} from './pallets-callers';
import { createEntityAdapter } from '@reduxjs/toolkit';
import { PALLET_BY_BOOKED, PALLET_BY_BOOKED_TYPE, PALLET_BY_CARRIER, PALLET_BY_CARRIER_TRAVEL, PALLET_BY_CARRIER_TYPE, PALLET_BY_CUSTOMER, PALLET_BY_CUSTOMER_TRAVEL, PALLET_BY_CUSTOMER_TYPE, PALLET_BY_DATE, REPORT_PALLETS_FROM_CUSTOMERS } from './graphql/queries';
import { calculatePalletResultFromReversal, calculatePalletResultFromTrade } from '../libs/calculatePalletResult';

// Target typename
const _TYPENAME = "PalletHandling"; 

// Graphql connection -----------------------------------------------------------------------------------------------------------------------
const allPalletsAdapter = createEntityAdapter();
const initialState = allPalletsAdapter.getInitialState();

// Tags generator
/* Array di stringhe per invalidare query ferme nella cache dello store */
const tagsGenerator = (ids = [], list_id) => (
  ids?.length > 0
    ? [
      ...ids.map(id => ({ type: _TYPENAME, id })),
      list_id && { type: _TYPENAME, id: list_id }
    ]
    : list_id ? [{ type: _TYPENAME, id: list_id }] : []
)

// Normalizers generator
/* Utilizzato per permettere una corretta lettura del dato sull'interfaccia, consentendo la 
manipolazione dello stesso all'interno del Redux Store */
const normalizePalletResponse = (payload) => {
  return ({
    ...payload,
    voucherImage: {
      db_format: payload.voucherImage,
      raw_format: { filename: payload.voucherImage?.filename || payload?.voucherImage?.key, object: payload?.voucherImage },
      online: true,
    },
    files: payload.files.map(file => ({
      db_format: file,
      raw_format: { filename: file?.filename || file?.key, object: file },
      online: true,
    })),
  })
}

// Api
export const extendedPalletHandlingsApiSlice = graphqlApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // NUOVA API ---------------------------------------------------------------------------------------------------------------------
    palletByBooked: builder.query({
      query: (args) => ({ body: PALLET_BY_BOOKED, args }),
      transformResponse: response => {
        allPalletsAdapter.setAll(initialState, response.items || []);
        const ids = response?.items?.length > 0 ? response.items.map(item => item.id) : [];
        const entities = response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {};
        const reversal_ids = ids.filter(id => id.includes('REV'));
        const list = ids.map(id => ({
          ...entities[id],
          reversal: entities[id].type === 'TRADE'
            ? reversal_ids.filter(tr_id => tr_id.includes(id)).map(tr_id => entities[tr_id])
            : []
        }))

        // Per avere next token in lista:
        return {
          ids: list?.length > 0 ? list.map(item => item.id) : [],
          entities: list?.length > 0 ? list.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_BOOKED' }
        ]
      }
    }),
    palletByBookedType: builder.query({
      query: (args) => ({ body: PALLET_BY_BOOKED_TYPE, args }),
      transformResponse: response => {
        allPalletsAdapter.setAll(initialState, response.items || []);
        const ids = response?.items?.length > 0 ? response.items.map(item => item.id) : [];
        const entities = response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {};
        const reversal_ids = ids.filter(id => id.includes('REV'));
        const list = ids.map(id => ({
          ...entities[id],
          reversal: entities[id].type === 'TRADE'
            ? reversal_ids.filter(tr_id => tr_id.includes(id)).map(tr_id => entities[tr_id])
            : []
        }))

        // Per avere next token in lista:
        return {
          ids: list?.length > 0 ? list.map(item => item.id) : [],
          entities: list?.length > 0 ? list.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_BOOKED_TYPE' }
        ]
      }
    }),
    palletByCarrier: builder.query({
      query: (args) => ({ body: PALLET_BY_CARRIER, args }),
      transformResponse: response => {
        allPalletsAdapter.setAll(initialState, response.items || []);
        const ids = response?.items?.length > 0 ? response.items.map(item => item.id) : [];
        const entities = response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {};
        const reversal_ids = ids.filter(id => id.includes('REV'));
        const list = ids.map(id => ({
          ...entities[id],
          reversal: entities[id].type === 'TRADE'
            ? reversal_ids.filter(tr_id => tr_id.includes(id)).map(tr_id => entities[tr_id])
            : []
        }))

        // Per avere next token in lista:
        return {
          ids: list?.length > 0 ? list.map(item => item.id) : [],
          entities: list?.length > 0 ? list.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
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
    palletByCarrierCustomer: builder.query({
      async queryFn(params) {
        if(!params?.companyId || !params?.customerId) return {};
        const queryByCarrierCustomer = await getPalletHandlingsByCarrierCustomer(params);
        const response = apiPalletCompanyReversalNormalizer(queryByCarrierCustomer);
        return { data: response };
      },
      providesTags: (result) => tagsGenerator(result?.ids || [], "LIST_BY_CARRIER_CUSTOMER"),
    }),
    palletByCarrierType: builder.query({
      query: (args) => ({ body: PALLET_BY_CARRIER_TYPE, args }),
      transformResponse: response => {
        allPalletsAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_TYPE' }
        ]
      }
    }),
    palletByCarrierTravel: builder.query({
      query: (args) => args?.travelStamp ? ({ body: PALLET_BY_CARRIER_TRAVEL, args }) : null,
      transformResponse: response => {
        if(!response) return null;
        allPalletsAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_TRAVEL' }
        ]
      }
    }),
    reportPalletCustomers: builder.query({
      query: (args) => args?.companyId ? ({ body: REPORT_PALLETS_FROM_CUSTOMERS, args }) : null,
      transformResponse: response => {
        if(!response) return null;
        allPalletsAdapter.setAll(initialState, response.items || []);
        
        // Calculate allLoad, allUnloads, allReversal for single customer
        let customersReport = [];
        if(response?.items?.length > 0) {
          response.items.forEach(customer => {
            let customerAsCarrier = customer.company.carrierPalletHandlings?.items || [];
            let customerAsCustomer = customer.company.customerPalletHandlings?.items || [];
            let customerAsReversals = customer.company.reversalPalletHandlings?.items || [];
            const carrierPalletHandlings = customerAsCarrier?.length > 0 ? calculatePalletResultFromTrade(customerAsCarrier, customer.tenant) : 0;
            const customerPalletHandlings = customerAsCustomer?.length > 0 ? calculatePalletResultFromTrade(customerAsCustomer, customer.tenant) : 0;
            const reversalPalletHandlings = customerAsReversals?.length > 0 ? calculatePalletResultFromReversal(customerAsReversals, customer.tenant) : 0;
            
            console.log({
              carrierPalletHandlings,
              customerPalletHandlings,
              reversalPalletHandlings,
            })

            customersReport.push({
              ...customer,
              volatilePalletWallet: carrierPalletHandlings + reversalPalletHandlings + customerPalletHandlings
            })
          })
        }

        // Per avere next token in lista:
        return {
          ids: customersReport?.length > 0 ? customersReport.map(item => item.id) : [],
          entities: customersReport?.length > 0 ? customersReport.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_CUSTOMERS' }
        ]
      }
    }),
    palletByCustomer: builder.query({
      query: (args) => ({ body: PALLET_BY_CUSTOMER, args }),
      transformResponse: response => {
        allPalletsAdapter.setAll(initialState, response.items || []);
        const ids = response?.items?.length > 0 ? response.items.map(item => item.id) : [];
        const entities = response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {};
        console.log("Ids", ids);
        const reversal_ids = ids.filter(id => id.includes('REV'));
        const list = ids.map(id => ({
          ...entities[id],
          reversal: entities[id].type === 'TRADE'
            ? reversal_ids.filter(tr_id => tr_id.includes(id)).map(tr_id => entities[tr_id])
            : []
        }))

        // Per avere next token in lista:
        return {
          ids: list?.length > 0 ? list.map(item => item.id) : [],
          entities: list?.length > 0 ? list.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_CUSTOMER' }
        ]
      }
    }),
    palletByCustomerCarrier: builder.query({
      async queryFn(params) {
        if(!params?.companyId || !params?.carrierId) return {};
        const queryByCustomerCarrier = await getPalletHandlingsByCustomerCarrier(params);
        const response = apiPalletCompanyReversalNormalizer(queryByCustomerCarrier);
        return { data: response };
      },
      providesTags: (result) => tagsGenerator(result?.ids || [], "LIST_BY_CUSTOMER_CARRIER"),
    }),
    palletByCustomerType: builder.query({
      query: (args) => ({ body: PALLET_BY_CUSTOMER_TYPE, args }),
      transformResponse: response => {
        allPalletsAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CUSTOMER_TYPE' }
        ]
      }
    }),
    palletByCustomerTravel: builder.query({
      query: (args) => ({ body: PALLET_BY_CUSTOMER_TRAVEL, args }),
      transformResponse: response => {
        allPalletsAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CUSTOMER_TRAVEL' }
        ]
      }
    }),
    palletByIdForCarrier: builder.query({
      async queryFn(params) {
        if(!params?.id) return {};
        const data = await getPalletHandlingByIdCarrier(params);
        const normalizedData = normalizePalletResponse(data);
        console.log('NormalizedData', normalizedData)
        return { data: normalizedData };
      },
      providesTags: (result) => tagsGenerator(result?.id ? [result?.id] : [], "PALLET_BY_ID"),
    }),
    palletByIdForCustomer: builder.query({
      async queryFn(params) {
        if(!params?.id) return {};
        const data = await getPalletHandlingByIdCustomer(params);
        const normalizedData = normalizePalletResponse(data);
        console.log('NormalizedData', normalizedData)
        return { data: normalizedData };
      },
      providesTags: (result) => tagsGenerator(result?.id ? [result?.id] : [], "PALLET_BY_ID"),
    }),
    // VECCHIA API ---------------------------------------------------------------------------------------------------------------------
    palletsByCustomer: builder.query({
      query: (params) =>  getPalletHandlingsByCustomerOperationDate(params),
      transformResponse: (response) => apiDataNormalizer(response?.items, response?.nextToken),
      providesTags: (response) => tagsGenerator(response?.ids, "PALLETS_LIST_BY_CUSTOMER"),
    }),
    // Queries by carrier + customer & by customer + carrier
    palletsByCarrierCustomer: builder.query({
      async queryFn(params) {
        if(!params?.customerName) return {};
        const queryByCarrierCustomer = await getPalletHandlingsByCarrierCustomer(params);
        const response = apiPalletCompanyReversalNormalizer(queryByCarrierCustomer);
        return { data: response };
      },
      providesTags: (result) => tagsGenerator(result?.ids || [], "PALLETS_LIST_BY_CARRIER_CUSTOMER"),
    }),
    palletsByCustomerCarrier: builder.query({
      async queryFn(params) {
        if(!params?.carrierName) return {};
        const queryByCustomerCarrier = await getPalletHandlingsByCustomerCarrier(params);
        const response = apiPalletCompanyReversalNormalizer(queryByCustomerCarrier);
        return { data: response };
      },
      providesTags: (result) => tagsGenerator(result?.ids || [], "PALLETS_LIST_BY_CUSTOMER_CARRIER"),
    }),
    // Queries by carrier + type & by customer + type 
    palletsByCarrierType: builder.query({
      query: (params) =>  getPalletHandlingsByCarrierType(params),
      transformResponse: (response) => apiDataNormalizer(response?.items, response?.nextToken),
      providesTags: (response) => tagsGenerator(response?.ids, "PALLETS_LIST_BY_CARRIER_TYPE"),
    }),
    palletsByCustomerType: builder.query({
      query: (params) =>  getPalletHandlingsByCustomerType(params),
      transformResponse: (response) => apiDataNormalizer(response?.items, response?.nextToken),
      providesTags: (response) => tagsGenerator(response?.ids, "PALLETS_LIST_BY_CUSTOMER_TYPE"),
    }),
    // Queries by carrier + travel & by customer + travel 
    palletsByCarrierTravel: builder.query({
      async queryFn(params) {
        if(!params?.travelStamp) return {};
        const response = await getPalletHandlingsByCarrierTravel({
          travelStamp: params.travelStamp,
          operationDate: [params.start, params.end]
        });

        return { data: apiDataNormalizer(response?.items, response?.nextToken)}
      },
      providesTags: (result) => tagsGenerator(result?.ids || [], "PALLETS_LIST_BY_CARRIER_TRAVEL"),
    }),
    palletsByCustomerTravel: builder.query({
      query: (params) =>  getPalletHandlingsByCustomerTravel(params),
      transformResponse: (response) => apiDataNormalizer(response?.items, response?.nextToken),
      providesTags: (response) => tagsGenerator(response?.ids, "PALLETS_LIST_BY_CUSTOMER_TRAVEL"),
    }),
    // Mutations ---------------------------------------------------------------------------------------------------------------------
    addPalletHandling: builder.mutation({
      async queryFn(params) {
        const palletHandling_return = await createPalletHandlingCaller(params);
        console.log("palletHandling_return", palletHandling_return);
        if(palletHandling_return) {
          const filteredReversals = palletHandling_return.filter(el => !el.id.includes("REV"))
          if(filteredReversals?.[0]?.stamp) {
            toast.success(`Movimentazione ${filteredReversals[0].stamp} creata con successo`)
          }
        }

        return palletHandling_return;
      },
      invalidatesTags: [
        { type: _TYPENAME, id: 'PALLET_BY_ID' },
        { type: _TYPENAME, id: 'LIST_BY_CARRIER' },
        { type: _TYPENAME, id: 'LIST_BY_CARRIER_CUSTOMER' },
        { type: _TYPENAME, id: 'LIST_BY_CARRIER_TYPE' },
        { type: _TYPENAME, id: 'LIST_BY_CARRIER_TRAVEL' },
        { type: _TYPENAME, id: 'LIST_BY_CUSTOMER' },
        { type: _TYPENAME, id: 'LIST_BY_CUSTOMER_CARRIER' },
        { type: _TYPENAME, id: 'LIST_BY_CUSTOMER_TYPE' },
        { type: _TYPENAME, id: 'LIST_BY_CUSTOMER_TRAVEL' },
        { type: 'Travel', id: 'LIST_BY_CARRIER' },
        { type: 'Travel', id: 'LIST_BY_CUSTOMER' }
      ]
    }),
    addReversalHandling: builder.mutation({
      async queryFn(params) {
        const reversal_return = await createReversalCaller(params);
        console.log("reversal_return", reversal_return);
        if(reversal_return) {
          toast.success(`Storno ${reversal_return.data.stamp} creato con successo`)
        }

        return reversal_return;
      },
      invalidatesTags: [
        { type: _TYPENAME, id: 'PALLET_BY_ID' },
        { type: _TYPENAME, id: 'LIST_BY_CARRIER' },
        { type: _TYPENAME, id: 'LIST_BY_CARRIER_CUSTOMER' },
        { type: _TYPENAME, id: 'LIST_BY_CARRIER_TYPE' },
        { type: _TYPENAME, id: 'LIST_BY_CARRIER_TRAVEL' },
        { type: _TYPENAME, id: 'LIST_BY_CUSTOMER' },
        { type: _TYPENAME, id: 'LIST_BY_CUSTOMER_CARRIER' },
        { type: _TYPENAME, id: 'LIST_BY_CUSTOMER_TYPE' },
        { type: _TYPENAME, id: 'LIST_BY_CUSTOMER_TRAVEL' },
        { type: 'Travel', id: 'LIST_BY_CARRIER' },
        { type: 'Travel', id: 'LIST_BY_CUSTOMER' }
      ]
    }),
    updatePalletHandling: builder.mutation({
      query: (params) => updatePalletHandlingCaller(params),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }]
    }),
  })
})

export const {
  usePalletByBookedQuery,
  usePalletByBookedTypeQuery,
  useReportPalletCustomersQuery,
  usePalletByIdForCarrierQuery,
  usePalletByIdForCustomerQuery,
  usePalletsByCarrierQuery,
  usePalletsByCustomerQuery,
  usePalletsByCarrierCustomerQuery,
  usePalletsByCustomerCarrierQuery,
  usePalletsByCarrierTypeQuery,
  usePalletsByCustomerTypeQuery,
  usePalletsByCarrierTravelQuery,
  usePalletsByCustomerTravelQuery,
  useAddPalletHandlingMutation,
  useAddReversalHandlingMutation,
  useUpdatePalletHandlingMutation,
  // Nuova api
  usePalletByCarrierQuery,
  usePalletByCarrierCustomerQuery,
  usePalletByCarrierTypeQuery,
  usePalletByCarrierTravelQuery,
  usePalletByCustomerQuery,
  usePalletByCustomerCarrierQuery,
  usePalletByCustomerTypeQuery,
  usePalletByCustomerTravelQuery,
} = extendedPalletHandlingsApiSlice;