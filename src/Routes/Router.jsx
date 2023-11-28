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
                loader: () => fetch('http://localhost:5000/productsCount')
            },
            {
                path: '/product-details/:id',
                element: <ProductDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/product-details/${params.id}`)
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
        element: <Dashboard />,
        children: [
            {
                path: '/dashboard/add-item',
                element: <AddItems />
            },

            // admin 
            {
                path: '/dashboard/admin-home',
                element: <AdminHome />
            },
            {
                path: '/dashboard/manage-users',
                element: <ManageUsers />
            },
            {
                path: '/dashboard/user-update/:id',
                element: <UserUpdate />,
                loader: ({ params }) => fetch(`http://localhost:5000/user-update/${params.id}`)
            },

            // public 

            {
                path: '/dashboard/my-profile',
                element: <UserProfile />
            },
            {
                path: '/dashboard/user-payment',
                element: <Payment />
            },
            {
                path: '/dashboard/my-products',
                element: <MyProducts />
            },
            {
                path: '/dashboard/product-update/:id',
                element: <ProductUpdate />,
                loader: ({ params }) => fetch(`http://localhost:5000/product-update/${params.id}`)
            },


            {
                path: '/dashboard/manage-products',
                element: <ProductMenage />
            },
            {
                path: '/dashboard/product-status-update/:id',
                element: <ProductStatusUpdate />,
                loader: ({ params }) => fetch(`http://localhost:5000/product-status/${params.id}`)
            },
            {
                path: '/dashboard/manage-report',
                element: <ReportMenage />
            },
        ]
    }
]);


export default router;