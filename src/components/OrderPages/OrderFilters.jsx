import React from "react";
import FilterBar from "../ui/UserFilters";

const OrderFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  const handleFilterChange = (key, value) => {
    if (key === 'status') setStatusFilter(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <FilterBar
      search={{
        value: searchTerm,
        onChange: setSearchTerm,
        placeholder: "Search orders..."
      }}
      filters={[
        {
          key: 'status',
          value: statusFilter,
          options: [
            { value: "all", label: "All Orders" },
            { value: "on-process", label: "Processing" },
            { value: "completed", label: "Completed" },
            { value: "cancelled", label: "Cancelled" },
          ]
        }
      ]}
      onFilterChange={handleFilterChange}
      onClear={handleClear}
    />
  );
};

export default OrderFilters;
