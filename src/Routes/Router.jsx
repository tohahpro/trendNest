import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import AddItems from "../Pages/DashBoard/Host/AddItems";
import AdminHome from "../Pages/DashBoard/Admin/AdminHome";
import ManageUsers from "../Pages/DashBoard/Admin/ManageUsers";
import UserUpdate from "../Components/UserUpdate";
import UserProfile from "../Pages/DashBoard/UserProfile";
import Payment from "../Pages/DashBoard/User/Payment";
import MyProducts from "../Pages/DashBoard/User/MyProducts";
import ProductUpdate from "../Pages/DashBoard/User/ProductUpdate";
import ProductMenage from "../Pages/DashBoard/Moderator/ProductMenage";
import ProductStatusUpdate from "../Components/ProductStatusUpdate";
import ProductDetails from "../Components/ProductDetails";
import AllProduct from "../Pages/AllProduct";
import ReportMenage from "../Pages/DashBoard/Moderator/ReportMenage";
import PrivateRoute from "./PrivateRouter";
import AdminRoute from "./AdminRoute";
import ManageCoupons from "../Pages/DashBoard/Admin/ManageCoupons";
import CouponUpdate from "../Pages/DashBoard/Admin/CouponUpdate";



const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,

            },
            {
                path: '/products',
                element: <AllProduct />,
                loader: () => fetch('https://trendnest-server-side.vercel.app/productsCount')
            },
            {
                path: '/product-details/:id',
                element: <PrivateRoute><ProductDetails /></PrivateRoute>,
                loader: ({ params }) => fetch(`https://trendnest-server-side.vercel.app/product-details/${params.id}`)
            }
        ],

    },
    {
        path: '/Register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: '/dashboard/add-item',
                element: <PrivateRoute><AddItems /></PrivateRoute>
            },

            // admin 
            {
                path: '/dashboard/admin-home',
                element: <PrivateRoute><AdminRoute><AdminHome /></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/manage-coupon',
                element: <PrivateRoute><AdminRoute><ManageCoupons /></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/coupon-update/:id',
                element: <PrivateRoute><AdminRoute><CouponUpdate /></AdminRoute></PrivateRoute>,
                loader: ({ params }) => fetch(`https://trendnest-server-side.vercel.app/coupon/${params.id}`)
            },
            {
                path: '/dashboard/manage-users',
                element: <PrivateRoute><AdminRoute><ManageUsers /></AdminRoute></PrivateRoute>
            },
            {
                path: '/dashboard/user-update/:id',
                element: <UserUpdate />,
                loader: ({ params }) => fetch(`https://trendnest-server-side.vercel.app/user-update/${params.id}`)
            },

            // public 

            {
                path: '/dashboard/my-profile',
                element: <UserProfile />
            },
            {
                path: '/dashboard/user-payment',
                element: <PrivateRoute><Payment /></PrivateRoute>
            },
            {
                path: '/dashboard/my-products',
                element: <PrivateRoute><MyProducts /></PrivateRoute>
            },
            {
                path: '/dashboard/product-update/:id',
                element: <ProductUpdate />,
                loader: ({ params }) => fetch(`https://trendnest-server-side.vercel.app/product-update/${params.id}`)
            },


            {
                path: '/dashboard/manage-products',
                element: <PrivateRoute><ProductMenage /></PrivateRoute>
            },
            {
                path: '/dashboard/product-status-update/:id',
                element: <ProductStatusUpdate />,
                loader: ({ params }) => fetch(`https://trendnest-server-side.vercel.app/product-status/${params.id}`)
            },
            {
                path: '/dashboard/manage-report',
                element: <PrivateRoute><ReportMenage /></PrivateRoute>
            },
        ]
    }
]);


export default router;