// src/modules/payment/pages/RefundsPage.tsx
import React from 'react';
import RefundManager from '../components/refund/RefundManager';

const RefundsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <RefundManager />
    </div>
  );
};

export default RefundsPage;