import React from "react";
import InputField from "./InputField";
import Select from "./Select";
import Button from "./Button";
import { FaFilterCircleXmark } from "react-icons/fa6";

const FiltersBar = ({
<<<<<<< HEAD
  search = {
    value: '',
    placeholder: 'Search...',
    onChange: () => {}
  },
  filters = [], // [{ key, value, options }]
  onFilterChange = () => {}
=======
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
>>>>>>> 17f62e744ade93713c6b9f8ef38cad78b23ecab8
}) => {
  return (
    <div className="mb-8 card p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between flex-nowrap">

        {/* SEARCH */}
        <div className="w-full ">
          {search ? (
            <InputField
              name="search"
              type="text"
              placeholder={search.placeholder || "Search..."}
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
<<<<<<< HEAD
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
=======
>>>>>>> 17f62e744ade93713c6b9f8ef38cad78b23ecab8
            />
          ) : filterConfig?.showSearch ? (
            <div className="text-red-500 text-sm">
              Search prop missing in parent
            </div>
          ) : null}
        </div>

        {/* FILTERS + ACTIONS */}
        <div className="flex flex-nowrap gap-3 items-center justify-end w-full lg:w-auto">

          {/* FILTER DROPDOWNS */}
          {filters.map((filter) => (
            <div
              key={filter.key}
<<<<<<< HEAD
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-300"
=======
              className="min-w-[160px] w-full sm:w-auto"
>>>>>>> 17f62e744ade93713c6b9f8ef38cad78b23ecab8
            >
              <Select
                value={filter.value}
                onChange={(e) =>
                  onFilterChange(filter.key, e.target.value)
                }
<<<<<<< HEAD
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


=======
                options={filter.options}
                icon={filter.icon}
                placeholder={filter.placeholder || filter.label}
                className="w-full"
              />
            </div>
          ))}
           {/* CLEAR FILTERS */}
          {onClear && (
            <Button
              variant="ghost"
              onClick={onClear}
              className="px-4 py-2"
            >
              <FaFilterCircleXmark />

            </Button>
          )}

          {/* CUSTOM ACTIONS */}
          {children}

         
>>>>>>> 17f62e744ade93713c6b9f8ef38cad78b23ecab8
        </div>
      </div>
    </div>
  );
};

export default React.memo(FiltersBar);
