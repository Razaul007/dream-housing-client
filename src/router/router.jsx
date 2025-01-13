import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement:<ErrorPage/>,
      children: [
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"all-properties",
            element: <AllProperties/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:'/signup',
            element:<SignUp/>
        }
      ]
    },
  ]);