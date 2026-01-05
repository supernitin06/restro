import React from "react";
import FilterBar from "../ui/UserFilters";
import { Grid, List } from 'lucide-react';
import Button from '../ui/Button';

const DeliveryPartnerSearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  statusFilter, 
  setStatusFilter,
  viewMode,
  onViewModeChange
}) => {
  return (
    <FilterBar
      search={{
        value: searchTerm,
        onChange: setSearchTerm,
        placeholder: "Search by Name, City..."
      }}
      filters={[
        {
          key: 'status',
          value: statusFilter,
          options: [
            { value: "All", label: "All Status" },
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" }
          ]
        }
      ]}
      onFilterChange={(key, val) => setStatusFilter(val)}
    >
      <div className="flex items-center gap-2">
        <Button variant={viewMode === 'grid' ? 'primary' : 'ghost'} onClick={() => onViewModeChange('grid')} className="p-2.5" title="Grid View">
          <Grid size={18} />
        </Button>
        <Button variant={viewMode === 'list' ? 'primary' : 'ghost'} onClick={() => onViewModeChange('list')} className="p-2.5" title="List View">
          <List size={18} />
        </Button>
      </div>
    </FilterBar>
  );
};

export default DeliveryPartnerSearchFilter;
