import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import newsSlice from "../slice/newsSlice";


const rootReducer = combineReducers({
    auth:authSlice,
    news:newsSlice
})

export default rootReducer;