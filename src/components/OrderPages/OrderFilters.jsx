import React from "react";
import InputField from "../ui/InputField";
import Select from "../ui/Select";
import { Search, X, Filter } from "lucide-react";
import Button from "../ui/Button";

const OrderFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  const hasActiveFilters = searchTerm !== "" || statusFilter !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return (
    <div className="mb-8 card ">
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">

        {/* Search */}
          <InputField
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            startIcon={<Search size={16} />}
          />

     
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "All Orders" },
                { value: "on-process", label: "Processing" },
                { value: "completed", label: "Completed" },
                { value: "cancelled", label: "Cancelled" },
              ]}
            />

          {hasActiveFilters && (
            <Button
              onClick={clearFilters}
              title="Clear Filters"
              className="h-[52px] w-[52px] flex items-center justify-center
                bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-xl transition-colors shrink-0"
            >
              <X size={20} />
            </Button>
          )}
        </div>
    </div>
  );
};

export default OrderFilters;
