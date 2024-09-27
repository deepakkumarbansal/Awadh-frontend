import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import newsSlice from "../slice/newsSlice";
import adminSlice from '../slice/adminSlice'

const rootReducer = combineReducers({
    auth:authSlice,
    news:newsSlice,
    admin:adminSlice,
})

export default rootReducer;