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
import UserTable from '../components/ui/Table';
import FilterBar from '../components/ui/UserFilters';
import PaymentModal from '../components/Payment/PaymentModal';

const Invoice = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
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
  const handleFilterChange = (filters) => {
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

    console.log('Filtered invoices:', filtered);
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
  const totalAmount = invoices.reduce((sum, inv) => {
    const amount = parseFloat(inv.amount?.replace('$', '') || 0);
    return sum + amount;
  }, 0);

  const paidInvoices = invoices.filter(inv => inv.status === 'paid').length;
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending').length;
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Invoice Management</h1>
            <p className="text-gray-600">Create, send, and manage customer invoices</p>
          </div>
          <button
            onClick={handleCreateInvoice}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <FileText className="w-5 h-5" />
            Create New Invoice
          </button>
        </div>
      </div>

      

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar 
          onFilterChange={handleFilterChange}
          filterConfig={{
            status: ['all', 'paid', 'pending', 'overdue', 'draft'],
            membership: ['all', 'premium', 'enterprise', 'basic'],
            method: ['all', 'Credit Card', 'PayPal', 'Bank Transfer'],
            showSearch: true,
            searchPlaceholder: "Search by name, email or invoice ID..."
          }}
        />
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">All Invoices</h2>
          <p className="text-gray-600 text-sm">
            Showing {invoices.length} invoices • Total: ${totalAmount.toFixed(2)}
          </p>
        </div>
        <div className="p-4">
          <UserTable
            users={invoices}
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
        transaction={selectedInvoice}
        mode={modalMode}
        isInvoice={true}
      />
    </div>
  );
};

export default Invoice;