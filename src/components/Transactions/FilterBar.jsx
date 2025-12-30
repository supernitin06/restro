// src/modules/payment/components/TransactionList/TransactionFilter.tsx
import React from 'react';
import Input from '../ui/InputField';
// import { Select } from '../ui/Select';
import Button from '../ui/Button';




const TransactionFilter = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search transactions..."
            className="w-full"
          />
        </div>
        <div className="flex gap-3">
          <Select className="w-40">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </Select>
          <Select className="w-40">
            <option value="">All Methods</option>
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
          </Select>
          <Select className="w-40">
            <option value="">Date Range</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </Select>
          <Button variant="outline">Filter</Button>
          <Button variant="ghost">Reset</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-600">Quick Filters:</span>
        <Button size="sm" variant="ghost">High Value</Button>
        <Button size="sm" variant="ghost">International</Button>
        <Button size="sm" variant="ghost">Refunded</Button>
        <Button size="sm" variant="ghost">Subscription</Button>
      </div>
    </div>
  );
};

export default TransactionFilter;