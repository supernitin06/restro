import React, { useState } from 'react';
import {
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  RefreshCw,
  Download,
  Mail
} from 'lucide-react';
import UserTable from '../../components/ui/Table';
import FilterBar from '../../components/ui/UserFilters';
import PaymentModal from '../../components/Payment/PaymentModal'; // Fixed typo
import refundsData from '../../assets/json/PaymentData/refunds.json';

const Refunds = () => {
  const [refunds, setRefunds] = useState(refundsData);
  const [filteredRefunds, setFilteredRefunds] = useState(refundsData);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');

  const [filterValues, setFilterValues] = useState({
    status: 'all',
    membership: 'all',
    method: 'all',
    search: ''
  });

  const handleCreateRefund = () => {
    setSelectedRefund(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    if (modalMode === 'create') {
      const newRefund = {
        ...data,
        id: `REF-${String(refunds.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        refundDate: new Date().toISOString().split('T')[0],
        name: data.customerName || data.name,
        email: data.email || 'customer@example.com',
        phone: data.phone || '+1 (555) 000-0000',
        membership: 'basic',
        totalOrders: 1,
        method: data.method || 'Credit Card',
        invoice: `INV-${String(refunds.length + 100).padStart(3, '0')}`,
        transactionId: data.transactionId || `TXN-${String(refunds.length + 100).padStart(3, '0')}`
      };
      const updatedRefunds = [...refunds, newRefund];
      setRefunds(updatedRefunds);
      setFilteredRefunds(updatedRefunds);
    } else if (modalMode === 'edit' && selectedRefund) {
      const updatedRefunds = refunds.map(r =>
        r.id === selectedRefund.id ? { ...r, ...data } : r
      );
      setRefunds(updatedRefunds);
      setFilteredRefunds(updatedRefunds);
    }
    setIsModalOpen(false);
  };

  // Define actions for refunds table
  const refundActions = [
    {
      key: 'view',
      label: 'View Details',
      icon: Eye,
      onClick: (refund) => {
        setSelectedRefund(refund);
        setModalMode('view');
        setIsModalOpen(true);
      },
      color: 'blue',
      show: true
    },
    {
      key: 'approve',
      label: 'Approve Refund',
      icon: CheckCircle,
      onClick: (refund) => {
        if (refund.status !== 'completed') {
          const updatedRefunds = refunds.map(r =>
            r.id === refund.id ? { ...r, status: 'completed' } : r
          );
          setRefunds(updatedRefunds);
          setFilteredRefunds(updatedRefunds);
          alert(`Refund ${refund.id} approved`);
        }
      },
      color: 'green',
      disabled: (refund) => refund.status === 'completed',
      show: true
    },
    {
      key: 'download',
      label: 'Download Details',
      icon: Download,
      onClick: (refund) => {
        alert(`Downloading refund details for ${refund.id}`);
      },
      color: 'emerald',
      show: true
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: Edit,
      onClick: (refund) => {
        setSelectedRefund(refund);
        setModalMode('edit');
        setIsModalOpen(true);
      },
      color: 'yellow',
      show: false
    },
    {
      key: 'reject',
      label: 'Reject Refund',
      icon: XCircle,
      onClick: (refund) => {
        if (window.confirm(`Reject refund ${refund.id}?`)) {
          const updatedRefunds = refunds.map(r =>
            r.id === refund.id ? { ...r, status: 'failed' } : r
          );
          setRefunds(updatedRefunds);
          setFilteredRefunds(updatedRefunds);
        }
      },
      color: 'red',
      disabled: (refund) => refund.status === 'failed',
      show: false
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: Trash2,
      onClick: (refund) => {
        if (confirm(`Delete refund ${refund.id}?`)) {
          const updatedRefunds = refunds.filter(r => r.id !== refund.id);
          setRefunds(updatedRefunds);
          setFilteredRefunds(updatedRefunds);
        }
      },
      color: 'rose',
      show: false
    }
  ];

  // Handle filter changes
  const applyFilters = (filters) => {
    let filtered = [...refunds];

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    // Filter by membership type
    if (filters.membership && filters.membership !== 'all') {
      filtered = filtered.filter(r => r.membership === filters.membership);
    }

    // Filter by refund method
    if (filters.method && filters.method !== 'all') {
      filtered = filtered.filter(r =>
        r.refundMethod?.toLowerCase().includes(filters.method.toLowerCase()) ||
        r.method.toLowerCase() === filters.method.toLowerCase()
      );
    }

    // Search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchTerm) ||
        r.email.toLowerCase().includes(searchTerm) ||
        r.id.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredRefunds(filtered);
  };

  const onFilterChange = (key, value) => {
    const newFilters = { ...filterValues, [key]: value };
    setFilterValues(newFilters);
    applyFilters(newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      status: 'all',
      membership: 'all',
      method: 'all',
      search: ''
    };
    setFilterValues(defaultFilters);
    applyFilters(defaultFilters);
  };

  // Handle status toggle
  const handleToggleStatus = (id) => {
    const updatedRefunds = refunds.map(refund =>
      refund.id === id
        ? {
          ...refund,
          status: refund.status === 'completed' ? 'pending' : 'completed'
        }
        : refund
    );

    setRefunds(updatedRefunds);
    setFilteredRefunds(updatedRefunds);
  };

  // Calculate total amount
  const totalAmount = filteredRefunds.reduce((sum, r) => {
    const amount = parseFloat(r.amount?.replace('$', '') || 0);
    return sum + amount;
  }, 0);

  const completedRefunds = filteredRefunds.filter(r => r.status === 'completed').length;
  const pendingRefunds = filteredRefunds.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen page space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-primary p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="text-heading">
            Refunds Management
          </h1>
          <p className="text-primary opacity-70 mt-2 text-lg font-medium">
            Process and manage all refund requests
          </p>
        </div>
        <button
          onClick={handleCreateRefund}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Process New Refund
        </button>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar
          search={{
            value: filterValues.search,
            placeholder: "Search by name, email or refund ID...",
            onChange: (val) => onFilterChange('search', val)
          }}
          filters={[
            {
              key: 'status',
              value: filterValues.status,
              options: [
                { value: 'all', label: 'All Status' },
                { value: 'completed', label: 'Completed' },
                { value: 'pending', label: 'Pending' },
                { value: 'failed', label: 'Failed' }
              ]
            },
            {
              key: 'membership',
              value: filterValues.membership,
              options: [
                { value: 'all', label: 'All Memberships' },
                { value: 'basic', label: 'Basic' },
                { value: 'premium', label: 'Premium' }
              ]
            },
            {
              key: 'method',
              value: filterValues.method,
              options: [
                { value: 'all', label: 'All Methods' },
                { value: 'Credit Card', label: 'Credit Card' },
                { value: 'PayPal', label: 'PayPal' },
                { value: 'Bank Transfer', label: 'Bank Transfer' }
              ]
            }
          ]}
          onFilterChange={onFilterChange}
          onClear={handleClearFilters}
        />
      </div>

      {/* Refunds Table */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
        <UserTable
          users={filteredRefunds}
          actions={refundActions}
          onToggleStatus={handleToggleStatus}
          showPaymentInfo={true}
        />
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        paymentData={selectedRefund}
        mode={modalMode}
      />
    </div>
  );
};

export default Refunds;