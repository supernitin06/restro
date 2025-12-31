// OrderDetailsModal.jsx
import React, { useState } from 'react';
import { X, Store, User, Phone, MapPin, Mail, Bike, Package, CreditCard, DollarSign, Calendar, Clock, Info } from 'lucide-react';
import RestaurantDetailsModal from './RestaurantDetailsModal';
import Button from '../ui/Button';

const OrderDetailsModal = ({ order, onClose }) => {
  const [showRestaurant, setShowRestaurant] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full my-8">

          {/* Header */}
          <div className="bg-gradient-sidebar p-5 flex justify-between items-center rounded-t-2xl sticky top-0 z-10">
            <div>
              <h2 className="text-2xl font-bold text-white">Order Details</h2>
              <p className="text-sm mt-1 text-white/80">{order.orderId}</p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 p-2 rounded-lg transition-all text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

            {/* Restaurant Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <Store size={18} className="text-primary" />
                  Restaurant Information
                </h3>
                <button
                  onClick={() => setShowRestaurant(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-xs font-semibold"
                >
                  <Info size={14} />
                  View Details
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Branch</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {order.restaurant.name}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Contact</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {order.restaurant.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border-2 border-gray-100 dark:border-gray-600">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-3">
                <User size={18} className="text-primary" />
                Customer Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {order.customer}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <Phone size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {order.customerPhone}
                    </p>
                  </div>
                </div>
                {order.customerAddress && (
                  <div className="flex items-start gap-3 md:col-span-2">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <MapPin size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {order.customerAddress}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Partner (if assigned) */}
            {order.deliveryPartner && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border-2 border-purple-100 dark:border-purple-800">
                <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-3">
                  <Bike size={18} className="text-purple-600" />
                  Delivery Partner
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-sm">
                      <Bike size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-100">
                        {order.deliveryPartner.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {order.deliveryPartner.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">
                      {order.deliveryPartner.status}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Vehicle: {order.deliveryPartner.vehicle}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border-2 border-gray-100 dark:border-gray-600">
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-3">
                <Package size={18} className="text-primary" />
                Order Items ({order.items.length})
              </h3>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-600 dark:to-gray-500 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl shadow-sm">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment & Total */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border-2 border-green-100 dark:border-green-800">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard size={18} className="text-green-600" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Payment Method
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-lg text-sm font-bold text-gray-800 dark:text-gray-100">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="h-px bg-green-200 dark:bg-green-800"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-100">
                    ${order.subtotal.toFixed(2)}
                  </span>
                </div>
                {order.deliveryFee > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Delivery Fee</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      ${order.deliveryFee.toFixed(2)}
                    </span>
                  </div>
                )}
                {order.tax > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-100">
                      ${order.tax.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="h-px bg-green-200 dark:bg-green-800"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign size={20} className="text-green-600" />
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      Total Amount
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Calendar size={16} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Order Date</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{order.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Clock size={16} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Order Time</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{order.time}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 sticky bottom-0">
            <Button onClick={onClose} className="w-full" variant="primary">
              Close Details
            </Button>
          </div>
        </div>
      </div>

      {showRestaurant && (
        <RestaurantDetailsModal
          restaurant={order.restaurant}
          onClose={() => setShowRestaurant(false)}
        />
      )}
    </>
  );
};

export default OrderDetailsModal;