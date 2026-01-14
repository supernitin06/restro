import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
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

  const { data, refetch } = useGetOrdersQuery({});
  const allOrders = data?.data || [];
  const orders = allOrders.filter(order => 
    (order.status === "ACCEPTED" && order.kitchenStatus !== "READY") || 
    order.status === "REJECTED"
  );
  console.log("ORDERS:", orders);


  const [updateKitchenStatus] = useUpdateKitchenStatusMutation();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [updateKitchenStatus] = useUpdateKitchenStatusMutation();
  const [loadingId, setLoadingId] = useState(null);
  const [rejectingOrderId, setRejectingOrderId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // 🔌 Socket: refresh
  useEffect(() => {
    if (!ordersSocket) return;

    const refreshOrders = () => refetch();

    ordersSocket.on("ORDER_ACCEPTED", refreshOrders);
    ordersSocket.on("KITCHEN_STATUS_UPDATED", refreshOrders);
    ordersSocket.on("ORDER_STATUS_UPDATED", refreshOrders);

    return () => {
      ordersSocket.off("ORDER_ACCEPTED", refreshOrders);
      ordersSocket.off("KITCHEN_STATUS_UPDATED", refreshOrders);
      ordersSocket.off("ORDER_STATUS_UPDATED", refreshOrders);
    };
  }, [ordersSocket, refetch]);

  // ✅ Ready → move to Processing page
  const handleReady = async (orderId) => {
    try {
      setLoadingId(orderId);

      await updateKitchenStatus({
        orderId: orderId,
        status: "READY",
      }).unwrap();


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

  const handleReject = async (orderId, reason) => {
    try {
      setLoadingId(orderId);
      await updateOrderStatus({ id: orderId, status: "REJECTED", message: reason }).unwrap();
      showSuccessAlert("Order Rejected and customer notified");
      refetch();
      setRejectingOrderId(null);
      setRejectReason("");
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
          <OrderCard
            key={order.orderId}
            order={order}
            isProcessing={loadingId === order.orderId}
            onReady={() => handleReady(order.orderId)}
            onReject={() => handleReject(order.orderId)}
          />
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
