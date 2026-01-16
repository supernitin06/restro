import React, { useEffect, useRef } from "react";
import Button from "../ui/Button";
import {
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiTruck,
  FiCreditCard,
  FiClock,
} from "react-icons/fi";

const STATUS_FLOW = ["PLACED", "ACCEPTED", "PREPARING", "READY", "ASSIGNED"];

const STATUS_COLORS = {
  PLACED: "bg-gray-100 text-gray-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-yellow-100 text-yellow-700",
  READY: "bg-green-100 text-green-700",
  ASSIGNED: "bg-purple-100 text-purple-700",
};

const OrderDetailsModal = ({ order, onClose }) => {
  const modalRef = useRef(null);

  if (!order) return null;

  const {
    orderId,
    customer = {},
    items = [],
    price = {},
    delivery = {},
    deliveryAddress = {},
    status,
  } = order;
   console.log("Order Details:", price);
  // 🔹 Dummy delivery flow (until API)
  const deliveryFlow = {
    partner: delivery.partner || {
      name: "Rohit Kumar",
      phone: "9876543210",
      vehicle: "Bike",
    },
    assignedAt: delivery.assignedAt || "2026-01-16T12:10:00",
    pickedAt: delivery.pickedAt || "2026-01-16T12:25:00",
    deliveredAt: delivery.deliveredAt || null,
  };

  /* ✅ OUTSIDE CLICK + ESC */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="bg-white w-full max-w-3xl rounded-xl shadow-xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Order Details
              </h2>
              <p className="text-sm text-gray-500">
                Order ID: <span className="font-medium">{orderId}</span>
              </p>
            </div>

            <Button size="sm" variant="danger" onClick={onClose}>
              <FiX /> Close
            </Button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">

            {/* Status + Payment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Order Status</p>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${STATUS_COLORS[status]}`}
                >
                  {status}
                </span>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
  <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
    <FiCreditCard /> Payment
  </p>

  <p className="font-semibold text-gray-900 text-lg">
    ₹{price?.itemsTotal || price.amount || 0}
  </p>

  <p className="text-xs text-gray-500">
    Method: {price.method || "COD"}
  </p>

  <p className="text-xs text-gray-500">
    Status: {price.status || "SUCCESS"}
  </p>

  {price.tax && (
    <p className="text-xs text-gray-500">
      Tax: ₹{price.tax}
    </p>
  )}
</div>

            </div>

            {/* Customer Details */}
            <section className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Customer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p className="flex items-center gap-2">
                  <FiUser /> {customer.name || "-"}
                </p>
                <p className="flex items-center gap-2">
                  <FiPhone /> {customer.phone || "-"}
                </p>
                <p className="flex items-center gap-2">
                  <FiMail /> {customer.email || "-"}
                </p>
                <p className="flex items-center gap-2 md:col-span-2">
                  <FiMapPin /> {deliveryAddress?.addressLine || "N/A"}
                </p>
              </div>
            </section>

            {/* Items */}
            <section className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Ordered Items</h3>
              {items.length ? (
                <div className="divide-y">
                  {items.map((item, i) => (
                    <div key={i} className="flex justify-between py-2 text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span className="font-medium">₹{item.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No items</p>
              )}
            </section>

            {/* Order Flow */}
            <section className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Order Flow</h3>
              <div className="flex flex-wrap gap-3">
                {STATUS_FLOW.map((s, i) => (
                  <span
                    key={s}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      STATUS_FLOW.indexOf(status) >= i
                        ? STATUS_COLORS[s]
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            {/* Delivery Details */}
            <section className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FiTruck /> Delivery Partner
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-3">
                <p><strong>Name:</strong> {deliveryFlow.partner.name}</p>
                <p><strong>Phone:</strong> {deliveryFlow.partner.phone}</p>
                <p><strong>Vehicle:</strong> {deliveryFlow.partner.vehicle}</p>
              </div>

              <div className="space-y-1 text-xs text-gray-600">
                <p className="flex items-center gap-2">
                  <FiClock /> Assigned: {new Date(deliveryFlow.assignedAt).toLocaleString()}
                </p>
                <p className="flex items-center gap-2">
                  <FiClock /> Picked: {new Date(deliveryFlow.pickedAt).toLocaleString()}
                </p>
                <p className="flex items-center gap-2">
                  <FiClock /> Delivered: {deliveryFlow.deliveredAt
                    ? new Date(deliveryFlow.deliveredAt).toLocaleString()
                    : "Pending"}
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsModal;