import React from "react";
import { ShoppingBag, Users, Star, DollarSign, Clock, CheckCircle } from "lucide-react";

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
import UpcomingOrders from "../components/PageDashboard/UpcomingOrders";
import ConfirmedOrders from "../components/PageDashboard/ConfirmedOrders";

const Dashboard = () => {
  // Dummy data for new cards
  // Orders that have just been placed and are waiting for admin confirmation
  const upcomingOrders = [
    { id: 'ORD001', customer: 'Aman Verma', amount: 415, time: '11:30 AM', status: 'placed' },
    { id: 'ORD007', customer: 'Anjali Sharma', amount: 180, time: '12:15 PM', status: 'placed' },
    { id: 'ORD009', customer: 'Suresh Gupta', amount: 250, time: '12:30 PM', status: 'placed' },
    { id: 'ORD010', customer: 'Priya Jain', amount: 600, time: '12:35 PM', status: 'placed' },
  ];

  // Orders that have been confirmed by the admin and are now being processed
  const confirmedOrders = [
    { id: 'ORD002', customer: 'Neha Singh', amount: 330, time: '11:45 AM', status: 'preparing', deliveryBoy: { id: 'DB01', name: 'Ravi Kumar' } },
    { id: 'ORD003', customer: 'Rohit Kumar', amount: 390, time: '12:05 PM', status: 'packing', deliveryBoy: null },
    { id: 'ORD008', customer: 'Vikram Singh', amount: 550, time: '12:20 PM', status: 'preparing', deliveryBoy: { id: 'DB02', name: 'Sunil Verma' } },
    { id: 'ORD004', customer: 'Pooja Mehta', amount: 260, time: '12:25 PM', status: 'confirmed', deliveryBoy: null },
    { id: 'ORD005', customer: 'Arjun Malik', amount: 480, time: '12:40 PM', status: 'confirmed', deliveryBoy: null },
  ];

  const deliveryBoys = [
    { id: 'DB01', name: 'Ravi Kumar' },
    { id: 'DB02', name: 'Sunil Verma' },
    { id: 'DB03', name: 'Ankit Patel' },
  ];

  return (
    <div className="min-h-screen page">
      {/* Page Container */}
      <div className="mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-10 space-y-8">

        {/* ================= HEADER ================= */}
        <div className="flex bg-primary flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div>
            <h1 className="highlight text-4xl font-extrabold tracking-tight">
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

        {/* ================= UPCOMING & CONFIRMED ORDERS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingOrders
            title="Upcoming Orders"
            orders={upcomingOrders}
            icon={Clock}
            color="orange"
            type="upcoming"
          />
          <ConfirmedOrders
            title="Confirmed Orders"
            orders={confirmedOrders}
            icon={CheckCircle}
            color="blue"
            type="confirmed"
            deliveryBoys={deliveryBoys}
          />
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
