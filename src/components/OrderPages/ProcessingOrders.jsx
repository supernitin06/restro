// src/pages/ProcessingOrders.jsx
import React, { useState } from 'react';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import { Bike } from 'lucide-react';
import OrderDetailsModal from '../../components/OrderPages/OrderDetailsModal';

const dummyOrders = [
  {
    id: 1,
    orderId: '#ORD-2001',
    customer: { name: 'Neha Singh', phone: '9123456789' },
    location: 'Sector 62',
    items: [
      { name: 'Burger', quantity: 2 },
      { name: 'French Fries', quantity: 1 },
      { name: 'Cold Drink', quantity: 1 },
    ],
    status: 'preparing',
    delivery: null,
  },
  {
    id: 2,
    orderId: '#ORD-2002',
    customer: { name: 'Aman Gupta', phone: '9988776655' },
    location: 'Sector 63',
    items: [
      { name: 'Paneer Butter Masala', quantity: 1 },
      { name: 'Butter Naan', quantity: 3 },
    ],
    status: 'preparing',
    delivery: null,
  },
];

const dummyPartners = [
  { id: 1, name: 'Rahul Verma', location: 'Sector 62' },
  { id: 2, name: 'Vikas Yadav', location: 'Sector 63' },
  { id: 3, name: 'Anita Sharma', location: 'Sector 64' },
  { id: 4, name: 'Sonal Mehra', location: 'Sector 62' },
  { id: 5, name: 'Amit Singh', location: 'Sector 63' },
];

const ProcessingOrders = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const openDrawer = (order) => {
    setCurrentOrder(order);
    setDrawerOpen(true);
  };

  const assignPartner = (partner) => {
    if (!currentOrder) return;
    setOrders(prev =>
      prev.map(o => o.id === currentOrder.id ? { ...o, delivery: partner } : o)
    );
    setDrawerOpen(false);
    setCurrentOrder(null);
  };

  const updateStatus = (order, newStatus) => {
    setOrders(prev =>
      prev.map(o => o.id === order.id ? { ...o, status: newStatus } : o)
    );
  };

  const columns = [
    {
      header: 'Order ID',
      render: order => <span className="font-bold text-purple-700">{order.orderId}</span>,
    },
    {
      header: 'Customer',
      render: order => (
        <div>
          <div className="font-medium">{order.customer.name}</div>
          <div className="text-xs text-gray-500">{order.customer.phone}</div>
        </div>
      ),
    },
    {
      header: 'Items',
      render: order => (
        <div className="flex flex-col gap-1 min-w-[180px]">
          {order.items.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span title={item.name} className="truncate max-w-[140px]">{item.name}</span>
              <span className="font-semibold bg-gray-100 px-2 py-0.5 rounded">{item.quantity}</span>
            </div>
          ))}
          {order.items.length > 2 && (
            <span
              className="text-xs text-purple-600 font-medium cursor-pointer hover:underline"
              onClick={() => setViewingOrder(order)}
            >
              +{order.items.length - 2} more
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Status',
      render: order => (
        <span className={`px-3 py-1 rounded-lg text-xs font-bold capitalize ${
          order.status === 'preparing'
            ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700'
            : order.status === 'ready'
            ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700'
            : order.status === 'out_for_delivery'
            ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700'
            : 'bg-gradient-to-r from-cyan-100 to-cyan-200 text-cyan-700'
        }`}>
          {order.status.replace(/_/g, ' ')}
        </span>
      ),
    },
    {
      header: 'Delivery Partner',
      render: order => (
        <div className="flex items-center gap-2">
          {order.delivery ? (
            <>
              <Bike size={16} className="text-purple-500" />
              <span className="text-sm font-medium">{order.delivery.name}</span>
            </>
          ) : (
            <Button size="sm" variant="primary" onClick={() => openDrawer(order)}>Assign</Button>
          )}
        </div>
      ),
    },
    {
      header: 'Actions',
      render: order => (
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => setViewingOrder(order)}>View</Button>
          {order.status === 'preparing' && (
            <Button size="sm" variant="success" onClick={() => updateStatus(order, 'ready')}>Mark Ready</Button>
          )}
          {order.status === 'ready' && (
            <Button size="sm" variant="warning" onClick={() => updateStatus(order, 'out_for_delivery')}>Out for Delivery</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="app page p-6">

      {/* Page Header */}
<div className="mb-6 bg-gradient-to-r from-purple-50 via-white to-purple-50 shadow-lg rounded-xl p-6 flex flex-col">
  <div className="flex items-center justify-between">
    <h1 className="text-4xl font-extrabold text-purple-700">
      Processing Orders
    </h1>
    <span className="text-sm font-medium text-purple-500 bg-purple-100 px-3 py-1 rounded-full">
      {orders.length} Orders
    </span>
  </div>
  <p className="text-gray-500 mt-2">
    Manage all ongoing orders and assign delivery partners efficiently
  </p>
</div>

      

      {orders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No processing orders</div>
      ) : (
        <div className="bg-gradient-to-r from-white to-gray-50 shadow-2xl rounded-xl p-6 overflow-x-auto">
          <Table columns={columns} data={orders} />
        </div>
      )}

      {viewingOrder && (
        <OrderDetailsModal order={viewingOrder} onClose={() => setViewingOrder(null)} />
      )}

  <div
  className={`fixed top-0 right-0 h-full w-96 bg-white origin-top shadow-2xl z-50 transform transition-transform duration-500 ${
    drawerOpen ? 'scale-100' : 'scale-0'
  } flex flex-col rounded-l-3xl overflow-hidden`}
>
  {/* Drawer Header */}
  <div className="flex justify-between items-center p-5 border-b border-gray-200 bg-white shadow-md">
    <h2 className="text-2xl font-extrabold text-red-600 tracking-wide">
      Assign Delivery Partner
    </h2>
    {/* Optional Close Button */}
    {/* <button
      className="text-red-500 hover:text-red-700 text-3xl font-bold transition-colors duration-300"
      onClick={() => setDrawerOpen(false)}
    >
      ✕
    </button> */}
  </div>

  {/* Drawer Content: Scrollable Partner List */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
    {dummyPartners.map(partner => (
      <div
        key={partner.id}
        className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-300 border border-red-100 hover:bg-red-50"
        onClick={() => assignPartner(partner)}
      >
        <div className="flex flex-col">
          <span className="font-semibold  text-lg">{partner.name}</span>
          <span className="text-sm">{partner.location}</span>
        </div>
        <Bike size={20} className="" />
      </div>
    ))}
  </div>
</div>

{/* Overlay */}
<div
  className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-500 ${
    drawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`}
  onClick={() => setDrawerOpen(false)}
></div>


    </div>
  );
};

export default ProcessingOrders;
