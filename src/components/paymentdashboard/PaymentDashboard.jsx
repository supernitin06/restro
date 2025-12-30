// src/modules/payment/components/PaymentDashboard/PaymentDashboard.tsx
import React from 'react';
import PaymentMetrics from './PaymentMetrics';
import RevenueChart from './RevenueChart';
import PaymentMethodDistribution from './PaymentMethodDistribution';
// import { Card } from '../Shared/Card';
import Button from '../ui/Button';

const PaymentDashboard = () => {
  const recentTransactions = [
    { id: '#TRX001', customer: 'John Doe', amount: '$250.00', status: 'Completed', method: 'Credit Card', date: '2024-01-15' },
    { id: '#TRX002', customer: 'Jane Smith', amount: '$150.00', status: 'Pending', method: 'PayPal', date: '2024-01-14' },
    { id: '#TRX003', customer: 'Bob Johnson', amount: '$350.00', status: 'Failed', method: 'Bank Transfer', date: '2024-01-14' },
    { id: '#TRX004', customer: 'Alice Brown', amount: '$450.00', status: 'Completed', method: 'Digital Wallet', date: '2024-01-13' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your payment transactions and revenue</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Export Report</Button>
          <Button>Add Funds</Button>
        </div>
      </div>

      <PaymentMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <PaymentMethodDistribution />
        </div>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Method</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">{transaction.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.customer}</td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-semibold">{transaction.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{transaction.method}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default PaymentDashboard;