import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import { useGetOrderChartQuery } from '../../api/services/dashboardApi';
import { useTheme } from '../../context/ThemeContext';

const OrderTypes = () => {
  const [activeTab, setActiveTab] = useState('Monthly');
  const { theme } = useTheme();

  const { data: apiData, isLoading, isError } = useGetOrderChartQuery(activeTab.toLowerCase());

  const chartData = (apiData?.data || []).map(item => ({
    name: item.period,
    delivered: item.delivered,
    pending: item.pending,
    cancelled: item.cancelled
  }));

  const axisColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Delivered: <span className="font-bold text-green-600 dark:text-green-400">{payload[0]?.value}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Pending: <span className="font-bold text-yellow-600 dark:text-yellow-400">{payload[1]?.value}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Cancelled: <span className="font-bold text-red-600 dark:text-red-400">{payload[2]?.value}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-primary rounded-2xl p-6 shadow-sm border border-white/20 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-primary">Order Status Trends</h3>
        <div className="flex gap-2">
          <Button
            variant={activeTab === 'Weekly' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('Weekly')}
            size="sm"
          >
            Weekly
          </Button>
          <Button
            variant={activeTab === 'Monthly' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('Monthly')}
            size="sm"
          >
            Monthly
          </Button>
        </div>
      </div>

      <div className="h-72 w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="h-full flex items-center justify-center text-red-500">
            Failed to load data
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDelivered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCancelled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" tick={{ fill: axisColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} />
              <YAxis tick={{ fill: axisColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="delivered" stroke="#22c55e" fillOpacity={1} fill="url(#colorDelivered)" />
              <Area type="monotone" dataKey="pending" stroke="#eab308" fillOpacity={1} fill="url(#colorPending)" />
              <Area type="monotone" dataKey="cancelled" stroke="#ef4444" fillOpacity={1} fill="url(#colorCancelled)" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default OrderTypes;
