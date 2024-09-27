import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllArticles, getAllArticlesByCatagories, getAllArticlesByCatagory, getAllArticlesByReporterId } from "../../Services/Operations/article";

const initialState = {
  allNews: [],
  newsByCatagories: {},
  loadingByCatagories: false,
  loading: false, //general loader,
  categoryNews: {},
  reporterArticles: [],
};

export const modifyDateFormatOfArticles = (articles)=> {
  articles.forEach(({updatedAt}, index)=>{
    articles[index].updatedAt = new Date(updatedAt).toDateString();
  })
}

export const fetchHomeNewsByCatagoriesAction = createAsyncThunk('news/fetchHomeNewsByCategories', async(categories)=>{
  try {
    const response = await getAllArticlesByCatagories(categories);
    Object.values(response).forEach(({articles})=>{
      modifyDateFormatOfArticles(articles)
    })
    return response;
  } catch (error) {
    console.log("Error::Fetch news by catagories in home", error);
  }
})
export const fetchNewsByCategoryAction = createAsyncThunk('news/fetchNewsByCategory', async (category, page, limit)=>{
  try {
    const response = await getAllArticlesByCatagory(category, page, limit);
    const data = response?.data
    console.log(data.articles, "res");
    modifyDateFormatOfArticles(data.articles);
    return data;
  } catch (error) {
    console.log("Error::Fetch news by category", error);
  }
})

export const fetchAllNewsAction = createAsyncThunk('news/fetchAllNews', async(limit=10)=>{
  console.log("fetch");
  
  try {
    const response = await getAllArticles(limit);
    modifyDateFormatOfArticles(response);
    return response;
  } catch (error) {
    console.log("ERROR:: Fetch all news in home", error);
  }
})

//repoter related
export const fetchRepoterArticlesAction = createAsyncThunk('news/repoterArticles', async(reporterId)=>{
  console.log("id", reporterId);
  
  try {
    const response = await getAllArticlesByReporterId(reporterId);
    console.log("res", response);
    
    modifyDateFormatOfArticles(response.articles);
    return response;
  } catch (error) {
    throw error;
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
      console.log("hi");
      
      state.loadingByCatagories = true;
    })
    .addCase(fetchHomeNewsByCatagoriesAction.fulfilled, (state, action)=>{
      console.log("data::", action.payload);
      
      state.newsByCatagories = action.payload;
      state.loadingByCatagories = false;
      //to be handle the local storage if shivam sir wants
    })
    .addCase(fetchHomeNewsByCatagoriesAction.rejected, (state)=>{
      state.newsByCatagories = {};
      state.loadingByCatagories = false;
    })
    .addCase(fetchAllNewsAction.pending, (state)=>{
      state.allNews = [];
      state.loading = true
    })
    .addCase(fetchAllNewsAction.fulfilled, (state, action)=>{
      state.allNews = action.payload;
      state.loading = false;
    })
    .addCase(fetchAllNewsAction.rejected, (state)=>{
      state.allNews = [];
      state.loading = false;
    })
    .addCase(fetchNewsByCategoryAction.pending, (state)=>{
      state.categoryNews = {};
      state.loading = true
    })
    .addCase(fetchNewsByCategoryAction.fulfilled, (state, action)=>{
      state.categoryNews = action.payload;
      state.loading = false;
    })
    .addCase(fetchNewsByCategoryAction.rejected, (state, action)=>{
      state.categoryNews = {},
      state.loading = false;
    })
    .addCase(fetchRepoterArticlesAction.pending, (state)=>{
      state.loading = true;
      state.reporterArticles = {};
    })
    .addCase(fetchRepoterArticlesAction.fulfilled, (state, action)=>{
      state.loading = false;
      state.reporterArticles = action.payload;
    })
    .addCase(fetchRepoterArticlesAction.rejected, (state, action)=>{
      state.loading = false;
      state.reporterArticles = {};
    })
  }
});

export const selectHomeNewsByCatagories = (state)=>state.news.newsByCatagories;
export const selectNewsByCategory = (state) => state.news.categoryNews;
export const selectAllNews = (state) => state.news.allNews;
export const selectReporterArticles = (state) => state.news.reporterArticles
export const selectGeneralLoader = (state) => state.news.loading
export const selectCategoryLoader = (state) => state.news.loadingByCatagories
// export const { setLoading, setNews } = newsSlice.actions;
export default newsSlice.reducer;
