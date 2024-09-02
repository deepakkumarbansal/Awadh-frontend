import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: localStorage.getItem("news")
    ? JSON.parse(localStorage.getItem("news"))
    : null,
  loading: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    setNews(state, value) {
      state.news = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setLoading, setNews } = newsSlice.actions;
export default newsSlice.reducer;
