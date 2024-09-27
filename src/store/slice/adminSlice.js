import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createArticle, updateArticle } from "../../Services/Operations/admin";
import { getAllAdminArticles } from "../../Services/Operations/article";
import { modifyDateFormatOfArticles } from "./newsSlice";
const initialState = {
    message: "",
    loading: false,
    data: {}
}

export const createArticleAction = createAsyncThunk('adminOrReposter/createArticle', async(data)=>{
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
            state.loading = true;
        })
        .addCase(updateArticleAction.rejected, (state)=>{
            state.message = "";
            state.loading = true;
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
            state.loading = true;
        })
    }
})

export default adminSlice.reducer;
export const selectArticleMessage = (state) => state.admin.message;
export const selectArticleLoader = (state) => state.admin.loading;
export const selectAllArticlesData = (state) => state.admin.data;