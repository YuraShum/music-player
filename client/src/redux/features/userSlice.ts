import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.payload === null) {
                localStorage.removeItem("activationToken")
            } else {
                if (action.payload.generatedToken) {
                    localStorage.setItem(
                        "generatedToken",
                        action.payload.generatedToken
                    )
                }
            }
            state.user = action.payload
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer