import { createSlice } from "@reduxjs/toolkit";

export const tutorSlice = createSlice({
  name: "tutor",
  initialState: {
    token:null,
    authorized: false,
  },
  reducers: {
    tutorAuthorized: (state,action) => {
      state.token = action.payload.token
      state.authorized = true;
    },
    tutorUnauthorized: (state) => {
      state.token = null;
      state.authorized = false;
    },
  },
});

export const {tutorAuthorized,tutorUnauthorized} = tutorSlice.actions
export default tutorSlice.reducer