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
  Gold: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Silver: "bg-gray-100 text-gray-700 border border-gray-200",
  Regular: "bg-sky-50 text-sky-700 border border-sky-200",
};

const statusBorder = {
  placed: "border-sky-200",
  confirmed: "border-green-200",
  cancelled: "border-red-200",
};

const NewOrders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6">
      
      {/* Header */}
      <div className="mb-8 rounded-3xl bg-white/70 backdrop-blur shadow-md p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-sky-800">
            New Orders
          </h1>
          <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-4 py-1 rounded-full">
            {orders.length} Orders
          </span>
        </div>
        <p className="text-gray-500 mt-1">
          Orders waiting for confirmation
        </p>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`rounded-3xl border ${statusBorder[order.status]}
            bg-white/80 backdrop-blur
            shadow-sm hover:shadow-xl
            transition-all duration-300 hover:-translate-y-1`}
          >
            {/* Card Content */}
            <div className="p-6 space-y-4">

              {/* Top */}
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-sky-800">
                      {order.orderId}
                    </h2>
                    <span
                      className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full font-semibold ${membershipStyles[order.customer.membership]}`}
                    >
                      <Star size={12} />
                      {order.customer.membership}
                    </span>
                  </div>
                  <p className="mt-1 font-semibold text-gray-800">
                    {order.customer.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.customer.phone}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-extrabold text-orange-600">
                    ₹{order.total}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {order.status}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-sky-50 border border-sky-100 text-gray-700">
                <MapPin size={16} className="text-sky-500" />
                {order.location}
              </div>

              {/* Items */}
              <div>
                <p className="text-xs font-semibold text-gray-400 mb-2">
                  ITEMS ORDERED
                </p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-50 border px-3 py-1 rounded-full"
                    >
                      {item.name} × {item.qty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-3 border-t">
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
                        onClick={() =>
                          updateStatus(order.id, "confirmed")
                        }
                      >
                        <CheckCircle size={14} />
                        Confirm
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() =>
                          updateStatus(order.id, "cancelled")
                        }
                      >
                        <XCircle size={14} />
                        Reject
                      </Button>
                    </>
                  )}

                  {order.status === "confirmed" && (
                    <span className="text-green-600 font-semibold text-sm">
                      ✔ Confirmed
                    </span>
                  )}

                  {order.status === "cancelled" && (
                    <span className="text-red-600 font-semibold text-sm">
                      ✖ Cancelled
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewOrders;
