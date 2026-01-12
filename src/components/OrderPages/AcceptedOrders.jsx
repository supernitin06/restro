import React, { useEffect, useState } from "react";
import { MapPin, ChefHat, CheckCircle, XCircle } from "lucide-react";
import { useSockets } from "../../context/SocketContext";
import { useNavigate } from "react-router-dom";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdateKitchenStatusMutation,
} from "../../api/services/orderApi";
import { showSuccessAlert, showErrorAlert } from "../../utils/toastAlert";

const AcceptedOrders = () => {
  const { ordersSocket } = useSockets();
  const navigate = useNavigate();

  const { data, refetch } = useGetOrdersQuery({ status: "ACCEPTED" });
  const orders = data?.data || [];
  console.log("ORDERS:", orders);


  const [updateKitchenStatus] = useUpdateKitchenStatusMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [loadingId, setLoadingId] = useState(null);

  // 🔌 Socket: refresh
  useEffect(() => {
    if (!ordersSocket) return;

    const refreshOrders = () => refetch();

    ordersSocket.on("ORDER_ACCEPTED", refreshOrders);
    ordersSocket.on("KITCHEN_STATUS_UPDATED", refreshOrders);

    return () => {
      ordersSocket.off("ORDER_ACCEPTED", refreshOrders);
      ordersSocket.off("KITCHEN_STATUS_UPDATED", refreshOrders);
    };
  }, [ordersSocket, refetch]);

  // ✅ Ready → move to Processing page
  const handleReady = async (orderId) => {
    try {
      setLoadingId(orderId);

      await updateKitchenStatus({ orderId, status: "READY" }).unwrap();

      showSuccessAlert("Order moved to Processing!");
      refetch();

      navigate("/orders/processing"); // Move to Processing page
    } catch (err) {
      console.error("READY ERROR:", err);
      showErrorAlert("Failed to update kitchen status");
    } finally {
      setLoadingId(null);
    }
  };

  // ❌ Reject → move back to rejected
  const handleReject = async (orderId) => {
    try {
      setLoadingId(orderId);
      await updateOrderStatus({ id: orderId, status: "REJECTED" }).unwrap();
      showSuccessAlert("Order Rejected");
      refetch();
    } catch (err) {
      console.error("REJECT ERROR:", err);
      showErrorAlert("Failed to reject order");
    } finally {
      setLoadingId(null);
    }
  };

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
              <span className="text-green-600 font-bold">₹{order.total}</span>
            </div>

            {/* Customer */}
            <div>
              <p className="font-semibold">{order.customer?.name}</p>
              <p className="text-sm text-gray-500">{order.customer?.phone}</p>
            </div>

            {/* Location */}
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
            <div className="flex justify-between pt-3 border-t">
              <span className="flex items-center gap-1 text-green-700 text-sm font-semibold">
                <CheckCircle size={14} /> Accepted
              </span>

              <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  order.kitchenStatus === "READY"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                <ChefHat size={12} />
                {order.kitchenStatus || "PREPARING"}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3">
              <button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                disabled={loadingId === order.orderId}
                onClick={() => handleReady(order.orderId)}
              >
                {loadingId === order.orderId ? "Processing..." : "Ready"}
              </button>

              <button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm"
                disabled={loadingId === order.orderId}
                onClick={() => handleReject(order.orderId)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-gray-400 text-center col-span-full py-20">
            No accepted orders yet
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptedOrders;
