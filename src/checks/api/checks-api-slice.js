import { createEntityAdapter } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { graphqlApiSlice } from '../../app/api/graphql-api-slice';
import { formatFilesToApp, generateLegacyLogList } from '../../globals/libs/helpers';
import { DEFAULT_CHECK_LIMIT } from '../slices/checksListSlice';
import { createCheckByCarrier, createCheckCaller, removeCheckItem, updateCheckByCarrier, updateCheckCaller } from './checks-callers';
import { deleteCheck } from './graphql/mutations';
import { CHECK_BY_CARRIER, CHECK_BY_CARRIER_ARCHIVED, CHECK_BY_CARRIER_DELIVERED, CHECK_BY_CARRIER_DELIVERING, CHECK_BY_CARRIER_PENDING, CHECK_BY_CARRIER_PICKEDUP, CHECK_BY_CARRIER_RECORDING, CHECK_BY_ID, CHECK_BY_ORDERID, CHECK_BY_RECEIVER, CHECK_BY_RECEIVER_ARCHIVED, CHECK_BY_RECEIVER_DELIVERED, CHECK_BY_RECEIVER_DELIVERING, CHECK_BY_RECEIVER_PENDING, CHECK_BY_RECEIVER_PICKEDUP, CHECK_BY_RECEIVER_RECORDING, CHECK_BY_SENDER, CHECK_BY_SENDER_ARCHIVED, CHECK_BY_SENDER_DELIVERED, CHECK_BY_SENDER_DELIVERING, CHECK_BY_SENDER_PENDING, CHECK_BY_SENDER_PICKEDUP, CHECK_BY_SENDER_RECORDING } from './graphql/queries';

// Target typename
const _TYPENAME = "Check"; 

// Graphql connection -----------------------------------------------------------------------------------------------------------------------
const allChecksAdapter = createEntityAdapter();
const initialState = allChecksAdapter.getInitialState();

// Normalizers generator
/* Utilizzato per permettere una corretta lettura del dato sull'interfaccia, consentendone la 
manipolazione all'interno del Redux Store */
const normalizeCheckResponse = (payload) => {
  return ({
    ...payload,
    order: {
      ...payload.order,
      docs: payload.order?.docs?.length > 0
        ? payload.order.docs.map((doc, index) => ({
          ...doc,
          id: `${doc.number}-${index}`,
          files: formatFilesToApp(doc.files)
        }))
        : []
    },
    docsRef:  payload.docsRef?.length > 0
      ?  payload.docsRef.map((doc, index) => ({ ...doc, id: `${doc.number}-${index}`}))
      : [],
    beneficiary: payload.beneficiary,
    amount: payload?.amount ? new Number(payload.amount).toFixed(2) : "",
    image: {
      db_format: payload.image,
      raw_format: { filename: payload.image?.filename || payload?.image?.key, object: payload?.image },
      online: true,
    },
    files: formatFilesToApp(payload.files),
    status: payload.status,
    note: payload.note,
  })
}

// Api
export const extendedChecksApiSlice = graphqlApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Queries by carrier ------------------------------------------------------------------------------------------------------------------------------------
    checkByCarrier: builder.query({
      query: (args) => ({ body: CHECK_BY_CARRIER, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkByCarrierPending: builder.query({
      query: (args) => ({ body: CHECK_BY_CARRIER_PENDING, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkByCarrierPickedup: builder.query({
      query: (args) => ({ body: CHECK_BY_CARRIER_PICKEDUP, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkByCarrierRecording: builder.query({
      query: (args) => ({ body: CHECK_BY_CARRIER_RECORDING, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_CARRIER_RECORDING' }
        ]
      }
    }),
    checkByCarrierDelivering: builder.query({
      query: (args) => ({ body: CHECK_BY_CARRIER_DELIVERING, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkByCarrierDelivered: builder.query({
      query: (args) => ({ body: CHECK_BY_CARRIER_DELIVERED, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkByCarrierArchived: builder.query({
      query: (args) => ({ body: CHECK_BY_CARRIER_ARCHIVED, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    // Queries by sender ------------------------------------------------------------------------------------------------------------------------------------
    checkBySender: builder.query({
      query: (args) => ({ body: CHECK_BY_SENDER, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkBySenderPending: builder.query({
      query: (args) => ({ body: CHECK_BY_SENDER_PENDING, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkBySenderPickedup: builder.query({
      query: (args) => ({ body: CHECK_BY_SENDER_PICKEDUP, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkBySenderRecording: builder.query({
      query: (args) => ({ body: CHECK_BY_SENDER_RECORDING, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_SENDER_RECORDING' }
        ]
      }
    }),
    checkBySenderDelivering: builder.query({
      query: (args) => ({ body: CHECK_BY_SENDER_DELIVERING, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkBySenderDelivered: builder.query({
      query: (args) => ({ body: CHECK_BY_SENDER_DELIVERED, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkBySenderArchived: builder.query({
      query: (args) => ({ body: CHECK_BY_SENDER_ARCHIVED, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    // Queries by receiver ------------------------------------------------------------------------------------------------------------------------------------
    checkByReceiver: builder.query({
      query: (args) => ({ body: CHECK_BY_RECEIVER, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkByReceiverPending: builder.query({
      query: (args) => ({ body: CHECK_BY_RECEIVER_PENDING, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkByReceiverPickedup: builder.query({
      query: (args) => ({ body: CHECK_BY_RECEIVER_PICKEDUP, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkByReceiverRecording: builder.query({
      query: (args) => ({ body: CHECK_BY_RECEIVER_RECORDING, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_RECEIVER_RECORDING' }
        ]
      }
    }),
    checkByReceiverDelivering: builder.query({
      query: (args) => ({ body: CHECK_BY_RECEIVER_DELIVERING, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkByReceiverDelivering: builder.query({
      query: (args) => ({ body: CHECK_BY_RECEIVER_DELIVERED, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    checkByReceiverArchived: builder.query({
      query: (args) => ({ body: CHECK_BY_RECEIVER_ARCHIVED, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
    // Queries by receiver ------------------------------------------------------------------------------------------------------------------------------------
    checkByOrder: builder.query({
      query: (args) => ({ body: CHECK_BY_ORDERID, args }),
      transformResponse: response => {
        allChecksAdapter.setAll(initialState, response.items || []);
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
          { type: _TYPENAME, id: 'LIST_BY_ORDERID' }
        ]
      }
    }),
    checkById: builder.query({
      query: (args) => ({ body: CHECK_BY_ID, args }),
      transformResponse: (response) => normalizeCheckResponse(response),
      providesTags: ({ id }) => {
        return [{ type: _TYPENAME, id }]
      }
    }),
    // Mutations
    addCheckByCarrier: builder.mutation({
      query: (params) => createCheckByCarrier(params),
      invalidatesTags: [{ type: _TYPENAME, id: 'LIST_BY_CARRIER'}, { type: _TYPENAME, id: 'LIST_BY_ORDERID'}]
    }),
    createCheck: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        const { check, checkId, companyType } = args;
        try {
          let dataToSend = {
            ...check,
            id: checkId,
          }

          const domain = check.order[`${companyType}Name`];
          dataToSend.log = await generateLegacyLogList({
            list: [],
            action: 'Creazione',
            subject: `assegno da ${check.order.receiverName} a ${check.order.senderName}, gestito da ${check.order.carrierName}. Operazione eseguita dal dominio di ${domain}`
          });

          const response = await createCheckCaller(dataToSend);
          if(!response?.error) toast.success(`Assegno ${check.stamp} registrato con successo`);
          return { data: response };
        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante la registrazione dell'assegno`);
          return null;
        }
      },
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        const { checks: { list: { type, limit, end, start }}} = getState();
        let queryListToUpdate;
        if(args.companyType === "carrier") {
          queryListToUpdate = {
            companyId: args.check.order.carrierId,
            filter: { id: { attributeExists: true }},
            limit: DEFAULT_CHECK_LIMIT,
          }

          const patchResult = dispatch(
            extendedChecksApiSlice.util.updateQueryData(
              'checkByCarrier', queryListToUpdate, (draft) => {
                allChecksAdapter.addOne(draft, {
                  ...args.check,
                  id: args.checkId,
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

        if(args.companyType === "receiver") {
          queryListToUpdate = {
            companyId: args.check.order.receiverId,
            start,
            end,
            filter: { id: { attributeExists: true }},
            limit: type === "ALL" ? limit : DEFAULT_CHECK_LIMIT,
          }

          const patchResult = dispatch(
            extendedChecksApiSlice.util.updateQueryData(
              'orderBySender', queryListToUpdate, (draft) => {
                allChecksAdapter.addOne(draft, {
                  ...args.check,
                  id: args.checkId,
                })
            })
          )
  
          try {
            await queryFulfilled;
          } catch(err) {
            console.error(err);
            toast.error(`Non è stato possibile inviare il pre-ordine cod. ${args.order?.stamp}`);
            patchResult.undo();
          }
        }
      },
      invalidatesTags: () => [
        { type: 'Order', id: 'LIST_BY_CARRIER_COLLECTCHECKS'},
        { type: 'Order', id: 'LIST_BY_RECEIVER_COLLECTCHECKS'},
        { type: _TYPENAME, id: 'LIST_BY_ORDERID'},
        { type: _TYPENAME, id: 'LIST_BY_CARRIER'},
        { type: _TYPENAME, id: 'LIST_BY_RECEIVER'},
      ]
    }),
    updateCheck: builder.mutation({
      query: (params) => updateCheckCaller(params),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }]
    }),
    updateCheckByCarrier: builder.mutation({
      query: (params) => updateCheckByCarrier(params),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }]
    }),
    removeCheck: builder.mutation({
      query: (id) => removeCheckItem(id),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }]
    }),
    deleteCheck: builder.mutation({
      query: (id) => ({
        body: deleteCheck,
        args: { input: { id }}
      }),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }]
    })
  }),
});

export const {
  useCheckByCarrierQuery,
  useCheckByCarrierPendingQuery,
  useCheckByCarrierRecordingQuery,
  useCheckByCarrierPickedupQuery,
  useCheckByCarrierDeliveringQuery,
  useCheckByCarrierDeliveredQuery,
  useCheckByCarrierArchivedQuery,
  useCheckBySenderQuery,
  useCheckBySenderPendingQuery,
  useCheckBySenderRecordingQuery,
  useCheckBySenderPickedupQuery,
  useCheckBySenderDeliveringQuery,
  useCheckBySenderDeliveredQuery,
  useCheckBySenderArchivedQuery,
  useCheckByReceiverQuery,
  useCheckByReceiverPendingQuery,
  useCheckByReceiverRecordingQuery,
  useCheckByReceiverPickedupQuery,
  useCheckByReceiverDeliveringQuery,
  useCheckByReceiverDeliveredQuery,
  useCheckByReceiverArchivedQuery,
  useCheckByIdQuery,
  useCheckByOrderQuery,
  useCreateCheckMutation,
  useAddCheckByCarrierMutation,
  useUpdateCheckByCarrierMutation,
  useRemoveCheckMutation,
  useUpdateCheckMutation,
  useDeleteCheckMutation,
} = extendedChecksApiSlice;