import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import { useSockets } from "../../context/SocketContext";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useUpdateKitchenStatusMutation,
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
  const [updateKitchenStatus] = useUpdateKitchenStatusMutation();
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

      await updateKitchenStatus({
        orderId: orderId,
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
          <OrderCard
            key={order.orderId}
            order={order}
            isProcessing={loadingId === order.orderId}
            onReady={() => markReady(order.orderId)}
            onReject={() => rejectOrder(order.orderId)}
          />
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
