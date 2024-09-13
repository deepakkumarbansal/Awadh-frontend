import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllArticlesByCatagories } from "../../Services/Operations/article";
const baseUrl = import.meta.env.VITE_BACKEND_API;

const initialState = {
  newsByCatagories: (() => {
    try {
      return localStorage.getItem("Articles")
        ? JSON.parse(localStorage.getItem("Articles")) //to be ask from shivam sir, is browser is able to take this much load
        : {};
    } catch (e) {
      console.error("Error parsing stored Articles:", e);
      return null; // or [] depending on your use case
    }
  })(),
  loading: false,
};

export const fetchHomeNewsByCatagoriesAction = createAsyncThunk('news/addNews', async(catagories)=>{
  try {
    const response = await getAllArticlesByCatagories(catagories);
    return response;
  } catch (error) {
    console.log("Error::HOMENEWSFETCH", error);
  }
})

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    // setNews(state, value) {
    //   state.news = value.payload;
    //   console.log("hell",state)
    // },
    // setLoading(state, value) {
    //   state.loading = value.payload;
    // },
  },
  extraReducers: (builder)=>{
    builder
    .addCase(fetchHomeNewsByCatagoriesAction.pending, (state)=>{
      state.loading = true;
    })
    .addCase(fetchHomeNewsByCatagoriesAction.fulfilled, (state, action)=>{
      state.newsByCatagories = action.payload;
      state.loading = false;
      //to be handle the local storage if shivam sir wants
    })
    .addCase(fetchHomeNewsByCatagoriesAction.rejected, (state)=>{
      state.newsByCatagories = {};
      state.loading = false;
    })
  }
});

export const selectHomeNewsByCatagories = (state)=>state.newsByCatagories
export const { setLoading, setNews } = newsSlice.actions;
export default newsSlice.reducer;
