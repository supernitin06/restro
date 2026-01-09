import React, { useEffect, useState } from "react";
import { Clock, MapPin, CheckCircle, XCircle, Star } from "lucide-react";
import Button from "../../components/ui/Button";
import {
  useGetOrdersQuery,
  useOrderStatusUpdateMutation,
} from "../../api/services/orderApi";
import { useSockets } from "../../context/SocketContext";
import { showSuccessAlert, showErrorAlert } from "../../utils/toastAlert";

/* ===============================
   STYLES
================================ */
const membershipStyles = {
  Gold: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Silver: "bg-gray-100 text-gray-700 border border-gray-200",
  Regular: "bg-sky-50 text-sky-700 border border-sky-200",
};

const statusBorder = {
  placed: "border-sky-200",
  confirmed: "border-green-200",
  rejected: "border-red-200",
};

/* ===============================
   COMPONENT
================================ */
const NewOrders = () => {
  const { ordersSocket } = useSockets();

  /* ✅ Load from localStorage on first render */
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem("newOrders");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  /* 🔹 Fetch only placed orders */
  const { data } = useGetOrdersQuery({ status: "placed" });
  const [updateStatus, { isLoading }] = useOrderStatusUpdateMutation();

  /* ===============================
     API → MERGE (NO OVERWRITE)
  ================================ */
  useEffect(() => {
    if (!data?.orders) return;

    setOrders((prev) => {
      const map = new Map(prev.map((o) => [o._id, o]));

      data.orders.forEach((order) => {
        if (!map.has(order._id)) {
          map.set(order._id, order);
        }
      });
      console.log(data.orders);
      const merged = Array.from(map.values());
      localStorage.setItem("newOrders", JSON.stringify(merged));
      return merged;
    });
  }, [data]);

  /* ===============================
     SOCKET → NEW ORDER
  ================================ */
  useEffect(() => {
    if (!ordersSocket) return;

    const handleNewOrder = (order) => {
      showSuccessAlert(`New Order Received: ${order.customOrderId}`);

      setOrders((prev) => {
        const exists = prev.some((o) => o._id === order._id);
        if (exists) return prev;

        const updated = [order, ...prev];
        localStorage.setItem("newOrders", JSON.stringify(updated));
        return updated;
      });
    };

    ordersSocket.on("NEW_ORDER", handleNewOrder);
    return () => ordersSocket.off("NEW_ORDER", handleNewOrder);
  }, [ordersSocket]);

  /* ===============================
     ACCEPT / REJECT
  ================================ */
  const handleStatusUpdate = async (orderId, status) => {
    try {
      await updateStatus({ id: orderId, status }).unwrap();
      console.log("Status updated:", status);
      setOrders((prev) => {
        const updated = prev.filter((o) => o._id !== orderId);
        localStorage.setItem("newOrders", JSON.stringify(updated));
        return updated;
      });

      showSuccessAlert(
        status === "confirmed"
          ? "Order Accepted & moved to Processing"
          : "Order Rejected"
      );
    } catch (err) {
      showErrorAlert(err?.data?.message || "Status update failed");
    }
  };

  /* ===============================
     UI
  ================================ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 p-6">
      {/* Header */}
      <div className="mb-8 rounded-3xl bg-white/70 backdrop-blur shadow-md p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-sky-800">
            New Orders
          </h1>
          <span className="text-sm font-semibold text-sky-600 bg-sky-50 px-4 py-1 rounded-full">
            {orders.length} Orders
          </span>
        </div>
        <p className="text-gray-500 mt-1">
          Orders waiting for confirmation
        </p>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order._id}
            className={`rounded-3xl border ${statusBorder[order.status]}
            bg-white/80 backdrop-blur shadow-sm hover:shadow-xl
            transition-all duration-300`}
          >
            <div className="p-6 space-y-4">
              {/* Top */}
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-sky-800">
                      {order.customOrderId || order.orderId}
                    </h2>
                    <span
                      className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full font-semibold ${
                        membershipStyles[order.customer?.membership]
                      }`}
                    >
                      <Star size={12} />
                      {order.customer?.membership}
                    </span>
                  </div>
                  <p className="mt-1 font-semibold text-gray-800">
                    {order.customer?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.customer?.phone}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-extrabold text-orange-600">
                    ₹{order.total}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    {order.status}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-sky-50 border">
                <MapPin size={16} className="text-sky-500" />
                {order.location}
              </div>

              {/* Items */}
              <div>
                <p className="text-xs font-semibold text-gray-400 mb-2">
                  ITEMS ORDERED
                </p>
                <div className="flex flex-wrap gap-2">
                  {order.items?.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-50 border px-3 py-1 rounded-full"
                    >
                      {item.name} × {item.qty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-3 border-t">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={12} />
                  {order.createdAt || "Just Now"}
                </div>

                <div className="flex gap-3">
                  <Button
                    size="sm"
                    variant="success"
                    disabled={isLoading}
                    onClick={() =>
                      handleStatusUpdate(order._id, "confirmed")
                    }
                  >
                    <CheckCircle size={14} />
                    Accept
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    disabled={isLoading}
                    onClick={() =>
                      handleStatusUpdate(order._id, "rejected")
                    }
                  >
                    <XCircle size={14} />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-20">
            No new orders
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrders;
