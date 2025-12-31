import React from "react";
import InputField from "../ui/InputField"; // adjust path as needed

const SearchFilter = ({
  searchText,
  setSearchText,
  filterStatus,
  setFilterStatus
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Replaced input with InputField */}
       <InputField
    placeholder="Search by coupon code..."
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    className="w-[220px] h-11" // custom width and height
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
  );
};

export default SearchFilter;
