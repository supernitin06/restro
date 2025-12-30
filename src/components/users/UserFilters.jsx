import React from 'react';
import { Filter } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';
import InputField from '../ui/InputField'; // InputField component import करें

const UserFilters = ({ 
  searchTerm, 
  onSearch, 
  filters, 
  onFilterChange,
  onClearFilters 
}) => {
  return (
    <GlassCard className="p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <InputField
            name="search"
            type="text"
            placeholder="Search users by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            className="mb-0" // Margin bottom को 0 कर दें
            inputClassName="
              w-full px-4 py-3
              bg-white/10
              backdrop-blur-sm
              border border-white/20
              rounded-xl
              text-white
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500/50
              focus:border-cyan-500/50
              transition-all duration-300
            "
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/20">
            <Filter className="w-4 h-4 text-gray-300" />
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="bg-transparent text-white outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/20">
            <Filter className="w-4 h-4 text-gray-300" />
            <select
              value={filters.membership}
              onChange={(e) => onFilterChange('membership', e.target.value)}
              className="bg-transparent text-white outline-none"
            >
              <option value="all">All Memberships</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
            </select>
          </div>
          
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