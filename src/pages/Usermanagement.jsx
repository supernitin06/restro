import React, { useState } from 'react';
import StatsGrid from '../components/ui/UserStats';
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
    <div className="page-background px-6 py-8 relative">

      {/* ✅ Header */}
      <div className="bg-primary rounded-3xl p-8 mb-8 shadow-lg border border-default">
        <h1 className="text-3xl font-bold text-white">
          User Management
        </h1>
        <p className="text-white/70 mt-2">
          Manage users and their details
        </p>
      </div>

      {/* ✅ Glow Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">

        {/* Stats */}
        <StatsGrid stats={[
          { title: 'Total Users', value: users.length },
          { title: 'Active Users', value: users.length },
        ]} />

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
          <UserTable users={filteredUsers} />
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
