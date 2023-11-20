import React from 'react'
import ReactDOM from 'react-dom/client'
import MainPage from './components/MainPage'
import HomePage from "./components/HomePage";
import StorePage from "./components/StorePage";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children:[
        {path: "/", element: <HomePage/>},
        {path: "store", element: <StorePage/>}
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <MainPage/> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
