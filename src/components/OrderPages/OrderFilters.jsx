import React from 'react';
import InputField from '../ui/InputField';
import { Search, X, Grid, List, Filter } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const OrderFilters = ({ searchTerm, onSearch, filters, onFilterChange, onClearFilters, viewMode, onViewModeChange }) => {
  const hasActiveFilters = searchTerm !== '' || filters.status !== 'all';

  return (
      <div className="mb-8 card p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

        {/* Label */}
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-bold shrink-0">
          <Filter size={20} />
          <span>Filters & Search</span>
        </div>

        {/* Search Field */}
        <div className="w-full lg:w-72">
          <InputField
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            startIcon={<Search size={16} />}
          />
        </div>

        {/* Spacer */}
        <div className="hidden lg:block flex-1"></div>

        {/* Right Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="w-full lg:w-48">
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 outline-none text-sm font-medium shadow-sm transition-all h-[52px]"
            >
              <option value="all">All Statuses</option>
              <option value="on-process">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700/50 p-1.5 rounded-xl shrink-0 h-[52px]">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`h-full aspect-square flex items-center justify-center rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
              title="Grid View"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`h-full aspect-square flex items-center justify-center rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
              title="List View"
            >
              <List size={20} />
            </button>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="h-[52px] w-[52px] flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-xl transition-colors shrink-0 border-2 border-transparent"
              title="Clear Filters"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderFilters;