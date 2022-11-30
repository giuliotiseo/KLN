import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { graphqlApiSlice } from "../../app/api/graphql-api-slice";
import { formatWindowsToApp, formatWindowsToDynamoDb, generateLegacyLogList } from '../../globals/libs/helpers';
import { formatLocationCoords } from "../libs/helpers";
import { DEFAULT_WAREHOUSES_LIMIT } from "../slices/warehousesListSlice";
import { DEPOSIT_BY_COMPANY, HUB_BY_COMPANY, INTER_BY_COMPANY, LINKED_WAREHOUSES_BY_COMPANY, WAREHOUSE_BY_CLIENT, WAREHOUSE_BY_ID, WAREHOUSE_BY_COMPANY } from './graphql/queries';
// Callers
import {
  createWarehouseCaller, createWarehouseLinkCaller, deleteWarehouseCaller, deleteWarehouseLinkCaller, updateWarehouseCaller
} from './warehouses-callers';

// Target typename
const _TYPENAME = "Warehouse"; 

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
const allWarehousesAdapter = createEntityAdapter();
const initialState = allWarehousesAdapter.getInitialState();

// Api
export const extendedWarehousesApiSlice = graphqlApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query -----------------------------------------------------------------------------------------------------------------------------------------------
    warehouseByCompany: builder.query({
      query: (args) => {
        return ({ body: WAREHOUSE_BY_COMPANY, args })
      },
      transformResponse: response => {
        const formattedResponse = response?.items?.length > 0
          ? response.items.map(warehouse => warehouse.isLinked === 1
              ? ({
                ...warehouse.warehouseLink.warehouse,
                id: warehouse.id,
                remote: true,
                windows: formatWindowsToApp(warehouse.warehouseLink.warehouse.windows)
              })
              : ({
                ...warehouse,
                windows: formatWindowsToApp(warehouse.windows)
              })
          )
          : [];

        if(formattedResponse?.length > 0) {
          allWarehousesAdapter.setAll(initialState, formattedResponse);
        }

        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? formattedResponse.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? formattedResponse.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_BY_COMPANY' }
        ]
      }
    }),
    warehouseByClient: builder.query({
      query: (args) => {
        return ({ body: WAREHOUSE_BY_CLIENT, args })
      },
      transformResponse: response => {
        if(response?.items?.length > 0) {
          allWarehousesAdapter.setAll(initialState, response.items);
        }
        
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
          { type: _TYPENAME, id: 'LIST_BY_CLIENT' }
        ]
      }
    }),
    depositByCompany: builder.query({
      query: (args) => {
        console.log("Args", { args });
        return ({ body: DEPOSIT_BY_COMPANY, args })
      },
      transformResponse: response => {
        const formattedResponse = response?.items?.length > 0
          ? response.items.map(warehouse => warehouse.isLinked
              ? ({ ...warehouse.warehouseLink.warehouse, remote: true })
              : warehouse
          )
          : [];

        if(formattedResponse?.length > 0) {
          allWarehousesAdapter.setAll(initialState, formattedResponse);
        }

        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? formattedResponse.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? formattedResponse.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result, err, arg) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: `LIST_DEPOSIT` }
        ]
      }
    }),
    interByCompany: builder.query({
      query: (args) => {
        console.log("Args", { args });
        return ({ body: INTER_BY_COMPANY, args })
      },
      transformResponse: response => {
        const formattedResponse = response?.items?.length > 0
          ? response.items.map(warehouse => warehouse.isLinked
              ? ({ ...warehouse.warehouseLink.warehouse, remote: true })
              : warehouse
          )
          : [];

        if(formattedResponse?.length > 0) {
          allWarehousesAdapter.setAll(initialState, formattedResponse);
        }  

        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? formattedResponse.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? formattedResponse.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result, err, arg) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: `LIST_INTER` }
        ]
      }
    }),
    hubByCompany: builder.query({
      query: (args) => {
        console.log("Args", { args });
        return ({ body: HUB_BY_COMPANY, args })
      },
      transformResponse: response => {
        const formattedResponse = response?.items?.length > 0
          ? response.items.map(warehouse => warehouse.isLinked
              ? ({ ...warehouse.warehouseLink.warehouse, remote: true })
              : warehouse
          )
          : [];

        if(formattedResponse?.length > 0) {
          allWarehousesAdapter.setAll(initialState, formattedResponse);
        }

        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? formattedResponse.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? formattedResponse.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result, err, arg) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: `LIST_HUB` }
        ]
      }
    }),
    linkedWarehouseByCompany: builder.query({
      query: (args) => {
        console.log("Args", { args });
        return ({ body: LINKED_WAREHOUSES_BY_COMPANY, args })
      },
      transformResponse: response => {
        const formattedResponse = response?.items?.length > 0
          ? response.items.map(warehouse => warehouse.isLinked
              ? ({ ...warehouse.warehouseLink.warehouse, remote: true })
              : warehouse
          )
          : [];
        
        if(formattedResponse?.length > 0) {
          allWarehousesAdapter.setAll(initialState, formattedResponse);
        }

        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? formattedResponse.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? formattedResponse.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },
      providesTags: (result, err, arg) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: `HUB_BY_COMPANY` }
        ]
      }
    }),
    warehouseById: builder.query({
      query: (args) => ({ body: WAREHOUSE_BY_ID, args }),
      transformResponse: response => {
        const formattedResponse = response.isLinked === 1 // mixo i risultati
          ? ({
              ...response.warehouseLink.warehouse,
              id: response.id,
              extId: response.extId,
              name: response.name,
              companyId: response.companyId,
              isLinked: 1,
              remote: true,
              companyOwner: response.warehouseLink.companyOwnerSummary,
              companyClient: response.warehouseLink.companyClientSummary,
              warehouseLinkId: response.warehouseLinkId,
              windows: formatWindowsToApp(response.warehouseLink.warehouse.windows)
            })
          : ({
            ...response,
            windows: formatWindowsToApp(response.windows)
          })

        return formattedResponse;
      },
      providesTags: (result) => {
        console.log("provide tags", result);
        if(!result?.id) return [];
        return [{ type: 'Warehouse', id: result.id }]
      }
    }),
    // Mutation -----------------------------------------------------------------------------------------------------------------------------------------------
    createWarehouse: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        const { warehouse, warehouseId, warehouseLinkId, companyId, tenant, owner } = args;
        let dataToSend;
        let linkedDataToSend;
        try { 
          // Creo un magazzino di proprietà
          if(warehouse.isLinked === 0) {
            dataToSend = {
              id: warehouseId,
              name: warehouse.name,
              extId: v4(),
              searchable: `${warehouse.name.toLowerCase()} ${warehouse.location.address.toLowerCase()}`,
              status: "ACTIVE",
              companyId,
              tenant,
              owner,
              scope: warehouse.scope,
              isDeposit: warehouse.scope.includes("DEPOSITO") ? 1 : 0,
              isInter: warehouse.scope.includes("INTERMEDIO") ? 1 : 0,
              isHub: warehouse.scope.includes("DISTRIBUZIONE") ? 1 : 0,
              isLinked: 0,
              location: {
                ...warehouse.location,
                coordinate: formatLocationCoords(warehouse.location.coordinate)
              },
              windows: formatWindowsToDynamoDb(warehouse.windows),
              contactIds: warehouse?.contactIds || [],
              contacts: warehouse?.contacts || [],
              specialization: warehouse?.specialization,
              maxLength: warehouse.maxLength,
              tools: warehouse?.tools || [],
              automationLevel: warehouse?.automationLevel,
              type: warehouse?.type,
              cargoBay: warehouse?.cargoBay || 0,
              trades: warehouse?.trades || [],
              containerUnloading: warehouse?.containerUnloading || false,
              note: warehouse?.note
            }
          }
          // Creo un magazzino gestito da terzi
          if(warehouse.isLinked === 1) {
            // Imposto la creazione di un magazzino gestito da terzi (Warehouse)
            dataToSend = {
              id: warehouseId,
              extId: v4(),
              name: warehouse.name,
              searchable: `${warehouse.name.toLowerCase()} ${warehouse.linkedWarehouse.location.address.toLowerCase()}`,
              status: warehouse.linkedWarehouse.status,
              companyId,
              tenant,
              owner,
              scope: warehouse.linkedWarehouse.scope,
              isDeposit: warehouse.linkedWarehouse.scope.includes("DEPOSITO") ? 1 : 0,
              isInter: warehouse.linkedWarehouse.scope.includes("INTERMEDIO") ? 1 : 0,
              isHub: warehouse.linkedWarehouse.scope.includes("DISTRIBUZIONE") ? 1 : 0,
              isLinked: 1,
              location: {
                ...warehouse.linkedWarehouse.location,
                coordinate: formatLocationCoords(warehouse.linkedWarehouse.location.coordinate)
              },
              windows: formatWindowsToDynamoDb(warehouse.linkedWarehouse.windows),
              contactIds: warehouse.linkedWarehouse?.contactIds || [],
              contacts: warehouse.linkedWarehouse?.contacts || [],
              specialization: warehouse.linkedWarehouse?.specialization,
              maxLength: warehouse.linkedWarehouse.maxLength,
              tools: warehouse.linkedWarehouse?.tools || [],
              automationLevel: warehouse.linkedWarehouse?.automationLevel,
              type: warehouse.linkedWarehouse?.type,
              cargoBay: warehouse?.linkedWarehouse?.cargoBay || 0,
              trades: warehouse?.linkedWarehouse?.trades || [],
              containerUnloading: warehouse?.linkedWarehouse?.containerUnloading || false,
              note: warehouse.linkedWarehouse?.note,
              warehouseLinkId: warehouseLinkId,
            }

            // Imposto la creazione di un magazzino gestito da terzi (WarehouseLink)
            console.log('Analisi linked company', warehouse);
            linkedDataToSend = {
              id: warehouseLinkId,
              warehouseId: warehouse.linkedWarehouse.id,
              companyClientId: companyId,
              companyOwnerId: warehouse.linkedCompany.id,
              tenantClient: tenant,
              tenantOwner: warehouse.linkedCompany.owner,
              companyOwnerSummary: {
                id: warehouse.linkedCompany.id,
                name: warehouse.linkedCompany.name,
                vatNumber: warehouse.linkedCompany.vatNumber,
                uniqueCode: warehouse.linkedCompany?.uniqueCode,
                pec: warehouse.linkedCompany?.pec
              },
            }

            dataToSend.log = await generateLegacyLogList({
              list: [],
              action: 'Creazione',
              subject: `nuovo magazzino di terze parti agganciato a ${warehouse.linkedCompany.name} (${warehouse.linkedWarehouse.name})`
            });

            linkedDataToSend.log = await generateLegacyLogList({
              list: [],
              action: 'Creazione',
              subject: `nuovo magazzino ${warehouse?.name} in ${warehouse?.linkedWarehouse?.location?.address}`
            });

          }
          
          console.log("IL MIO NUOVO MAGAZZINO AGGANCIATO", dataToSend);
          console.log("IL MAGAZZINO GANCIO", linkedDataToSend);
          const response = await createWarehouseCaller(dataToSend);

          if(linkedDataToSend) {
            const responseLinked = await createWarehouseLinkCaller(linkedDataToSend);
            if(responseLinked?.error) console.error(responseLinked?.error);
          }

          if(!response?.error) toast.success(`${warehouse.name} è stato aggiunto ai tuoi magazzini`);
          return { data: response };
        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante la registrazione del magazzino ${warehouse.name}`);
          return null;
        }
      },
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        const { warehouses: { list: { type, limit }}} = getState();

        const queryListToUpdate = {
          companyId: args.companyId,
          filter: { id: { attributeExists: true }},
          limit: type === "ALL" ? limit : DEFAULT_WAREHOUSES_LIMIT,
        }

        console.log({ queryListToUpdate });
        console.log({ args });

        const patchResult = dispatch(
          extendedWarehousesApiSlice.util.updateQueryData(
            'warehouseByCompany', queryListToUpdate, (draft) => {
              if(args.warehouse.isLinked === 1) {
                allWarehousesAdapter.addOne(draft, {
                  id: args.warehouseId,
                  name: args.warehouse.name,
                  scope: args.warehouse.linkedWarehouse.scope,
                  location: args.warehouse.linkedWarehouse.location,
                  status: args?.warehouse?.status || args.warehouse.linkedWarehouse.status
                })
              } else {
                allWarehousesAdapter.addOne(draft, {
                  ...args.warehouse,
                  id: args.warehouseId,
                })
              }

          })
        )

        try {
          await queryFulfilled;
        } catch(err) {
          console.error(err);
          toast.error(`Non è stato possibile aggiungere ${args.warehouse?.name} ai tuoi magazzini`);
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: _TYPENAME, id: 'LIST_BY_COMPANY'},
        { type: _TYPENAME, id },
      ]
    }),
    updateWarehouse: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        try {
          let dataToSend = { ...args };

          // Nel caso in cui ricevo l'ordine di sganciare il magazzino, devo rimuovere il dato dalla tabella WarehouseLink
          console.log("vedo args", args);
          if(args?.isLinked === "UNLINK") {
            try {
              const response_removeWarehouseLink = await deleteWarehouseLinkCaller(args.warehouseLinkId);
              if(!response_removeWarehouseLink?.error) toast.success(`Magazzino ${args.name} scollegato correttamente`);
              dataToSend.isLinked = 0;
              dataToSend.warehouseLinkId = "";
            } catch(err) {
              console.error("Error:", err);
              toast.error(`Si è verificato un problema durante la fase di scollgamento del magazzino ${args.name}`);
              return null;
            }
          }

          const response = await updateWarehouseCaller(dataToSend);
          if(!response?.error) toast.success(`Il magazzino ${args.name} è stato aggiornato con successo`);
          return { data: response };

        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante l'aggiornamento del magazzino ${args.name}`);
          return null;
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: _TYPENAME, id: 'LIST_BY_COMPANY'},
        { type: _TYPENAME, id },
      ]
    }),
    deleteWarehouse: builder.mutation({
      query: (id) => deleteWarehouseCaller(id),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id: 'LIST_BY_COMPANY' }]
    }),
    deleteWarehouseLink: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        try {
          const response_removeWarehouseLink = await deleteWarehouseLinkCaller(args);
          if(!response_removeWarehouseLink?.error) toast.success(`Magazzino scollegato correttamente`);
        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante la fase di scollgamento del magazzino`);
          return null;
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: _TYPENAME, id: 'LIST_BY_COMPANY' }
      ]
    })
  })
})

export const {
  useWarehouseByCompanyQuery,
  useWarehouseByClientQuery,
  useDepositByCompanyQuery,
  useInterByCompanyQuery,
  useHubByCompanyQuery,
  useLinkedWarehouseByCompanyQuery,
  useWarehouseByIdQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
  useDeleteWarehouseLinkMutation,
} = extendedWarehousesApiSlice;

// return the query result object
export const selectWarehouseResult = extendedWarehousesApiSlice.endpoints.warehouseByCompany.select();

// creates memoized selector
const selectWarehouseData = createSelector(
  selectWarehouseResult,
  warehousesResult => warehousesResult.data
);

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById
} = allWarehousesAdapter.getSelectors(state => selectWarehouseData(state) ?? initialState);
