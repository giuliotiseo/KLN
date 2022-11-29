import { createAsyncThunk } from "@reduxjs/toolkit";
// Api
import { fetchProfile } from "../api/fetch";
import { updateAvatar, updateProfileInfo, updateProfileLocation, updateProfileNote } from "../api/update";

// Async Queries and mutations -----------------------------------------------------------------------------------------------
export const getProfileThunk = createAsyncThunk(
  'user/getProfile',
  async (username) => {
    let result = await fetchProfile(username, true);
    return result;
  }
);

export const updateAvatarThunk = createAsyncThunk(
  'user/update/avatar',
  async ({ file, username }, { rejectWithValue }) => {
    try {
      const result = await updateAvatar(file, username);
      return result;
    } catch(err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
)

export const updateProfileLocationThunk = createAsyncThunk(
  'user/update/location',
  async({ username, location }, { rejectWithValue }) => {
    try {
      const result = await updateProfileLocation(username, location);
      return result;
    } catch(err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
)

export const updateProfileNoteThunk = createAsyncThunk(
  'user/profile/note',
  async({ username, note }, { rejectWithValue }) => {
    try {
      const result = await updateProfileNote(username, note);
      return result;
    } catch(err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
)

export const updateProfileInfoThunk = createAsyncThunk(
  'user/profile/profile_info',
  async({ username, name, phone }, { rejectWithValue }) => {
    try {
      const result = await updateProfileInfo(username, name, phone);
      return result;
    } catch(err) {
      console.error(err);
      return rejectWithValue(err);
    }
  }
)
