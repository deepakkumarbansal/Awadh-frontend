import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Layout, Login, NewsDetails, Signup } from './Components/index.js';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element:<App/>,
        children: [
          {
            path: '/',
            element: <Home/>
          },
          {
            path: '/news/:slug',
            element: <NewsDetails/>
          },
        ]
      },
    ],
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: "*",
    element: <p>Page not found</p>
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
