import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import {tutorSlice} from './tutorSlice'

export default configureStore({
    reducer:{
        user: userSlice,
        tutor:tutorSlice
    }
})