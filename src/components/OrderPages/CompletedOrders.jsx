import React from 'react';

const CompletedOrders = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Order History</h2>
      <p className="text-gray-600 dark:text-gray-400">
        View details of all successfully delivered orders.
      </p>
      {/* Add your Completed Orders Table or List here */}
    </div>
  );
};

export default CompletedOrders;