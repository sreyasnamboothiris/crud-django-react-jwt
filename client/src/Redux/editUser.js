import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    editUser:null,
}

const editUser = createSlice({
    name:'editUser',
    initialState,
    reducers:{
        setEditUser:(state,action)=>{
            state.editUser = action.payload
        }
    }
})
export const {setEditUser} = editUser.actions
export default editUser.reducer