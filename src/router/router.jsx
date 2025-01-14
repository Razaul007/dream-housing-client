import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/Common/Statistics";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";



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
        },
       
       
      ]
    },
    {
      path:'/dashboard',
      element: <DashboardLayout/>,
      children:[
        {
          index: true,
          element: (
            
              <Statistics />
            
          ),
        },
        {
          path: 'manage-users',
          element: (
              <ManageUsers />
           
          ),
        },
        {
          path: 'profile',
          element: (
          
              <Profile />
           
          ),
        },
      ]
    }
  ]);