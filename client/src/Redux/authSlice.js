import {createSlice} from '@reduxjs/toolkit'

const token = localStorage.getItem('token');
console.log(token)


const initialState = {
    isAuth: token?token:null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isAuthenticated:(state,action)=>{
            state.isAuth = action.payload
        },
        logedOut:(state,action)=>{
            state.isAuth = null
        }
    }
})

export const {isAuthenticated,logedOut} =authSlice.actions;

export default authSlice.reducer;