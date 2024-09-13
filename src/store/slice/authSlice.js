import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BACKEND_API;
const initialState = {
  user: null,
  loading: false,
  role: "user",
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
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
    if (!response.ok) {
      throw new Error('Failed to register', response.statusText)
    }
    const data = response.json();
    console.log(data);
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
      throw new Error('Failed to login', response)
    }
    const data = await response.json();
    console.log(data);
    if(data.role === 'user'){
      console.log("home");
      
      navigate('/');
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
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user.email;
        console.log(action);

      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        state.role = "user";
      })
      .addCase(loginAction.pending, (state) => {
        state.loading = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        state.user = action.payload.userId;
        state.role = action.payload.role;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token)
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.role = "user";
      })
  }
});

export {
  registerAction,
  loginAction
}
export const { setLoading, setSignUpData, setToken } = authSlice.actions;
export default authSlice.reducer;
