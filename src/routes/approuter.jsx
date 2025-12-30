import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Layout from "../pages/Layout";
import RestaurantManagement from "../pages/RestaurantManagement";
import UserManagement from "../pages/Usermanagement";
import DeliverySettings from "../pages/DeliverySettings";
import AuthContainer from "../components/Auth/AuthContainer";

// Payment Module Components
import PaymentDashboardPage from "../pages/PaymentDashboard";
import TransactionsPage from "../pages/TransactionsPage";
import RefundsPage from "../pages/RefundsPage";
import InvoicesPage from "../components/InvoiceGenerator/InvoiceGenerator";
// import TaxReportsPage from "../modules/payment/pages/TaxReportsPage";
// import SettlementsPage from "../modules/payment/pages/SettlementsPage";

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
        
        // 💰 Payment Module Routes
        {
          path: "payment/dashboard",
          element: <PaymentDashboardPage />,
        },
        {
          path: "payment/transactions",
          element: <TransactionsPage />,
        },
        {
          path: "payment/refunds",
          element: <RefundsPage />,
        },
        {
          path: "payment/invoices",
          element: <InvoicesPage />,
        },
        // {
        //   path: "payment/tax-reports",
        //   element: <TaxReportsPage />,
        // },
        // {
        //   path: "payment/settlements",
        //   element: <SettlementsPage />,
        // },
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