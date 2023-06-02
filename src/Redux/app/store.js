import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import tutorSlice from './tutorSlice'
import adminSlice from "./adminSlice";

export default configureStore({
    reducer:{
        user: userSlice,
        tutor:tutorSlice,
        admin:adminSlice
    }
})