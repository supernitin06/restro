import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const RevenueChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');
  const { theme } = useTheme();

  const axisColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  const data = [
    { name: 'Jan', revenue: 15000, orders: 120 },
    { name: 'Feb', revenue: 18000, orders: 145 },
    { name: 'Mar', revenue: 22000, orders: 168 },
    { name: 'Apr', revenue: 19000, orders: 152 },
    { name: 'May', revenue: 25000, orders: 189 },
    { name: 'Jun', revenue: 28000, orders: 205 },
    { name: 'Jul', revenue: 24000, orders: 178 },
    { name: 'Aug', revenue: 30000, orders: 220 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Revenue: <span className="font-bold text-[#2563eb] dark:text-blue-400">${payload[0].value.toLocaleString()}</span></p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Orders: <span className="font-bold text-[#eb2528] dark:text-red-400">{payload[1].value}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">Total Revenue</h3>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">$184,839</p>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              <TrendingUp className="w-3.5 h-3.5" />
              +12.5%
            </div>
          </div>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer hover:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
        >
          <option>Last 6 Months</option>
          <option>Last 3 Months</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
      </div>

      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#2563eb]"></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#eb2528]"></div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Orders</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;