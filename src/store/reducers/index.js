import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import newsSlice from "../slice/newsSlice";
import adminSlice from '../slice/adminSlice'
import {persistReducer} from 'redux-persist'
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'persist-auth',
    storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice);


const rootReducer = combineReducers({
    auth:persistedAuthReducer,
    news:newsSlice,
    admin:adminSlice,
})

export default rootReducer;