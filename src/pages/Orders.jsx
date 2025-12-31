import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import OrderCard from '../components/OrderPages/OderCards';
import OrderFormModal from '../components/OrderPages/OrderForm';
import OrderFilters from '../components/OrderPages/OrderFilters';
import GradientButton from '../components/ui/GradientButton';
import Pagination from '../components/ui/Pagination';

const Orders = () => {
  const [filters, setFilters] = useState({
    status: 'all',
  });
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: 'Sat, October 20, 2035',
      time: '02:47 PM',
      customer: 'Alice Johnson',
      orderId: '#ORDER23',
      status: 'completed',
      type: 'Dine-In',
      table: 'Table 12',
      items: [
        { id: 1, name: 'Classic Italian Penne', quantity: 2, price: 18.00, image: '🍝' },
        { id: 2, name: 'Caesar Salad', quantity: 1, price: 8.00, image: '🥗' }
      ],
      total: 26.00
    },
    {
      id: 2,
      date: 'Sat, October 20, 2035',
      time: '12:47 AM',
      customer: 'Bob Smith',
      orderId: '#ORDER24',
      status: 'cancelled',
      type: 'Takeaway',
      table: '',
      items: [
        { id: 1, name: 'Pepperoni Pizza', quantity: 2, price: 12.00, image: '🍕' },
        { id: 2, name: 'Garlic Bread', quantity: 1, price: 5.00, image: '🥖' }
      ],
      total: 37.00
    },
    {
      id: 3,
      date: 'Sat, October 23, 2035',
      time: '01:47 PM',
      customer: 'Dana White',
      orderId: '#ORDER26',
      status: 'on-process',
      type: 'Dine-In',
      table: 'Table 8',
      items: [
        { id: 1, name: 'Salmon Sushi Roll', quantity: 3, price: 10.00, image: '🍱' },
        { id: 2, name: 'Edamame', quantity: 1, price: 6.00, image: '🫘' }
      ],
      total: 36.00
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [viewMode, setViewMode] = useState('grid');

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ status: 'all' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Filter orders based on active tab and search
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filters.status === 'all' || order.status === filters.status;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.orderId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Add new order
  const handleAddOrder = (newOrder) => {
    const orderWithId = {
      ...newOrder,
      id: orders.length + 1,
      orderId: `#ORDER${orders.length + 24}`,
      date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setOrders([...orders, orderWithId]);
    setShowAddForm(false);
  };

  // Update order
  const handleUpdateOrder = (updatedOrder) => {
    setOrders(orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
    setEditingOrder(null);
  };

  // Delete order
  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  // Update order status
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Orders Management</h1>
              <p className="text-gray-500">Track and manage all restaurant orders</p>
            </div>
            <GradientButton
              onClick={() => setShowAddForm(true)}
              icon={Plus}
            >
              Add New Order
            </GradientButton>
          </div>
        </div>

        {/* Filters */}
        <OrderFilters 
          searchTerm={searchQuery}
          onSearch={setSearchQuery}
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Orders Grid */}
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8" : "flex flex-col gap-4 mt-8"}>
          {currentOrders.map(order => (
            <OrderCard 
              key={order.id} 
              order={order}
              onDelete={handleDeleteOrder}
              onEdit={() => setEditingOrder(order)}
              onUpdateStatus={handleUpdateStatus}
              viewMode={viewMode}
            />
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 font-semibold">No orders found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or add a new order</p>
          </div>
        )}

        {/* Pagination */}
        {filteredOrders.length > itemsPerPage && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* Add/Edit Order Modal */}
        {(showAddForm || editingOrder) && (
          <OrderFormModal
            order={editingOrder}
            onClose={() => {
              setShowAddForm(false);
              setEditingOrder(null);
            }}
            onSubmit={editingOrder ? handleUpdateOrder : handleAddOrder}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;