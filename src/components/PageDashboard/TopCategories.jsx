import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Button from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

const TopCategories = () => {
  const { theme } = useTheme();
  const data = [
    { name: 'Seafood', value: 33, color: '#2563eb' },
    { name: 'Beverages', value: 25, color: '#eb2528' },
    { name: 'Dessert', value: 25, color: '#fbbf24' },
    { name: 'Pizza', value: 17, color: '#10b981' },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-primary p-3 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-semibold text-primary">{payload[0].name}</p>
          <p className="text-sm text-primary opacity-70">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 gap-3 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 group cursor-pointer">
            <div
              className="w-3 h-3 rounded-full transition-transform group-hover:scale-125"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm font-medium text-primary opacity-80 group-hover:text-primary">
              {entry.value} <span className="text-primary opacity-60">{data[index].value}%</span>
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-primary rounded-2xl p-6 shadow-sm border border-white/20 dark:border-gray-700 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-primary">Top Categories</h3>
        <Button className="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors bg-transparent shadow-none p-0 w-auto hover:bg-transparent">
          This Month ▼
        </Button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke={theme === 'dark' ? '#1f2937' : '#fff'}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopCategories;