import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from "../pages/Dashboard";
import Layout from "../pages/Layout";
import RestaurantManagement from "../pages/RestaurantManagement";
import UserManagement from "../pages/Usermanagement";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true, // for path "/"
                element: <Dashboard />,
            },
            {
                path: "dashboard", // for path "/dashboard"
                element: <Dashboard />,
            },
            {
                path: "users",
                element: <UserManagement />,
            },
            {
                path: "restaurants",
                element: <RestaurantManagement />,
            },
        ],
    },
], {
    future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
    },
});

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;
