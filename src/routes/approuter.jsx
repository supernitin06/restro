import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Layout from "../pages/Layout";
import RestaurantManagement from "../pages/RestaurantManagement";
import UserManagement from "../pages/Usermanagement";
import DeliverySettings from "../pages/DeliverySettings";
import AuthContainer from "../components/Auth/AuthContainer";
import Orders from "../pages/Orders";

const AppRouter = createBrowserRouter(
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
        {
          path: "orders",
          element: <Orders />,
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

export default AppRouter;
