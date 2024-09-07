import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: (() => {
    try {
      return localStorage.getItem("Articles")
        ? JSON.parse(localStorage.getItem("Articles"))
        : [];
    } catch (e) {
      console.error("Error parsing stored Articles:", e);
      return null; // or [] depending on your use case
    }
  })(),
  loading: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState: initialState,
  reducers: {
    setNews(state, value) {
      state.news = value.payload;
      console.log("hell",state)
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setLoading, setNews } = newsSlice.actions;
export default newsSlice.reducer;
