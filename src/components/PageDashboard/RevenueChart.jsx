import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import Select from '../../components/ui/Select';

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
            <p className="text-3xl font-bold text-primary">$184,839</p>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
              <TrendingUp className="w-3.5 h-3.5" />
              +12.5%
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

      <div className="w-full" style={{ height: 256 }}>
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