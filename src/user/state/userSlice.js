import { createSlice } from "@reduxjs/toolkit";
// Thunks
import {
  getProfileThunk,
  updateAvatarThunk,
  updateProfileLocationThunk,
  updateProfileNoteThunk,
  updateProfileInfoThunk
} from "./userThunks";

//  Slice -----------------------------------------------------------------------------------------------
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {},
    status: null,
  },
  reducers: {
    changeUserLocation(state, { payload }) {
      state.profile.location = {
        city: payload?.city || '',
        region: payload?.region || '',
        province: payload?.province || '',
        address: payload?.address || '',
        coordinate: [payload?.coordinate.lat || '', payload?.coordinate.lng || '']
      }
    },
  },
  extraReducers: {
    [getProfileThunk.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getProfileThunk.fulfilled]: (state, { payload }) => {
      state.profile = payload;
      state.status = 'success';
    },
    [getProfileThunk.rejected]: (state, action) => {
      state.status = 'failed';
    },
    [updateAvatarThunk.fulfilled]: (state, { payload }) => {
      state.profile.avatar = payload;
    },
    [updateProfileLocationThunk.fulfilled]: (state, { payload }) => {
      state.profile.location = {
        city: payload?.city || '',
        region: payload?.region || '',
        province: payload?.province || '',
        address: payload?.address || '',
        coordinate: [payload?.coordinate.lat || '', payload?.coordinate.lng || '']
      };
    },
    [updateProfileNoteThunk.fulfilled]: (state, { payload }) => {
      state.profile.note = payload;
    },
    [updateProfileInfoThunk.fulfilled]: (state, { payload }) => {
      state.profile.name = payload.name;
      state.profile.phone = payload.phone;
      state.profile.searchable = payload.searchable;
    }
  }
});

// Actions -----------------------------------------------------------------------------------------------
export const { changeProfileInfo, changeUserLocation, changeProfileNote } = userSlice.actions;
export const selectProfile = state => state.user.profile;
export const selectLocation = state => state.user.profile.location;
export const selectAvatar = state => state.user.profile.avatar;

// Reducers -----------------------------------------------------------------------------------------------
export default userSlice.reducer;