// Orders.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Plus, Loader2 } from 'lucide-react';
import OrderCard from '../components/OrderPages/OderCards';
import OrderFormModal from '../components/OrderPages/OrderForm';
import OrderFilters from '../components/OrderPages/OrderFilters';
import Button from '../components/ui/Button';
import Pagination from '../components/ui/Pagination';
import { useGetOrdersQuery } from '../api/services/orderApi';

const Orders = () => {
  const { authToken } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({
    status: 'all',
  });
  const [viewMode, setViewMode] = useState('grid'); 
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch data from API
  const { data, isLoading, isError, error } = useGetOrdersQuery(
    {
      page: currentPage,
      limit: itemsPerPage,
      search: searchQuery,
      status: filters.status === "all" ? undefined : filters.status,
    },
    {
      skip: !authToken, // Do not run query if user is not logged in
    }
  );
  const apiResponse = data;

  console.log("API Response:", apiResponse, "Error:", error);
  const [orders, setOrders] = useState([]);

  // Normalize API data to match UI structure
  const normalizeOrder = (apiOrder) => {
    const address = apiOrder.deliveryAddress;
    let formattedAddress = 'N/A';
    if (address) {
      if (typeof address === 'string') formattedAddress = address;
      else if (typeof address === 'object') {
        formattedAddress = `${address.street || address.addressLine || ''}, ${address.city || ''} ${address.zipCode || address.pincode || ''}`;
      }
    }

    return {
      id: apiOrder._id,
      date: new Date(apiOrder.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date(apiOrder.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      customer: apiOrder.userName || apiOrder.customer?.name || 'Unknown',
      customerPhone: apiOrder.userMobile || apiOrder.customer?.phone || 'N/A',
      customerAddress: formattedAddress,
      orderId: apiOrder.orderId ? (apiOrder.orderId.startsWith('#') ? apiOrder.orderId : `#${apiOrder.orderId}`) : `#${apiOrder._id.slice(-6).toUpperCase()}`,
      status: apiOrder.status?.toLowerCase() || 'pending', // Ensure lowercase for UI matching
      type: apiOrder.deliveryType ? (apiOrder.deliveryType.charAt(0).toUpperCase() + apiOrder.deliveryType.slice(1)) : 'Delivery',
      table: '', // Not provided in API
      paymentMethod: apiOrder.payment?.method || 'N/A',
      restaurant: {
        name: apiOrder.restaurantName || 'Restaurant',
        address: '', 
        phone: '',
        email: ''
      },
      deliveryPartner: null, // Not provided in API
      items: (apiOrder.items || []).map((item, idx) => ({
        id: item.menuItem || item.itemId || idx,
        name: item.name,
        quantity: item.quantity,
        price: item.price || item.finalItemPrice || 0,
        image: '🍽️' // Placeholder emoji
      })),
      subtotal: apiOrder.subtotal || apiOrder.price?.itemsTotal || 0,
      deliveryFee: apiOrder.deliveryCharge || apiOrder.price?.deliveryFee || 0,
      tax: apiOrder.tax || apiOrder.price?.tax || 0,
      total: apiOrder.grandTotal || apiOrder.price?.grandTotal || 0
    };
  };

  // Sync API data to local state when fetched
  useEffect(() => {
    if (apiResponse?.data) {
      const normalized = apiResponse.data.map(normalizeOrder);
      setOrders(normalized);
    }
  }, [apiResponse]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({ status: 'all' });
    setSearchQuery('');
    setCurrentPage(1);
  };

  
  const filteredOrders = orders; 

  const totalPages = apiResponse?.meta?.total 
    ? Math.ceil(apiResponse.meta.total / itemsPerPage) 
    : 1;
  
  // If using server-side pagination, currentOrders is just the fetched orders
  const currentOrders = orders;

  // Add new order
  const handleAddOrder = (newOrder) => {
    // Note: This only updates local state. You should implement a mutation for real backend update.
    const orderWithId = {
      ...newOrder,
      id: orders.length + 1,
      orderId: `#ORDER${orders.length + 24}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      restaurant: orders[0]?.restaurant || { name: 'Default' }, 
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
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex bg-primary flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
            <div>
              <h1 className="highlight text-4xl font-extrabold tracking-tight">
                Orders Management
              </h1>
              <p className="text-primary opacity-70 mt-2 text-lg font-medium">
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
        {!authToken ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 font-semibold">Access Denied</p>
            <p className="text-gray-500 mt-2">Please log in to view orders.</p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-2xl text-red-500 font-semibold">Unable to load orders</p>
            <p className="text-gray-500 mt-2">
              {error?.status === 401 ? "Unauthorized: Please log in again." : (error?.data?.message || "An error occurred.")}
            </p>
          </div>
        ) : (
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
        )}

        {authToken && !isLoading && !isError && currentOrders.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400 font-semibold">No orders found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or add a new order</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
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