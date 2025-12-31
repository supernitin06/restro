import React from 'react';
import { Mail, Phone, CreditCard, Calendar, DollarSign } from 'lucide-react';
import Badge from '../ui/Badge';
import ActionButtons from '../ui/ActionButton';

const Table = ({ 
  users = [], 
  actions = [], 
  onToggleStatus, 
  showPaymentInfo = false,
  className = ''
}) => {
  
  // Format currency display
  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    if (typeof amount === 'string' && amount.startsWith('$')) return amount;
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`overflow-x-auto overflow-y-auto rounded-2xl border border-white/20 scrollbar-hide max-h-[500px] ${className}`}>
      <table className="min-w-full">
        <thead>
          <tr className="bg-white/10 border-b border-white/20">
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Customer</th>
            {showPaymentInfo && (
              <>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Method</th>
              </>
            )}
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Contact</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Membership</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Stats</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
              {/* Customer Name */}
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold text-white">{user.name}</p>
                  {showPaymentInfo && user.invoice && (
                    <p className="text-xs text-gray-400">Invoice: {user.invoice}</p>
                  )}
                </div>
              </td>

              {/* Payment Information Columns */}
              {showPaymentInfo && (
                <>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="font-bold text-green-400">
                        {formatCurrency(user.amount)}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {formatDate(user.date)}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <Badge type="paymentMethod">{user.method}</Badge>
                    </div>
                  </td>
                </>
              )}

              {/* Contact Info */}
              <td className="px-6 py-4 space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{user.phone || 'N/A'}</span>
                </div>
              </td>

              {/* Membership */}
              <td className="px-6 py-4">
                <Badge type={user.membership}>{user.membership}</Badge>
              </td>

              {/* Stats */}
              <td className="px-6 py-4">
                <div>
                  <p className="text-gray-300">{user.totalOrders || 0} orders</p>
                  {showPaymentInfo && user.amount && (
                    <p className="text-xs text-gray-400">
                      {formatCurrency(user.amount)}
                    </p>
                  )}
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                {onToggleStatus ? (
                  <button 
                    onClick={() => onToggleStatus(user.id)}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Badge type={user.status}>{user.status}</Badge>
                  </button>
                ) : (
                  <Badge type={user.status}>{user.status}</Badge>
                )}
              </td>

              {/* Actions - Apna ActionButtons component use karo */}
              <td className="px-6 py-4">
                <ActionButtons
                  item={user}
                  actions={actions}
                  maxVisible={2}
                  size="sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No data found</p>
        </div>
      )}
    </div>
  );
};

export default Table;