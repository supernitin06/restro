import React from 'react';
import FiltersBar from '../ui/UserFilters';
 
const MenuFilters = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  const search = {
    value: searchTerm,
    placeholder: 'Search menu items...',
    onChange: setSearchTerm
  };
 
  const filters = [
    {
      key: 'status',
      value: statusFilter,
      options: [
        { value: 'all', label: 'All' },
        { value: 'available', label: 'Available' },
        { value: 'unavailable', label: 'Unavailable' },
        { value: 'bestseller', label: 'Bestseller' }
      ]
    }
  ];
 
  const handleFilterChange = (key, value) => {
    if (key === 'status') {
      setStatusFilter(value);
    }
  };
 
  return (
    <FiltersBar
      search={search}
      filters={filters}
      onFilterChange={handleFilterChange}
    />
  );
};
 
export default MenuFilters;