import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BACKEND_API;

const initialState = {
  user: null,
  userName: "",
  loading: false,
  role: "user",
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  error: "",
  email: ""
};

const registerAction = createAsyncThunk('auth/register', async (formdata) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    })
    
    const data = await response?.json();
    
    if (!response.ok) {      
      throw new Error(data.message)
    }
    return data;
  } catch (error) {
    throw error
  }
})
const loginAction = createAsyncThunk('auth/login', async ({formdata, navigate}) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(formdata)
    })
    if(!response.ok){
      const data = await response.json();
      const message = data.message;
      console.log(message);
      throw new Error(message);
    }
    const data = await response.json();
    if(data.role === 'user'){
      console.log("home");
      navigate('/');
    } else if(data.role === 'reporter') {
      navigate('/reporter')
    } else {
      navigate('/admin')
    }
    return data;
  } catch (error) {
      throw error
  }
})

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // setUser(state, value) {
    //   // state.user = value.payload;
    //   state.auth = 'reporter'
    // },
    // setLoading(state, value) {
    //   state.loading = value.payload;
    // },
    // setToken(state, value) {
    //   state.token = value.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
        state.error="";
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user.email;
        console.log(action);
        state.error = ""
        console.log("Success in signup");
        
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.role = "user";
        state.error = action?.error?.message;
      })
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.role = null;
        state.error = "";
        state.token = "";
        state.userName = "";
        state.email = "";
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userId;
        state.userName = action.payload.userName;
        state.role = action.payload.role;
        state.token = action.payload.token;
        state.error = "";
        localStorage.setItem("token", action.payload.token);
        state.email = action.payload.email;
      })
      .addCase(loginAction.rejected, (state) => {
        state.loading = false;
        state.error = "";
        state.role = null;
        state.error = "";
        state.token = "";
        state.userName = "";
        state.email = "";
      })
  }
});

export {
  registerAction,
  loginAction
}
export const selectAuthError = (state)=>state.auth.error
export const selectAuthLoader = (state)=>state.auth.loading
export const { setLoading, setSignUpData, setToken } = authSlice.actions;
export default authSlice.reducer;
