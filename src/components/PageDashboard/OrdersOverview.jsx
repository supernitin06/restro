import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { useTheme } from '../../context/ThemeContext';

const OrdersOverview = () => {
  const [selectedView, setSelectedView] = useState('This Week');
  const { theme } = useTheme();

  const axisColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';
  const tooltipCursorColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(37, 99, 235, 0.05)';

  const data = [
    { day: 'Mon', orders: 45 },
    { day: 'Tue', orders: 52 },
    { day: 'Wed', orders: 68 },
    { day: 'Thu', orders: 135 },
    { day: 'Fri', orders: 89 },
    { day: 'Sat', orders: 72 },
    { day: 'Sun', orders: 58 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 h-96">
          <p className="text-sm font-semibold text-primary">{payload[0].payload.day}</p>
          <p className="text-sm text-primary opacity-70">Orders: <span className="font-bold text-[#eb2528] dark:text-red-400">{payload[0].value}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-primary rounded-2xl p-6 shadow-sm border border-white/20 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-primary">Orders Overview</h3>
        <div className="flex gap-2">
          <Button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-800 text-white dark:bg-gray-600">
            Weekly
          </Button>
          <Button className="px-3 py-1.5 rounded-lg text-sm font-medium text-primary opacity-70 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            Monthly
          </Button>
          <Select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            options={["This Week", "Last Week", "This Month"]}
            className="w-36 ml-2"
          />
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: axisColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
            />
            <YAxis
              tick={{ fill: axisColor, fontSize: 12 }}
              axisLine={{ stroke: gridColor }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: tooltipCursorColor }} />
            <Bar
              dataKey="orders"
              fill="#eb2528"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersOverview;