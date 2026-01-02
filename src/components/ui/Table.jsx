import React from "react";
import {
  Mail,
  Phone,
  User,
  ShoppingBag,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import Badge from "../ui/Badge";
import ActionButtons from "../ui/UserAction";

// Default column configuration
const DEFAULT_COLUMNS = [
  { key: "customer", label: "Customer" },
  { key: "amount", label: "Amount", payment: true },
  { key: "date", label: "Date", payment: true },
  { key: "method", label: "Method", payment: true },
  { key: "contact", label: "Contact" },
  { key: "membership", label: "Membership" },
  { key: "stats", label: "Stats" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

const UserTable = ({
  users = [],
  actions = [],
  showPaymentInfo = false,
  columns = DEFAULT_COLUMNS,
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

  // Filter columns based on showPaymentInfo
  const visibleColumns = columns.filter(
    (col) => showPaymentInfo || !col.payment
  );

  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Customers</h2>
        <p className="text-sm text-gray-500 mt-1">
          {users.length} total •{" "}
          {users.filter((u) => u.status === "active").length} active
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Reusable Table Head */}
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                {/* Customer */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      {user.invoice && (
                        <p className="text-xs text-gray-500">#{user.invoice}</p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Payment */}
                {showPaymentInfo && (
                  <>
                    <td className="px-6 py-4 font-semibold">
                      {formatCurrency(user.amount)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(user.date)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge>{user.method}</Badge>
                    </td>
                  </>
                )}

                {/* Contact */}
                <td className="px-6 py-4 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail className="w-4 h-4 text-blue-600" />
                    {user.email}
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone className="w-4 h-4 text-green-600" />
                      {user.phone}
                    </div>
                  )}
                </td>

                {/* Membership */}
                <td className="px-6 py-4">
                  <Badge>{user.membership}</Badge>
                </td>

                {/* Stats */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-pink-600" />
                    <span className="font-medium">{user.totalOrders || 0} orders</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(user.status)}
                    <Badge>{user.status}</Badge>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
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
        <div className="px-6 py-3 border-t bg-gray-50 text-sm text-gray-600">
          Showing <span className="font-medium">{users.length}</span> customers
        </div>
      )}
    </div>
  );
};

export default UserTable;
