import React from "react";
<<<<<<< HEAD
import InputField from "../ui/InputField"; 
=======
import FilterBar from "../ui/UserFilters";
>>>>>>> 17f62e744ade93713c6b9f8ef38cad78b23ecab8

const SearchFilter = ({
  searchText,
  setSearchText,
  filterStatus,
  setFilterStatus
}) => {
  return (
<<<<<<< HEAD
    <div className="flex flex-col sm:flex-row gap-4">
      
       <InputField
    placeholder="Search by coupon code..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    className="w-[220px] h-11" 
  />

     <select
  value={filterStatus}
  onChange={(e) => setFilterStatus(e.target.value)}
  className="select select-bordered w-full sm:max-w-[150px]"
>
  <option value="">All Status</option>
  <option value="active">Active</option>
  <option value="inactive">Inactive</option>
  <option value="expired">Expired</option>
</select>
    </div>
=======
    <FilterBar
      search={{
        value: searchText,
        onChange: setSearchText,
        placeholder: "Search by coupon code..."
      }}
      filters={[
        {
          key: 'status',
          value: filterStatus,
          options: [
            { value: "", label: "All Status" },
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
            { value: "expired", label: "Expired" }
          ]
        }
      ]}
      onFilterChange={(key, val) => setFilterStatus(val)}
    />
>>>>>>> 17f62e744ade93713c6b9f8ef38cad78b23ecab8
  );
};

export default SearchFilter;
