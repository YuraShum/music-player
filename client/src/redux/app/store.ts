import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../features/userSlice'
import modalSlise from "../features/modalSlise";

export const store = configureStore({
    reducer: {
        user: userSlice,
        authUser: modalSlise
    }
})