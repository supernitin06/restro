import React, { useState } from 'react';
import StatsGrid from '../components/ui/UserStats';
import FiltersBar from '../components/ui/UserFilters';
import UserTable from '../components/ui/Table';
import UserModal from '../components/users/UserModal';
import Pagination from '../components/ui/Pagination';
import UserCard from '../components/users/UserCard';
import { Grid, List, Eye, Edit2, Trash2 } from 'lucide-react';
import GradientButton from '../components/ui/GradientButton';

// Initial user data
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
    dietaryPreferences: ["Vegetarian", "No Gluten"],
    favoriteItems: ["Butter Chicken", "Garlic Naan"],
    status: "active",
    membership: "gold",
    lastOrder: "2024-01-10",
  },
  // ... add more users here
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', membership: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // User actions for table
  const userActions = [
    {
      key: 'view',
      label: 'View',
      icon: Eye,
      color: 'cyan',
      onClick: (user) => {
        setSelectedUser(user);
        setShowModal(true);
      }
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: Edit2,
      color: 'emerald',
      onClick: (user) => handleEditUser(user)
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: Trash2,
      color: 'rose',
      onClick: (user) => handleDeleteUser(user.id)
    }
  ];

  // Dynamically create stats array
  const statsArray = [
    {
      title: 'Total Users',
      value: users.length,
      trend: 'up',
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Active Users',
      value: users.filter(u => u.status === 'active').length,
      trend: 'up',
      gradient: 'from-emerald-500 to-emerald-700'
    },
    {
      title: 'Premium Users',
      value: users.filter(u => u.membership === 'gold').length,
      trend: 'up',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Total Orders',
      value: users.reduce((sum, u) => sum + u.totalOrders, 0),
      trend: 'up',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || user.status === filters.status;
    const matchesMembership = filters.membership === 'all' || user.membership === filters.membership;
    return matchesSearch && matchesStatus && matchesMembership;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handlers
  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: "New Customer",
      email: "new@example.com",
      phone: "+91 00000 00000",
      joinDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      totalSpent: "₹0",
      loyaltyPoints: 0,
      address: "Add address",
      dietaryPreferences: [],
      favoriteItems: [],
      status: "active",
      membership: "bronze",
      lastOrder: "No orders yet"
    };
    setUsers([newUser, ...users]);
  };

  const handleDeleteUser = (userId) => setUsers(users.filter(user => user.id !== userId));
  const handleEditUser = (user) => alert(`Edit ${user.name} - This would open an edit form`);
  const handleToggleStatus = (userId) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };
  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({ status: 'all', membership: 'all' });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-6 lg:p-8">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Stats */}
        <StatsGrid stats={statsArray} />

        {/* Filters */}
        <FiltersBar
          search={{
            value: searchTerm,
            placeholder: 'Search users by name, email, or phone...',
            onChange: (value) => { setSearchTerm(value); setCurrentPage(1); }
          }}
          filters={[
            {
              key: 'status',
              value: filters.status,
              options: [
                { label: 'All Status', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' }
              ]
            },
            {
              key: 'membership',
              value: filters.membership,
              options: [
                { label: 'All Memberships', value: 'all' },
                { label: 'Gold', value: 'gold' },
                { label: 'Silver', value: 'silver' },
                { label: 'Bronze', value: 'bronze' }
              ]
            }
          ]}
          onFilterChange={(key, value) => { setFilters(prev => ({ ...prev, [key]: value })); setCurrentPage(1); }}
          onClear={handleClearFilters}
        />

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-300">Showing {filteredUsers.length} customers</div>
          <div className="flex gap-2">
            <GradientButton
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              className="px-4"
            >
              <Grid className="w-4 h-4" /> Grid
            </GradientButton>
            <GradientButton
              onClick={() => setViewMode('table')}
              variant={viewMode === 'table' ? 'primary' : 'ghost'}
              className="px-4"
            >
              <List className="w-4 h-4" /> Table
            </GradientButton>
          </div>
        </div>

        {/* Users */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onView={(user) => { setSelectedUser(user); setShowModal(true); }}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        ) : (
          <UserTable
            users={currentUsers}
            actions={userActions}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {/* Pagination */}
        {filteredUsers.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-white mb-2">No customers found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
            <GradientButton onClick={handleClearFilters} variant="primary">
              Clear All Filters
            </GradientButton>
          </div>
        )}
      </div>

      {/* User Modal */}
      {showModal && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default UserManagement;
