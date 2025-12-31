// src/admin/payments/pages/TransactionDetails.jsx
import React from 'react';
import Badge from '../../components/ui/Badge';

const TransactionDetails = ({ transaction, onBack }) => {
  if (!transaction) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">No transaction selected</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Transactions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-2"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Transactions
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Transaction Details</h1>
          <p className="text-gray-600">ID: {transaction.id}</p>
        </div>
        <Badge status={transaction.status} />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Transaction Information</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Transaction ID</label>
                <p className="mt-1 text-gray-900 font-medium">{transaction.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Customer Name</label>
                <p className="mt-1 text-gray-900">{transaction.customerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Customer Email</label>
                <p className="mt-1 text-gray-900">{transaction.customerEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Amount</label>
                <p className="mt-1 text-gray-900 text-xl font-bold">${transaction.amount.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Payment Method</label>
                <p className="mt-1 text-gray-900 capitalize">{transaction.paymentMethod.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <div className="mt-1">
                  <PaymentStatusBadge status={transaction.status} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Date</label>
                <p className="mt-1 text-gray-900">{transaction.date}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Currency</label>
                <p className="mt-1 text-gray-900">{transaction.currency}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
            <p className="text-gray-900 bg-gray-50 p-4 rounded-md">{transaction.description}</p>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Download Receipt
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Send Email
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                Refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;