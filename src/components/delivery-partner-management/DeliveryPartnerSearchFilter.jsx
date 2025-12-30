import React from "react";
import InputField from "../ui/InputField"; // path adjust karo as per folder structure
import { FaSearch } from "react-icons/fa";

const DeliveryPartnerSearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        <InputField
          type="text"
          placeholder="Search by Name, City..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          startIcon={<FaSearch />}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DeliveryPartnerSearchFilter;
