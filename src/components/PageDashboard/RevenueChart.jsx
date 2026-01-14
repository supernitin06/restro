import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Loader2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Select from '../../components/ui/Select';
import { useGetRevenueChartQuery } from '../../api/services/dashboardApi';
import { FaIndianRupeeSign } from "react-icons/fa6";

const RevenueChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last Month');
  const { theme } = useTheme();

  // Map dropdown labels to API period parameters
  const periodMapping = {
    "Last 6 Months": "6_months",
    "Last 3 Months": "3_months",
    "Last Month": "monthly",
    "This Year": "yearly"
  };

  // Fetch data from API
  const { data: apiData, isLoading, isError } = useGetRevenueChartQuery(
    periodMapping[selectedPeriod] || "monthly"
  );

  const chartData = apiData?.data || [];
  const totalRevenue = apiData?.totalRevenue || 0;
  const revenueGrowth = apiData?.growth || 0;

  const axisColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 h-full">
          <p className="text-sm font-semibold text-primary mb-2">{payload[0].payload.name}</p>
          <p className="text-sm text-primary opacity-70">Revenue: <span className="font-bold text-[#2563eb] dark:text-blue-400">${payload[0].value.toLocaleString()}</span></p>
          <p className="text-sm text-primary opacity-70">Orders: <span className="font-bold text-[#eb2528] dark:text-red-400">{payload[1].value}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-primary rounded-2xl p-6 shadow-sm border border-white/20 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-primary mb-1">Total Revenue</h3>
          <div className="flex items-center gap-3">
            <p className="flex items-center gap-1 text-3xl font-bold text-primary">
  <FaIndianRupeeSign className="text-2xl" />
  {totalRevenue.toLocaleString()}
</p>

            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${revenueGrowth >= 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
              <TrendingUp className={`w-3.5 h-3.5 ${revenueGrowth < 0 ? 'rotate-180' : ''}`} />
              {revenueGrowth >= 0 ? '+' : ''}{revenueGrowth}%
            </div>
          </div>
        </div>
        <Select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          options={["Last 6 Months", "Last 3 Months", "Last Month", "This Year"]}
          className="w-40"
        />
      </div>

      <div className="h-64">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="h-full flex items-center justify-center text-red-500">
            Failed to load chart data
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="name"
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
              />
              <YAxis
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: '#2563eb', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#eb2528"
                strokeWidth={3}
                dot={{ fill: '#eb2528', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#2563eb]"></div>
          <span className="text-sm font-medium text-primary opacity-70">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#eb2528]"></div>
          <span className="text-sm font-medium text-primary opacity-70">Orders</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;