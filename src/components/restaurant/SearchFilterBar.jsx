import React from "react";

const SearchFilterBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onAddNew }) => {
  return (
    <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              transition duration-300 placeholder-gray-400
            "
          />
          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
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
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>

          <button
            onClick={onAddNew}
            className="
              px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700
              transition duration-300 font-semibold
            "
          >
            + Add New
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
