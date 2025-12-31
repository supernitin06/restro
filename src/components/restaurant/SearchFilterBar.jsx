import React from "react";
import InputField from "../ui/InputField";
import Select from "../ui/Select";
import Button from "../ui/Button";

const SearchFilterBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onAddNew }) => {
  return (
    <div className="mb-8 card p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

        {/* Search Input */}
        <div className="relative w-full md:w-2/3">
          <InputField
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Status Filter & Add Button */}
        <div className="flex gap-4 w-full md:w-auto">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "All", label: "All Status" },
              { value: "Active", label: "Active" },
              { value: "Deactive", label: "Deactive" }
            ]}
            className="flex-1 md:w-40"
          />

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
