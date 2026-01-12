import React, { useEffect, useState } from "react";
import { MapPin, ChefHat, CheckCircle, XCircle } from "lucide-react";
import { useSockets } from "../../context/SocketContext";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../api/services/orderApi";
import {
  showSuccessAlert,
  showErrorAlert,
} from "../../utils/toastAlert";

const AcceptedOrders = () => {
  const { ordersSocket } = useSockets();

  const { data, refetch, isLoading } = useGetOrdersQuery({
    status: "ACCEPTED",
  });

  const orders = data?.data || [];

  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [loadingId, setLoadingId] = useState(null);

  // 🔌 Socket refresh
  useEffect(() => {
    if (!ordersSocket) return;

    const refresh = () => refetch();

    ordersSocket.on("ORDER_ACCEPTED", refresh);
    ordersSocket.on("KITCHEN_STATUS_UPDATED", refresh);

    return () => {
      ordersSocket.off("ORDER_ACCEPTED", refresh);
      ordersSocket.off("KITCHEN_STATUS_UPDATED", refresh);
    };
  }, [ordersSocket, refetch]);

  // ✅ READY
  const markReady = async (orderId) => {
    try {
      setLoadingId(orderId);

      await updateOrderStatus({
        id: orderId,
        status: "READY",
      }).unwrap();

      showSuccessAlert("Order marked READY");
      refetch();
    } catch (err) {
      showErrorAlert("Failed to mark READY");
    } finally {
      setLoadingId(null);
    }
  };

  // ❌ REJECT
  const rejectOrder = async (orderId) => {
    try {
      setLoadingId(orderId);

      await updateOrderStatus({
        id: orderId,
        status: "REJECTED",
      }).unwrap();

      showSuccessAlert("Order rejected");
      refetch();
    } catch (err) {
      showErrorAlert("Failed to reject order");
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Accepted Orders ({orders.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-2xl shadow p-5 space-y-4 border border-green-200"
          >
            {/* Header */}
            <div className="flex justify-between">
              <h2 className="font-bold">{order.customOrderId}</h2>
              <span className="text-green-600 font-bold">
                ₹{order.total}
              </span>
            </div>

            {/* Customer */}
            <div>
              <p className="font-semibold">{order.customer?.name}</p>
              <p className="text-sm text-gray-500">
                {order.customer?.phone}
              </p>
            </div>

            {/* Address */}
            <div className="flex gap-2 text-sm text-gray-600">
              <MapPin size={14} />
              {order.location}
            </div>

            {/* Items */}
            <div className="text-sm">
              {order.items?.map((item, i) => (
                <div key={i}>
                  {item.name} × {item.quantity}
                </div>
              ))}
            </div>

            {/* Status */}
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="flex items-center gap-1 text-green-700 font-semibold text-sm">
                <CheckCircle size={14} />
                Accepted
              </span>

              <span className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                <ChefHat size={12} />
                {order.kitchenStatus || "PREPARING"}
              </span>
            </div>

            {/* 🔥 ACTION BUTTONS */}
            <div className="flex gap-2 pt-3">
              <button
                onClick={() => markReady(order.orderId)}
                disabled={loadingId === order.orderId}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg disabled:opacity-50"
              >
                Ready
              </button>

              <button
                onClick={() => rejectOrder(order.orderId)}
                disabled={loadingId === order.orderId}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-lg disabled:opacity-50"
              >
                Reject
              </button>
            </div>

            <div className="text-xs text-gray-400">
              {order.createdAt}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-20">
            No accepted orders
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptedOrders;
