import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { graphqlApiSlice } from "../../app/api/graphql-api-slice";
import { CONTACT_BY_ID, CONTACTS_BY_COMPANY, CONTACTS_BY_TYPE, EMPLOYEES_BY_TENANT, EMPLOYEES_BY_COMPANY_TYPE } from './graphql/queries';
import { apiDataNormalizer, formatWindowsToApp, formatWindowsToDynamoDb, generateLegacyLogList } from '../../globals/libs/helpers';
// Callers
import { createContactCaller, deleteContactCaller, getContactsByTypeName, getEmployeesByType, updateContactCaller } from './contacts-callers';
import { DEFAULT_CONTACTS_LIMIT } from "../slices/contactsListSlice";
import { toast } from "react-toastify";
import { reformattedWindows, starterWindow } from "../libs/helpers";

// Target typename
const _TYPENAME = "Contact"; 

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
const allContactsAdapter = createEntityAdapter();
const initialState = allContactsAdapter.getInitialState();

// Api
export const extendedContactsApiSlice = graphqlApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query -----------------------------------------------------------------------------------------------------------------------------------------------
    contactByCompany: builder.query({
      query: (args) => ({ body: CONTACTS_BY_COMPANY, args }),
      transformResponse: response => {
        allContactsAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Contact', id })),
          { type: 'Contact', id: 'LIST_BY_TENANT' }
        ]
      }
    }),
    getStorekeeperContact: builder.query({
      query: (args) => ({ body: CONTACTS_BY_TYPE, args }),
      transformResponse: response => {
        allContactsAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Contact', id })),
          { type: 'Contact', id: 'LIST_STOREKEEPERS' }
        ]
      }
    }),
    getDriverContact: builder.query({
      query: (args) => ({ body: CONTACTS_BY_TYPE, args }),
      transformResponse: response => {
        allContactsAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Contact', id })),
          { type: 'Contact', id: 'LIST_DRIVERS' }
        ]
      }
    }),
    getAdminContact: builder.query({
      query: (args) => ({ body: CONTACTS_BY_TYPE, args }),
      transformResponse: response => {
        allContactsAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Contact', id })),
          { type: 'Contact', id: 'LIST_ADMINS' }
        ]
      }
    }),
    employeeByTenant: builder.query({
      query: (args) => ({ body: EMPLOYEES_BY_TENANT, args }),
      transformResponse: response => {
        allContactsAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Contact', id })),
          { type: 'Contact', id: 'LIST_EMPLOYEES_ALL' }
        ]
      }
    }),
    getStorekeeperEmployee: builder.query({
      query: (args) => args?.companyId ? ({ body: EMPLOYEES_BY_COMPANY_TYPE, args }) : null,
      transformResponse: response => {
        if(!response) return null;
        allContactsAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Contact', id })),
          { type: 'Contact', id: 'LIST_EMPLOYEES_WAREHOUSE' }
        ]
      }
    }),
    getDriverEmployee: builder.query({
      query: (args) => ({ body: EMPLOYEES_BY_COMPANY_TYPE, args }),
      transformResponse: response => {
        allContactsAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Contact', id })),
          { type: 'Contact', id: 'LIST_EMPLOYEES_DRIVE' }
        ]
      }
    }),
    getAdminEmployee: builder.query({
      query: (args) => ({ body: EMPLOYEES_BY_COMPANY_TYPE, args }),
      transformResponse: response => {
        allContactsAdapter.setAll(initialState, response.items);
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
          ...result.ids.map(id => ({ type: 'Contact', id })),
          { type: 'Contact', id: 'LIST_EMPLOYEES_ADMIN' }
        ]
      }
    }),
    contactById: builder.query({
      query: (args) => ({ body: CONTACT_BY_ID, args }),
      transformResponse: response => {
        return {
          ...response,
          windows: response?.windows?.length > 0 
            ? formatWindowsToApp(response.windows)
            : reformattedWindows([{ ...starterWindow, type: "GENERICO" }]),
        };
      },
      providesTags: (result) => {
        return [{ type: 'Contact', id: result.id }]
      }
    }),
    employeesByType: builder.query({
      query: (params) =>  getEmployeesByType(params),
      transformResponse: (response) => apiDataNormalizer(response?.items),
      providesTags: ({ ids }) => tagsGenerator(ids, "EMPLOYEES_BY_TYPE"),
    }),
    contactsByTypeName: builder.query({
      async queryFn(params) {
        if(!params?.tenant || !params?.type || !params?.searchable) return {};
        const response = await getContactsByTypeName(params);
        const result = apiDataNormalizer(response?.items);
        return { data: { ...result }}
      },
      providesTags: (data) => data?.ids ? tagsGenerator(data.ids, "TRAVEL_ALLOWED_ORDERS_STATUS") : [],
    }),
    // Mutations -----------------------------------------------------------------------------------------------------------------------------------------------
    createContact: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        const { contact, contactId, companyId, tenant } = args;
        const windows = contact?.windows ? formatWindowsToDynamoDb(contact.windows) : [];

        try {
          let dataToSend = {
            id: contactId,
            name: contact.name,
            surname: contact.surname,
            email: contact.email,
            companyId,
            tenant,
            type: contact.type,
            employee: contact.employee,
            searchable: `${contact.name.toLowerCase()} ${contact.surname.toLowerCase()}`,
            fiscalCode: contact?.fiscalCode,
            avatar: contact?.avatar,
            jobId: contact?.job.id,
            jobName: contact?.job?.name,
            windows: windows.filter(window => window?.days?.length > 0 && window?.start && window?.end), // o compili tutto o ti attacchi
            note: contact?.note,
            phone: contact?.phone,
          }

          dataToSend.log = await generateLegacyLogList({
            list: [],
            action: 'Creazione',
            subject: `nuovo contatto ${contact?.name} ${contact?.surname}`
          });

          console.log("Creo il contatto: ", { contact: dataToSend });
          const response = await createContactCaller(dataToSend);
          console.log("Ecco il response", response);

          if(!response?.error) toast.success(`${contact.name} è stato aggiunto alla rubrica contatti`);
          return { data: response };
        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante la registrazione del contatto ${contact.name}`);
          return null;
        }
      },
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        const { contacts: { list: { type, limit }}} = getState();

        const queryListToUpdate = {
          companyId: args.companyId,
          filter: { id: { attributeExists: true }},
          limit: type === "ALL" ? limit : DEFAULT_CONTACTS_LIMIT,
        }
        
        const patchResult = dispatch(
          extendedContactsApiSlice.util.updateQueryData(
            'contactByCompany', queryListToUpdate, (draft) => {
              allContactsAdapter.addOne(draft, {
                ...args.contact,
                id: args.contactId,
                name: args.contact.name,
                companyId: args.companyId,
                surname: args.contact.surname,
                searchable: `${args.contact.name.toLowerCase()} ${args.contact.surname.toLowerCase()}`,
                jobId: args.contact?.job?.id,
                jobName: args.contact?.job?.name,
                job: args.contact?.job?.id ? { id: args.contact.job.id, name: args.contact.job.name } : null,
              })
          })
        )

        try {
          await queryFulfilled;
        } catch(err) {
          console.error(err);
          toast.error(`Non è stato possibile aggiungere ${args.contact?.name} all'elenco dei contatti`);
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id, type }) => [
        { type: "Contact", id: 'LIST_BY_TENANT'},
        { type: "Contact", id: `LIST_EMPLOYEES_${type.toUpperCase()}`},
        { type: "Contact", id },
      ]
    }),
    updateContact: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        try {
          console.log("Aggiorno il contatto: ", { contact: args });
          const response = await updateContactCaller({
            ...args,
            windows: formatWindowsToDynamoDb(args?.windows)
          });

          if(!response?.error) toast.success(`${args.name} è stato aggiornato con successo`);
          return { data: response };

        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante l'aggiornamento del contatto ${args.name}`);
          return null;
        }
      },
      invalidatesTags: (result, error, { id, type }) => [
        { type: "Contact", id: 'LIST_BY_TENANT'},
        { type: "Contact", id: `LIST_EMPLOYEES_${type.toUpperCase()}`},
        { type: "Contact", id },
      ]
    }),
    deleteContact: builder.mutation({
      query: (id) => deleteContactCaller(id),
      invalidatesTags: (result, error, { id }) => [{ type: "Contact", id }]
    })
  })
})

export const {
  useContactByCompanyQuery,
  useGetStorekeeperContactQuery,
  useGetDriverContactQuery,
  useGetAdminContactQuery,
  useEmployeesByTypeQuery,
  useContactsByTypeNameQuery,
  useEmployeeByTenantQuery,
  useGetAdminEmployeeQuery,
  useGetDriverEmployeeQuery,
  useGetStorekeeperEmployeeQuery,
  useContactByIdQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = extendedContactsApiSlice;

// return the query result object
export const selectContactResult = extendedContactsApiSlice.endpoints.contactByCompany.select();

// creates memoized selector
const selectContactData = createSelector(
  selectContactResult,
  contactsResult => contactsResult.data
);

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById
  // selectIds: returns the state.ids array.
  // selectEntities: returns the state.entities lookup table.
  // selectAll: maps over the state.ids array, and returns an array of entities in the same order.
  // selectTotal: returns the total number of entities being stored in this state.
  // selectById: given the state and an entity ID, returns the entity with that ID or undefined.
} = allContactsAdapter.getSelectors(state => selectContactData(state) ?? initialState);

