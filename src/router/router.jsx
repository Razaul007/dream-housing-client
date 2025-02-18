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
import About from "../pages/About/About";





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
        path: '/about',
        element: <About />
      },
      {
        path:'payment/:id',
        element:<PrivateRoute><Payment/></PrivateRoute>
      },

      {
        path: '/all-properties',
        element: <AllProperties/>
      },
      {
        path: 'property/:id',
        element: <PropertyDetails />
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

          <Profile />

        ),
      },
    
      {
        path:'manage-users' ,
        element:  <ManageUsers />,
      },
      {
        path: 'manage-properties',
        element: <ManageProperties/>,
      },
      {
        path: 'Manage-reviews',
        element: <ManageReviews />,
      },
   
      {
        path: 'add-property',
        element:  <AddProperty />
               
          
                  
                
      },
      {
        path: 'my-properties',
        element:  <MyProperties />
                 
                  
                
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
        element: 
          <MakeOffer />
        
      },
      {
        path: 'property-bought',
        element:<PropertyBought />
       
      },
      {
        path: 'my-reviews',
        element: <MyReviews />
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