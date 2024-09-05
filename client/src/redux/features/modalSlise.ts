import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authUres: false
}


const modalSlise = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUres = action.payload
        }
    }
})

export default modalSlise.reducer

export const {setAuthUser} = modalSlise.actions