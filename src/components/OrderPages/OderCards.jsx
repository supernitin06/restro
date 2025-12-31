import React from 'react';
import { Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';
import OrderItem from './OrderItem';
import GlassCard from '../ui/GlassCard';
import GradientButton from '../ui/GradientButton';

const OrderCard = ({ order, onDelete, onEdit, onUpdateStatus, viewMode }) => {
  const statusConfig = {
    'completed': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: CheckCircle, label: 'Completed' },
    'cancelled': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: XCircle, label: 'Cancelled' },
    'on-process': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', icon: Clock, label: 'Processing' }
  };
  
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  if (viewMode === 'list') {
    return (
      <GlassCard className="overflow-hidden hover:border-primary/50 transition-all duration-300">
        <div className="p-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Order Info */}
            <div className="flex items-center gap-4 flex-1 min-w-[200px]">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">{order.orderId.replace('#ORDER', '#')}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 truncate">{order.customer}</h3>
                <p className="text-xs text-muted flex items-center gap-2 mt-0.5">
                  <Clock size={12} />
                  {order.time} • {order.date}
                </p>
              </div>
            </div>

            {/* Type & Table */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-semibold">
                {order.type}
              </span>
              {order.table && (
                <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-lg text-xs font-semibold">
                  {order.table}
                </span>
              )}
            </div>

            {/* Status */}
            <div className={`${config.bg} ${config.text} px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5`}>
              <StatusIcon size={14} />
              {config.label}
            </div>

            {/* Items Count */}
            <div className="text-sm text-muted">
              <span className="font-semibold">{order.items.length}</span> items
            </div>

            {/* Total */}
            <div className="text-right min-w-[80px]">
              <span className="text-xl font-bold text-primary">${order.total.toFixed(2)}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-1.5">
              {order.status === 'on-process' && (
                <>
                  <button
                    onClick={() => onUpdateStatus(order.id, 'completed')}
                    className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all text-green-600 dark:text-green-400"
                    title="Complete"
                  >
                    <CheckCircle size={16} />
                  </button>
                  <button
                    onClick={() => onUpdateStatus(order.id, 'cancelled')}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all text-red-600 dark:text-red-400"
                    title="Cancel"
                  >
                    <XCircle size={16} />
                  </button>
                </>
              )}
              <button
                onClick={() => onEdit(order)}
                className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all text-primary"
                title="Edit"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => onDelete(order.id)}
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all text-red-600 dark:text-red-400"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }

  // Grid View (Card)
  return (
    <GlassCard className="overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted mb-1">{order.time}</p>
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">{order.customer}</h3>
            <p className="text-sm text-primary font-semibold">{order.orderId}</p>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => onEdit(order)}
              className="p-1.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all text-primary"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(order.id)}
              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all text-red-600 dark:text-red-400"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className={`${config.bg} ${config.text} px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
            <StatusIcon size={13} />
            {config.label}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold">
              {order.type}
            </span>
            {order.table && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg font-semibold">
                {order.table}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="px-4 py-1 flex-1 overflow-y-auto">
        <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wide">Items ({order.items.length})</h4>
        <div className="space-y-2">
          {order.items.slice(0, 3).map((item, index) => (
            <OrderItem key={index} item={item} />
          ))}
          {order.items.length > 3 && (
            <p className="text-xs text-muted text-center py-1">+{order.items.length - 3} more items</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Total Amount</span>
          <span className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</span>
        </div>
        
        {order.status === 'on-process' && (
          <div className="flex gap-2">
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
      </div>
    </GlassCard>
  );
};

export default OrderCard;