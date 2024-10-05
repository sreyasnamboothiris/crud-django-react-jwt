import {createSlice} from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'));
console.log(user)
const initialState = {
    user: user ? user : null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        clearUser:(state,action)=>{
            state.user = null;
        }
    }
})

export const {setUser,clearUser} = userSlice.actions;

export default userSlice.reducer;

