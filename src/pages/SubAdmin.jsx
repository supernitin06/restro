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

const SubAdmin = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDropdown, setShowDropdown] = useState(null);

  // Sample sub-admin data
  const [subAdmins, setSubAdmins] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@swaad.com',
      phone: '+91 98765 43210',
      role: 'Senior Admin',
      status: 'active',
      permissions: ['View Orders', 'Manage Users', 'Manage Restaurants'],
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
      permissions: ['View Orders', 'Handle Refunds'],
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
      permissions: ['View Orders', 'Manage Users'],
      createdAt: '10 Feb 2024',
      lastActive: '5 days ago'
    }
  ]);

  const stats = [
    {
      title: 'Total Sub-Admins',
      value: subAdmins.length,
      icon: Users,
      color: 'blue',
      change: '+2 this month'
    },
    {
      title: 'Active Admins',
      value: subAdmins.filter(a => a.status === 'active').length,
      icon: CheckCircle,
      color: 'green',
      change: 'All online'
    },
    {
      title: 'Inactive Admins',
      value: subAdmins.filter(a => a.status === 'inactive').length,
      icon: XCircle,
      color: 'red',
      change: 'Needs attention'
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

  return (
    <div className="page">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col mb-6 md:flex-row justify-between items-start md:items-center bg-primary p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div>
            <h1 className="text-heading">
              Sub-Admin Management
            </h1>
            <p className="text-primary opacity-70 mt-2 text-lg font-medium">
              Manage administrators and control their access levels
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
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
              className="bg-white text-primary hover:bg-gray-50 w-auto px-4 py-2 flex items-center gap-2 rounded-lg font-medium transition-colors"
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
              trend={stat.change}
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
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input px-4 py-2 rounded-lg min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Button 
                variant="secondary" 
                className="flex items-center justify-center gap-2 whitespace-nowrap"
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
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Admin Details
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Permissions
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Activity
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredAdmins.map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {admin.name.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-gray-800 dark:text-gray-100">{admin.name}</p>
                                <p className="text-sm text-muted">{admin.email}</p>
                                <p className="text-xs text-muted">{admin.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5">
                              <Shield size={14} />
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1.5 max-w-xs">
                              {admin.permissions.slice(0, 2).map((perm, idx) => (
                                <span key={idx} className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-md text-xs font-semibold">
                                  {perm}
                                </span>
                              ))}
                              {admin.permissions.length > 2 && (
                                <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-semibold">
                                  +{admin.permissions.length - 2} more
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-2.5 h-2.5 rounded-full ${admin.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                              <span className={`text-sm font-bold ${admin.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {admin.status === 'active' ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock size={14} className="text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">{admin.lastActive}</span>
                            </div>
                            <p className="text-xs text-muted mt-1">Joined {admin.createdAt}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2 relative">
                              <button
                                className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all text-blue-600 dark:text-blue-400"
                                title="View Details"
                              >
                                <Eye size={18} />
                              </button>
                              <button
                                className="p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-all text-purple-600 dark:text-purple-400"
                                onClick={() => navigate('/sub-admin/assign')}
                                title="Edit Permissions"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => setShowDropdown(showDropdown === admin.id ? null : admin.id)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all text-gray-600 dark:text-gray-400"
                              >
                                <MoreVertical size={18} />
                              </button>

                              {showDropdown === admin.id && (
                                <>
                                  <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setShowDropdown(null)}
                                  ></div>
                                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                                    <button
                                      onClick={() => handleStatusToggle(admin.id)}
                                      className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 text-sm font-medium transition-colors"
                                    >
                                      {admin.status === 'active' ? (
                                        <>
                                          <Lock size={16} className="text-red-600" />
                                          <span>Deactivate</span>
                                        </>
                                      ) : (
                                        <>
                                          <Unlock size={16} className="text-green-600" />
                                          <span>Activate</span>
                                        </>
                                      )}
                                    </button>
                                    <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
                                    <button
                                      onClick={() => handleDelete(admin.id)}
                                      className="w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 text-sm font-medium text-red-600 dark:text-red-400 transition-colors"
                                    >
                                      <Trash2 size={16} />
                                      <span>Delete Admin</span>
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
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
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {admin.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-100">{admin.name}</p>
                        <p className="text-sm text-muted">{admin.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDropdown(showDropdown === admin.id ? null : admin.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all text-gray-600 dark:text-gray-400"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {showDropdown === admin.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-10" 
                          onClick={() => setShowDropdown(null)}
                        ></div>
                        <div className="absolute right-4 mt-10 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-20 overflow-hidden">
                          <button
                            onClick={() => {
                              navigate('/sub-admin/assign');
                              setShowDropdown(null);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 text-sm font-medium transition-colors"
                          >
                            <Edit size={16} className="text-blue-600" />
                            <span>Edit Permissions</span>
                          </button>
                          <button
                            onClick={() => handleStatusToggle(admin.id)}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 text-sm font-medium transition-colors"
                          >
                            {admin.status === 'active' ? (
                              <>
                                <Lock size={16} className="text-red-600" />
                                <span>Deactivate</span>
                              </>
                            ) : (
                              <>
                                <Unlock size={16} className="text-green-600" />
                                <span>Activate</span>
                              </>
                            )}
                          </button>
                          <div className="h-px bg-gray-200 dark:bg-gray-700"></div>
                          <button
                            onClick={() => handleDelete(admin.id)}
                            className="w-full px-4 py-3 text-left hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 text-sm font-medium text-red-600 dark:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                            <span>Delete Admin</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="space-y-3">
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