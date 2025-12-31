import React from "react";
import { ShoppingBag, Users, Star, DollarSign } from "lucide-react";

import StatCard from "../components/ui/StatCard";
import RevenueChart from "../components/PageDashboard/RevenueChart";
import TopCategories from "../components/PageDashboard/TopCategories";
import OrdersOverview from "../components/PageDashboard/OrdersOverview";
import OrderTypes from "../components/PageDashboard/OrderTypes";
import RecentOrders from "../components/PageDashboard/RecentOrders";
import TrendingMenu from "../components/PageDashboard/TrendingMenu";
import CustomerReviews from "../components/PageDashboard/CustomerReviews";
import RecentActivity from "../components/PageDashboard/RecentActivity";
import Footer from "../components/PageDashboard/Footer";

const Dashboard = () => {
  return (
    <div className="min-h-screen page-background">
      {/* Page Container */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-10 space-y-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-primary p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div>
            <h1 className="text-heading">
              Dashboard
            </h1>
            <p className="text-primary opacity-70 mt-2 text-lg font-medium">
              Welcome back! Here's what's happening today.
            </p>
          </div>

        </div>

        {/* ================= STATS ================= */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Orders"
              value="48,652"
              icon={ShoppingBag}
              trend="up"
              trendValue="+14%"
              color="orange"
            />
            <StatCard
              title="Total Customers"
              value="1,248"
              icon={Users}
              trend="up"
              trendValue="+8.5%"
              color="blue"
            />
            <StatCard
              title="Total Reviews"
              value="12,486"
              icon={Star}
              trend="up"
              trendValue="+3.8%"
              color="yellow"
            />
            <StatCard
              title="Total Revenue"
              value="$184,839"
              icon={DollarSign}
              trend="up"
              trendValue="+12.5%"
              color="green"
            />
          </div>
        </section>

        {/* ================= REVENUE + CATEGORIES ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <TopCategories />
        </section>

        {/* ================= ORDERS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrdersOverview />
          </div>
          <OrderTypes />
        </section>

        {/* ================= RECENT ORDERS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>
          <TrendingMenu />
        </section>

        {/* ================= REVIEWS & ACTIVITY ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CustomerReviews />
          </div>
          <RecentActivity />
        </section>
      </div>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default Dashboard;
