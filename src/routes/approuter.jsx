import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Layout from "../pages/Layout";
import RestaurantManagement from "../pages/RestaurantManagement";
import UserManagement from "../pages/Usermanagement";
import DeliverySettings from "../pages/DeliverySettings";
import DeliveryPartnerManagement from "../pages/DeliveryPartnerManagement";  // <-- Import the new page component
import AuthContainer from "../components/Auth/AuthContainer";
import Orders from "../pages/Orders";
import SubAdmin from "../pages/SubAdmin";
import CreateAdmin from "../components/Sub-Admin/createAdmin";
import AssignAdmin from "../components/Sub-Admin/AssignAdmin";

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
          path: "delivery-partners",        // <-- New route for delivery partner management
          element: <DeliveryPartnerManagement />,
          
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "sub-admin",
          element: <SubAdmin />,
        },
        {
          path: "sub-admin/create",
          element: <CreateAdmin />,
        },
        {
          path: "sub-admin/assign",
          element: <AssignAdmin />,
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
