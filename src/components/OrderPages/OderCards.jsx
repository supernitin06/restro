// OrderCard.jsx
import React, { useState } from 'react';
import { Edit, Trash2, CheckCircle, XCircle, Clock, Info, Bike, CreditCard, Eye } from 'lucide-react';
import OrderItem from './OrderItem';
import OrderDetailsModal from './OrderDetailsModal';
import GlassCard from '../ui/GlassCard';

const OrderCard = ({ order, onDelete, onEdit, onUpdateStatus, viewMode }) => {
  const [showDetails, setShowDetails] = useState(false);

  const statusConfig = {
    'completed': { 
      bg: 'bg-green-100 dark:bg-green-900/30', 
      text: 'text-green-700 dark:text-green-400', 
      icon: CheckCircle, 
      label: 'Completed' 
    },
    'cancelled': { 
      bg: 'bg-red-100 dark:bg-red-900/30', 
      text: 'text-red-700 dark:text-red-400', 
      icon: XCircle, 
      label: 'Cancelled' 
    },
    'on-process': { 
      bg: 'bg-blue-100 dark:bg-blue-900/30', 
      text: 'text-blue-700 dark:text-blue-400', 
      icon: Clock, 
      label: 'Processing' 
    }
  };
  
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  // ============= LIST VIEW =============
  if (viewMode === 'list') {
    return (
      <>
        <GlassCard className="overflow-hidden hover:border-primary/50 transition-all duration-300">
          <div className="p-3.5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              
              {/* Order Info */}
              <div className="flex items-center gap-3 flex-1 min-w-[180px]">
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {order.orderId.replace('#ORDER', '#')}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">
                    {order.customer}
                  </h3>
                  <p className="text-xs text-muted flex items-center gap-1.5">
                    <Clock size={11} />
                    {order.time}
                  </p>
                </div>
              </div>

              {/* Restaurant Info Icon */}
              <button
                onClick={() => setShowDetails(true)}
                className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all text-blue-600 dark:text-blue-400 group"
                title="View Full Details"
              >
                <Info size={16} className="group-hover:scale-110 transition-transform" />
              </button>

              {/* Delivery Partner */}
              {order.deliveryPartner && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Bike size={14} className="text-purple-600" />
                  <span className="text-xs font-semibold text-purple-700 dark:text-purple-400">
                    {order.deliveryPartner.name}
                  </span>
                </div>
              )}

              {/* Type & Table */}
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold">
                  {order.type}
                </span>
                {order.table && (
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold">
                    {order.table}
                  </span>
                )}
              </div>

              {/* Status */}
              <div className={`${config.bg} ${config.text} px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
                <StatusIcon size={13} />
                {config.label}
              </div>

              {/* Payment */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CreditCard size={13} className="text-green-600" />
                <span className="text-xs font-semibold text-green-700 dark:text-green-400">
                  {order.paymentMethod}
                </span>
              </div>

              {/* Total */}
              <div className="text-right min-w-[70px]">
                <span className="text-lg font-bold text-primary">
                  ${order.total.toFixed(2)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-1">
                <button
                  onClick={() => setShowDetails(true)}
                  className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all text-blue-600 dark:text-blue-400"
                  title="View Details"
                >
                  <Eye size={15} />
                </button>
                
                {order.status === 'on-process' && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(order.id, 'completed')}
                      className="p-1.5 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all text-green-600 dark:text-green-400"
                      title="Complete Order"
                    >
                      <CheckCircle size={15} />
                    </button>
                    <button
                      onClick={() => onUpdateStatus(order.id, 'cancelled')}
                      className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all text-red-600 dark:text-red-400"
                      title="Cancel Order"
                    >
                      <XCircle size={15} />
                    </button>
                  </>
                )}
                
                <button
                  onClick={() => onEdit(order)}
                  className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all text-primary"
                  title="Edit Order"
                >
                  <Edit size={15} />
                </button>
                
                <button
                  onClick={() => onDelete(order.id)}
                  className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all text-red-600 dark:text-red-400"
                  title="Delete Order"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        </GlassCard>

        {showDetails && (
          <OrderDetailsModal 
            order={order} 
            onClose={() => setShowDetails(false)} 
          />
        )}
      </>
    );
  }

  // ============= GRID VIEW (CARD) =============
  return (
    <>
      <GlassCard className="overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col">
        
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1 min-w-0 flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 truncate">
                  {order.customer}
                </h3>
                <button
                  onClick={() => setShowDetails(true)}
                  className="p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-all text-blue-600 dark:text-blue-400"
                  title="View Full Details"
                >
                  <Info size={14} />
                </button>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => onEdit(order)}
                className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all text-primary"
                title="Edit"
              >
                <Edit size={14} />
              </button>
              <button
                onClick={() => onDelete(order.id)}
                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all text-red-600 dark:text-red-400"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            {/* Row 1: Order ID & Time (Left) - Payment (Right) */}
            <div className="flex justify-between items-center">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-bold hover:bg-primary/20 transition-colors cursor-default">
                {order.orderId}
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-default">
                <Clock size={12} />
                {order.time}
              </span>
              <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-md text-xs font-semibold flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors cursor-default">
                <CreditCard size={12} />
                {order.paymentMethod}
              </span>
            </div>

            {/* Row 2: Status (Left) - Type (Right) */}
            <div className="flex justify-between items-center">
              <div className={`${config.bg} ${config.text} px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 hover:opacity-80 transition-opacity cursor-default`}>
                <StatusIcon size={12} />
                {config.label}
              </div>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-default">
                {order.type} {order.table && `• ${order.table}`}
              </span>
            </div>

            {/* Row 3: Delivery Partner (Left) - Status (Right) */}
            {order.deliveryPartner && (
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-md text-xs font-semibold hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors cursor-default">
                  <Bike size={12} />
                  <span>{order.deliveryPartner.name}</span>
                </div>
                <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-md text-xs font-bold hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors cursor-default">
                  {order.deliveryPartner.status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Items */}
        <div className="px-4 py-2 flex-1">
          <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Items ({order.items.length})
          </h4>
          <div className="space-y-2 max-h-[110px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {order.items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
              Total Amount
            </span>
            <span className="text-2xl font-bold text-primary">
              ${order.total.toFixed(2)}
            </span>
          </div>
          
          {/* Status Action Buttons */}
          {order.status === 'on-process' && (
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => onUpdateStatus(order.id, 'completed')}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition-all text-sm flex items-center justify-center gap-1.5"
              >
                <CheckCircle size={16} />
                Complete
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'cancelled')}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-all text-sm flex items-center justify-center gap-1.5"
              >
                <XCircle size={16} />
                Cancel
              </button>
            </div>
          )}

          {/* View Details Button */}
          {/* <button
            onClick={() => setShowDetails(true)}
            className="w-full btn btn-primary flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            View Full Details
          </button> */}
        </div>
      </GlassCard>

      {showDetails && (
        <OrderDetailsModal 
          order={order} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
};

export default OrderCard;