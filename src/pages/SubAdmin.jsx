// pages/SubAdmin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Shield,
  Users,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import Button from '../components/ui/Button';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/GlassCard';
import Input from '../components/ui/InputField';
// import PageHeader from '../components/ui/PageHeader';
import ActionButtons from '../components/ui/UserAction';
import Select from '../components/ui/Select';
import UserTable from '../components/ui/Table';

const SubAdmin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample sub-admin data
  const [subAdmins, setSubAdmins] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@swaad.com',
      phone: '+91 98765 43210',
      role: 'Senior Admin',
      status: 'active',
      permissions: ['View Orders', 'Manage Users', 'Manage Restaurants', 'View Reports'],
      createdAt: '15 Jan 2024',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@swaad.com',
      phone: '+91 98765 43211',
      role: 'Support Admin',
      status: 'active',
      permissions: ['View Orders', 'Handle Refunds', 'View Users'],
      createdAt: '20 Jan 2024',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Amit Verma',
      email: 'amit@swaad.com',
      phone: '+91 98765 43212',
      role: 'Order Manager',
      status: 'inactive',
      permissions: ['View Orders', 'Assign Delivery', 'Mark Delivered'],
      createdAt: '10 Feb 2024',
      lastActive: '5 days ago'
    },
    {
      id: 4,
      name: 'Sunita Singh',
      email: 'sunita@swaad.com',
      phone: '+91 98765 43213',
      role: 'Financial Admin',
      status: 'active',
      permissions: ['View Payments', 'Handle Refunds', 'View Reports'],
      createdAt: '01 Mar 2024',
      lastActive: '8 hours ago'
    },
    {
      id: 5,
      name: 'Vikram Rathore',
      email: 'vikram@swaad.com',
      phone: '+91 98765 43214',
      role: 'Restaurant Manager',
      status: 'inactive',
      permissions: ['View Restaurants', 'Manage Restaurants', 'Edit Commission'],
      createdAt: '15 Mar 2024',
      lastActive: '1 week ago'
    },
    {
      id: 6,
      name: 'Anjali Desai',
      email: 'anjali@swaad.com',
      phone: '+91 98765 43215',
      role: 'Support Admin',
      status: 'active',
      permissions: ['View Orders', 'Handle Refunds'],
      createdAt: '22 Mar 2024',
      lastActive: '30 minutes ago'
    }
  ]);

  const stats = [
    {
      title: 'Total Sub-Admins',
      value: subAdmins.length,
      icon: Users,
      trendValue: '+2 this month',
      color: 'blue'
    },
    {
      title: 'Active Admins',
      value: subAdmins.filter(a => a.status === 'active').length,
      icon: CheckCircle,
      trendValue: 'All online',
      color: 'green'
    },
    {
      title: 'Inactive Admins',
      value: subAdmins.filter(a => a.status === 'inactive').length,
      icon: XCircle,
      trendValue: 'Needs attention',
      color: 'red'
    }
  ];

  const filteredAdmins = subAdmins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || admin.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusToggle = (id) => {
    setSubAdmins(subAdmins.map(admin =>
      admin.id === id
        ? { ...admin, status: admin.status === 'active' ? 'inactive' : 'active' }
        : admin
    ));
    setShowDropdown(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this sub-admin?')) {
      setSubAdmins(subAdmins.filter(admin => admin.id !== id));
      setShowDropdown(null);
    }
  };

  const tableActions = [
    {
      key: 'view',
      label: 'View Details',
      icon: Eye,
      color: 'blue',
      onClick: (item) => console.log('View', item), // Placeholder
    },
    {
      key: 'edit',
      label: 'Edit Permissions',
      icon: Edit,
      color: 'purple',
      onClick: () => navigate('/sub-admin/assign'),
    },
    {
      key: 'toggle',
      label: (item) => (item.status === 'active' ? 'Deactivate' : 'Activate'),
      icon: (item) => (item.status === 'active' ? Lock : Unlock),
      color: (item) => (item.status === 'active' ? 'amber' : 'emerald'),
      onClick: (item) => handleStatusToggle(item.id),
    },
    {
      key: 'delete',
      label: 'Delete Admin',
      icon: Trash2,
      color: 'rose',
      onClick: (item) => handleDelete(item.id),
    },
  ];

  const columns = [
    {
      header: 'Customer',
      cell: ({ row: { original: admin } }) => (
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {admin.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-800 dark:text-gray-100">{admin.name}</p>
            <p className="text-sm text-muted">{admin.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Contact',
      cell: ({ row: { original: admin } }) => (
        <p className="text-sm text-muted">{admin.phone}</p>
      ),
    },
    {
      header: 'Membership',
      cell: ({ row: { original: admin } }) => (
        <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5">
          <Shield size={14} />
          {admin.role}
        </span>
      ),
    },
    {
      header: 'Stats',
      cell: ({ row: { original: admin } }) => (
        <div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={14} className="text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">{admin.lastActive}</span>
          </div>
          <p className="text-xs text-muted mt-1">Joined {admin.createdAt}</p>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: ({ row: { original: admin } }) => (
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${admin.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className={`text-sm font-bold ${admin.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {admin.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row: { original: admin } }) => (
        <ActionButtons 
          item={admin}
          actions={tableActions}
          maxVisible={3}
          size="md"
          className="justify-center"
        />
      ),
    },
  ];

  return (
    <div className="page">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex bg-primary flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div className="w-full md:w-auto">
            <h1 className="highlight text-4xl font-extrabold tracking-tight">
              Sub-Admin Management
            </h1>
            <p className="text-primary opacity-70 mt-2 text-lg font-medium">
              Manage administrators and control their access levels
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full md:w-auto">
            <Button
              onClick={() => navigate('/sub-admin/create')}
              className="btn-primary w-auto px-4 py-2 flex items-center gap-2"
              fullWidth={false}
            >
              <UserPlus size={18} />
              Create Sub-Admin
            </Button>
            <Button
              onClick={() => navigate('/sub-admin/assign')}
              className="bg-white text-primary hover:bg-gray-50 w-auto px-4 py-2 flex items-center gap-2 rounded-lg font-medium transition-colors justify-center"
              fullWidth={false}
            >
              <Shield size={18} />
              Manage Permissions
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trendValue={stat.change}
              color={stat.color}
            />
          ))}
        </div>

        {/* Filters & Search */}
        <Card className="p-4 lg:p-5 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                startIcon={<Search size={18} />}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="w-full sm:w-auto">
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                  className="w-full sm:w-48"
                />
              </div>
              <Button
                variant="secondary"
                className="flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
              >
                <Filter size={18} />
                <span className="hidden sm:inline">Apply Filter</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Sub-Admins List */}
        {filteredAdmins.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              No Sub-Admins Found
            </h3>
            <p className="text-muted mb-6">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first sub-admin'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Button
                onClick={() => navigate('/sub-admin/create')}
                className="btn-primary mx-auto"
              >
                <UserPlus size={18} className="mr-2" />
                Create First Sub-Admin
              </Button>
            )}
          </Card>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block">

              <Card className="overflow-hidden">
                <UserTable
                  columns={columns}
                  data={filteredAdmins}
                />
                <div className="overflow-x-auto">
                  <table className="w-full">
                    {/* <thead className="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
                      <tr>
                        {columns.map((col) => (
                          <th key={col.header} className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            {col.header}
                          </th>
                        ))}
                      </tr>
                    </thead> */}
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredAdmins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          {columns.map((col) => (
                            <td key={col.header} className="px-6 py-4 align-middle">
                              {col.cell({ row: { original: admin } })}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden space-y-4">
              {filteredAdmins.map((admin) => (
                <Card key={admin.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                          {admin.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-800 dark:text-gray-100 truncate">{admin.name}</p>
                          <p className="text-sm text-muted truncate">{admin.email}</p>
                        </div>
                      </div>
                      <div className="relative shrink-0">
                        <ActionButtons 
                          item={admin}
                          actions={tableActions}
                          maxVisible={0}
                          size="md"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted font-medium">Role</span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5">
                        <Shield size={12} />
                        {admin.role}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-muted font-medium block mb-2">Permissions</span>
                      <div className="flex flex-wrap gap-1.5">
                        {admin.permissions.slice(0, 2).map((perm, idx) => (
                          <span key={idx} className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-xs font-semibold">
                            {perm}
                          </span>
                        ))}
                        {admin.permissions.length > 2 && (
                          <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-semibold">
                            +{admin.permissions.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${admin.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <span className={`text-sm font-bold ${admin.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {admin.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <Clock size={12} />
                        {admin.lastActive}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubAdmin;