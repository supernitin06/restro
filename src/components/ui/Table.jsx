import React from "react";
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
  AlertCircle,
} from "lucide-react";
import Badge from "../ui/Badge";
import ActionButtons from "../ui/UserAction";

const UserTable = ({
  users = [],
  actions = [],
  onToggleStatus,
  showPaymentInfo = false,
  className = "",
}) => {
  const formatCurrency = (amount) => {
    if (!amount) return "$0.00";
    const num = parseFloat(amount);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(num);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "inactive":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <User className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div
      className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Customers</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {users.length} total •{" "}
          {users.filter((u) => u.status === "active").length} active
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-gray-900/50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Customer
              </th>
              {showPaymentInfo && (
                <>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Method
                  </th>
                </>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Membership
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Stats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                {/* Customer */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg highlight-bg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                      {user.invoice && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          #{user.invoice}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Payment */}
                {showPaymentInfo && (
                  <>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      {formatCurrency(user.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {formatDate(user.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge>{user.method}</Badge>
                    </td>
                  </>
                )}

                {/* Contact */}
                <td className="px-6 py-4 space-y-1 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Mail className="w-4 h-4 text-blue-500" />
                    {user.email}
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Phone className="w-4 h-4 text-green-500" />
                      {user.phone}
                    </div>
                  )}
                </td>

                {/* Membership */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge>{user.membership}</Badge>
                </td>

                {/* Stats */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-pink-500" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {user.totalOrders || 0} orders
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(user.status)}
                    <Badge>{user.status}</Badge>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <ActionButtons
                    item={user}
                    actions={actions}
                    size="sm"
                    variant="ghost"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {users.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-medium text-gray-900 dark:text-white">{users.length}</span> customers
        </div>
      )}
    </div>
  );
};

export default UserTable;
