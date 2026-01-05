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

  const handleFilterChange = (key, value) => {
    if (key === 'status') {
      setStatusFilter(value);
    }
  };

  return (
    <FilterBar
      search={{
        value: searchTerm,
        onChange: setSearchTerm,
        placeholder: "Search restaurants..."
      }}
      filters={[
        {
          key: 'status',
          value: statusFilter,
          options: [
            { value: "All", label: "All Status" },
            { value: "Active", label: "Active" },
            { value: "Deactive", label: "Deactive" }
          ]
        }
      ]}
      >
      {/* Add New Button passed as child */}
      <Button onClick={onAddNew} className="px-6 whitespace-nowrap">
        + Add New
      </Button>
    </FilterBar>
  );
};

export default SearchFilterBar;