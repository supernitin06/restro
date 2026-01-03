import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Dashboard from "../pages/Dashboard";
import RestaurantManagement from "../pages/RestaurantManagement";
import UserManagement from "../pages/Usermanagement";
import DeliverySettings from "../pages/DeliverySettings";
import DeliveryPartnerManagement from "../pages/DeliveryPartnerManagement";
import Orders from "../pages/Orders";
import SubAdmin from "../pages/SubAdmin";
import CreateAdmin from "../components/Sub-Admin/CreateAdmin";
import AssignAdmin from "../components/Sub-Admin/AssignAdmin";
import AuthContainer from "../components/Auth/AuthContainer";
import PaymentDashboard from "../pages/payments/PaymentDashboard";
import Transactions from "../pages/payments/Transection";
import TransactionDetails from "../pages/payments/TransactionDetails";
import Refunds from "../pages/payments/Refunds";
import Invoice from "../pages/payments/Invoice";
import Settings from "../components/settings/Settings"
import CustomerReviewsPage from "../components/PageDashboard/ReviewCustomer/CustomerReviewsPage";
import OffersManagement from "../pages/OffersManagement";
import SupportManagement from "../pages/SupportManagement";
import MenuManagement from "../pages/menu/MenuManagement";
import AddMenu from "../components/menu/AddMenu";
import ProtectedRoute from "../routes/ProtectedRoute";

const AppRouter = createBrowserRouter(
  [
    /* 🔐 AUTH ROUTES */
    {
      path: "/auth",
      element: <AuthContainer />,
    },

    /* 🏠 MAIN APP */

    {
      element: <ProtectedRoute />,
      children : [
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
          path: "menu-management",
          children: [
            {
              index: true,
              element: <MenuManagement />
            },
            {
              path: "add",
              element: <AddMenu />
            }
          ]
        },
        {
          path: "settings",
          element: <Settings />,
        },

        {
          path: "support-tickets",
          element: <SupportManagement />,
        },
        {
          path: "reviews",
          element: <CustomerReviewsPage />,
        },
        /* 💳 PAYMENTS (nested inside Layout) */
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
          path: "offers",
          element: <OffersManagement />,

        },


        {
          path: "sub-admin",
          children: [
            {
              index: true, // /sub-admin
              element: <SubAdmin />,
            },
            {
              path: "create", // /sub-admin/create
              element: <CreateAdmin />,
            },
            {
              path: "assign", // /sub-admin/assign
              element: <AssignAdmin />,
            },
          ],
        },
        {
          path: "menu-management/add",
          element: <AddMenu />,
        }
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

export default AppRouter;
