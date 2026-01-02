import React from 'react';
import InputField from '../ui/InputField';

const SearchFilter = ({
  searchText, setSearchText,
  filterStatus, setFilterStatus,
  filterPriority, setFilterPriority
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <InputField
        placeholder="Search by ticket ID, subject, customer..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full sm:w-96"
      />

      
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="select select-bordered w-full sm:max-w-[180px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
      >
        <option value="">All Status</option>
        <option value="open">Open</option>
        <option value="pending">Pending</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>

      {/* Priority Dropdown - same treatment */}
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
        className="select select-bordered w-full sm:max-w-[180px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
      >
        <option value="">All Priority</option>
        <option value="urgent">Urgent</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
};

export default SearchFilter;