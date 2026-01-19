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
  FiFileText,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";

const STATUS_FLOW = ["PLACED", "ACCEPTED", "PREPARING", "READY", "ASSIGNED", "OUT_FOR_DELIVERY", "DELIVERED"];

const STATUS_COLORS = {
  PLACED: "bg-gray-100 text-gray-700 border-gray-200",
  ACCEPTED: "bg-blue-50 text-blue-700 border-blue-200",
  PREPARING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  READY: "bg-purple-50 text-purple-700 border-purple-200",
  ASSIGNED: "bg-indigo-50 text-indigo-700 border-indigo-200",
  OUT_FOR_DELIVERY: "bg-orange-50 text-orange-700 border-orange-200",
  DELIVERED: "bg-green-50 text-green-700 border-green-200",
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
    payment = {},
    deliveryAddress = {},
    status,
    timeline = [],
  } = order;

  // 🔹 Dummy delivery flow (until API)
  const deliveryFlow = {
    partner: delivery.partner || {
      name: "Assigning...",
      phone: "-",
      vehicle: "-",
    },
    assignedAt: delivery.assignedAt,
    pickedAt: delivery.pickedAt,
    deliveredAt: delivery.deliveredAt,
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
      <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="bg-primary w-full max-w-6xl rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 bg-indigo-600 text-white shrink-0">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-3">
                Order #{orderId}
                <span className="bg-primary text-white px-2 py-0.5 rounded text-xs font-medium border border-white/30 backdrop-blur-sm">
                  {status}
                </span>
              </h2>
              <p className="text-indigo-100 text-xs mt-0.5">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-primary hover:bg-primary/20 rounded-full transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto bg-primary p-6">

            {/* Timeline Row */}
            <div className="mb-6 bg-primary p-4 rounded-xl shadow-sm border border-gray-100 overflow-x-auto custom-scrollbar">
              <div className="flex justify-between items-center min-w-max gap-4">
                {STATUS_FLOW.map((s, i) => {
                  const stepInfo = timeline?.find(t => t.status === s);
                  const isCompleted = stepInfo || STATUS_FLOW.indexOf(status) >= i;
                  const isCurrent = status === s;

                  return (
                    <div key={s} className="flex flex-col items-center relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${isCurrent ? "bg-indigo-600 border-indigo-600 text-white ring-4 ring-indigo-50" :
                          isCompleted ? "bg-green-500 border-green-500 text-white" :
                            "bg-primary border-gray-200 text-gray-300"
                        }`}>
                        {isCompleted ? <FiCheckCircle className="w-4 h-4" /> : (i + 1)}
                      </div>
                      <span className={`text-[10px] mt-2 font-bold uppercase tracking-wider ${isCurrent ? "text-indigo-700" : isCompleted ? "text-green-600" : "text-gray-400"
                        }`}>
                        {s.replace(/_/g, " ")}
                      </span>
                      {stepInfo?.at && (
                        <span className="text-[9px] text-gray-500 mt-0.5 font-medium">
                          {new Date(stepInfo.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                  );
                })}
                {/* Connecting line background would go here if absolute positioning logic was added, keeping simple for now */}
              </div>
            </div>

            {/* Main 3-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Left: Customer & Delivery (3 Cols) */}
              <div className="lg:col-span-3 space-y-4">
                {/* Customer Card */}
                <div className="bg-primary p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FiUser className="text-indigo-500" /> Customer
                  </h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        {customer.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 leading-tight">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.phone}</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-50">
                      <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><FiMapPin /> Delivery Location</p>
                      <p className="text-xs font-medium text-gray-700 leading-relaxed">
                        {deliveryAddress.addressLine}, {deliveryAddress.city}
                        {deliveryAddress.pincode && ` - ${deliveryAddress.pincode}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Delivery Partner */}
                <div className="bg-primary p-4 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FiTruck className="text-indigo-500" /> Delivery Agent
                  </h3>
                  {deliveryFlow.partner._id ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Name</span>
                        <span className="font-semibold text-gray-800">{deliveryFlow.partner.name}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Phone</span>
                        <span className="font-semibold text-gray-800">{deliveryFlow.partner.phone}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-50 space-y-1 text-[10px] text-gray-400">
                        <p>Assigned: {deliveryFlow.assignedAt ? new Date(deliveryFlow.assignedAt).toLocaleTimeString() : '-'}</p>
                        <p>Picked: {deliveryFlow.pickedAt ? new Date(deliveryFlow.pickedAt).toLocaleTimeString() : '-'}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-orange-50 text-orange-600 text-xs p-3 rounded-lg text-center font-medium">
                      Looking for a partner...
                    </div>
                  )}
                </div>
              </div>

              {/* Center: Items (6 Cols) */}
              <div className="lg:col-span-6 flex flex-col h-full min-h-[400px]">
                <div className="bg-indigo rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-indigo">
                    <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                      <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">{items.length}</span>
                      Items Ordered
                    </h3>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                      Total: ₹{price.itemsTotal}
                    </span>
                  </div>

                  <div className="overflow-y-auto flex-1 p-2 custom-scrollbar space-y-1">
                    {items.map((item, i) => ( 
                      <div key={i} className="flex gap-3 p-3 hover:bg-primary/20 rounded-lg transition-colors border border-transparent hover:border-gray-100 group">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg shrink-0 overflow-hidden relative">
                          {/* Placeholder for item image if available */}
                          <div className="absolute inset-0 flex items-center justify-center text-primary">
                            <FiFileText />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-primary">{item.name}</h4>
                            <span className="text-sm font-bold text-primary">₹{item.finalItemPrice}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                              x{item.quantity}
                            </span>
                            {item.addons?.length > 0 && (
                              <div className="flex gap-1">
                                {item.addons.map((add, idx) => (
                                  <span key={idx} className="text-[10px] text-primary bg-gray-100 px-1.5 py-0.5 rounded">
                                    {add.name}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Payment & Summary (3 Cols) */}
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-primary rounded-xl shadow-md border border-indigo-100 overflow-hidden">
                  <div className="p-4 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
                    <h3 className="text-sm font-bold flex items-center gap-2 opacity-90">
                      <FiDollarSign className="text-indigo-200" /> Payment Info
                    </h3>
                    <div className="mt-3 flex justify-between items-end">
                      <div>
                        <p className="text-xs text-indigo-200 uppercase tracking-wide">Grand Total</p>
                        <p className="text-2xl font-bold">₹{price.grandTotal}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${(payment.status === "PAID" || price.status === "PAID")
                            ? "bg-green-400 text-green-900"
                            : "bg-orange-400 text-orange-900"
                          }`}>
                          {payment.status || "PENDING"}
                        </span>
                        <p className="text-xs text-indigo-200 mt-1">{payment.method || "COD"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 bg-primary">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Item Total</span>
                      <span className="font-medium">₹{price.itemsTotal}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Tax</span>
                      <span className="font-medium text-red-500">+ ₹{price.tax}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-blue-500">+ ₹{price.deliveryFee}</span>
                    </div>
                    {price.discount > 0 && (
                      <div className="flex justify-between text-xs text-green-600 font-bold bg-green-50 p-1 rounded">
                        <span>Discount</span>
                        <span>- ₹{price.discount}</span>
                      </div>
                    )}

                    <div className="border-t border-dashed pt-3 mt-1">
                      <div className="flex justify-between text-sm font-bold text-gray-800">
                        <span>To Pay</span>
                        <span>₹{price.grandTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions/One-liners could go here */}
                {/* <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-center">
                  <p className="text-xs text-blue-800 font-medium">Customer has {order.totalOrders || 1} previous orders</p>
                </div> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsModal;
