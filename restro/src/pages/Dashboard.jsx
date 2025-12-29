import React from 'react';
import { ShoppingBag, Users, Star, DollarSign } from 'lucide-react';
import StatCard from './PageDashboard/StatCard';
import RevenueChart from './PageDashboard/RevenueChart';
import TopCategories from './PageDashboard/TopCategories';
import OrdersOverview from './PageDashboard/OrdersOverview';
import OrderTypes from './PageDashboard/OrderTypes';
import RecentOrders from './PageDashboard/RecentOrders';
import TrendingMenu from './PageDashboard/TrendingMenu';
import CustomerReviews from './PageDashboard/CustomerReviews';
import RecentActivity from './PageDashboard/RecentActivity';
import Footer from './PageDashboard/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
      <div className="max-w-[1600px] mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Orders"
            value="48,652"
            icon={ShoppingBag}
            trend="up"
            trendValue="+14%"
            bgColor="bg-orange-500"
            iconBgColor="bg-orange-100"
          />
          <StatCard 
            title="Total Customer"
            value="1,248"
            icon={Users}
            trend="up"
            trendValue="+8.5%"
            bgColor="bg-orange-500"
            iconBgColor="bg-orange-100"
          />
          <StatCard 
            title="Total Review"
            value="$215,860"
            icon={Star}
            trend="up"
            trendValue="+3.8%"
            bgColor="bg-orange-500"
            iconBgColor="bg-orange-100"
          />
          <StatCard 
            title="Total Revenue"
            value="$184,839"
            icon={DollarSign}
            trend="up"
            trendValue="+12.5%"
            bgColor="bg-orange-500"
            iconBgColor="bg-orange-100"
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