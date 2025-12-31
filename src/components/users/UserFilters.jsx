import React from 'react';
import { Filter } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';
import InputField from '../ui/InputField';
import Select from '../ui/Select';

const UserFilters = ({
  searchTerm,
  onSearch,
  filters,
  onFilterChange,
  onClearFilters
}) => {
  return (
    <div className="
      p-6 mb-6
      card
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
          <div className="w-48">
            <Select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              options={[
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" }
              ]}
              icon={Filter}
              className="w-full"
            />
          </div>

          {/* Membership */}
          <div className="w-48">
            <Select
              value={filters.membership}
              onChange={(e) => onFilterChange('membership', e.target.value)}
              options={[
                { value: "all", label: "All Memberships" },
                { value: "gold", label: "Gold" },
                { value: "silver", label: "Silver" },
                { value: "bronze", label: "Bronze" }
              ]}
              icon={Filter}
              className="w-full"
            />
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
    </div>
  );
};

export default UserFilters;
