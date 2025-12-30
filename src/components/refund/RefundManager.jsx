// src/modules/payment/components/RefundManager/RefundManager.tsx
import React, { useState } from 'react';
// import { Card } from '../Shared/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Input from '../ui/InputField';
// import { Select } from '../ui/Select';

const RefundManager = () => {
  const [refunds, setRefunds] = useState([
    { id: '#RF001', transactionId: '#TRX001', customer: 'John Doe', amount: '$250.00', reason: 'Product not as described', status: 'Pending', date: '2024-01-15' },
    { id: '#RF002', transactionId: '#TRX002', customer: 'Jane Smith', amount: '$150.00', reason: 'Duplicate charge', status: 'Approved', date: '2024-01-14' },
    { id: '#RF003', transactionId: '#TRX003', customer: 'Bob Johnson', amount: '$350.00', reason: 'Cancelled order', status: 'Completed', date: '2024-01-14' },
    { id: '#RF004', transactionId: '#TRX004', customer: 'Alice Brown', amount: '$450.00', reason: 'Service issue', status: 'Rejected', date: '2024-01-13' },
  ]);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'warning';
      case 'approved': return 'info';
      case 'completed': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Refund Manager</h1>
          <p className="text-gray-600 mt-2">Process and manage refund requests</p>
        </div>
        <Button>New Refund Request</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-l-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Refunds</p>
              <h3 className="text-2xl font-bold text-gray-900">3</h3>
            </div>
            <span className="text-3xl">⏳</span>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved Today</p>
              <h3 className="text-2xl font-bold text-gray-900">$1,250</h3>
            </div>
            <span className="text-3xl">✅</span>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Processing Time</p>
              <h3 className="text-2xl font-bold text-gray-900">2.5 Days</h3>
            </div>
            <span className="text-3xl">⏱️</span>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input placeholder="Search refunds..." className="flex-1" />
          <Select className="w-40">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </Select>
          <Button variant="outline">Filter</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Refund ID</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Transaction</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Reason</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((refund) => (
                <tr key={refund.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{refund.id}</td>
                  <td className="py-4 px-4 text-gray-600">{refund.transactionId}</td>
                  <td className="py-4 px-4">
                    <div className="text-gray-900">{refund.customer}</div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{refund.amount}</td>
                  <td className="py-4 px-4 text-gray-600 max-w-xs truncate">{refund.reason}</td>
                  <td className="py-4 px-4">
                    <Badge variant={getStatusColor(refund.status)}>
                      {refund.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">View</Button>
                      {refund.status === 'Pending' && (
                        <>
                          <Button size="sm" variant="success">Approve</Button>
                          <Button size="sm" variant="error">Reject</Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default RefundManager;