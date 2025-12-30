import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import OrderItem from './OrderItem';
import GlassCard from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';

const OrderCard = ({ order, onDelete, onEdit, onUpdateStatus }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { bg: 'bg-green-100', text: 'text-green-700', icon: '✓', label: 'Completed' },
      'cancelled': { bg: 'bg-red-100', text: 'text-red-700', icon: '✕', label: 'Cancelled' },
      'on-process': { bg: 'bg-blue-100', text: 'text-blue-700', icon: '⏳', label: 'On Process' }
    };
    const config = statusConfig[status];
    return (
      <span className={`${config.bg} ${config.text} px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 w-fit`}>
        <span>{config.icon}</span>
        {config.label}
      </span>
    );
  };

  return (
    <GlassCard className="overflow-hidden hover:border-blue-300/50 transition-all duration-300 bg-white dark:bg-gray-800">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-1">{order.date}</p>
            <h3 className="text-xl font-bold text-gray-800">{order.customer}</h3>
            <p className="text-sm text-gray-500">{order.orderId}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(order)}
              className="p-2 hover:bg-blue-50 rounded-lg transition-all duration-300 text-blue-600"
              title="Edit Order"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(order.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition-all duration-300 text-red-600"
              title="Delete Order"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          {getStatusBadge(order.status)}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">{order.type}</span>
            {order.table && (
              <>
                <span className="text-gray-400">•</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg font-semibold text-xs">
                  {order.table}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-5">
        <h4 className="text-sm font-bold text-gray-700 mb-3">Items</h4>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 font-semibold">Total</span>
          <span className="text-2xl font-bold text-blue-600">${order.total.toFixed(2)}</span>
        </div>
        
        {/* Status Update Buttons */}
        {order.status === 'on-process' && (
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => onUpdateStatus(order.id, 'completed')}
              className="flex-1 bg-green-500 text-white py-2 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 text-sm"
            >
              Mark Complete
            </button>
            <button
              onClick={() => onUpdateStatus(order.id, 'cancelled')}
              className="flex-1 bg-red-500 text-white py-2 rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 text-sm"
            >
              Cancel Order
            </button>
          </div>
        )}

        <div className="flex gap-3">
          <GradientButton variant="ghost" className="flex-1 text-gray-700 dark:text-gray-200 border-gray-200">
            See Details
          </GradientButton>
          <GradientButton className="flex-1">
            Pay Bills
          </GradientButton>
        </div>
      </div>
    </GlassCard>
  );
};

export default OrderCard;