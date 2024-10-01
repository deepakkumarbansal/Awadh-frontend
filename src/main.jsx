import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminDashboard, CategoryNews, Layout, Login, NewsDetails, Signup } from './Components/index.js';
import Home from './Pages/Home/Home.jsx';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/reducers/index.js';
import { PersistGate } from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist'

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <App />,
        children: [
          {
            path: '/',
            element: <Home/>
          },
          {
            path: '/news/:slug',
            element: <NewsDetails />
          },
          {
            path: '/category/:slug',
            element: <CategoryNews/>
          }
        ]
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/reporter',
    element: <AdminDashboard />
  },
  {
    path: '/admin',
    element: <AdminDashboard />
  },
  {
    path: "*",
    element: <p>Page not found</p>
  }
]);


const store = configureStore({
  reducer: rootReducer,
});
const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider theme={createTheme()}>
      <RouterProvider router={router} />
    </ThemeProvider>
    </PersistGate>
  </Provider>
)
