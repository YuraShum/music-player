import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authUser: false
}


const modalSlise = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        }
    }
})

export default modalSlise.reducer

export const {setAuthUser} = modalSlise.actions