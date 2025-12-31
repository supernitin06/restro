import React from "react";
import InputField from "../ui/InputField"; // path adjust karo as per folder structure
import { FaSearch } from "react-icons/fa";

const DeliveryPartnerSearchFilter = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        <InputField
          type="text"
          placeholder="Search by Name, City..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startIcon={<FaSearch />}
          className="w-full md:w-2/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            w-full md:w-1/3 px-4 py-3 rounded-lg border border-gray-300
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition duration-300
          "
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Deactive">Deactive</option>
        </select>
      </div>
    </div>
  );
};

export default DeliveryPartnerSearchFilter;
