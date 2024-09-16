import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("Action payload", action.payload)
            if (action.payload === null) {
                // localStorage.removeItem("activationToken")
            } else {
                if (action.payload.genToken) {
                    localStorage.setItem(
                        "activationToken",
                        action.payload.genToken
                    )
                }
            }
            state.user = action.payload
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer