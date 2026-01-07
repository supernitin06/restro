// src/pages/NewOrders.jsx
import React, { useState } from "react";
import { Clock, MapPin, CheckCircle, XCircle, Star } from "lucide-react";
import Button from "../../components/ui/Button";

const initialOrders = [
  {
    id: 1,
    orderId: "ORD001",
    customer: { name: "Aman Verma", phone: "9876543210", membership: "Gold" },
    location: "Sector 62, Noida",
    items: [
      { name: "Paneer Butter Masala", qty: 1 },
      { name: "Butter Naan", qty: 2 },
      { name: "Dal Tadka", qty: 1 },
    ],
    total: 415,
    createdAt: "2 mins ago",
    status: "placed",
  },
  {
    id: 2,
    orderId: "ORD007",
    customer: { name: "Anjali Sharma", phone: "9123456789", membership: "Regular" },
    location: "Indirapuram, Ghaziabad",
    items: [{ name: "Veg Biryani", qty: 1 }],
    total: 250,
    createdAt: "6 mins ago",
    status: "placed",
  },
];

const membershipStyles = {
  Gold: "bg-yellow-100 text-yellow-700",
  Silver: "bg-gray-200 text-gray-700",
  Regular: "bg-blue-100 text-blue-700",
};

const statusStyles = {
  placed: "border-blue-300",
  confirmed: "border-green-300",
  cancelled: "border-red-300",
};

const NewOrders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (id, status) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  return (
    <div className="app page bg-gray-50 min-h-screen p-6">
      {/* Page Header */}
      <div className="mb-6 bg-gradient-to-r from-sky-50 via-white to-sky-50 shadow-lg rounded-3xl p-6 flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-sky-700">New Orders</h1>
          <span className="text-sm font-medium text-sky-500 bg-sky-100 px-3 py-1 rounded-full">
            {orders.length} Orders
          </span>
        </div>
        <p className="text-gray-500 mt-2">Orders waiting for confirmation</p>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`border rounded-3xl p-4 transition-all shadow-lg transform hover:scale-105 ${statusStyles[order.status]}`}
            style={{
              background: "linear-gradient(to right, #e0f7ff, #ffffff, #ccefff)", // light sky blue gradient
            }}
          >
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-extrabold text-sky-800">{order.orderId}</h2>
                  <span
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${membershipStyles[order.customer.membership]}`}
                  >
                    <Star size={12} />
                    {order.customer.membership}
                  </span>
                </div>
                <p className="mt-1 font-semibold text-gray-800">{order.customer.name}</p>
                <p className="text-xs text-gray-500">{order.customer.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-orange-600">₹{order.total}</p>
                <span className="text-xs font-bold uppercase tracking-wide text-gray-400">{order.status}</span>
              </div>
            </div>

            {/* Location */}
            <div
              className="mt-4 flex items-center gap-2 text-sm text-gray-700 rounded-xl px-4 py-2 border"
              style={{
                background: "linear-gradient(to right, #e0f7ff, #ffffff, #ccefff)", // same light sky blue
                borderColor: "#7dd3fc",
              }}
            >
              <MapPin size={16} className="text-sky-500" />
              {order.location}
            </div>

            {/* Items */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-400 mb-2">ITEMS ORDERED</p>
              <div className="flex flex-wrap gap-2">
                {order.items.map((item, idx) => (
                  <span key={idx} className="bg-white border text-xs px-3 py-1 rounded-full">
                    {item.name} × {item.qty}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock size={12} />
                {order.createdAt}
              </div>
              <div className="flex gap-3">
                {order.status === "placed" && (
                  <>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => updateStatus(order.id, "confirmed")}
                    >
                      <CheckCircle size={14} /> Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => updateStatus(order.id, "cancelled")}
                    >
                      <XCircle size={14} /> Reject
                    </Button>
                  </>
                )}
                {order.status === "confirmed" && (
                  <span className="text-green-700 font-bold text-sm">✔ Order Confirmed</span>
                )}
                {order.status === "cancelled" && (
                  <span className="text-red-600 font-bold text-sm">✖ Order Cancelled</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewOrders;
