import React from 'react';
import FilterBar from '../ui/UserFilters';
import Button from '../ui/Button';

const SearchFilterBar = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
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
      >
      {/* Add New Button passed as child */}
      <Button onClick={() => navigate('/restaurant-management/add')} className="px-6 whitespace-nowrap">
        + Add New
      </Button> 
    </FilterBar>
  );
};

export default SearchFilterBar;
