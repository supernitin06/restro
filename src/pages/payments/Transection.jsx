import React, { useState, useEffect } from "react";
import {
  Eye,
  Download,
  RefreshCw,
  Mail,
  Trash2,
  Edit,
  Printer,
  Share2,
  FileText
} from 'lucide-react';
import UserTable from "../../components/ui/Table";
import FilterBar from "../../components/ui/UserFilters";
import PaymentModal from "../../components/Payment/PaymentModal";
import transactionsData from "../../assets/json/PaymentData/transactions.json";
import UserStats from "../../components/ui/UserStats";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStats, setPaymentStats] = useState([]);

  // Debug: Check initial data
  useEffect(() => {
    console.log("Initial transactionsData:", transactionsData);
    console.log("Number of transactions:", transactionsData.length);

    setTransactions(transactionsData);
    setFilteredTransactions(transactionsData);
  }, []);

  // Calculate payment stats whenever filtered transactions change
  useEffect(() => {
    console.log("Filtered transactions updated:", filteredTransactions.length);
    calculatePaymentStats(filteredTransactions);
  }, [filteredTransactions]);

  const calculatePaymentStats = (data) => {
    console.log("Calculating stats for:", data.length, "transactions");

    if (!data || data.length === 0) {
      console.log("No data to calculate stats");
      setPaymentStats([]);
      return;
    }

    // Calculate stats
    const totalRevenue = data.reduce((sum, t) => {
      const amount = parseFloat(t.amount?.replace('$', '') || 0);
      return sum + amount;
    }, 0);

    const completedTransactions = data.filter(t => t.status === 'completed').length;
    const pendingTransactions = data.filter(t => t.status === 'pending').length;
    const failedTransactions = data.filter(t => t.status === 'failed').length;
    const totalTransactions = data.length;

    const avgTransaction = totalRevenue / totalTransactions || 0;
    const successRate = totalTransactions > 0 ? (completedTransactions / totalTransactions) * 100 : 0;

    console.log("Calculated stats:", {
      totalRevenue,
      totalTransactions,
      successRate,
      avgTransaction,
      completedTransactions,
      pendingTransactions,
      failedTransactions
    });

    // Create stats array
    const stats = [
      {
        title: 'Total Revenue',
        value: `$${totalRevenue.toFixed(2)}`,
        change: totalRevenue > 45000 ? '+20.1%' : '-5.2%',
        changeType: totalRevenue > 45000 ? 'increase' : 'decrease',
        icon: 'dollar-sign'
      },
      {
        title: 'Total Transactions',
        value: totalTransactions.toString(),
        change: totalTransactions > 2300 ? '+180' : '-50',
        changeType: totalTransactions > 2300 ? 'increase' : 'decrease',
        icon: 'credit-card'
      },
      {
        title: 'Success Rate',
        value: `${successRate.toFixed(1)}%`,
        change: successRate > 95 ? '+1.2%' : '-0.5%',
        changeType: successRate > 95 ? 'increase' : 'decrease',
        icon: 'check-circle'
      },
      {
        title: 'Avg. Transaction',
        value: `$${avgTransaction.toFixed(2)}`,
        change: avgTransaction > 80 ? '+5.3%' : '-2.3%',
        changeType: avgTransaction > 80 ? 'increase' : 'decrease',
        icon: 'percent'
      }
    ];

    console.log("Stats array:", stats);
    setPaymentStats(stats);
  };

  // ... (rest of the paymentActions array remains the same)
  const paymentActions = [
    {
      key: 'view',
      label: 'View Details',
      icon: Eye,
      onClick: (transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
      },
      color: 'blue',
      show: true
    },
    {
      key: 'download',
      label: 'Download Invoice',
      icon: Download,
      onClick: (transaction) => {
        console.log('Download invoice for:', transaction);
        alert(`Downloading invoice: ${transaction.invoice}`);
      },
      color: 'emerald',
      show: true
    },
    {
      key: 'refund',
      label: 'Process Refund',
      icon: RefreshCw,
      onClick: (transaction) => {
        console.log('Process refund for:', transaction);
        alert(`Processing refund for ${transaction.name}`);
      },
      color: 'amber',
      disabled: (transaction) => transaction.status !== 'completed',
      show: true
    },
    {
      key: 'receipt',
      label: 'Resend Receipt',
      icon: Mail,
      onClick: (transaction) => {
        console.log('Resend receipt for:', transaction);
        alert(`Resending receipt to ${transaction.email}`);
      },
      color: 'purple',
      show: true
    },
    {
      key: 'print',
      label: 'Print Receipt',
      icon: Printer,
      onClick: (transaction) => {
        console.log('Print receipt for:', transaction);
        alert(`Printing receipt for ${transaction.name}`);
      },
      color: 'cyan',
      show: false
    },
    {
      key: 'share',
      label: 'Share',
      icon: Share2,
      onClick: (transaction) => {
        console.log('Share transaction:', transaction);
        alert(`Sharing ${transaction.invoice}`);
      },
      color: 'blue',
      show: false
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: Edit,
      onClick: (transaction) => {
        console.log('Edit transaction:', transaction);
        alert(`Editing ${transaction.invoice}`);
      },
      color: 'emerald',
      show: false
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: Trash2,
      onClick: (transaction) => {
        console.log('Delete transaction:', transaction);
        if (confirm(`Are you sure you want to delete ${transaction.invoice}?`)) {
          setTransactions(prev => prev.filter(t => t.id !== transaction.id));
          setFilteredTransactions(prev => prev.filter(t => t.id !== transaction.id));
        }
      },
      color: 'rose',
      show: false
    },
    {
      key: 'report',
      label: 'Generate Report',
      icon: FileText,
      onClick: (transaction) => {
        console.log('Generate report for:', transaction);
        alert(`Generating report for ${transaction.invoice}`);
      },
      color: 'purple',
      show: false
    }
  ];

  // Handle filter changes
  const handleFilterChange = (filters) => {
    console.log("Filters changed:", filters);

    let filtered = [...transactions];

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status);
    }

    // Filter by membership type
    if (filters.membership && filters.membership !== 'all') {
      filtered = filtered.filter(t => t.membership === filters.membership);
    }

    // Filter by payment method
    if (filters.method && filters.method !== 'all') {
      filtered = filtered.filter(t =>
        t.method.toLowerCase() === filters.method.toLowerCase()
      );
    }

    // Search by customer name or email
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchTerm) ||
        t.email.toLowerCase().includes(searchTerm) ||
        t.invoice.toLowerCase().includes(searchTerm)
      );
    }

    console.log("Filtered results:", filtered.length);
    setFilteredTransactions(filtered);
  };

  // Handle status toggle
  const handleToggleStatus = (id) => {
    setTransactions(prev => prev.map(transaction =>
      transaction.id === id
        ? {
          ...transaction,
          status: transaction.status === 'completed' ? 'pending' : 'completed'
        }
        : transaction
    ));

    setFilteredTransactions(prev => prev.map(transaction =>
      transaction.id === id
        ? {
          ...transaction,
          status: transaction.status === 'completed' ? 'pending' : 'completed'
        }
        : transaction
    ));
  };

  // Temporary debug display
  const renderDebugStats = () => {
    if (paymentStats.length === 0) {
      return (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
          <p className="text-red-300">No stats data available. Check console for details.</p>
          <p className="text-red-400 text-sm">
            Transactions loaded: {transactions.length} |
            Filtered: {filteredTransactions.length}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen page  space-y-8">
      {/* Header */}
      <div className="flex flex-col bg-primary md:flex-row justify-between items-start md:items-center p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="highlight text-4xl font-extrabold tracking-tight">
            Payment Management
          </h1>
          <p className="text-primary opacity-70 mt-2 text-lg font-medium">
            Track and manage all restaurant payments
          </p>
        </div>
      </div>

      {/* Stats Section */}
      {paymentStats.length > 0 && (
        <div className="mb-6">
          <UserStats paymentStats={paymentStats} />
        </div>
      )}

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar
          onFilterChange={handleFilterChange}
          filterConfig={{ // Note: Check how UserFilters/FilterBar accepts props. If it's a monolithic object or separate props.
            // Based on previous View, UserFilters accepts: search, filters, onFilterChange, onClear, OR filterConfig IF updated.
            // Let's check FilterBar implementation again first.
            // WAIT. UserFilters.jsx (lines 8-17) takes: search, filters (array), onFilterChange, onClear.
            // It does NOT take filterConfig. My previous edit to UserFilters was likely to standardize Styles not props.
            // However, Transection.jsx calls it with filterConfig.
            // I need to update UserFilters.jsx to accept filterConfig or adapt Transection.jsx.
            // The user request is "user filder ui same like other filter".
            // OrderFilters (other filter) uses InputField and Select directly.
            // UserFilters tries to be generic. 
            // Let's REWRITE UserFilters.jsx to look like OrderFilters but generic.
          }}
        />
      </div>

      {/* UserTable */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        {/* Debug table info */}
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No transactions found.</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Total transactions in system: {transactions.length}
            </p>
          </div>
        ) : (
          <>
            <div className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </div>
            <UserTable
              users={filteredTransactions}
              actions={paymentActions}
              onToggleStatus={handleToggleStatus}
              showPaymentInfo={true}
            />
          </>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;