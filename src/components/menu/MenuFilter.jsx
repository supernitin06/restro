import React from "react";
import { LayoutGrid, List } from "lucide-react";
import FiltersBar from "../ui/UserFilters";

const MenuFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  viewType,
  setViewType,
}) => {
  const search = {
    value: searchTerm,
    placeholder: "Search menu items...",
    onChange: setSearchTerm,
  };

  const filters = [
    {
      key: "status",
      value: statusFilter,
      options: [
        { value: "all", label: "All" },
        { value: "available", label: "Available" },
        { value: "unavailable", label: "Unavailable" },
        { value: "bestseller", label: "Bestseller" },
      ],
    },
  ];

  const handleFilterChange = (key, value) => {
    if (key === "status") setStatusFilter(value);
  };

  return (
    <FiltersBar
      search={search}
      filters={filters}
      onFilterChange={handleFilterChange}
    >
      {/* View Toggle */}
      <div className="flex border rounded-lg overflow-hidden">
        <button
          onClick={() => setViewType("list")}
          className={`p-2 ${
            viewType === "list"
              ? "bg-emerald-500 text-white"
              : "bg-white text-gray-600"
          }`}
          title="List View"
        >
          <List size={18} />
        </button>

        <button
          onClick={() => setViewType("grid")}
          className={`p-2 ${
            viewType === "grid"
              ? "bg-emerald-500 text-white"
              : "bg-white text-gray-600"
          }`}
          title="Grid View"
        >
          <LayoutGrid size={18} />
        </button>
      </div>
    </FiltersBar>
  );
};

export default MenuFilters;
