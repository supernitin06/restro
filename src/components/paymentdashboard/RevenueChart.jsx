// src/modules/payment/components/PaymentDashboard/RevenueChart.tsx
import React from 'react';
import { Card } from '../../components/Shared/Card';

const RevenueChart = () => {
  const revenueData = [
    { month: 'Jan', revenue: 4000, projected: 4200 },
    { month: 'Feb', revenue: 3000, projected: 3200 },
    { month: 'Mar', revenue: 5000, projected: 4800 },
    { month: 'Apr', revenue: 8000, projected: 7500 },
    { month: 'May', revenue: 7000, projected: 7200 },
    { month: 'Jun', revenue: 9000, projected: 8500 },
  ];

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue, ...revenueData.map(d => d.projected)));

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Actual</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-300 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Projected</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-end h-48 space-x-2">
        {revenueData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="relative w-full flex justify-center h-full">
              {/* Projected Bar */}
              <div
                className="absolute w-4 bg-blue-300 rounded-t-lg transition-all duration-500 hover:opacity-80"
                style={{ height: `${(data.projected / maxRevenue) * 100}%` }}
              />
              {/* Actual Bar */}
              <div
                className="absolute w-4 bg-blue-500 rounded-t-lg transition-all duration-500 hover:opacity-80 bottom-0"
                style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 mt-2">{data.month}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RevenueChart;