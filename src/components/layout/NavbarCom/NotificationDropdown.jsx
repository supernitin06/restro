import React from "react";
import { createPortal } from "react-dom";
import { Check, X, Clock, Bell, User, Truck, Trash2 } from "lucide-react";
import { useUpdateOrderStatusMutation, useGetOrdersQuery } from "../../../api/services/orderApi"; 

const NotificationDrawer = ({
  isOpen,
  notifications,
  setNotifications,
  onClose,
  onClearAll,
}) => {
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  
  // Get refetch function to refresh OrderFlowTable
  const { refetch: refetchOrders } = useGetOrdersQuery({
    page: 1,
    limit: 5000,
  });

  const handleAction = async (orderId, action) => {
    if (!orderId) return;

    try {
      await updateOrderStatus({
        id: orderId,
        status: action === "accept" ? "ACCEPTED" : "REJECTED",
      }).unwrap();

      // Remove notification from drawer
      setNotifications((prev) =>
        prev.filter((n) => n.orderId !== orderId)
      );

      // Refresh OrderFlowTable
      refetchOrders(); 
    } catch (err) {
      console.error(err);
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case "order":
      case "success":
        return {
          card: "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800",
          iconBg: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
          Icon: Bell,
        };
      case "user":
        return {
          card: "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800",
          iconBg: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
          Icon: User,
        };
      case "delivery":
        return {
          card: "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-800",
          iconBg: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
          Icon: Truck,
        };
      case "delivered":
        return {
          card: "bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800",
          iconBg: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
          Icon: Check,
        };
      default:
        return {
          card: "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700",
          iconBg: "bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
          Icon: Bell,
        };
    }
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-[9999] transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } bg-white dark:bg-gray-900 shadow-2xl border-l border-gray-100 dark:border-gray-800 flex flex-col`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-800 dark:text-white" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-none">Notifications</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                You have {notifications.length} unread messages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                title="Clear all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-lg">No notifications</h3>
              <p className="text-gray-500 text-sm mt-1">We'll notify you when something arrives.</p>
            </div>
          ) : (
            notifications.map((item) => {
              const { card, iconBg, Icon } = getStyles(item.type);
              return (
              <div
                key={item.id}
                className={`group relative rounded-2xl p-4 shadow-sm border hover:shadow-md transition-all duration-200 ${card}`}
              >
                <div className="flex gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap flex items-center gap-1 bg-white/50 dark:bg-gray-800/50 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3" /> {item.time}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                      {item.message ? `Order #${item.orderId}` : item.message}
                    </p>

                    {(item.type === "order" || item.type === "success") && (
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleAction(item.orderId, "accept")}
                          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" /> Accept
                        </button>

                        <button
                          onClick={() => handleAction(item.orderId, "reject")}
                          className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-white dark:bg-gray-800 text-red-500 border border-gray-200 dark:border-gray-700 text-xs font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 transition-all shadow-sm"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )})
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default NotificationDrawer;
