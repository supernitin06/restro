import React from 'react';
import FilterBar from '../ui/UserFilters';
import Button from '../ui/Button';

const SearchFilterBar = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onAddNew
}) => {

  // called when filter select changes
  const handleFilterChange = (key, value) => {
    if (key === 'status') {
      setStatusFilter(value);
    }
  };

  return (
    <FilterBar
       search={{
    value: searchTerm,
    onChange: setSearchTerm, // ✅ just pass setter
    placeholder: "Search restaurants..."
  }}
      filters={[
        {
          key: 'status',
          value: statusFilter,
          options: [
            { value: "All", label: "All Status" },
            { value: "Approved", label: "Approved" },
            { value: "Suspended", label: "Suspended" }
          ]
        }
      ]}
      onFilterChange={handleFilterChange}
    >
      {/* <Button onClick={onAddNew} className="px-6 whitespace-nowrap">
        + Add New
      </Button> */}
    </FilterBar>
  );
};

export default SearchFilterBar;
