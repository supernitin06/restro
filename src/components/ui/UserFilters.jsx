import React from "react";
import InputField from "./InputField";
import Select from "./Select";
import Button from "./Button";

const FiltersBar = ({
  // Search config
  search,

  // Filters
  filters = [],
  onFilterChange,

  // Actions
  onClear,
  children,

  // Backward compatibility (optional)
  filterConfig,
}) => {
  return (
    <div className="mb-8 card p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

        {/* SEARCH */}
        <div className="w-full lg:w-1/3">
          {search ? (
            <InputField
              name="search"
              type="text"
              placeholder={search.placeholder || "Search..."}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
            />
          ) : filterConfig?.showSearch ? (
            <div className="text-red-500 text-sm">
              Search prop missing in parent
            </div>
          ) : null}
        </div>

        {/* FILTERS + ACTIONS */}
        <div className="flex flex-wrap gap-3 items-center justify-end w-full lg:w-auto">

          {/* FILTER DROPDOWNS */}
          {filters.map((filter) => (
            <div
              key={filter.key}
              className="min-w-[160px] w-full sm:w-auto"
            >
              <Select
                value={filter.value}
                onChange={(e) =>
                  onFilterChange(filter.key, e.target.value)
                }
                options={filter.options}
                icon={filter.icon}
                placeholder={filter.placeholder || filter.label}
                className="w-full"
              />
            </div>
          ))}

          {/* CUSTOM ACTIONS */}
          {children}

          {/* CLEAR FILTERS */}
          {onClear && (
            <Button
              variant="ghost"
              onClick={onClear}
              className="px-4 py-2"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FiltersBar);
