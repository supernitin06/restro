// src/modules/payment/components/TransactionList/TransactionRow.tsx
import React from 'react';
import Badge from '../ui/Badge';

const TransactionRow = ({ transaction, onSelect }) => {
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getMethodIcon = (method) => {
    switch(method.toLowerCase()) {
      case 'credit card': return '💳';
      case 'paypal': return '🔵';
      case 'bank transfer': return '🏦';
      case 'digital wallet': return '📱';
      default: return '💰';
    }
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition-colors group">
      <td className="py-4 px-4">
        <input 
          type="checkbox" 
          className="rounded border-gray-300"
          onChange={() => onSelect(transaction.id)}
        />
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center">
          <span className="mr-2">{getMethodIcon(transaction.method)}</span>
          <div>
            <div className="font-medium text-gray-900">{transaction.id}</div>
            <div className="text-sm text-gray-500">{transaction.method}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="text-gray-900 font-medium">{transaction.customer}</div>
        <div className="text-sm text-gray-500">{transaction.email}</div>
      </td>
      <td className="py-4 px-4 text-lg font-semibold text-gray-900">
        {transaction.amount}
      </td>
      <td className="py-4 px-4">
        <Badge variant={getStatusColor(transaction.status)}>
          {transaction.status}
        </Badge>
      </td>
      <td className="py-4 px-4 text-gray-600">
        {transaction.date}
      </td>
      <td className="py-4 px-4">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">
            View
          </button>
          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
            Actions
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;