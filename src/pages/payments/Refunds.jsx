import React, { useState, useMemo } from 'react';
import {
  Eye,
  RefreshCw,
  Download,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import PaymentModal from '../../components/Payment/PaymentModal';
import { useNavigate } from 'react-router-dom';
import { useGetRefundPaymentsQuery } from '../../api/services/payments';

const Refunds = () => {
  const navigate = useNavigate();
  const { data: refundResponse, isLoading: refundLoading } = useGetRefundPaymentsQuery();

  // Memoize raw data to prevent unnecessary re-computations
  const rawRefunds = useMemo(() => refundResponse?.data || [], [refundResponse]);

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
    console.log("Submit", data);
    setIsModalOpen(false);
  };

  // Derive filtered refunds
  const filteredRefunds = useMemo(() => {
    let filtered = [...rawRefunds];

    // Filter by status
    if (filterValues.status && filterValues.status !== 'all') {
      filtered = filtered.filter(r => r.status?.toUpperCase() === filterValues.status.toUpperCase());
    }

    // Filter by refund method
    if (filterValues.method && filterValues.method !== 'all') {
      filtered = filtered.filter(r =>
        (r.refundMethod || r.method || '').toLowerCase().includes(filterValues.method.toLowerCase())
      );
    }

    // Search
    if (filterValues.search) {
      const searchTerm = filterValues.search.toLowerCase();
      filtered = filtered.filter(r =>
        (r.userId?.name || r.name || '').toLowerCase().includes(searchTerm) ||
        (r.reason || '').toLowerCase().includes(searchTerm) ||
        (r._id || '').toLowerCase().includes(searchTerm)
      );
    }
    return filtered;
  }, [rawRefunds, filterValues]);

  // Define actions for refunds table
  const refundActions = [
    {
      key: 'view',
      label: 'View Details',
      icon: Eye,
      onClick: (refund) => {
        setSelectedRefund({
          ...refund,
          customerName: refund.userId?.name || refund.name,
          amount: refund.amount?.payable || refund.amount,
          // Map other fields as needed for modal
        });
        setModalMode('view');
        setIsModalOpen(true);
      },
      color: 'blue',
      show: true
    },
    {
      key: 'download',
      label: 'Download Details',
      icon: Download,
      onClick: () => alert('Download feature coming soon'),
      color: 'emerald',
      show: true
    }
  ];

  const onFilterChange = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilterValues({
      status: 'all',
      membership: 'all',
      method: 'all',
      search: ''
    });
  };

  // Calculate stats
  const totalAmount = filteredRefunds.reduce((sum, r) => {
    const val = typeof r.amount === 'object' ? (r.amount.payable || r.amount.total || 0) : (r.amount || 0);
    return sum + Number(val);
  }, 0);

  const completedRefunds = filteredRefunds.filter(r => r.status === 'COMPLETED').length;
  const pendingRefunds = filteredRefunds.filter(r => r.status === 'PENDING').length;

  if (refundLoading) {
    return <div className="p-8 text-center">Loading refunds...</div>;
  }

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

      {/* Refunds Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 cursor-pointer">
        {filteredRefunds.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No refunds found.</p>
          </div>
        ) : (
          <>
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Showing {filteredRefunds.length} of {rawRefunds.length} refunds • Total: ₹{totalAmount.toFixed(2)}
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
                        <p className="font-medium text-gray-900 dark:text-white">
                          {refund.userId?.name || refund.name || 'N/A'}
                        </p>
                        {refund.orderId && (
                          <p className="text-xs text-gray-500">Ord: {refund.orderId?.orderId || refund.orderId}</p>
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
                      ₹{typeof refund.amount === 'object' ? (refund.amount.payable || 0).toFixed(2) : Number(refund.amount || 0).toFixed(2)}
                    </span>
                  ),
                },
                {
                  header: "Date",
                  key: "date",
                  render: (refund) => (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(refund.createdAt || refund.date).toLocaleDateString()}
                    </span>
                  ),
                },
                {
                  header: "Method",
                  key: "method",
                  render: (refund) => <Badge>{refund.refundMethod || refund.method || 'N/A'}</Badge>,
                },
                {
                  header: "Status",
                  key: "status",
                  render: (refund) => (
                    <Badge variant={
                      refund.status === 'COMPLETED' ? 'success' :
                        refund.status === 'PENDING' ? 'warning' : 'danger'
                    }>
                      {refund.status || 'PENDING'}
                    </Badge>
                  ),
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