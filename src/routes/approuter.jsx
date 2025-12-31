import React from "react";
import { createBrowserRouter } from "react-router-dom";

// Layout & Pages
import Layout from "../pages/Layout";
import Dashboard from "../pages/Dashboard";
import RestaurantManagement from "../pages/RestaurantManagement";
import UserManagement from "../pages/Usermanagement";
import DeliverySettings from "../pages/DeliverySettings";
import DeliveryPartnerManagement from "../pages/DeliveryPartnerManagement";
import Orders from "../pages/Orders";

// Auth
import AuthContainer from "../components/Auth/AuthContainer";

// Payments Pages
import PaymentDashboard from "../pages/payments/PaymentDashboard";
import Transactions from "../pages/payments/Transection";
import TransactionDetails from "../pages/payments/TransactionDetails";
import Refunds from "../pages/payments/Refunds";
import Invoice from "../pages/payments/Invoice";

import OffersManagement from "../pages/OffersManagement";
const AppRouter = createBrowserRouter(
  [
    /* 🔐 AUTH ROUTES */
    {
      path: "/auth",
      element: <AuthContainer />,
    },

    /* 🏠 MAIN APP */
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
          path: "delivery-partners",
          element: <DeliveryPartnerManagement />,
        },
        {
          path: "offers",                   
          element: <OffersManagement />,
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
