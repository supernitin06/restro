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
    onChange: () => { }
  },
  filters = [], // [{ key, value, options, icon }]
  onFilterChange = () => { },
  onClear = () => { }
}) => {

  // Shared style for consistency across all filter inputs
  const commonInputClass = `
    w-full px-4 py-3
    !bg-white/10 backdrop-blur-sm
    !border !border-white/20
    rounded-xl
    !text-white
    placeholder-gray-400
    focus:outline-none focus:!ring-2 focus:!ring-cyan-500/50 focus:!border-white/20
    transition-all duration-300
    !appearance-none
  `;

  return (
    <GlassCard className="p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Search */}
        {search && (
          <div className="flex-1">
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
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <div key={filter.key} className="min-w-[180px]">
              <Select
                value={filter.value}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                options={filter.options}
                icon={filter.icon || Filter}
                className="w-full"
                selectClassName={commonInputClass}
                placeholder={filter.placeholder || "Select option"}
              />
            </div>
          ))}

          {/* Clear */}
          {onClear && (
            <GradientButton variant="ghost" onClick={onClear} className="px-6 py-3 h-full">
              Clear Filters
            </GradientButton>
          )}
        </div>
      </div>
    </GlassCard>
  );
};

export default React.memo(FiltersBar);
