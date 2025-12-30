
import React from 'react';
import { ShoppingBag, Users, Star, DollarSign } from 'lucide-react';
import StatCard from '../components/PageDashboard/StatCard';
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
      <div className="max-w-[1600px] mx-auto p-8">
        {/* Header */}


        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted">Welcome back! Here's what's happening today.</p>
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
