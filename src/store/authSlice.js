import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin : false,
    user : null,
    userType: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action){
            state.isLogin = true;
            state.user = action.payload.userData
            state.userType = action.payload.userType ? action.payload.userType : 'user' //Only three types : user, admin, reporter
        },
        logout(state){
            state.isLogin = false;
            state.user = null;
            state.userType = null
        }
    }
})

export const {login, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;