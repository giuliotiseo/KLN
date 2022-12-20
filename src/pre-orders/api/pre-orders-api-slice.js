import { createEntityAdapter } from "@reduxjs/toolkit";
import { graphqlApiSlice } from "../../app/api/graphql-api-slice";
import { PREORDER_BY_CARRIER, PREORDER_BY_CARRIER_ACCEPTED, PREORDER_BY_CARRIER_FROM_ORDER, PREORDER_BY_CARRIER_PENDING, PREORDER_BY_CARRIER_REJECTED, PREORDER_BY_ID, PREORDER_BY_SENDER, PREORDER_BY_SENDER_ACCEPTED, PREORDER_BY_SENDER_FROM_ORDER, PREORDER_BY_SENDER_PENDING, PREORDER_BY_SENDER_REJECTED, PREORDER_BY_STORAGE, PREORDER_BY_STORAGE_ACCEPTED, PREORDER_BY_STORAGE_PENDING, PREORDER_BY_STORAGE_REJECTED } from "./graphql/queries";
import { formatFilesToApp, formatWindowsToApp, formatWindowsToDynamoDb, generateLegacyLogList } from "../../globals/libs/helpers";
import { formatLocationCoords } from "../../warehouses/libs/helpers";
import { DEFAULT_PREORDER_LIMIT } from "../slices/preOrdersListSlice";
import { createPreOrderCaller, updatePreOrderCaller } from "./pre-orders-callers";
import { toast } from "react-toastify";
import { DELETE_PREORDER } from "./graphql/mutations";

// Target typename
const _TYPENAME = "PreOrder"; 

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
const allPreOrdersAdapter = createEntityAdapter();
const initialState = allPreOrdersAdapter.getInitialState();

// Api
export const extendedPreOrdersApiSlice = graphqlApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query -----------------------------------------------------------------------------------------------------------------------------------------------
    preOrderByCarrier: builder.query({
      query: (args) => ({ body: PREORDER_BY_CARRIER, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items || []);
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
    preOrderByCarrierPending: builder.query({
      query: (args) => ({ body: PREORDER_BY_CARRIER_PENDING, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
    preOrderByCarrierAccepted: builder.query({
      query: (args) => ({ body: PREORDER_BY_CARRIER_ACCEPTED, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_ACCEPTED' }
        ]
      }
    }),
    preOrderByCarrierRejected: builder.query({
      query: (args) => ({ body: PREORDER_BY_CARRIER_REJECTED, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_REJECTED' }
        ]
      }
    }),
    preOrderBySender: builder.query({
      query: (args) => ({ body: PREORDER_BY_SENDER, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
    preOrderBySenderPending: builder.query({
      query: (args) => ({ body: PREORDER_BY_SENDER_PENDING, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
    preOrderBySenderAccepted: builder.query({
      query: (args) => ({ body: PREORDER_BY_SENDER_ACCEPTED, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_SENDER_ACCEPTED' }
        ]
      }
    }),
    preOrderBySenderRejected: builder.query({
      query: (args) => ({ body: PREORDER_BY_SENDER_REJECTED, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_SENDER_REJECTED' }
        ]
      }
    }),
    // Storage query
    preOrderByStorage: builder.query({
      query: (args) => ({ body: PREORDER_BY_STORAGE, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_STORAGE' }
        ]
      }
    }),
    preOrderByStoragePending: builder.query({
      query: (args) => ({ body: PREORDER_BY_STORAGE_PENDING, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_STORAGE_PENDING' }
        ]
      }
    }),
    preOrderBySenderAccepted: builder.query({
      query: (args) => ({ body: PREORDER_BY_STORAGE_ACCEPTED, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_STORAGE_ACCEPTED' }
        ]
      }
    }),
    preOrderBySenderRejected: builder.query({
      query: (args) => ({ body: PREORDER_BY_STORAGE_REJECTED, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_STORAGE_REJECTED' }
        ]
      }
    }),
    // Order query
    preOrderByCarrierFromOrder: builder.query({
      query: (args) => ({ body: PREORDER_BY_CARRIER_FROM_ORDER, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_FOR_ORDER' }
        ]
      }
    }),
    preOrderBySenderFromOrder: builder.query({
      query: (args) => ({ body: PREORDER_BY_SENDER_FROM_ORDER, args }),
      transformResponse: response => {
        allPreOrdersAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_SENDER_FOR_ORDER' }
        ]
      }
    }),
    // Get
    preOrderById: builder.query({
      query: (args) => !args?.id ? null : ({ body: PREORDER_BY_ID, args }),
      transformResponse: response => {
        console.log("Capisco response e capisco tutto", response);
        
        if(!response) return null;
        return {
          ...response,
          checkpoint: {
            ...response.checkpoint,
            windows: formatWindowsToApp(response.checkpoint.windows),
            thirdCompany: response.storageId !== response.senderId
              ? {
                id: response.storageId,
                vatNumber: response.storageVat,
                name: response.storageName,
                company: {
                  id: response.storageId,
                  owner: response.tenantStorage,
                  name: response.storageName,
                  vatNumber: response.storageVat,
                }
              }
              : null,
          },
          sender: {
            id: response.senderId,
            vatNumber: response.senderVat,
            name: response.senderName,
            company: { owner: response.tenantSender }
          },
          carrier: {
            id: response.carrierId,
            vatNumber: response.carrierVat,
            name: response.carrierName,
            company: { owner: response.tenantCarrier }
          },
          files: response?.files?.length > 0 
            ? formatFilesToApp(response.files)
            : []
        };
      },
      providesTags: (result) => {
        if(!result?.id) return [];
        return [{ type: _TYPENAME, id: result.id }]
      }
    }),
    // Mutations -----------------------------------------------------------------------------------------------------------------------------------------------
    createPreOrder: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        const { preOrder, preOrderId } = args;
        try {
          let dataToSend = {
            id: preOrderId,
            stamp: preOrder.stamp,
            name: `Pre-ordine ${preOrder.stamp.split("-")[1]}`,
            // Carrier
            carrierId: preOrder.carrier.company.id,
            tenantCarrier: preOrder?.carrier?.company?.owner,
            carrierName: preOrder.carrier.name,
            carrierVat: preOrder.carrier.vatNumber,
            // Sender
            senderId: preOrder.sender.company.id,
            tenantSender: preOrder?.sender?.company?.owner,
            senderName: preOrder.sender.name,
            senderVat: preOrder.sender.vatNumber,
            // Storage
            storageId: preOrder?.checkpoint?.thirdCompanyId || preOrder.sender.company.id,
            tenantStorage: preOrder?.checkpoint?.thirdCompanyOwner || preOrder?.sender?.company?.owner,
            storageName: preOrder?.checkpoint?.thirdCompanyName || preOrder.sender.name,
            storageVat: preOrder?.checkpoint?.thirdCompanyVat || preOrder.sender.vatNumber,
            // Orher
            shipmentType: preOrder.shipmentType,
            pickupDateStart: preOrder.pickupDateStart,
            pickupDateEnd: preOrder.pickupDateEnd,
            status: preOrder?.status || "PENDING",
            deliveryAreas: preOrder?.deliveryAreas || [],
            deliveryRegions: preOrder?.deliveryRegions || [],
            slot: preOrder?.slot,
            perishable: preOrder.perishable,
            vehicleType: preOrder.vehicleType,
            checkpoint: {
              ...preOrder.checkpoint,
              windows: formatWindowsToDynamoDb(preOrder.checkpoint.windows),
              location: {
                ...preOrder.checkpoint.location,
                coordinate: formatLocationCoords(preOrder.checkpoint.location.coordinate)
              }
            },
            address: preOrder.checkpoint.location.address,
            trades: preOrder?.trades || [],
            files: preOrder.files?.length > 0 ? preOrder.files.map(file => file.db_format) : [],
            note: preOrder.note,
            billingType: preOrder.billingType,
          }

          dataToSend.log = await generateLegacyLogList({
            list: [],
            action: 'Creazione',
            subject: `nuovo pre-ordine codice: ${preOrder?.stamp}`
          });

          const response = await createPreOrderCaller(dataToSend);
          if(!response?.error) toast.success(`Pre-ordine ${preOrder.stamp} inviato con successo`);
          return { data: response };
        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema l'invio del pre-ordine cod. ${preOrder.stamp}`);
          return null;
        }
      },
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        const { preOrders: { list: { type, limit, end, start }}} = getState();
        let queryListToUpdate;
        if(args.companyType === "CARRIER") {
          queryListToUpdate = {
            companyId: args.preOrder.carrier.id,
            filter: { id: { attributeExists: true }},
            limit: type.status === "ALL" ? limit : DEFAULT_PREORDER_LIMIT,
          }

          const patchResult = dispatch(
            extendedPreOrdersApiSlice.util.updateQueryData(
              'preOrderByCarrier', queryListToUpdate, (draft) => {
                allPreOrdersAdapter.addOne(draft, {
                  ...args.preOrder,
                  id: args.preOrderId,
                })
            })
          )
  
          try {
            await queryFulfilled;
          } catch(err) {
            console.error(err);
            toast.error(`Non è stato possibile registrare il pre-ordine cod. ${args.preOrder?.stamp}`);
            patchResult.undo();
          }
        }

        if(args.companyType === "SENDER") {
          queryListToUpdate = {
            companyId: args.preOrder.sender.id,
            start,
            end,
            filter: { id: { attributeExists: true }},
            limit: type === "ALL" ? limit : DEFAULT_PREORDER_LIMIT,
          }

          const patchResult = dispatch(
            extendedPreOrdersApiSlice.util.updateQueryData(
              'preOrderBySender', queryListToUpdate, (draft) => {
                allPreOrdersAdapter.addOne(draft, {
                  ...args.preOrder,
                  id: args.preOrderId,
                })
            })
          )
  
          try {
            await queryFulfilled;
          } catch(err) {
            console.error(err);
            toast.error(`Non è stato possibile inviare il pre-ordine cod. ${args.preOrder?.stamp}`);
            patchResult.undo();
          }
        }
      },
      invalidatesTags: () => [
        { type: _TYPENAME, id: 'LIST_BY_CARRIER'},
        { type: _TYPENAME, id: 'LIST_BY_SENDER'},
      ]
    }),
    updatePreOrder: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        try {
          console.log("Aggiorno il pre-ordine: ", { preOrder: args });
          const response = await updatePreOrderCaller(args);

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
        { type: _TYPENAME, id: `LIST_BY_SENDER`},
        { type: _TYPENAME, id },
      ]
    }),
    deletePreOrder: builder.mutation({
      query: (id) => ({
        body: DELETE_PREORDER,
        args: { input: { id }}
      }),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }]
    })
  })
})

export const {
  usePreOrderByCarrierQuery,
  usePreOrderByCarrierPendingQuery,
  usePreOrderByCarrierAcceptedQuery,
  usePreOrderByCarrierRejectedQuery,
  usePreOrderBySenderQuery,
  usePreOrderBySenderPendingQuery,
  usePreOrderBySenderAcceptedQuery,
  usePreOrderBySenderRejectedQuery,
  usePreOrderByStorageQuery,
  usePreOrderByStoragePendingQuery,
  usePreOrderByStorageAcceptedQuery,
  usePreOrderByStorageRejectedQuery,
  usePreOrderByCarrierFromOrderQuery,
  usePreOrderBySenderFromOrderQuery,
  usePreOrderByIdQuery,
  useCreatePreOrderMutation,
  useUpdatePreOrderMutation,
  useDeletePreOrderMutation,
} = extendedPreOrdersApiSlice;
