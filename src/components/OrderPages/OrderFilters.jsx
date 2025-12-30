import React from 'react';
import InputField from '../ui/InputField';
import { Search, X } from 'lucide-react';
import GradientButton from '../ui/GradientButton';

const OrderFilters = ({
  searchTerm,
  onSearch,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl shadow-md mb-8 backdrop-blur-sm border border-white/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Search */}
        <div className="md:col-span-2">
          <InputField
            label="Search Orders"
            placeholder="Search by customer or order ID..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            startIcon={<Search size={18} />}
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Status</label>
          <select name="status" value={filters.status} onChange={(e) => onFilterChange('status', e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:bg-gray-900 dark:border-gray-700 focus:border-blue-600 outline-none transition-all">
            <option value="all">All Statuses</option>
            <option value="on-process">On Process</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Clear Button */}
        <div>
          <GradientButton onClick={onClearFilters} variant="danger" className="w-full">
            <X size={18} className="mr-1" />
            Clear Filters
          </GradientButton>
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;