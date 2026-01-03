import React, { useState } from 'react';
import {
  Eye,
  Edit,
  Trash2,
  Mail,
  Download,
  Printer,
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import UserTable from '../../components/ui/Table';
import FilterBar from '../../components/ui/UserFilters';
import PaymentModal from '../../components/Payment/PaymentModal';

const Invoice = () => { 
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [filterValues, setFilterValues] = useState({
    status: 'all',
    membership: 'all',
    method: 'all',
    search: ''
  });

  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      membership: 'premium',
      totalOrders: 15,
      status: 'paid',
      amount: '$299.99',
      date: '2024-01-15',
      method: 'Credit Card',
      invoice: 'INV-001',
      dueDate: '2024-02-15',
      currency: 'USD'
    },
    {
      id: 'INV-002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 987-6543',
      membership: 'enterprise',
      totalOrders: 8,
      status: 'pending',
      amount: '$599.99',
      date: '2024-01-16',
      method: 'Bank Transfer',
      invoice: 'INV-002',
      dueDate: '2024-02-16',
      currency: 'USD'
    },
    {
      id: 'INV-003',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      phone: '+1 (555) 456-7890',
      membership: 'basic',
      totalOrders: 5,
      status: 'overdue',
      amount: '$149.99',
      date: '2023-12-15',
      method: 'PayPal',
      invoice: 'INV-003',
      dueDate: '2024-01-15',
      currency: 'USD'
    },
    {
      id: 'INV-004',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1 (555) 789-0123',
      membership: 'premium',
      totalOrders: 22,
      status: 'paid',
      amount: '$899.99',
      date: '2024-01-10',
      method: 'Credit Card',
      invoice: 'INV-004',
      dueDate: '2024-02-10',
      currency: 'USD'
    }
  ]);

  const [filteredInvoices, setFilteredInvoices] = useState(invoices);

  // Update filtered invoices when original invoices change
  React.useEffect(() => {
    applyFilters(filterValues);
  }, [invoices]);

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleCreateInvoice = () => {
    setSelectedInvoice(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleModalSubmit = (data) => {
    if (modalMode === 'create') {
      const newInvoice = {
        ...data,
        id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
        invoice: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
        name: data.customerName || data.name || 'New Customer',
        email: data.email || 'customer@example.com',
        phone: data.phone || '+1 (555) 000-0000',
        membership: data.membership || 'basic',
        totalOrders: 1,
        method: data.method || 'Credit Card',
        amount: data.amount ? `$${parseFloat(data.amount).toFixed(2)}` : '$0.00',
        date: data.date || new Date().toISOString().split('T')[0],
        dueDate: data.dueDate || new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
        currency: 'USD',
        status: data.status || 'draft'
      };
      setInvoices([...invoices, newInvoice]);
    } else if (modalMode === 'edit') {
      setInvoices(invoices.map(inv =>
        inv.id === data.id ? {
          ...inv,
          ...data,
          name: data.customerName || data.name || inv.name,
          email: data.email || inv.email
        } : inv
      ));
    }
    setModalOpen(false);
  };

  const handleDeleteInvoice = (id) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(inv => inv.id !== id));
    }
  };

  const handleSendInvoice = (invoice) => {
    alert(`Invoice ${invoice.id} sent to ${invoice.email}`);
  };

  const handleMarkAsPaid = (id) => {
    setInvoices(invoices.map(inv =>
      inv.id === id ? { ...inv, status: 'paid' } : inv
    ));
    alert(`Invoice ${id} marked as paid`);
  };

  // Define actions for invoices table
  const invoiceActions = [
    {
      key: 'view',
      label: 'View Invoice',
      icon: Eye,
      onClick: (invoice) => {
        handleViewInvoice(invoice);
      },
      color: 'blue',
      show: true
    },
    {
      key: 'send',
      label: 'Send Invoice',
      icon: Mail,
      onClick: (invoice) => {
        handleSendInvoice(invoice);
      },
      color: 'purple',
      show: true
    },
    {
      key: 'mark-paid',
      label: 'Mark as Paid',
      icon: CheckCircle,
      onClick: (invoice) => {
        if (invoice.status !== 'paid') {
          handleMarkAsPaid(invoice.id);
        }
      },
      color: 'green',
      disabled: (invoice) => invoice.status === 'paid',
      show: true
    },
    {
      key: 'download',
      label: 'Download PDF',
      icon: Download,
      onClick: (invoice) => {
        alert(`Downloading invoice ${invoice.id} as PDF`);
      },
      color: 'emerald',
      show: false
    },
    {
      key: 'print',
      label: 'Print',
      icon: Printer,
      onClick: (invoice) => {
        alert(`Printing invoice ${invoice.id}`);
      },
      color: 'cyan',
      show: false
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: Edit,
      onClick: (invoice) => {
        setSelectedInvoice(invoice);
        setModalMode('edit');
        setModalOpen(true);
      },
      color: 'yellow',
      show: false
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: Trash2,
      onClick: (invoice) => {
        handleDeleteInvoice(invoice.id);
      },
      color: 'rose',
      show: false
    }
  ];

  // Handle filter changes
  const applyFilters = (filters) => {
    let filtered = [...invoices];

    // Filter by status
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(inv => inv.status === filters.status);
    }

    // Filter by membership type
    if (filters.membership && filters.membership !== 'all') {
      filtered = filtered.filter(inv => inv.membership === filters.membership);
    }

    // Filter by payment method
    if (filters.method && filters.method !== 'all') {
      filtered = filtered.filter(inv =>
        inv.method.toLowerCase() === filters.method.toLowerCase()
      );
    }

    // Search by customer name, email, or invoice ID
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(inv =>
        inv.name.toLowerCase().includes(searchTerm) ||
        inv.email.toLowerCase().includes(searchTerm) ||
        inv.id.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredInvoices(filtered);
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
    const statusMap = {
      'draft': 'pending',
      'pending': 'paid',
      'paid': 'overdue',
      'overdue': 'draft'
    };

    setInvoices(invoices.map(invoice =>
      invoice.id === id
        ? {
          ...invoice,
          status: statusMap[invoice.status] || 'draft'
        }
        : invoice
    ));
  };

  // Calculate summary stats
  const totalAmount = filteredInvoices.reduce((sum, inv) => {
    const amount = parseFloat(inv.amount?.replace('$', '') || 0);
    return sum + amount;
  }, 0);

  return (
    <div className="min-h-screen page space-y-8">
      {/* Header */}
      <div className="flex bg-primary flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
        <div>
          <h1 className="highlight text-4xl font-extrabold tracking-tight">
            Payment Management
          </h1>
          <p className="text-primary opacity-70 mt-2 text-lg font-medium">
            Track and manage all restaurant payments
          </p>
        </div>
        <Button
          onClick={handleCreateInvoice}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Create New Invoice
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar
          search={{
            value: filterValues.search,
            placeholder: "Search by name, email or invoice ID...",
            onChange: (val) => onFilterChange('search', val)
          }}
          filters={[
            {
              key: 'status',
              value: filterValues.status,
              options: [
                { value: 'all', label: 'All Status' },
                { value: 'paid', label: 'Paid' },
                { value: 'pending', label: 'Pending' },
                { value: 'overdue', label: 'Overdue' },
                { value: 'draft', label: 'Draft' }
              ]
            },
            {
              key: 'membership',
              value: filterValues.membership,
              options: [
                { value: 'all', label: 'All Memberships' },
                { value: 'premium', label: 'Premium' },
                { value: 'enterprise', label: 'Enterprise' },
                { value: 'basic', label: 'Basic' }
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

      {/* Invoices Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer">
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Invoices</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Showing {filteredInvoices.length} invoices • Total: ${totalAmount.toFixed(2)}
          </p>
        </div>
        <div className="p-4">
          <UserTable
            users={filteredInvoices}
            actions={invoiceActions}
            onToggleStatus={handleToggleStatus}
            showPaymentInfo={true}
          />
        </div>
      </div>

      {/* Payment Modal for Invoices */}
      <PaymentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        paymentData={selectedInvoice}
        mode={modalMode}
      />
    </div>
  );
};

export default Invoice;