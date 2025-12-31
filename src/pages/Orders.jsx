// Orders.jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import OrderCard from '../components/OrderPages/OderCards';
import OrderFormModal from '../components/OrderPages/OrderForm';
import OrderFilters from '../components/OrderPages/OrderFilters';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';

const Orders = () => {
  const [filters, setFilters] = useState({
    status: 'all',
  });
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: 'Oct 20, 2035',
      time: '02:47 PM',
      customer: 'Alice Johnson',
      customerPhone: '+1 (555) 123-4567',
      customerAddress: '123 Main Street, Apt 4B, New York, NY 10001',
      orderId: '#ORDER23',
      status: 'completed',
      type: 'Delivery',
      table: '',
      paymentMethod: 'Credit Card',
      restaurant: {
        name: 'Downtown Branch',
        address: '456 Restaurant Ave, New York, NY 10002',
        phone: '+1 (555) 999-0001',
        email: 'downtown@restaurant.com'
      },
      deliveryPartner: {
        name: 'John Rider',
        phone: '+1 (555) 888-7777',
        vehicle: 'Bike #45',
        status: 'Delivered'
      },
      items: [
        { id: 1, name: 'Classic Italian Penne', quantity: 2, price: 18.00, image: '🍝' },
        { id: 2, name: 'Caesar Salad', quantity: 1, price: 8.00, image: '🥗' }
      ],
      subtotal: 44.00,
      deliveryFee: 5.00,
      tax: 3.50,
      total: 52.50
    },
    {
      id: 2,
      date: 'Oct 20, 2035',
      time: '12:47 PM',
      customer: 'Bob Smith',
      customerPhone: '+1 (555) 234-5678',
      customerAddress: null,
      orderId: '#ORDER24',
      status: 'cancelled',
      type: 'Takeaway',
      table: '',
      paymentMethod: 'Cash',
      restaurant: {
        name: 'Downtown Branch',
        address: '456 Restaurant Ave, New York, NY 10002',
        phone: '+1 (555) 999-0001',
        email: 'downtown@restaurant.com'
      },
      deliveryPartner: null,
      items: [
        { id: 1, name: 'Pepperoni Pizza', quantity: 2, price: 12.00, image: '🍕' },
        { id: 2, name: 'Garlic Bread', quantity: 1, price: 5.00, image: '🥖' }
      ],
      subtotal: 29.00,
      deliveryFee: 0,
      tax: 2.32,
      total: 31.32
    },
    {
      id: 3,
      date: 'Oct 23, 2035',
      time: '01:47 PM',
      customer: 'Dana White',
      customerPhone: '+1 (555) 345-6789',
      customerAddress: '789 Park Avenue, Brooklyn, NY 11201',
      orderId: '#ORDER26',
      status: 'on-process',
      type: 'Delivery',
      table: '',
      paymentMethod: 'Debit Card',
      restaurant: {
        name: 'Brooklyn Branch',
        address: '789 Food Street, Brooklyn, NY 11201',
        phone: '+1 (555) 999-0002',
        email: 'brooklyn@restaurant.com'
      },
      deliveryPartner: {
        name: 'Mike Speedy',
        phone: '+1 (555) 777-6666',
        vehicle: 'Bike #23',
        status: 'On the Way'
      },
      items: [
        { id: 1, name: 'Salmon Sushi Roll', quantity: 3, price: 10.00, image: '🍱' },
        { id: 2, name: 'Edamame', quantity: 1, price: 6.00, image: '🫘' },
        { id: 3, name: 'Miso Soup', quantity: 2, price: 4.00, image: '🍜' }
      ],
      subtotal: 44.00,
      deliveryFee: 6.00,
      tax: 4.00,
      total: 54.00
    },
    {
      id: 4,
      date: 'Oct 23, 2035',
      time: '03:15 PM',
      customer: 'Emily Davis',
      customerPhone: '+1 (555) 456-7890',
      customerAddress: null,
      orderId: '#ORDER27',
      status: 'on-process',
      type: 'Dine-In',
      table: 'Table 12',
      paymentMethod: 'Credit Card',
      restaurant: {
        name: 'Downtown Branch',
        address: '456 Restaurant Ave, New York, NY 10002',
        phone: '+1 (555) 999-0001',
        email: 'downtown@restaurant.com'
      },
      deliveryPartner: null,
      items: [
        { id: 1, name: 'Grilled Chicken', quantity: 1, price: 22.00, image: '🍗' },
        { id: 2, name: 'French Fries', quantity: 2, price: 5.00, image: '🍟' },
        { id: 3, name: 'Coca Cola', quantity: 2, price: 3.00, image: '🥤' }
      ],
      subtotal: 38.00,
      deliveryFee: 0,
      tax: 3.04,
      total: 41.04
    },
    {
      id: 5,
      date: 'Oct 24, 2035',
      time: '11:30 AM',
      customer: 'Frank Miller',
      customerPhone: '+1 (555) 567-8901',
      customerAddress: '321 Sunset Blvd, Queens, NY 11375',
      orderId: '#ORDER28',
      status: 'completed',
      type: 'Delivery',
      table: '',
      paymentMethod: 'PayPal',
      restaurant: {
        name: 'Queens Branch',
        address: '321 Dine Road, Queens, NY 11375',
        phone: '+1 (555) 999-0003',
        email: 'queens@restaurant.com'
      },
      deliveryPartner: {
        name: 'Sarah Swift',
        phone: '+1 (555) 666-5555',
        vehicle: 'Bike #12',
        status: 'Delivered'
      },
      items: [
        { id: 1, name: 'Margherita Pizza', quantity: 1, price: 14.00, image: '🍕' },
        { id: 2, name: 'Tiramisu', quantity: 2, price: 7.00, image: '🍰' }
      ],
      subtotal: 28.00,
      deliveryFee: 4.50,
      tax: 2.60,
      total: 35.10
    },
    {
      id: 6,
      date: 'Oct 24, 2035',
      time: '02:00 PM',
      customer: 'Grace Lee',
      customerPhone: '+1 (555) 678-9012',
      customerAddress: null,
      orderId: '#ORDER29',
      status: 'on-process',
      type: 'Dine-In',
      table: 'Table 5',
      paymentMethod: 'Cash',
      restaurant: {
        name: 'Downtown Branch',
        address: '456 Restaurant Ave, New York, NY 10002',
        phone: '+1 (555) 999-0001',
        email: 'downtown@restaurant.com'
      },
      deliveryPartner: null,
      items: [
        { id: 1, name: 'Beef Burger', quantity: 2, price: 15.00, image: '🍔' },
        { id: 2, name: 'Onion Rings', quantity: 1, price: 6.00, image: '🧅' },
        { id: 3, name: 'Milkshake', quantity: 2, price: 5.00, image: '🥤' }
      ],
      subtotal: 46.00,
      deliveryFee: 0,
      tax: 3.68,
      total: 49.68
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      restaurant: orders[0].restaurant, // Use default restaurant
      subtotal: newOrder.total,
      deliveryFee: newOrder.type === 'Delivery' ? 5.00 : 0,
      tax: newOrder.total * 0.08,
      total: newOrder.total + (newOrder.type === 'Delivery' ? 5.00 : 0) + (newOrder.total * 0.08)
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
    <div className="app page">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Orders Management
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Track and manage all restaurant orders
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              variant="primary"
            >
              <Plus size={20} />
              Add New Order
            </Button>
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

        {/* Orders Grid/List */}
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'
            : 'space-y-4 mt-8'
        }>
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