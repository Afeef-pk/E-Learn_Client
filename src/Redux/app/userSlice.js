import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authorized: false,
    token:null
  },
  reducers: {
    userAuthorized: (state,action) => {
      state.token = action.payload.token
      console.log('token'+state.token);
      state.authorized = true;
    },
    userUnauthorized: (state) => {
      state.token = null
      state.authorized = false;
    },
  },
});

export const {userAuthorized,userUnauthorized} = userSlice.actions
export default userSlice.reducer