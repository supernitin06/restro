import React from "react";
import FilterBar from "../ui/UserFilters";

const DeliveryPartnerSearchFilter = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <FilterBar
      search={{
        value: searchTerm,
        onChange: setSearchTerm,
        placeholder: "Search by Name, City..."
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
      onFilterChange={(key, val) => setStatusFilter(val)}
    />
  );
};

export default DeliveryPartnerSearchFilter;
