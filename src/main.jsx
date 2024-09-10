import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AdminDashboard, Layout, Login, NewsDetails, Signup } from './Components/index.js';
const Home = lazy(()=>import('./Pages/Home/Home.jsx'));
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/reducers/index.js';
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
            element: 
            <Suspense fallback={<h2>Loading component...</h2>}>
              <Home/>
            </Suspense>
          },
          {
            path: '/news/:slug',
            element: <NewsDetails />
          },
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

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ThemeProvider theme={createTheme()}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
)
