import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token:null,
    authorized: false
  },
  reducers: {
    userAuthorized: (state,action) => {
      state.token = action.payload.token
      state.authorized = true;
    },
    userUnauthorized: (state) => {
      state.token = null
      state.authorized = false;
      localStorage.removeItem('token')
    },
  },
});

export const {userAuthorized,userUnauthorized} = userSlice.actions
export default userSlice.reducer