import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { graphqlApiSlice } from "../../app/api/graphql-api-slice";
import { createCustomerCaller, createCustomerCompanyCaller, deleteCustomerCaller, updateCustomerCaller } from "./customers-callers";
import { CUSTOMERS_BY_CARRIER_RELATION, CUSTOMERS_BY_OWNERCOMPANY, CUSTOMERS_BY_RECEIVER_RELATION, CUSTOMERS_BY_SENDER_RELATION, CUSTOMER_BY_COMPANYID, CUSTOMER_BY_ID } from "./graphql/queries";
import { toast } from "react-toastify";
import { DEFAULT_CUSTOMERS_LIMIT } from "../slices/customersListSlice";
import { formatLocationCoords, generateLegacyLogList } from "../../globals/libs/helpers";
import { formatCustomerByIdResponse } from "./customers-format-response";
import { formatCustomCheckpointsBeforeSave } from "../libs/helpers";

// Graphql connection -----------------------------------------------------------------------------------------------------------------------
const allCustomersAdapter = createEntityAdapter();
const senderCustomersAdapter = createEntityAdapter();
const carrierCustomersAdapter = createEntityAdapter();
const receiverCustomersAdapter = createEntityAdapter();
const initialState = allCustomersAdapter.getInitialState();

export const extendedCustomersApiSlice = graphqlApiSlice.injectEndpoints({
  endpoints: builder => ({
    // Query -----------------------------------------------------------------------------------------------------------------------------------------------
    customerByOwnerCompany: builder.query({
      query: (args) => ({ body: CUSTOMERS_BY_OWNERCOMPANY, args }),
      transformResponse: response => {
        allCustomersAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Customer', id })),
          { type: 'Customer', id: 'LIST_BY_TENANT' }
        ]
      }
    }),
    customerBySenderRelationship: builder.query({
      query: (args) => ({ body: CUSTOMERS_BY_SENDER_RELATION, args }),
      transformResponse: response => {
        senderCustomersAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Customer', id })),
          { type: 'Customer', id: 'LIST_BY_SENDER' }
        ]
      }
    }),
    customerByCarrierRelationship: builder.query({
      query: (args) => ({ body: CUSTOMERS_BY_CARRIER_RELATION, args }),
      transformResponse: response => {
        carrierCustomersAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Customer', id })),
          { type: 'Customer', id: 'LIST_BY_CARRIER' }
        ]
      }
    }),
    customerByReceiverRelationship: builder.query({
      query: (args) => ({ body: CUSTOMERS_BY_RECEIVER_RELATION, args }),
      transformResponse: response => {
        receiverCustomersAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Customer', id })),
          { type: 'Customer', id: 'LIST_BY_RECEIVER' }
        ]
      }
    }),
    customerById: builder.query({
      query: (args) => args?.id ? ({ body: CUSTOMER_BY_ID, args, skipInCaseOfNullArgs: true }) : null,
      transformResponse: response => {
        if(!response) return null;
        return formatCustomerByIdResponse(response);
      },
      providesTags: (result) => {
        if(!result?.id) return [];
        return [{ type: 'Customer', id: result.id }];
      }
    }),
    customerByCompanyId: builder.query({
      query: (args) => ({ body: CUSTOMER_BY_COMPANYID, args, skipInCaseOfNullArgs: true }),
      transformResponse: response => {
        if(!response || response?.items?.length <= 0) return null;
        return formatCustomerByIdResponse(response.items[0]);
      },
      providesTags: (result) => {
        return result?.id 
          ? [{ type: 'Customer', id: result.id }]
          : []
      }
    }),
    // Mutations -----------------------------------------------------------------------------------------------------------------------------------------------
    createCustomer: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        const { customer, customerId, selectedCustomer, currentCompanyName, generatedCustomer, owner, tenant, ownerCompanyId } = args;
        // Creo il cliente partendo da un'azienda esistente
        if(selectedCustomer?.id) {
          const generatedLog = await generateLegacyLogList({
            list: [],
            action: 'Creazione',
            subject: `nuovo cliente ${selectedCustomer.name} da P.IVA (${selectedCustomer.vatNumber}) già presente in piattaforma`        
          });

          const customCheckpoints = formatCustomCheckpointsBeforeSave(customer);
          try {
            const response = await createCustomerCaller({
              id: customerId,
              name: selectedCustomer.name,
              vatNumber: selectedCustomer.vatNumber,
              searchable: selectedCustomer.name.toLowerCase(),
              companyCode: selectedCustomer.companyCode,
              ownerCompanyId,
              tenant,
              companyId: selectedCustomer.id,
              relationships: customer.relationships || [],
              isSender: customer.relationships.includes("SENDER") ? 1 : 0,
              isCarrier: customer.relationships.includes("CARRIER") ? 1 : 0,
              isReceiver: customer.relationships.includes("RECEIVER") ? 1 : 0,
              customCheckpoints,
              customPec: customer?.pec || "",
              customUniqueCode: customer?.uniqueCode || "",
              log: generatedLog,
              customEmails: customer?.emails?.filter(em => !em?.imported) || [],
              customPhones: customer?.phones?.filter(phone => !phone?.imported) || [],
              customTrades: customer?.trades || selectedCustomer?.trades || [],
              note: customer?.note,
            });
  
            if(!response?.error) toast.success(`${selectedCustomer.name} è stato aggiunto alla rubrica clienti`);
            return { data: response };
          } catch(err) {
            console.error("Error:", err);
            toast.error(`Si è verificato un problema durante la registrazione di ${selectedCustomer.name} nella rubrica clienti.`);
            return null;
          }
        } else {
          // Creo l'azienda da zero
          console.log("GeneratedCustomer", generatedCustomer);


          try {
            let companyDataToSend = {
              id: generatedCustomer.id,
              companyCode: generatedCustomer.companyCode,
              vatNumber: customer.vatNumber,
              name: customer.name,
              fiscalCode: customer.fiscalCode,
              city: customer.city,
              address: customer.address,
              location: {
                ...customer.location,
                coordinate: customer.location?.coordinate ? formatLocationCoords(customer.location.coordinate) : []
              },
              emails: customer?.emails?.length > 0 ? customer?.emails.filter(email => email.name && email.value) : [],
              phones: customer?.phones?.length > 0 ? customer?.phones.filter(phone => phone.name && phone.value ) : [],
              owner: "NOT_OWNED",
              trades: customer?.trades || [],
              uniqueCode: customer?.uniqueCode,
              pec: customer?.pec,
              type: "CLIENT",
              authorCustomersRaw: JSON.stringify({ companyId: ownerCompanyId, owner }),
            }

            const companyGeneratedLog = await generateLegacyLogList({
              list: [],
              action: 'Creazione',
              subject: `nuova azienda ${customer.name}, P.IVA (${customer.vatNumber}) eseguita dal dominio di ${currentCompanyName}`        
            });

            companyDataToSend.log = companyGeneratedLog;

            console.log("Creo prima l'azienda: ", { company: companyDataToSend });
            const companyResponse = await createCustomerCompanyCaller(companyDataToSend);
            console.log("Ecco il risultato", companyResponse);

            if(companyResponse) {
              // Creo il cliente dopo aver creato l'azienda
              try {
                const customCheckpoints = await formatCustomCheckpointsBeforeSave(customer);
                console.log("li vedo formattati", customCheckpoints);

                let customerDataToSend = {
                  id: customerId,
                  name: customer.name,
                  searchable: customer.name.toLowerCase(),
                  vatNumber: customer.vatNumber,
                  companyCode: generatedCustomer.companyCode,
                  companyId: generatedCustomer.id,
                  ownerCompanyId,
                  tenant,
                  relationships: customer.relationships || [],
                  isSender: customer.relationships.includes("SENDER") ? 1 : 0,
                  isCarrier: customer.relationships.includes("CARRIER") ? 1 : 0,
                  isReceiver: customer.relationships.includes("RECEIVER") ? 1 : 0,
                  customCheckpoints,
                  customPec: customer?.pec || "",
                  customUniqueCode: customer?.uniqueCode || "",
                  customEmails: customer?.emails?.length > 0 ? customer?.emails.filter(email => email.name && email.value) : [],
                  customPhones: customer?.phones?.length > 0 ? customer?.phones.filter(phone => phone.name && phone.value ) : [],
                  customTrades: customer?.trades || [],
                  note: customer?.note,
                }

                const customerGeneratedLog = await generateLegacyLogList({
                  list: [],
                  action: 'Creazione',
                  subject: `nuovo cliente ${customer.name}, P.IVA (${customer.vatNumber}) in rubrica e in piattaforma`        
                });

                customerDataToSend.log = customerGeneratedLog;
      
                const postCompanyResponseDataToSend = await createCustomerCaller(customerDataToSend);

                if(!postCompanyResponseDataToSend?.error) toast.success(`${customer.name} è stato aggiunto alla rubrica clienti`);
                return { data: postCompanyResponseDataToSend };
              } catch(err) {
                console.error("Error:", err);
                toast.error(`Si è verificato un problema durante la registrazione di ${customer.name} nella rubrica clienti.`);
                return null;
              }
            }
            console.log("Ecco il response per la creazione dell'azienda", companyResponse);
          } catch(err) {
            console.error("Error:", err);
            toast.error(`Si è verificato un problema durante la registrazione dell'azienda ${customer.name}`);
            return null;
          }
        }
      },
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        const { customers: { list: { type, limit }}} = getState();

        const queryListToUpdate = {
          ownerCompanyId: args.ownerCompanyId,
          filter: { id: { attributeExists: true }},
          limit: type === "ALL" ? limit : DEFAULT_CUSTOMERS_LIMIT,
        }

        const patchResult = dispatch(
          extendedCustomersApiSlice.util.updateQueryData(
            'customerByOwnerCompany', queryListToUpdate, (draft) => {
              if(args.selectedCustomer?.id) {
                allCustomersAdapter.addOne(draft, {
                  ...args.customer,
                  id: args.customerId,
                  name: args.selectedCustomer.name,
                  companyId: args.selectedCustomer.id,
                  companyCode: args.selectedCustomer.companyCode,
                  company: {
                    id: args.selectedCustomer.id,
                    name: args.selectedCustomer.name,
                    vatNumber: args.selectedCustomer.vatNumber,
                    companyCode: args.selectedCustomer.companyCode,
                    city: args.selectedCustomer.location.city,
                    address: args.selectedCustomer.location.address,
                    location: args.selectedCustomer.location
                  }
                })
              }

              if(args.generatedCustomer?.id) {
                allCustomersAdapter.addOne(draft, {
                  ...args.customer,
                  id: args.customerId,
                  name: args.customer.name,
                  companyId: args.generatedCustomer.id,
                  companyCode: args.generatedCustomer.companyCode,
                  company: {
                    id: args.generatedCustomer.id,
                    name: args.customer.name,
                    vatNumber: args.customer.vatNumber,
                    companyCode: args.generatedCustomer.companyCode,
                    city: args.customer.city,
                    address: args.customer.address,
                    location: args.customer.location
                  }
                })
              }
          })
        )

        try {
          await queryFulfilled;
        } catch(err) {
          console.error(err);
          toast.error(`Non è stato possibile aggiungere ${args.customer?.name || args.selectedCustomer?.name} all'elenco dei clienti`);
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Customer", id: 'LIST_BY_TENANT_RELATION'}]
    }),
    updateCustomer: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        try {
          const response = await updateCustomerCaller({ ...args });
          if(!response?.error) toast.success(`${args.name} è stato aggiornato con successo`);
          return { data: response };

        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante l'aggiornamento del cliente ${args.name}`);
          return null;
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Customer", id }]
    }),
    deleteCustomer: builder.mutation({
      query: (id) => deleteCustomerCaller(id),
      invalidatesTags: (result, error, { id }) => [{ type: "Customer", id }]
    })
  })
})

export const {
  useCustomerByOwnerCompanyQuery,
  useCustomerBySenderRelationshipQuery,
  useCustomerByCarrierRelationshipQuery,
  useCustomerByReceiverRelationshipQuery,
  useCustomerByIdQuery,
  useCustomerByCompanyIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = extendedCustomersApiSlice;

// return the query result object
export const selectCustomersResult = extendedCustomersApiSlice.endpoints.customerByOwnerCompany.select();

// creates memoized selector
const selectCustomerData = createSelector(
  selectCustomersResult,
  customersResult => customersResult.data
);

export const {
  selectAll: selectAllCustomers,
  selectById: selectCustomerById
  // selectIds: returns the state.ids array.
  // selectEntities: returns the state.entities lookup table.
  // selectAll: maps over the state.ids array, and returns an array of entities in the same order.
  // selectTotal: returns the total number of entities being stored in this state.
  // selectById: given the state and an entity ID, returns the entity with that ID or undefined.
} = allCustomersAdapter.getSelectors(state => selectCustomerData(state) ?? initialState);

