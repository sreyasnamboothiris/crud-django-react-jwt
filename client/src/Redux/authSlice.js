import {createSlice} from '@reduxjs/toolkit'

const token = localStorage.getItem('token');

const initialState = {
    isAuth: token?true:false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isAuthenticated:(state,action)=>{
            state.isAuth = action.payload
        },
        logedOut:(state,action)=>{
            state.isAuth = false
        }
    }
})

export const {isAuthenticated,logedOut} =authSlice.actions;

export default authSlice.reducer;