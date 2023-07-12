import {createSlice} from "@reduxjs/toolkit"


export const authSlice = createSlice({
    name: "store",
    initialState : {
        user : null,
        token : null
    },
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        getToken : (state) => state.token
    }
})

export const {setLogin, setLogout} = authSlice.actions
export default authSlice.reducer;

