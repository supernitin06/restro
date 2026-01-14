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
  const { data, refetch } = useGetOrdersQuery({});
  const allOrders = data?.data || [];
  const orders = allOrders.filter(
    (order) => order.status === "PLACED" || order.status === "REJECTED"
  );

  const [updateStatus] = useUpdateOrderStatusMutation();

  const [processingOrderId, setProcessingOrderId] = useState(null);

  useEffect(() => {
    if (!ordersSocket) return;
    const handleNewOrder = () => refetch();
    const handleStatusUpdate = () => refetch();

    ordersSocket.on("NEW_ORDER", handleNewOrder);
    ordersSocket.on("ORDER_STATUS_UPDATED", handleStatusUpdate);

    return () => {
      ordersSocket.off("NEW_ORDER", handleNewOrder);
      ordersSocket.off("ORDER_STATUS_UPDATED", handleStatusUpdate);
    };
  }, [ordersSocket, refetch]);

  const handleUpdateStatus = async (orderId, status) => {
    if (!orderId) return showErrorAlert("Order ID missing!");
    try {
      setProcessingOrderId(orderId);

      // ✅ Admin order status
      await updateStatus({
        id: orderId,
        status, // ACCEPTED / REJECTED
      }).unwrap();



      refetch();
    } catch (error) {
      showErrorAlert(error?.data?.message || "Failed to update order");
    } finally {
      setProcessingOrderId(null);
    }
  };

  return (
    <div className="p-8 min-h-screen transition-colors duration-500 bg-gray-50 dark:bg-gray-900">
      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
          New Orders
        </h1>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          ({orders.length})
        </span>
      </div>

      {/* ===== ORDERS GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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
          <div className="col-span-full py-20 text-center text-gray-400 dark:text-gray-500">
            No new orders
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrders;
