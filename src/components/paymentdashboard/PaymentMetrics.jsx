// src/modules/payment/components/PaymentDashboard/PaymentMetrics.tsx
import React from 'react';
import { Card } from '../../components/Shared/Card';
import Badge from '../../components/ui/Badge';

const PaymentMetrics = () => {
  const metrics = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      isPositive: true,
      description: 'From last month',
      icon: '💰',
    },
    {
      title: 'Transactions',
      value: '12,234',
      change: '+180.1%',
      isPositive: true,
      description: 'From last month',
      icon: '💳',
    },
    {
      title: 'Avg. Order Value',
      value: '$89.50',
      change: '-5.2%',
      isPositive: false,
      description: 'From last month',
      icon: '📊',
    },
    {
      title: 'Refunds',
      value: '23',
      change: '+2.1%',
      isPositive: false,
      description: 'From last month',
      icon: '↩️',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</h3>
            </div>
            <span className="text-3xl">{metric.icon}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{metric.description}</span>
            <Badge 
              variant={metric.isPositive ? 'success' : 'error'}
              className="text-xs"
            >
              {metric.change}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PaymentMetrics;