import React from 'react';

const PendingOrders = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Pending Orders Queue</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Manage incoming orders that need acceptance or preparation here.
      </p>
      {/* Add your Pending Orders Table or List here */}
    </div>
  );
};

export default PendingOrders;