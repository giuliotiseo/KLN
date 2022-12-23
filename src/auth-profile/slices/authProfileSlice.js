import { createSlice } from "@reduxjs/toolkit";

export const authProfileSlice = createSlice({
  name: "authProfileSlice",
  initialState: { id: null, token: null, companyId: false, roleIds: [], profile: null },
  reducers: {
    setProfileCredentials: (state, action) => {
      const { id, token, roleIds } = action.payload;
      state.id = id;
      state.token = token;
      state.roleIds = roleIds;
      state.companyId = action.payload?.companyId;
    },
    setPersistentProfile: (state, action) => {
      state.profile = action.payload;
    },
    profileLogOut: (state) => {
      state.id = null;
      state.token = null;
      state.isPassword = false;
      state.roleIds = [];
      state.profile = null
    },
  },
});


// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  setProfileCredentials,
  setPersistentProfile,
  profileLogOut,
} = authProfileSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectCurrentProfileId = ({ authProfile }) => authProfile.id;
export const selectCurrentProfile = ({ authProfile }) => authProfile.profile;
export const selectCurrentRoles = ({ authProfile }) => authProfile.roleIds;
export const selectCurrentToken = ({ authProfile }) => authProfile.token;


// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default authProfileSlice.reducer;
