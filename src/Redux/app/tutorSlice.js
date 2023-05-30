import { createSlice } from "@reduxjs/toolkit";

export const tutorSlice = createSlice({
  name: "tutor",
  initialState: {
    authorized: false,
  },
  reducers: {
    tutorAuthorized: (state) => {
      state.authorized = true;
    },
    tutorUnauthorized: (state) => {
      state.authorized = false;
    },
  },
});