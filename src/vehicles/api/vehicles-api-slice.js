import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { graphqlApiSlice } from "../../app/api/graphql-api-slice";
import { formatLocationCoords, generateLegacyLogList } from '../../globals/libs/helpers';
import { DEFAULT_VEHICLES_LIMIT } from "../slices/vehiclesListSlice";
import { MOTOR_BY_COMPANY, SEMITRAIL_BY_COMPANY, TRACTOR_BY_COMPANY, TRAILER_BY_COMPANY, VANS_BY_COMPANY, VEHICLE_BY_COMPANY, VEHICLE_BY_COMPANY_TOWED, VEHICLE_BY_COMPANY_TOWING, VEHICLE_BY_ID } from "./graphql/queries";
// Callers
import {
  getVehicleByLicensePlate,
  createVehicleCaller,
  updateVehicleCaller,
  deleteVehicleCaller
} from './vehicles-callers';

// Target typename
const _TYPENAME = "Vehicle"; 

const INDIPENDENT_VEHICLES = ["FURGONE", "MOTRICE", "TRATTORE"];


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
const allVehiclesAdapter = createEntityAdapter();
const initialState = allVehiclesAdapter.getInitialState();

// Api
export const extendedVehiclesApiSlice = graphqlApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query -----------------------------------------------------------------------------------------------------------------------------------------------
    vehicleByCompany: builder.query({
      query: (args) => ({ body: VEHICLE_BY_COMPANY, args }),
      transformResponse: response => {
        allVehiclesAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_BY_COMPANY' }
        ]
      }
    }),
    vanByCompany: builder.query({
      query: (args) => ({ body: VANS_BY_COMPANY, args }),
      transformResponse: response => {
        allVehiclesAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_VANS' }
        ]
      }
    }),
    tractorByCompany: builder.query({
      query: (args) => ({ body: TRACTOR_BY_COMPANY, args }),
      transformResponse: response => {
        allVehiclesAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_TRACTORS' }
        ]
      }
    }),
    motorByCompany: builder.query({
      query: (args) => ({ body: MOTOR_BY_COMPANY, args }),
      transformResponse: response => {
        allVehiclesAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_MOTORS' }
        ]
      }
    }),
    trailerByCompany: builder.query({
      query: (args) => ({ body: TRAILER_BY_COMPANY, args }),
      transformResponse: response => {
        allVehiclesAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_TRAILERS' }
        ]
      }
    }),
    semitrailerByCompany: builder.query({
      query: (args) => ({ body: SEMITRAIL_BY_COMPANY, args }),
      transformResponse: response => {
        allVehiclesAdapter.setAll(initialState, response.items);
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
          { type: _TYPENAME, id: 'LIST_SEMITRAILERS' }
        ]
      }
    }),
    vehicleById: builder.query({
      query: (args) => ({ body: VEHICLE_BY_ID, args }),
      transformResponse: response => {
        return {
          ...response,
          // lastPosition: response?.lastPosition
          //   ? { ...response.lastPosition, coordiante: formatLocationCoords(response.lastPosition.coordinate)}
          //   : null
        };
      },
      providesTags: (result) => {
        return [{ type: _TYPENAME, id: result.id }]
      }
    }),
    towingVehicles: builder.query({
      query: (args) =>  ({ body: VEHICLE_BY_COMPANY_TOWING, args }),
      transformResponse: response => {
        allVehiclesAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_TOWINGS' }
        ]
      }
    }),
    towedVehicles: builder.query({
      query: (args) =>  ({ body: VEHICLE_BY_COMPANY_TOWED, args }),
      transformResponse: response => {
        allVehiclesAdapter.setAll(initialState, response.items);
        // Per avere next token in lista:
        return {
          ids: response?.items?.length > 0 ? response.items.map(item => item.id) : [],
          entities: response?.items?.length > 0 ? response.items.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}) : {},
          nextToken: response?.nextToken
        };
      },      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [
          ...result.ids.map(id => ({ type: _TYPENAME, id })),
          { type: _TYPENAME, id: 'LIST_TOWINGS' }
        ]
      }
    }),
    // Mutations -----------------------------------------------------------------------------------------------------------------------------------------------
    createVehicle: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        const { vehicle, vehicleId, companyId } = args;
        try {
          let dataToSend = {
            id: vehicleId,
            licensePlate: vehicle.licensePlate,
            companyId,
            type: vehicle.type,
            brand: vehicle?.brand,
            model: vehicle?.model,
            dimensions: Object.keys(vehicle?.dimensions)?.length > 0 ? vehicle.dimensions : null,
            bulkhead: vehicle?.bulkhead,
            tailLift: vehicle.tailLift,
            fuel: vehicle?.fuel,
            spot: parseInt(vehicle.spot),
            axle: parseInt(vehicle.axle),
            maxWeight: parseFloat(vehicle.maxWeight),
            kilometers: parseFloat(vehicle.kilometers),
            status: vehicle.status || "DISPONIBILE",
            lastPosition: vehicle?.lastPosition?.coordinate
              ? {
                ...vehicle.lastPosition,
                coordinate: formatLocationCoords(vehicle.lastPosition.coordinate)
              }
              : null,
            indipendent: INDIPENDENT_VEHICLES.includes(vehicle.type) ? 1 : 0,
            note: vehicle?.note
          }

          dataToSend.log = await generateLegacyLogList({
            list: [],
            action: 'Creazione',
            subject: `nuovo veicolo ${vehicle.licensePlate}, ${vehicle.brand} ${vehicle.model}`
          });

          console.log("Creo il veicolo: ", { vehicle: dataToSend });
          const response = await createVehicleCaller(dataToSend);
          console.log("Ecco il response", response);

          if(!response?.error) toast.success(`${vehicle.brand} ${vehicle.model} (${vehicle.licensePlate}) è stato registrato con successo`);
          return { data: response };
        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante la registrazione del veicolo ${vehicle.licensePlate}`);
          return null;
        }
      },
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        const { vehicles: { list: { type, limit }}} = getState();

        const queryListToUpdate = {
          companyId: args.companyId,
          filter: { id: { attributeExists: true }},
          limit: type === "ALL" ? limit : DEFAULT_VEHICLES_LIMIT,
        }
        
        const patchResult = dispatch(
          extendedVehiclesApiSlice.util.updateQueryData(
            'vehicleByCompany', queryListToUpdate, (draft) => {
              allVehiclesAdapter.addOne(draft, {
                ...args.vehicle,
                id: args.vehicleId,
              })
          })
        )

        try {
          await queryFulfilled;
        } catch(err) {
          console.error(err);
          toast.error(`Non è stato possibile aggiungere ${args.vehicle?.licensePlate} all'elenco dei veicolo`);
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: _TYPENAME, id: 'LIST_COMPANY'},
        { type: _TYPENAME, id },
      ]
    }),
    updateVehicle: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        try {
          let dataToSend = { ...args };
          const response = await updateVehicleCaller(dataToSend);
          if(!response?.error) toast.success(`Il veicolo è stato aggiornato con successo`);
          return { data: response };

        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante l'aggiornamento del veicolo`);
          return null;
        }
      },
      invalidatesTags: (result, error, { id }) => [
        { type: _TYPENAME, id: 'LIST_BY_COMPANY'},
        { type: _TYPENAME, id },
      ]
    }),
    deleteVehicle: builder.mutation({
      query: (id) => deleteVehicleCaller(id),
      invalidatesTags: (result, error, { id }) => [{ type: _TYPENAME, id }, { type: _TYPENAME, id: "LIST_BY_COMPANY" }]
    }),
    vehicleByLicensePlate: builder.query({
      query: (params) =>  getVehicleByLicensePlate(params),
      transformResponse: (response) => response?.items?.length > 0
        ? response.items[0]
        : [],
      providesTags: ({ id }) => [{ type: _TYPENAME, id }]
    }),
  })
})

export const {
  useVehicleByCompanyQuery,
  useVanByCompanyQuery,
  useTractorByCompanyQuery,
  useMotorByCompanyQuery,
  useTrailerByCompanyQuery,
  useSemitrailerByCompanyQuery,
  useTowingVehiclesQuery,
  useTowedVehiclesQuery,
  useVehicleByIdQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useVehicleByLicensePlateQuery,
} = extendedVehiclesApiSlice;

// return the query result object
export const selectVehicleResult = extendedVehiclesApiSlice.endpoints.vehicleByCompany.select();

// creates memoized selector
const selectVehicleData = createSelector(
  selectVehicleResult,
  vehiclesResult => vehiclesResult.data
);

export const {
  selectAll: selectAllContacts,
  selectById: selectContactById
  // selectIds: returns the state.ids array.
  // selectEntities: returns the state.entities lookup table.
  // selectAll: maps over the state.ids array, and returns an array of entities in the same order.
  // selectTotal: returns the total number of entities being stored in this state.
  // selectById: given the state and an entity ID, returns the entity with that ID or undefined.
} = allVehiclesAdapter.getSelectors(state => selectVehicleData(state) ?? initialState);

