import React, { useState } from 'react';
import FiltersBar from '../components/ui/UserFilters';
import UserTable from '../components/ui/Table';
import UserModal from '../components/users/UserModal';
import Pagination from '../components/ui/Pagination';
import UserCard from '../components/users/UserCard';
import { Grid, List, Eye, Edit2, Trash2 } from 'lucide-react';
import GradientButton from '../components/ui/GradientButton';
import Button from '../components/ui/Button';

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
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', membership: 'all' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    /* ✅ FIXED BACKGROUND */
    <div className="page px-6 py-8 relative">

      {/* ✅ Header */}
      <div className="flex bg-primary flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="highlight text-4xl font-extrabold tracking-tight">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">
            Manage users and their profiles.
          </p>
        </div>
      </div>

      {/* ✅ Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">

        {/* View Toggle */}
        <div className="flex justify-end gap-2 my-6">
          <GradientButton onClick={() => setViewMode('grid')}>
            <Grid size={16} /> Grid
          </GradientButton>
          <GradientButton onClick={() => setViewMode('table')}>
            <List size={16} /> Table
          </GradientButton>
        </div>

        {/* Users */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <StatCard users={filteredUsers} />
        )}

        {/* Empty */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-16 text-muted">
            No users found
          </div>
        )}
      </div>

      {showModal && selectedUser && (
        <UserModal user={selectedUser} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default UserManagement;
