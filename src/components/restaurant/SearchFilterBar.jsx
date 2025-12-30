import React from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";

const SearchFilterBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onAddNew }) => {
  return (
    <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

        {/* Search Input */}
        <div className="relative w-full md:w-2/3">
          <InputField
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startIcon={<span>🔍</span>}
            className="w-full"
          />
        </div>

        {/* Status Filter & Add Button */}
        <div className="flex gap-4 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="
              flex-1 md:w-40 px-4 py-3 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              transition duration-300
            "
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Suspended">Suspended</option>
          </select>

          <Button
            onClick={onAddNew}
            className="px-6"
          >
            + Add New
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
