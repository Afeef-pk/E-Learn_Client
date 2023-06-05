import { createSlice } from "@reduxjs/toolkit";

export const tutorSlice = createSlice({
  name: "tutor",
  initialState: {
    authorized: false,
  },
  reducers: {
    tutorAuthorized: (state,action) => {
      state.authorized = true;
    },
    tutorUnauthorized: (state) => {
      state.authorized = false;
    },
  },
});

export const {tutorAuthorized,tutorUnauthorized} = tutorSlice.actions
export default tutorSlice.reducer