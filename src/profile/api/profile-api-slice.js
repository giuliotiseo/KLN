import { toast } from "react-toastify";
import { graphqlApiSlice } from "../../app/api/graphql-api-slice";
import { GET_PROFILE_BY_ID } from "./graphql/queries";
import { updateCustomerCaller } from "./profile-callers";

// Graphql connection -----------------------------------------------------------------------------------------------------------------------
export const extendedProfileApiSlice = graphqlApiSlice.injectEndpoints({
  endpoints: builder => ({
    getProfile: builder.query({
      query: (id) => ({ body: GET_PROFILE_BY_ID, args: { id }}),
      transformResponse: response => {
        return response
      },
      providesTags: (result) => {
        if(!result?.ids?.length) return [];
        return [ ...result.ids.map(id => ({ type: 'Profile', id })) ]
      }
    }),
    // Mutations
    updateProfileData: builder.mutation({
      async queryFn(args) {
        if(!args) return { data: null };
        try {
          const response = await updateCustomerCaller(args)
          return response; // ricorda che deve essere sempre presente data dentro
        } catch(err) {
          console.error("Error:", err);
          toast.error(`Si è verificato un problema durante l'aggiornamento di ${args.name}`);
          return null;
        }
      },
      async onQueryStarted(args, { dispatch, getState, queryFulfilled }) {
        const { authProfile: { id }} = getState();
        const patchResult = dispatch(
          extendedProfileApiSlice.util.updateQueryData(
            'getProfile', id, (draft) => {
              Object.assign(draft, args);
          })
        )

        try {
          await queryFulfilled;
        } catch(err) {
          console.error(err);
          toast.error(`Non è stato possibile aggiornare ${args.searchable}`);
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Profile", id }]
    }),
  })
})

export const {
  useGetProfileQuery,
  useUpdateProfileDataMutation,
} = extendedProfileApiSlice;
