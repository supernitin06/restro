import React, { useState, useMemo } from "react";
import FiltersBar from "../components/ui/UserFilters";
import UserModal from "../components/users/UserModal";
import UserCard from "../components/users/UserCard";

import {
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../api/services/userapi";

import {
  TrendingUp,
  TrendingDown,
  Grid,
  List,
} from "lucide-react";

import GradientButton from "../components/ui/GradientButton";
import StatCard from "../components/ui/StatCard";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";

const UserManagement = () => {

    const { data, isLoading, isError } = useGetUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  console.log("khusboo ka data",data);
  const [updateUser] = useUpdateUserMutation(); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: "all", membership: "all" });

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);



  const users = data?.data || [];
  const totalUsers = data?.meta?.total || 0;

  

  if (isLoading) return <div>Loading users...</div>;
  if (isError) return <div>Error fetching users</div>;

  // ✅ toggle block/unblock
  const handleBlockToggle = (user) => {
    updateUser({
      id: user._id,
      body: { isBlocked: !user.isBlocked },
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ status: "all", membership: "all" });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const activeUsers = users.filter((u) => !u.isBlocked).length;
  const inactiveUsers = users.filter((u) => u.isBlocked).length;

  return (
    <div className="page px-6 py-8 relative">
      <div className="flex flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h1 className="highlight text-4xl font-extrabold">
            User Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">
            Manage users and their profiles.
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={TrendingUp}
            color="blue"
          />
          <StatCard
            title="Active Users"
            value={activeUsers}
            icon={TrendingUp}
            color="green"
          />
          <StatCard
            title="Inactive Users"
            value={inactiveUsers}
            icon={TrendingDown}
            color="red"
          />
          <StatCard
            title="Current Page Users"
            value={users.length}
            icon={TrendingUp}
            color="purple"
          />
        </div>

        <FiltersBar
          search={{
            value: searchTerm,
            placeholder: "Search by name...",
            onChange: setSearchTerm,
          }}
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

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <Table
            data={filteredUsers}
            columns={[
              { header: "Name", key: "name" },
              { header: "Email", key: "email" },
              { header: "Phone", key: "mobile" },
              {
                header: "Status",
                render: (user) => (
                  <Badge onClick={() => handleBlockToggle(user)}>
                    {user.isBlocked ? "Blocked" : "Active"}
                  </Badge>
                ),
              },
              {
                header: "Last Login",
                render: (user) =>
                  user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "-",
              },
            ]}
            title="Users"
          />
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-16 text-muted">
            No users found
          </div>
        )}
      </div>

      {showModal && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default UserManagement;
