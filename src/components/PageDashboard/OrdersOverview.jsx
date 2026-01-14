import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { useTheme } from '../../context/ThemeContext';
import { useGetOrderChartQuery } from '../../api/services/dashboardApi';

const OrdersOverview = () => {
  const [selectedView, setSelectedView] = useState('This Month');
  const [activeTab, setActiveTab] = useState('Monthly');
  const { theme } = useTheme();

  // Fetch data from API based on activeTab (weekly/monthly)
  const { data: apiData, isLoading, isError, error } = useGetOrderChartQuery(activeTab.toLowerCase());
  const chartData = apiData?.data || [];

  useEffect(() => {
    if (isError) {
      console.error("OrdersOverview API Error:", error);
    }
  }, [isError, error]);

  const axisColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';
  const tooltipCursorColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(37, 99, 235, 0.05)';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Orders: <span className="font-bold text-[#eb2528] dark:text-red-400">{payload[0].value}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-primary rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl font-bold text-primary">Orders Overview</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={activeTab === 'Weekly' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('Weekly')}
            className="text-sm"
          >
            Weekly
          </Button>
          <Button
            variant={activeTab === 'Monthly' ? 'primary' : 'secondary'}
            onClick={() => setActiveTab('Monthly')}
            className="text-sm"
          >
            Monthly
          </Button>
          <Select
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            options={[
              { value: 'This Week', label: 'This Week' },
              { value: 'Last Week', label: 'Last Week' },
              { value: 'This Month', label: 'This Month' },
            ]}
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      <div className="h-72 w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="name"
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
        )}
      </div>
    </div>
  );
};

export default OrdersOverview;