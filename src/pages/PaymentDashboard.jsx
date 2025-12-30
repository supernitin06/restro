// src/modules/payment/pages/PaymentDashboardPage.tsx
import React from 'react';
import PaymentDashboard from '../components/paymentdashboard/PaymentDashboard';

const PaymentDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <PaymentDashboard />
    </div>
  );
};

export default PaymentDashboardPage;