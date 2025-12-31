import React from "react";
import InputField from "../ui/InputField"; // path adjust karo as per folder structure
import Select from "../ui/Select";
import { FaSearch } from "react-icons/fa";

const DeliveryPartnerSearchFilter = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) => {
  return (
    <div className="mb-8 card ">
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        <InputField
          type="text"
          placeholder="Search by Name, City..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-2/3"
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: "All", label: "All Status" },
            { value: "Active", label: "Active" },
            { value: "Deactive", label: "Deactive" }
          ]}
          className="w-full md:w-1/3"
        />
      </div>
    </div>
  );
};

export default DeliveryPartnerSearchFilter;
