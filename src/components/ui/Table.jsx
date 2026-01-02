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

const Table = ({
  data = [],
  columns = [],
  actions = [],
  className = "",
  title = "",
  subtitle = "",
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
      className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {/* Header */}
      {title && (
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase"
                >
                  {col.header}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="px-6 py-4">
                    <ActionButtons
                      item={item}
                      actions={actions}
                      size="sm"
                      variant="ghost"
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {data.length > 0 && (
        <div className="px-6 py-3 border-t bg-gray-50 text-sm text-gray-600">
          Showing <span className="font-medium">{data.length}</span> items
        </div>
      )}
    </div>
  );
};

export default Table;
