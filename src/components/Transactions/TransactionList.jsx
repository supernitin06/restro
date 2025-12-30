// src/modules/payment/components/TransactionList/TransactionList.tsx
import React, { useState } from 'react';
import TransactionFilter from '../Transactions/FilterBar';
import TransactionRow from '../Transactions/TransactionRow';
import Button from '../ui/Button';


const TransactionList = () => {
  const [selected, setSelected] = useState([]);
  
  const transactions = [
    { id: '#TRX001', customer: 'John Doe', email: 'john@example.com', amount: '$250.00', status: 'Completed', method: 'Credit Card', date: '2024-01-15' },
    { id: '#TRX002', customer: 'Jane Smith', email: 'jane@example.com', amount: '$150.00', status: 'Pending', method: 'PayPal', date: '2024-01-14' },
    { id: '#TRX003', customer: 'Bob Johnson', email: 'bob@example.com', amount: '$350.00', status: 'Failed', method: 'Bank Transfer', date: '2024-01-14' },
    { id: '#TRX004', customer: 'Alice Brown', email: 'alice@example.com', amount: '$450.00', status: 'Completed', method: 'Digital Wallet', date: '2024-01-13' },
    { id: '#TRX005', customer: 'Charlie Wilson', email: 'charlie@example.com', amount: '$120.00', status: 'Completed', method: 'Credit Card', date: '2024-01-13' },
    { id: '#TRX006', customer: 'Diana Prince', email: 'diana@example.com', amount: '$650.00', status: 'Pending', method: 'Bank Transfer', date: '2024-01-12' },
  ];

  const handleSelect = (id) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-2">Manage and review all payment transactions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Export CSV</Button>
          <Button>New Transaction</Button>
        </div>
      </div>

      <TransactionFilter />

      <Card className="p-0">
        {selected.length > 0 && (
          <div className="bg-blue-50 border-b p-4 flex items-center justify-between">
            <span className="text-sm text-blue-700">
              {selected.length} transaction{selected.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">Refund Selected</Button>
              <Button size="sm" variant="outline">Export Selected</Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="w-12 py-4 px-4">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Transaction</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                  onSelect={handleSelect}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {transactions.length} of 124 transactions
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" disabled>
              Previous
            </Button>
            <Button variant="ghost" size="sm" className="bg-blue-50 text-blue-600">
              1
            </Button>
            <Button variant="ghost" size="sm">
              2
            </Button>
            <Button variant="ghost" size="sm">
              3
            </Button>
            <Button variant="ghost" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransactionList;