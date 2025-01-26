import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
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
import MyReviews from "../pages/Dashboard/Customer/MyReviews";
import PrivateRoute from "./PrivateRoute";
import AgentRoute from "./AgentRoute";
import AdminRoute from "./AdminRoute";
import ManageProperties from "../pages/Dashboard/Admin/ManageProperties";
import ManageReviews from "../pages/Dashboard/Admin/ManageReviews";
import AllProperties from "../pages/AllProperties/AllProperties";
import MySoldProperties from "../pages/Dashboard/Agent/MySoldProperties";
import RequestedProperties from "../pages/Dashboard/Agent/RequestedProperties";
import Payment from "../pages/Dashboard/Customer/Payment";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "/login",
        element: <Login />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path:'payment/:id',
        element:<Payment/>
      },

      {
        path: '/all-properties',
        element: <PrivateRoute><AllProperties/></PrivateRoute>
      },
      {
        path: 'property/:id',
        element: <PrivateRoute><PropertyDetails /></PrivateRoute>
      },

    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute>
                 <DashboardLayout />
             </PrivateRoute>,
    children: [
    
      {
        index: true,
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>

        ),
      },
      {
        path: 'manage-properties',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageProperties />
            </AdminRoute>
          </PrivateRoute>

        ),
      },
      {
        path: 'Manage-reviews',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageReviews />
            </AdminRoute>
          </PrivateRoute>

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
        element:   <AddProperty />
                  
                
      },
      {
        path: 'my-properties',
        element:   <MyProperties />
                  
                
      },         
      {
        path: 'update/:id',
        element: <UpdateProperty />
                        
                       
      },
      {
        path: 'my-wishlist',
        element: <PrivateRoute>
          <Wishlist />
        </PrivateRoute>
      },
      {
        path: 'make-offer',
        element: <PrivateRoute>
          <MakeOffer />
        </PrivateRoute>
      },
      {
        path: 'property-bought',
        element:
          <PropertyBought />
       
      },
      {
        path: 'my-reviews',
        element: <PrivateRoute><MyReviews /></PrivateRoute>
      },
      {
        path:'sold-properties',
        element: <MySoldProperties/>
      },
      {
        path:'requested-properties',
        element: <RequestedProperties/>
      },
    
    ]
  }
]);