import React, { useState } from "react";
import FiltersBar from "../components/ui/UserFilters";
import UserModal from "../components/users/UserModal";
import UserCard from "../components/users/UserCard";
import { useMemo } from "react";
import {
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  Grid,
  List
} from 'lucide-react';
import GradientButton from "../components/ui/GradientButton";
import StatCard from "../components/ui/StatCard";
import Table from "../components/ui/Table";
import Badge from "../components/ui/Badge";
import { User, Mail, Phone, ShoppingBag, CheckCircle, Clock, AlertCircle } from "lucide-react";


  const invoiceActions = [
    {
      key: 'view',
      label: 'View Invoice',
      icon: Eye,
      onClick: (invoice) => {
        handleViewInvoice(invoice);
      },
      color: 'blue',
      show: true
    },

    {
      key: 'edit',
      label: 'Edit',
      icon: Edit,
      onClick: (invoice) => {
        setSelectedInvoice(invoice);
        setModalMode('edit');
        setModalOpen(true);
      },
      color: 'yellow',
      show: true
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: Trash2,
      onClick: (invoice) => {
        handleDeleteInvoice(invoice.id);
      },
      color: 'rose',
      show: true
    }
  ];

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
          <Table
            data={filteredUsers}
            columns={[
              {
                header: "Customer",
                key: "customer",
                render: (user) => (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg highlight-bg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                      {user.invoice && (
                        <p className="text-xs text-gray-500">#{user.invoice}</p>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                header: "Contact",
                key: "contact",
                render: (user) => (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-blue-500" />
                      {user.email}
                    </div>
                    {user.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Phone className="w-4 h-4 text-green-500" />
                        {user.phone}
                      </div>
                    )}
                  </div>
                ),
              },
              {
                header: "Membership",
                key: "membership",
                render: (user) => <Badge>{user.membership}</Badge>,
              },
              {
                header: "Stats",
                key: "stats",
                render: (user) => (
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-pink-600" />
                    <span className="font-medium">{user.totalOrders || 0} orders</span>
                  </div>
                ),
              },
              {
                header: "Status",
                key: "status",
                render: (user) => {
                  const getStatusIcon = (status) => {
                    switch (status?.toLowerCase()) {
                      case "active":
                        return <CheckCircle className="w-4 h-4 text-green-500" />;
                      case "inactive":
                        return <AlertCircle className="w-4 h-4 text-red-500" />;
                      case "pending":
                        return <Clock className="w-4 h-4 text-yellow-500" />;
                      default:
                        return <User className="w-4 h-4 text-gray-400" />;
                    }
                  };
                  return (
                    <div className="flex items-center gap-2">
                      {getStatusIcon(user.status)}
                      <Badge>{user.status}</Badge>
                    </div>
                  );
                },
              },
            ]}
            actions={invoiceActions}
            title="Customers"
          />
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
