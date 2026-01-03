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
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { User, Phone, ShoppingBag } from 'lucide-react';
import PaymentModal from '../../components/Payment/PaymentModal';
import refundsData from '../../assets/json/PaymentData/refunds.json';
import { useNavigate } from 'react-router-dom';
const Refunds = () => {
  const navigate = useNavigate();
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
      <div className="flex bg-primary flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="highlight text-4xl font-extrabold tracking-tight">
            Refunds Management
          </h1>
          <p className="text-primary opacity-70 mt-2 text-lg font-medium">
            Process and manage all refund requests
          </p>
        </div>
        <Button
          onClick={handleCreateRefund}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Process New Refund
        </Button>
      </div>

      {/* Filter Bar */}


      {/* Refunds Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 cursor-pointer">
        {filteredRefunds.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No refunds found.</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Total refunds in system: {refunds.length}
            </p>
          </div>
        ) : (
          <>
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Showing {filteredRefunds.length} of {refunds.length} refunds
            </div>
            <Table
              data={filteredRefunds}
              columns={[
                {
                  header: "Customer",
                  key: "customer",
                  render: (refund) => (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg highlight-bg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{refund.name || refund.customerName}</p>
                        {refund.invoice && (
                          <p className="text-xs text-gray-500">#{refund.invoice}</p>
                        )}
                      </div>
                    </div>
                  ),
                },
                {
                  header: "Amount",
                  key: "amount",
                  render: (refund) => (
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {refund.amount}
                    </span>
                  ),
                },
                {
                  header: "Date",
                  key: "date",
                  render: (refund) => (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(refund.date || refund.refundDate).toLocaleDateString()}
                    </span>
                  ),
                },
                {
                  header: "Method",
                  key: "method",
                  render: (refund) => <Badge>{refund.method || refund.refundMethod}</Badge>,
                },
                {
                  header: "Contact",
                  key: "contact",
                  render: (refund) => (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                        <Mail className="w-4 h-4 text-blue-500" />
                        {refund.email}
                      </div>
                      {refund.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Phone className="w-4 h-4 text-green-500" />
                          {refund.phone}
                        </div>
                      )}
                    </div>
                  ),
                },
                {
                  header: "Membership",
                  key: "membership",
                  render: (refund) => <Badge>{refund.membership}</Badge>,
                },
                {
                  header: "Stats",
                  key: "stats",
                  render: (refund) => (
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-pink-600" />
                      <span className="font-medium">{refund.totalOrders || 0} orders</span>
                    </div>
                  ),
                },
                {
                  header: "Status",
                  key: "status",
                  render: (refund) => <Badge>{refund.status}</Badge>,
                },
              ]}
              actions={refundActions}
              title="Refunds"
            />
          </>
        )}
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