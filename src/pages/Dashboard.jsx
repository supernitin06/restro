
import React from 'react';
import { ShoppingBag, Users, Star, DollarSign } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import RevenueChart from '../components/PageDashboard/RevenueChart';
import TopCategories from '../components/PageDashboard/TopCategories';
import OrdersOverview from '../components/PageDashboard/OrdersOverview';
import OrderTypes from '../components/PageDashboard/OrderTypes';
import RecentOrders from '../components/PageDashboard/RecentOrders';
import TrendingMenu from '../components/PageDashboard/TrendingMenu';
import CustomerReviews from '../components/PageDashboard/CustomerReviews';
import RecentActivity from '../components/PageDashboard/RecentActivity';
import Footer from '../components/PageDashboard/Footer';

const Dashboard = () => {
  return (
    <div className="page">
      <div className="max-w-[1600px] mx-auto ">
        {/* Header */}


        <div className="flex flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div>
            <h1 className="text-heading">
              Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">
              Welcome back! Here's what's happening today.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            value="$215,860"
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

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>

          {/* Top Categories */}
          <div>
            <TopCategories />
          </div>
        </div>

        {/* Orders Overview and Order Types */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Orders Overview - Takes 2 columns */}
          <div className="lg:col-span-2">
            <OrdersOverview />
          </div>

          {/* Order Types */}
          <div>
            <OrderTypes />
          </div>
        </div>

        {/* Recent Orders and Trending Menu */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-2">
          {/* Recent Orders - Takes 2 columns */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-6 ">
            <RecentOrders />
          </div>

          {/* Trending Menu */}
          <div>
            <TrendingMenu />
          </div>
        </div>

        {/* Customer Reviews (left) and Recent Activity (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <CustomerReviews />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
