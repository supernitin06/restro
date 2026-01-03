import React, { useMemo } from 'react';
import { Search, X } from 'lucide-react';
import InputField from './InputField';
import Select from './Select';
import Button from './Button';

const FiltersBar = ({
  // Option 1: Direct Props
  search,
  filters: propFilters = [],
  onFilterChange,
  onClear,
  children,

  // Option 2: Config Helper (kept for backward compatibility logic if any)
  filterConfig
}) => {

  // Normalize props logic (simplified for readability)
  // Assuming propFilters is the primary source of truth as refactored previously.
  const filters = propFilters;

  return (
    <div className="mb-8 card p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

        {/* Search Input */}
        <div className="relative w-full md:w-2/3">
          {search ? (
            <InputField
              name="search"
              type="text"
              placeholder={search.placeholder || "Search..."}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              className="w-full"
            />
          ) : filterConfig?.showSearch ? (
            // Fallback for config usage if needed (though we prefer search prop)
            <div className="text-red-500 text-sm">Search prop missing in parent component</div>
          ) : null}
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap gap-4 w-full md:w-auto items-center justify-end">

          {filters.map((filter) => (
            <div key={filter.key} className="flex-1 md:w-40 min-w-[140px]">
              <Select
                value={filter.value}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                options={filter.options}
                icon={filter.icon}
                placeholder={filter.label || filter.placeholder}
                className="w-full"
              />
            </div>
          ))}

          {/* Custom Actions/Buttons */}
          {children}


        </div>
      </div>
    </div>
  );
};

export default React.memo(FiltersBar);
