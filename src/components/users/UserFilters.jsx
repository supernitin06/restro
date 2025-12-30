import React from 'react';
import { Filter } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';
import InputField from '../ui/InputField';

const UserFilters = ({ 
  searchTerm, 
  onSearch, 
  filters, 
  onFilterChange,
  onClearFilters 
}) => {
  return (
    <GlassCard className="
      p-6 mb-6
      bg-white dark:bg-white/10
      border border-gray-200 dark:border-white/20
    ">
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* Search */}
        <div className="flex-1">
          <InputField
            name="search"
            type="text"
            placeholder="Search users by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="mb-0"
            inputClassName="
              w-full px-4 py-3 rounded-xl
              bg-gray-100 dark:bg-white/10
              border border-gray-300 dark:border-white/20
              text-gray-800 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/50
              focus:border-cyan-500/50
              transition-all duration-300
            "
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          
          {/* Status */}
          <div className="
            flex items-center gap-2 px-4 py-2 rounded-xl
            bg-gray-100 dark:bg-white/10
            border border-gray-300 dark:border-white/20
          ">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="
                bg-transparent outline-none
                text-gray-800 dark:text-white
              "
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Membership */}
          <div className="
            flex items-center gap-2 px-4 py-2 rounded-xl
            bg-gray-100 dark:bg-white/10
            border border-gray-300 dark:border-white/20
          ">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <select
              value={filters.membership}
              onChange={(e) => onFilterChange('membership', e.target.value)}
              className="
                bg-transparent outline-none
                text-gray-800 dark:text-white
              "
            >
              <option value="all">All Memberships</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>

          {/* Clear */}
          <GradientButton 
            onClick={onClearFilters}
            variant="ghost"
          >
            Clear Filters
          </GradientButton>
        </div>
      </div>
    </GlassCard>
  );
};

export default UserFilters;
