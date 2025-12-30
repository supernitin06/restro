// src/modules/payment/pages/TransactionsPage.tsx
import React from 'react';
import TransactionList from '../components/Transactions/TransactionList';

const TransactionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <TransactionList />
    </div>
  );
};

export default TransactionsPage;