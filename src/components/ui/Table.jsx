import React from 'react';
import { 
  Mail, 
  Phone, 
  CreditCard, 
  Calendar, 
  DollarSign,
  User,
  FileText,
  ShoppingBag,
  CheckCircle,
  Star,
  Clock,
  AlertCircle
} from 'lucide-react';
import Badge from '../ui/Badge';
import ActionButtons from '../ui/UserAction';

const UserTable = ({ 
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
    const num = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
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

  // Get status icon
  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
      
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Customers
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {users.length} total • {users.filter(u => u.status === 'active').length} active
            </p>
          </div>
          {showPaymentInfo && (
            <div className="px-3 py-1.5 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-medium text-gray-900">
                  {formatCurrency(users.reduce((sum, user) => sum + (parseFloat(user.amount) || 0), 0))}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table Container - Scroll handling */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            {/* Header */}
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                {showPaymentInfo && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Method
                    </th>
                  </>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Membership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Stats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  }`}
                >
                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          {user.verified && (
                            <span className="inline-flex items-center px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                              <CheckCircle className="w-3 h-3 mr-0.5" />
                              Verified
                            </span>
                          )}
                        </div>
                        {showPaymentInfo && user.invoice && (
                          <div className="flex items-center gap-1.5 mt-1">
                            <FileText className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              #{user.invoice}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Payment Info */}
                  {showPaymentInfo && (
                    <>
                      {/* Amount */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-green-100">
                            <DollarSign className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(user.amount)}
                          </span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-purple-100">
                            <Calendar className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-sm text-gray-700">
                            {formatDate(user.date)}
                          </span>
                        </div>
                      </td>

                      {/* Payment Method */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-md bg-primary">
                            <CreditCard className="w-4 h-4 text-orange-600" />
                          </div>
                          <Badge 
                            type="paymentMethod"
                            variant="outline"
                            className="border-gray-200"
                          >
                            {user.method}
                          </Badge>
                        </div>
                      </td>
                    </>
                  )}

                  {/* Contact */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <a 
                        href={`mailto:${user.email}`}
                        className="flex items-center gap-2 group"
                      >
                        <div className="p-1.5 rounded-md bg-blue-100 group-hover:bg-blue-200 transition-colors">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                          {user.email}
                        </span>
                      </a>
                      
                      {user.phone && (
                        <a 
                          href={`tel:${user.phone}`}
                          className="flex items-center gap-2 group"
                        >
                          <div className="p-1.5 rounded-md bg-green-100 group-hover:bg-green-200 transition-colors">
                            <Phone className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-green-600 transition-colors">
                            {user.phone}
                          </span>
                        </a>
                      )}
                    </div>
                  </td>

                  {/* Membership */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-yellow-100">
                        <Star className="w-4 h-4 text-yellow-600" />
                      </div>
                      <Badge 
                        type={user.membership}
                        className="text-sm"
                      >
                        {user.membership}
                      </Badge>
                    </div>
                  </td>

                  {/* Stats */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-pink-100">
                        <ShoppingBag className="w-4 h-4 text-pink-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {user.totalOrders || 0} orders
                        </p>
                        {user.lifetimeValue && (
                          <p className="text-xs text-gray-500">
                            {formatCurrency(user.lifetimeValue)} lifetime
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-gray-100">
                        {getStatusIcon(user.status)}
                      </div>
                      {onToggleStatus ? (
                        <button 
                          onClick={() => onToggleStatus(user.id)}
                          className="hover:opacity-80 transition-opacity"
                        >
                          <Badge 
                            type={user.status}
                            className="text-sm"
                          >
                            {user.status}
                          </Badge>
                        </button>
                      ) : (
                        <Badge 
                          type={user.status}
                          className="text-sm"
                        >
                          {user.status}
                        </Badge>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <ActionButtons
                      item={user}
                      actions={actions}
                      maxVisible={2}
                      size="sm"
                      variant="ghost"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="py-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <User className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-2">
                No customers found
              </h3>
              <p className="text-sm text-gray-500">
                Adjust your search or add new customers
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {users.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-600">
              Showing <span className="font-medium text-gray-900">{users.length}</span> customers
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-600">
                  Active: <span className="font-medium">{users.filter(u => u.status === 'active').length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-gray-600">
                  Pending: <span className="font-medium">{users.filter(u => u.status === 'pending').length}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-gray-600">
                  Inactive: <span className="font-medium">{users.filter(u => u.status === 'inactive').length}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;