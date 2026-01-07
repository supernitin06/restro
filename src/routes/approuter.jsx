import React, { Suspense } from "react";
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
import CookingLoader from "../pages/Loader";

// loaders/generalLoader.js
export const generalLoader = async () => {
  // simulate API delay or global data fetching
  await new Promise((resolve) => setTimeout(resolve, 300)); // Reduced slightly for better UX on frequent clicks

  return null;
};

import ProtectedRoute from "../routes/ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";


const AppRouter = createBrowserRouter(
  [
    /* 🔐 AUTH ROUTES */
    {
      path: "/login",
      element: <AuthContainer />,
      errorElement: <ErrorPage />,
    },

    /* 🏠 MAIN APP */

    {
      element: <ProtectedRoute />,
      errorElement: <ErrorPage />,
      hydrateFallbackElement: <CookingLoader />,
      children: [
        {
          path: "/",
          element: <Layout />,
          loader: generalLoader,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Dashboard />,
              loader: generalLoader,
            },
            {
              path: "users",
              element: <UserManagement />,
              loader: generalLoader,
            },
            {
              path: "restaurants",
              element: <RestaurantManagement />,
              loader: generalLoader,
            },
            {
              path: "delivery-settings",
              element: <DeliverySettings />,
              loader: generalLoader,
            },
            {
              path: "delivery-partners",
              element: <DeliveryPartnerManagement />,
              loader: generalLoader,
            },
            {
              path: "orders",
              element: <Orders />,
              loader: generalLoader,
            },
            {
              path: "menu-management",
              loader: generalLoader,
              children: [
                {
                  index: true,
                  element: <MenuManagement />,
                  loader: generalLoader,
                },
                {
                  path: "add",
                  element: <AddMenu />,
                  loader: generalLoader,
                }
              ]
            },
            {
              path: "settings",
              element: <Settings />,
              loader: generalLoader,
            },

            {
              path: "support-tickets",
              element: <SupportManagement />,
              loader: generalLoader,
            },
            {
              path: "reviews",
              element: <CustomerReviewsPage />,
              loader: generalLoader,
            },
            /* 💳 PAYMENTS (nested inside Layout) */
            {
              path: "payments",
              loader: generalLoader,
              children: [
                {
                  path: "dashboard",
                  element: <PaymentDashboard />,
                  loader: generalLoader,
                },
                {
                  path: "transactions",
                  element: <Transactions />,
                  loader: generalLoader,
                },
                {
                  path: "transactions/:id",
                  element: <TransactionDetails />,
                  loader: generalLoader,
                },
                {
                  path: "refunds",
                  element: <Refunds />,
                  loader: generalLoader,
                },
                {
                  path: "invoice",
                  element: <Invoice />,
                  loader: generalLoader,
                },
                {
                  path: "details",
                  element: <TransactionDetails />,
                  loader: generalLoader,
                }
              ],
            },

            {
              path: "offers",
              element: <OffersManagement />,
              loader: generalLoader,

            },


            {
              path: "sub-admin",
              loader: generalLoader,
              children: [
                {
                  index: true, // /sub-admin
                  element: <SubAdmin />,
                  loader: generalLoader,
                },
                {
                  path: "create", // /sub-admin/create
                  element: <CreateAdmin />,
                  loader: generalLoader,
                },
                {
                  path: "assign", // /sub-admin/assign
                  element: <AssignAdmin />,
                  loader: generalLoader,
                },
              ],
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
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }

);

export default AppRouter;
