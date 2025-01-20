import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Statistics from "../pages/Dashboard/Common/Statistics";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import AddProperty from "../pages/Dashboard/Agent/AddProperty";
import MyProperties from "../pages/Dashboard/Agent/MyProperties";
import Home from "../pages/Home/Home";
import UpdateProperty from "../pages/UpdateProperty";
import PropertyDetails from "../pages/PropertyDetails";
import Wishlist from "../pages/Dashboard/Customer/Wishlist";
import MakeOffer from "../pages/Dashboard/Customer/MakeOffer";
import PropertyBought from "../pages/Dashboard/Customer/PropertyBought";




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
        // {
        //     path:"all-properties",
        //     element: <AllProperties/>
        // },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:'/signup',
            element:<SignUp/>
        },
        {
          path: 'property/:id',
          element: <PropertyDetails/>
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
        {
          path: 'add-property',
          element: <AddProperty />
        },
        {
          path: 'my-properties',
          element: <MyProperties />
        },
        {
          path: 'update/:id',
          element: <UpdateProperty />
        },
        {
          path: 'my-wishlist',
          element: <Wishlist />
        },
        {
          path: 'make-offer',
          element: <MakeOffer />
        },
        {
          path: 'property-bought',
          element: <PropertyBought />
        },
      
      ]
    }
  ]);