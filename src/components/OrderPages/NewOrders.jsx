import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useSockets } from "../../context/SocketContext";
import { showErrorAlert } from "../../utils/toastAlert";
import {
  useUpdateOrderStatusMutation,
  useGetOrdersQuery,
} from "../../api/services/orderApi";

const NewOrders = () => {
  const { ordersSocket } = useSockets();

  const { data, refetch } = useGetOrdersQuery({ status: "PLACED" });
  const orders = data?.data || [];

  const [updateStatus] = useUpdateOrderStatusMutation();

  const [processingOrderId, setProcessingOrderId] = useState(null);

  // 🔔 Listen for new orders via socket
  useEffect(() => {
    if (!ordersSocket) return;

    const handleNewOrder = (payload) => {
      console.log("🆕 NEW_ORDER payload:", payload);
      refetch();
    };

    ordersSocket.on("NEW_ORDER", handleNewOrder);
    return () => ordersSocket.off("NEW_ORDER", handleNewOrder);
  }, [ordersSocket, refetch]);

  // ✅ Accept / Reject Order
  const handleUpdateStatus = async (orderId, status) => {
    if (!orderId) {
      showErrorAlert("Order ID missing!");
      return;
    }

    try {
      setProcessingOrderId(orderId);

      // ✅ Admin order status
      await updateStatus({
        id: orderId,
        status, // ACCEPTED / REJECTED
      }).unwrap();



      refetch();
    } catch (error) {
      console.error("ORDER STATUS UPDATE ERROR:", error);
      showErrorAlert(error?.data?.message || "Failed to update order");
    } finally {
      setProcessingOrderId(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        New Orders ({orders.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {orders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            isProcessing={processingOrderId === order.orderId}
            onAccept={() => handleUpdateStatus(order.orderId, "ACCEPTED")}
            onReject={() => handleUpdateStatus(order.orderId, "REJECTED")}
          />
        ))}

        {orders.length === 0 && (
          <div className="text-gray-400 text-center col-span-full py-20">
            No new orders
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrders;
