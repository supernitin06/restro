import React, { useState } from "react";
import FiltersBar from "../components/ui/UserFilters";
import UserTable from "../components/ui/Table";
import UserModal from "../components/users/UserModal";
import UserCard from "../components/users/UserCard";
import { Grid, List, TrendingUp, TrendingDown } from "lucide-react";
import GradientButton from "../components/ui/GradientButton";
import StatCard from "../components/ui/StatCard";

const initialUsers = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    joinDate: "2023-01-15",
    totalOrders: 45,
    totalSpent: "₹45,200",
    loyaltyPoints: 1200,
    address: "MG Road, Bangalore",
    dietaryPreferences: ["Vegetarian"],
    favoriteItems: ["Butter Chicken"],
    status: "active",
    membership: "gold",
    lastOrder: "2024-01-10",
  },
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    joinDate: "2023-01-15",
    totalOrders: 45,
    totalSpent: "₹45,200",
    loyaltyPoints: 1200,
    address: "MG Road, Bangalore",
    dietaryPreferences: ["Vegetarian"],
    favoriteItems: ["Butter Chicken"],
    status: "active",
    membership: "gold",
    lastOrder: "2024-01-10",
  },
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    joinDate: "2023-01-15",
    totalOrders: 45,
    totalSpent: "₹45,200",
    loyaltyPoints: 1200,
    address: "MG Road, Bangalore",
    dietaryPreferences: ["Vegetarian"],
    favoriteItems: ["Butter Chicken"],
    status: "active",
    membership: "gold",
    lastOrder: "2024-01-10",
  },
  // Add more users here
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ status: "all", membership: "all" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset page on filter change
  };

  const handleClearFilters = () => {
    setFilters({ status: "all", membership: "all" });
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Filtered & searched users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        filters.status === "all" || user.status === filters.status;
      const matchesMembership =
        filters.membership === "all" || user.membership === filters.membership;

      return matchesSearch && matchesStatus && matchesMembership;
    });
  }, [users, searchTerm, filters]);

  // Stats calculations
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status === "inactive").length;

  return (
    /* ✅ FIXED BACKGROUND */
    <div className="page px-6 py-8 relative">
      {/* ✅ Header */}
      <div className="flex bg-primary flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="highlight text-4xl font-extrabold tracking-tight">
            User Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">
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
            trend="up"
            trendValue={`${totalUsers - 5} since last month`}
            color="blue"
          />
          <StatCard
            title="Active Users"
            value={activeUsers}
            icon={TrendingUp}
            trend="up"
            trendValue={`${((activeUsers / totalUsers) * 100).toFixed(0)}%`}
            color="green"
          />
          <StatCard
            title="Inactive Users"
            value={inactiveUsers}
            icon={TrendingDown}
            trend="down"
            trendValue={`${((inactiveUsers / totalUsers) * 100).toFixed(0)}%`}
            color="red"
          />
          <StatCard
            title="Total Orders"
            value={users.reduce((acc, user) => acc + user.totalOrders, 0)}
            icon={TrendingUp}
            trend="up"
            trendValue="10% since last month"
            color="purple"
          />
        </div>

        {/* Filters */}
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
            {
              key: "membership",
              value: filters.membership,
              options: [
                { label: "All", value: "all" },
                { label: "Gold", value: "gold" },
                { label: "Silver", value: "silver" },
                { label: "Bronze", value: "bronze" },
              ],
              placeholder: "Membership",
            },
          ]}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
        >
          {/* 👇 Inject ANY component here */}
          <div className="flex gap-1">
            <GradientButton onClick={() => setViewMode("grid")}>
              <Grid size={16} />
            </GradientButton>
            <GradientButton onClick={() => setViewMode("table")}>
              <List size={16} />
            </GradientButton>
          </div>
        </FiltersBar>

        {/* View Toggle */}

        {/* Users */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <StatCard users={filteredUsers} />
        )}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-16 text-muted">No users found</div>
        )}
      </div>

      {/* User Modal */}
      {showModal && selectedUser && (
        <UserModal user={selectedUser} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default UserManagement;
