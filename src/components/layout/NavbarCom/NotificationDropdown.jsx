import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Clock, Bell, X } from "lucide-react";
import { FiCheckSquare } from "react-icons/fi";
import { toast } from "react-hot-toast";

import {
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} from "../../../api/services/notificationApi";

import {
  useUpdateOrderStatusMutation,
  useGetOrdersQuery,
} from "../../../api/services/orderApi";

const NotificationDrawer = ({ isOpen, onClose }) => {
  const { data, refetch } = useGetNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const { refetch: refetchOrders } = useGetOrdersQuery({ page: 1, limit: 5000 });

  const prevUnreadRef = useRef(0);

  const notifications = data?.data || [];

  const normalizedNotifications = notifications.map((n) => ({
    id: n._id,
    type: n.type === "NEW_ORDER" ? "order" : "system",
    title: n.title,
    message: n.message,
    orderId: n.data?.orderId,
    isRead: n.isRead,
    time: new Date(n.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const unreadCount = normalizedNotifications.filter((n) => !n.isRead).length;

  /* 🔔 TOAST ON NEW NOTIFICATION */
  useEffect(() => {
    if (!data?.data) return;

    const unread = data.data.filter((n) => !n.isRead);

    if (unread.length > prevUnreadRef.current) {
      const latest = unread[0];

      toast.success(latest.title || "New Notification", {
        description: latest.message,
        duration: 3000,
      });
    }

    prevUnreadRef.current = unread.length;
  }, [data]);

  useEffect(() => {
    if (isOpen) refetch();
  }, [isOpen, refetch]);

  const handleAction = async (item, action) => {
    if (!item.orderId) return;
    try {
      await updateOrderStatus({
        id: item.orderId,
        status: action === "accept" ? "ACCEPTED" : "REJECTED",
      }).unwrap();

      toast.success(
        action === "accept" ? "Order Accepted" : "Order Rejected",
      );

      refetch();
      refetchOrders();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const markasread = async (id) => {
    try {
      await markRead(id).unwrap();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAll = async () => {
    try {
      await markAllRead().unwrap();
      toast.success("All notifications marked as read");
      refetch();
    } catch (err) {
      toast.error("Failed to clear notifications");
    }
  };

  /* 🎨 DYNAMIC COLORS BASED ON NOTIFICATION */
  const getStyles = (item) => {
    if (item.type === "order") {
      if (item.title?.toLowerCase().includes("accepted")) {
        return {
          card: "bg-green-50 border border-green-200",
          iconBg: "bg-green-100 text-green-600",
        };
      }

      if (item.title?.toLowerCase().includes("rejected")) {
        return {
          card: "bg-gray-100 border border-gray-300",
          iconBg: "bg-gray-200 text-gray-600",
        };
      }

      return {
        card: "bg-red-50 border border-red-200",
        iconBg: "bg-red-100 text-red-600",
      };
    }

    return {
      card: "bg-blue-50 border border-blue-200",
      iconBg: "bg-blue-100 text-blue-600",
    };
  };

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/10 z-[9998] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-[9999] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } bg-gray-50 shadow-xl border-l flex flex-col`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-6 h-6 text-red-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-800">
                Notifications
              </h2>
              <p className="text-xs text-gray-500">{unreadCount} unread</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleClearAll}
              disabled={unreadCount === 0}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                unreadCount === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600"
              }`}
            >
              <FiCheckSquare className="w-4 h-4" />
              All Read
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {normalizedNotifications.length === 0 ? (
            <p className="text-center text-gray-400 mt-20">
              No notifications
            </p>
          ) : (
            normalizedNotifications.map((item) => {
              const { card, iconBg } = getStyles(item);

              return (
                <div
                  key={item.id}
                  onClick={() => markasread(item.id)}
                  className={`rounded-xl p-4 border shadow-sm hover:shadow-md transition cursor-pointer ${
                    item.isRead ? "opacity-70" : ""
                  } ${card}`}
                >
                  <div className="flex gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}
                    >
                      <Bell className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold text-sm text-gray-800">
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {item.time}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">
                        {item.message}
                      </p>

                      {item.type === "order" && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleAction(item, "accept")}
                            className="flex-1 bg-green-100 text-green-700 text-xs py-1.5 rounded-lg hover:bg-green-200"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleAction(item, "reject")}
                            className="flex-1 bg-red-100 text-red-700 text-xs py-1.5 rounded-lg hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default NotificationDrawer;
