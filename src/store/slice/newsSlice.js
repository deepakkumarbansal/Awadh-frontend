import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllArticles, getAllArticlesByCatagories, getAllArticlesByCatagory, getAllArticlesByReporterId, getUniqueArticles } from "../../Services/Operations/article";

const initialState = {
  uniquesArticles: [],
  newsByCatagories: {},
  loadingByCatagories: false,
  loading: false, //general loader,
  categoryNews: {},
  reporterArticles: [],
  searchedArticels: [],
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
export const fetchNewsByCategoryAction = createAsyncThunk('news/fetchNewsByCategory', async ({slug:category, page, limit})=>{
  try {
    const response = await getAllArticlesByCatagory(category, page, limit);
    const data = response?.data
    modifyDateFormatOfArticles(data.articles);
    return data;
  } catch (error) {
    console.log("Error::Fetch news by category", error);
  }
})

export const fetchUniqueNewsAction = createAsyncThunk('news/fetchAllNews', async()=>{
  try {
    const response = await getUniqueArticles();
    modifyDateFormatOfArticles(response);
    return response;
  } catch (error) {
    console.log("ERROR:: Fetch all news in home", error);
  }
})

//repoter related
export const fetchRepoterArticlesAction = createAsyncThunk('news/repoterArticles', async({reporterId, page})=>{
  console.log("id", reporterId);
  
  try {
    const response = await getAllArticlesByReporterId(reporterId, page);
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
    setSearchedArticles(state, action) {
      state.searchedArticels = action.payload;
    },
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
    .addCase(fetchUniqueNewsAction.pending, (state)=>{
      state.uniquesArticles = [];
      state.loading = true
    })
    .addCase(fetchUniqueNewsAction.fulfilled, (state, action)=>{
      state.uniquesArticles = action.payload;
      state.loading = false;
    })
    .addCase(fetchUniqueNewsAction.rejected, (state)=>{
      state.uniquesArticles = [];
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
export const selectAllNews = (state) => state.news.uniquesArticles;
export const selectReporterArticles = (state) => state.news.reporterArticles
export const selectGeneralLoader = (state) => state.news.loading
export const selectCategoryLoader = (state) => state.news.loadingByCatagories;
export const selectSearchedArticles = (state) => state.news.searchedArticels
// export const { setLoading, setNews } = newsSlice.actions;
export default newsSlice.reducer;
