import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Layout from "../pages/Layout";
import RestaurantManagement from "../pages/RestaurantManagement";
import UserManagement from "../pages/Usermanagement";
import DeliverySettings from "../pages/DeliverySettings";
import AuthContainer from "../components/Auth/AuthContainer";

// Payment related pages
import PaymentDashboard from "../pages/PaymentDashboard";
import Transactions from "../pages/Transection";
import TransactionDetails from "../pages/TransactionDetails";
import Refunds from "../pages/Refunds";
import Invoice from "../pages/Invoice";



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
        // Payment Routes
        {
          path: "payments",
          children: [
            {
              path: "dashboard",
              element: <PaymentDashboard />,
            },
            {
              path: "transactions",
              element: <Transactions />,
            },
            {
              path: "transactions/:id", // यदि आपको transaction details की जरूरत है
              element: <TransactionDetails />,
            },
            {
              path: "refunds",
              element: <Refunds />,
            },
            
           
            {
              path: "invoice", // यदि invoice page अलग है
              element: <Invoice />,
            },
          ],
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