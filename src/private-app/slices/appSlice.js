import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: null,
  profiles: { ids: [], entities: {}},
  logoutScreen: false,
}

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    updateBasicProfile(state, { payload }) {
      state.profiles.entities = {
        ...state.profiles.entities,
        [payload.id]: {...state.profiles.entities[payload.id], psw: payload.psw }
      }
    },
    changeLogoutScreen(state, { payload }) {
      state.logoutScreen = payload
    },
  },
  extraReducers: builder => {
    builder
    .addMatcher(isProfileDisconnected, (state) => {
      state.logoutScreen = false
    })
  }
});


// Mathcers -----------------------------------------------------------------------------------------------------------------------------------------------------
function isProfileDisconnected(action) {
  if(action.type.includes('authProfileSlice/profileLogOut')) {
    return true;
  }
}

// Export actions -----------------------------------------------------------------------------------------------------------------------------------------------------
export const {
  updateBasicProfile,
  changeLogoutScreen,
  showConfirmationModal,
  setLoadToConfirmationModal,
  hideConfirmationModal,
} = appSlice.actions;

// Export selectors -----------------------------------------------------------------------------------------------------------------------------------------------------
export const selectBasicCompany = ({ app_ui: { company }}) => company;
export const selectBasicAllProfiles = ({ app_ui: { profiles }}) => profiles;
export const selectBasicCurrentProfile = ({ app_ui: { profile }}) => profile;
export const selectLogoutScreenMode = ({ app_ui: { logoutScreen }}) => logoutScreen;

// Reducer export -----------------------------------------------------------------------------------------------------------------------------------------------------
export default appSlice.reducer;
