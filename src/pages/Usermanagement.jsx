import React, { useState, useMemo } from "react";
import FiltersBar from "../components/ui/UserFilters";
import UserModal from "../components/users/UserModal";
import UserCard from "../components/users/UserCard";
import { useGetUsersQuery, useUpdateUserMutation } from "../api/services/userapi";
import { TrendingUp, TrendingDown, Grid, List } from "lucide-react";
import GradientButton from "../components/ui/GradientButton";
import StatCard from "../components/ui/StatCard";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import Pagination from "../components/ui/Pagination";


const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: "all" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const hiddenKeys = ["_id", "password", "createdAt", "updatedAt", "__v"];


  // -------------------- Hooks (always called) --------------------
  const { data, isLoading, isError } = useGetUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const [updateUser] = useUpdateUserMutation();

  // -------------------- Data processing --------------------
  const users = data?.data || [];
  const totalUsers = data?.meta?.total || 0;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (filters.status === "active") filtered = filtered.filter(u => !u.isBlocked);
    if (filters.status === "inactive") filtered = filtered.filter(u => u.isBlocked);

    if (searchTerm)
      filtered = filtered.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return filtered;
  }, [users, searchTerm, filters]);

  const activeUsers = users.filter(u => !u.isBlocked).length;
  const inactiveUsers = users.filter(u => u.isBlocked).length;

  // -------------------- Handlers --------------------
  const handleBlockToggle = (user) => {
    updateUser({
      id: user._id,
      body: { isBlocked: !user.isBlocked },
    });
  };
  
 // -------------------- Columns for Table --------------------
const columns = useMemo(() => {
  if (!filteredUsers || filteredUsers.length === 0) return [];

  return Object.keys(filteredUsers[0])


    .filter((key) => !hiddenKeys.includes(key)) // ❌ Hide unwanted keys
    .map((key) => ({
      header: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
      key,
      render: (user) => {
        if (key === "isBlocked")
          return (
            <Badge onClick={() => handleBlockToggle(user)}>
              {user.isBlocked ? "Blocked" : "Active"}
            </Badge>
          );
        if (key === "lastLogin")
          return user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "-";
        return user[key];
      },
    }));
}, [filteredUsers]);



  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ status: "all" });
    setSearchTerm("");
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
  if (page < 1 || page > totalPages) return;
  setCurrentPage(page);
};


  // -------------------- Render --------------------
  return (
    <div className="page px-6 py-8 relative">
      <div className="flex flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h1 className="highlight text-4xl font-extrabold">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Manage users and their profiles.
          </p>
        </div>
      </div>

      <div className="relative z-10">
        {isLoading && <div>Loading users...</div>}
        {isError && <div>Error fetching users</div>}

        {!isLoading && !isError && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <StatCard title="Total Users" value={totalUsers} icon={TrendingUp} color="blue" />
              <StatCard title="Active Users" value={activeUsers} icon={TrendingUp} color="green" />
              <StatCard title="Inactive Users" value={inactiveUsers} icon={TrendingDown} color="red" />
              <StatCard title="Current Page Users" value={users.length} icon={TrendingUp} color="purple" />
            </div>

            <FiltersBar
              search={{ value: searchTerm, placeholder: "Search by name...", onChange: setSearchTerm }}
              filters={[
                {
                  key: "status",
                  value: filters.status,
                  options: [
                    { label: "All", value: "all" },
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ],
                  placeholder: "Status",
                },
              ]}
              onFilterChange={handleFilterChange}
              onClear={handleClearFilters}
            >
              <div className="flex gap-1">
                <GradientButton onClick={() => setViewMode("grid")}>
                  <Grid size={16} />
                </GradientButton>
                <GradientButton onClick={() => setViewMode("table")}>
                  <List size={16} />
                </GradientButton>
              </div>
            </FiltersBar>

            {viewMode === "grid" && (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredUsers.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>

    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  </>
)}

{viewMode === "table" && (
  <>
    <Table
      data={filteredUsers}
      columns={columns}
      title="Users"
    />

   <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
  </>
)}


          </>
        )}
      </div>

      {showModal && selectedUser && (
        <UserModal user={selectedUser} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default UserManagement;
