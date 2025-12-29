import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Layout from "../pages/Layout";
import RestaurantManagement from "../pages/RestaurantManagement";
import UserManagement from "../pages/Usermanagement";
import DeliverySettings from "../pages/DeliverySettings";
import AuthContainer from "../components/Auth/AuthContainer";

const router = createBrowserRouter(
  [
    // 🔐 Auth Routes
    {
      path: "/auth",
      element: <AuthContainer />,
    },

    // 🏠 Main App Layout
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
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
        {
          path: "delivery-settings",
          element: <DeliverySettings />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
