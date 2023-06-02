import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    token:null,
    authorized: false,
  },
  reducers: {
    adminAuthorized: (state,action) => {
      state.token = action.payload.token
      state.authorized = true;
    },
    adminUnauthorized: (state) => {
      state.token = null;
      state.authorized = false;
    },
  },
});

export const {adminAuthorized,adminUnauthorized} = adminSlice.actions
export default adminSlice.reducer