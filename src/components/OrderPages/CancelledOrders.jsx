import React from 'react';

const CancelledOrders = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">Cancelled Orders</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Review orders that were cancelled by customers or the restaurant.
      </p>
      {/* Add your Cancelled Orders Table or List here */}
    </div>
  );
};

export default CancelledOrders;