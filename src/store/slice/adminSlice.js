import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createArticle, getAllReporters, getAllUsers, updateArticle } from "../../Services/Operations/admin";
import { getAllAdminArticles } from "../../Services/Operations/article";
import { modifyDateFormatOfArticles } from "./newsSlice";
const initialState = {
    message: "",
    loading: false,
    data: {},
    usersData:{},
    reportersData:{},
}

export const createArticleAction = createAsyncThunk('adminOrReposter/createArticle', async(data)=>{
    console.log(data, "hello");
    
    console.log('start creating article');
    try {
        // throw new Error("testing error")
        const message = await createArticle(data);
        return message;
    } catch (error) {
        throw error;
    }
})
export const updateArticleAction = createAsyncThunk('adminORReporter/updateArticle', async (data) => {
    try {
        // throw new Error("testing error")
        const message = await updateArticle(data);
        return message;
    } catch (error) {
        throw error;
    }
})
export const fetchAllAdminNewsAction = createAsyncThunk('admin/fetchArticles', async (limit, page) => {
    console.log("Welcome to admin");
    
    try {
        const response = await getAllAdminArticles(limit, page);
        console.log("hi",response);
        modifyDateFormatOfArticles(response.articles);
        return response;
    } catch (error) {
        console.log("error");
        
        throw new Error(error);
    }
})
export const fetchAllUsersAction = createAsyncThunk('admin/fetchAllUsers', async (limit, page) => {
    try {
        const response = await getAllUsers(limit, page);
        modifyDateFormatOfArticles(response.users);
        return response;
    } catch (error) {
        throw new Error(error);
    }
})

export const fetchAllReportersAction = createAsyncThunk('admin/fetchAllReporters', async (limit, page) => {
    try {
        console.log("slice pageno.", page);
        const response = await getAllReporters(limit, page);
        modifyDateFormatOfArticles(response.reporters);
        return response;
    } catch (error) {
        throw new Error(error);
    }
})

const adminSlice = createSlice({
    name:"adminOrReposter",
    initialState: initialState,
    extraReducers: (builder) => {
        builder
        .addCase(createArticleAction.pending, (state)=>{
            state.message = "";
            state.loading = true;
        })
        .addCase(createArticleAction.fulfilled, (state, action)=>{
            state.message = action.payload;
            state.loading = false;
        })
        .addCase(createArticleAction.rejected, (state)=>{
            state.message = '';
            state.loading = false;
        })
        .addCase(updateArticleAction.pending, (state)=>{
            state.message = "";
            state.loading = true;
        })
        .addCase(updateArticleAction.fulfilled, (state, action)=>{
            state.message = action.payload;
            state.loading = false;
        })
        .addCase(updateArticleAction.rejected, (state)=>{
            state.message = "";
            state.loading = false;
        })
        .addCase(fetchAllAdminNewsAction.pending, (state)=>{
            state.data = {};
            state.loading = true;
        })
        .addCase(fetchAllAdminNewsAction.fulfilled, (state, action)=>{
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(fetchAllAdminNewsAction.rejected, (state)=>{
            state.data = {};
            state.loading = false;
        })
        .addCase(fetchAllUsersAction.pending, (state)=>{
            state.usersData = {};
            state.loading = true;
        })
        .addCase(fetchAllUsersAction.fulfilled, (state, action)=>{
            state.usersData = action.payload;
            state.loading = false;
        })
        .addCase(fetchAllUsersAction.rejected, (state)=>{
            state.usersData = {};
            state.loading = false;
        })
        .addCase(fetchAllReportersAction.pending, (state)=>{
            state.reportersData = {};
            state.loading = true;
        })
        .addCase(fetchAllReportersAction.fulfilled, (state, action)=>{
            state.reportersData = action.payload;
            state.loading = false;
        })
        .addCase(fetchAllReportersAction.rejected, (state)=>{
            state.reportersData = {};
            state.loading = false;
        })
    }
})

export default adminSlice.reducer;
export const selectArticleMessage = (state) => state.admin.message;
export const selectLoader = (state) => state.admin.loading;
export const selectAllArticlesData = (state) => state.admin.data;
export const selectAllUsersData = (state) => state.admin.usersData;
export const selectAllReportersData = (state) => state.admin.reportersData;