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
        icon: 'dollar'
      },
      {
        title: 'Total Transactions',
        value: totalTransactions.toString(),
        change: totalTransactions > 2300 ? '+180' : '-50',
        changeType: totalTransactions > 2300 ? 'increase' : 'decrease',
        icon: 'transaction'
      },
      {
        title: 'Success Rate',
        value: `${successRate.toFixed(1)}%`,
        change: successRate > 95 ? '+1.2%' : '-0.5%',
        changeType: successRate > 95 ? 'increase' : 'decrease',
        icon: 'success'
      },
      {
        title: 'Avg. Transaction',
        value: `$${avgTransaction.toFixed(2)}`,
        change: avgTransaction > 80 ? '+5.3%' : '-2.3%',
        changeType: avgTransaction > 80 ? 'increase' : 'decrease',
        icon: 'average'
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
    <div className="p-6 bg-gradient-to-br from-gray-900 to-black min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Payment Transactions</h1>
        <p className="text-gray-400">Manage and view all payment records</p>
      </div>

      {/* Debug info */}
      {renderDebugStats()}

      {/* Stats Section - Try different prop names */}
      {paymentStats.length > 0 && (
        <div className="mb-6">
          {/* Try one of these: */}
          {/* Option 1: stats={paymentStats} */}
          <UserStats stats={paymentStats} />
          
          {/* Option 2: paymentStats={paymentStats} */}
          {/* <UserStats paymentStats={paymentStats} /> */}
          
          {/* Option 3: data={paymentStats} */}
          {/* <UserStats data={paymentStats} /> */}
          
          {/* Option 4: Try a simple fallback */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {paymentStats.map((stat, index) => (
              <div key={index} className="bg-gray-800/50 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
                <p className={`text-sm ${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </p>
              </div>
            ))}
          </div> */}
        </div>
      )}

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar 
          onFilterChange={handleFilterChange}
          filterConfig={{
            status: ['all', 'completed', 'pending', 'failed'],
            membership: ['all', 'premium', 'basic'],
            method: ['all', 'Credit Card', 'PayPal', 'Bank Transfer'],
            showSearch: true,
            searchPlaceholder: "Search by name, email or invoice..."
          }}
        />
      </div>

      {/* UserTable */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
        {/* Debug table info */}
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No transactions found.</p>
            <p className="text-gray-500 text-sm mt-2">
              Total transactions in system: {transactions.length}
            </p>
          </div>
        ) : (
          <>
            <div className="text-gray-400 text-sm mb-4">
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