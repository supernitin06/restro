import React from 'react';
import { Filter } from 'lucide-react';
import GlassCard from './GlassCard';
import GradientButton from './GradientButton';
import InputField from './InputField';

const FiltersBar = ({
  search = {
    value: '',
    placeholder: 'Search...',
    onChange: () => {}
  },
  filters = [], // [{ key, value, options }]
  onFilterChange = () => {}
}) => {
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
              inputClassName="
                w-full px-4 py-3
                bg-white
                border border-gray-300
                rounded-xl
                text-gray-900
                placeholder-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500/50
                transition-all duration-300
              "
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <div
              key={filter.key}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-300"
            >
              <Filter className="w-4 h-4 text-gray-300" />
              <select
                value={filter.value}
                onChange={(e) =>
                  onFilterChange(filter.key, e.target.value)
                }
                className="bg-transparent text-gray-900 outline-none"
              >
                {filter.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}


        </div>
      </div>
    </GlassCard>
  );
};

export default React.memo(FiltersBar);
