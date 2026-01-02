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
import SubAdmin from "../pages/SubAdmin";
import CreateAdmin from "../components/Sub-Admin/createAdmin";
import AssignAdmin from "../components/Sub-Admin/AssignAdmin";

// Auth
import AuthContainer from "../components/Auth/AuthContainer";

// Payments Pages
import PaymentDashboard from "../pages/payments/PaymentDashboard";
import Transactions from "../pages/payments/Transection";
import TransactionDetails from "../pages/payments/TransactionDetails";
import Refunds from "../pages/payments/Refunds";
import Invoice from "../pages/payments/Invoice";

import OffersManagement from "../pages/OffersManagement";
import SupportManagement from "../pages/SupportManagement";
import MenuManagement from "../pages/menu/MenuManagement";
import AddMenu from "../components/menu/AddMenu";
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
          path: "orders",
          element: <Orders />,
        },
        {
          path: "offers",
          element: <OffersManagement />,
        },

        {
          path: "support-tickets",
          element: <SupportManagement />,
        },
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
              path: "transactions/:id",
              element: <TransactionDetails />,
            },
            {
              path: "refunds",
              element: <Refunds />,
            },
            {
              path: "invoice",
              element: <Invoice />,
            },
            {
              path: "details",
              element: <TransactionDetails />,
            }
          ],
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
        {
          path: "menu-management/:restaurantId",
          element: <MenuManagement />,
        },
        {
          path: "menu-management/add",
          element: <AddMenu />,
        }
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
