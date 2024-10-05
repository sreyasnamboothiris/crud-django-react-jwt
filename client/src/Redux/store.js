import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import userReducer from './userSlice';
import editUserReducer from './editUser'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        editUser:editUserReducer
    }
})

