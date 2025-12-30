// src/modules/payment/components/PaymentDashboard/PaymentMethodDistribution.tsx
import React from 'react';
// import { Card } from '../Shared/Card';

const PaymentMethodDistribution = () => {
  const methods = [
    { name: 'Credit Card', value: 45, color: 'bg-blue-500' },
    { name: 'PayPal', value: 25, color: 'bg-blue-400' },
    { name: 'Bank Transfer', value: 15, color: 'bg-purple-500' },
    { name: 'Digital Wallet', value: 10, color: 'bg-green-500' },
    { name: 'Cash', value: 5, color: 'bg-gray-400' },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
      <div className="space-y-4">
        {methods.map((method, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">{method.name}</span>
              <span className="text-gray-600">{method.value}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${method.color} rounded-full transition-all duration-500`}
                style={{ width: `${method.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PaymentMethodDistribution;