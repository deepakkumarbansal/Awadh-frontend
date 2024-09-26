import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createArticle, updateArticle } from "../../Services/Operations/admin";

const initialState = {
    message: "",
    loading: false,
}

export const createArticleAction = createAsyncThunk('adminOrReposter/createArticle', async(data)=>{
    console.log('start creating article');
    try {
        const message = await createArticle(data);
        return message;
    } catch (error) {
        return error;
    }
})
export const updateArticleAction = createAsyncThunk('adminORReporter/updateArticle', async (data) => {
    try {
        const message = await updateArticle(data);
        return message;
    } catch (error) {
        return error;
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
            state.message = action.payload;
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
    }
})

export default adminSlice.reducer;
export const selectArticleMessage = (state) => state.adminOrReposter.message;
export const selectArticleLoader = (state) => state.adminOrReposter.loading