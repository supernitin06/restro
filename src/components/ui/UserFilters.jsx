import React from 'react';
import { Filter } from 'lucide-react';
import GlassCard from './GlassCard';
import GradientButton from './GradientButton';
import InputField from './InputField';
import Select from './Select';

const FiltersBar = ({
  search = {
    value: '',
    placeholder: 'Search...',
    onChange: () => {},

    
  },
  filters = [],
  onFilterChange = () => {},
  onClear = () => {},
  children, 
}) => {
  // Common input styles for consistent appearance across light/dark mode
  const commonInputClass = `
    w-full px-4 py-3
    bg-white/10 dark:bg-gray-800/50
    border border-white/20 dark:border-gray-700
    rounded-xl
    text-gray-900 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-cyan-500/50
    focus:border-white/20 dark:focus:border-gray-500
    backdrop-blur-sm
    transition-all duration-300
    appearance-none
  `;

  return (
    <GlassCard className="p-6 mb-6 bg-white/30 dark:bg-gray-900/30 border border-white/20 dark:border-gray-700 backdrop-blur-md transition-all duration-300 rounded-3xl">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">

        {/* Search */}
        {search && (
          <div className="flex-1 w-full">
            <InputField
              name="search"
              type="text"
              placeholder={search.placeholder}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              className="mb-0"
              inputClassName={commonInputClass}
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          {filters.map((filter) => (
            <div key={filter.key} className="min-w-[180px] w-full lg:w-auto">
              <Select
                value={filter.value}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                options={filter.options}
                icon={filter.icon || Filter}
                className="w-full"
                selectClassName={commonInputClass}
                placeholder={filter.placeholder || 'Select option'}
              />
            </div>
          ))}

          {/* Clear Filters Button */}
          {onClear && (
            <GradientButton
              variant="ghost"
              onClick={onClear}
              className="px-6 py-3 h-full mt-2 lg:mt-0"
            >
              Clear Filters
            </GradientButton>
          )}
          {children && (
    <div className="ml-auto w-full lg:w-auto">
      {children}
    </div>
  )}
        </div>
      </div>
    </GlassCard>
  );
};

export default React.memo(FiltersBar);
