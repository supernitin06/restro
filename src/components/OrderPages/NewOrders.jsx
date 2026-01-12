import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import Button from "../../components/ui/Button";
import { useSockets } from "../../context/SocketContext";
import { showSuccessAlert, showErrorAlert } from "../../utils/toastAlert";
import { useUpdateOrderStatusMutation, useGetOrdersQuery } from "../../api/services/orderApi";

const NewOrders = () => {
  const { newOrders, setNewOrders } = useSockets();
  const [updateStatus] = useUpdateOrderStatusMutation();
  const { data, refetch } = useGetOrdersQuery({ status: 'PLACED' });
  const orders = data?.data || [];

  const [processingOrderId, setProcessingOrderId] = useState(null);

  // Listen to new orders from socket and refetch
  useEffect(() => {
    if (!ordersSocket) return;

    const handleNewOrder = (payload) => {
      console.log("🆕 NEW_ORDER payload:", payload);
      refetch(); // Refetch orders to include new ones
    };

    ordersSocket.on("NEW_ORDER", handleNewOrder);
    return () => ordersSocket.off("NEW_ORDER", handleNewOrder);
  }, [ordersSocket, refetch]);

  // Handle accept/reject
  const handleUpdateStatus = async (orderId, statusInput) => {
    console.log("handleUpdateStatus called with orderId:", orderId, "statusInput:", statusInput);
    if (!orderId) {
      console.log("Order ID missing!");
      showErrorAlert("Order ID missing!");
      return;
    }

    // 1️⃣ Prepare Validation Formats
    const apiStatus = statusInput.toUpperCase(); // Backend expects: "ACCEPTED", "REJECTED"
    const uiStatus = statusInput.toLowerCase();  // UI checks: "accepted", "rejected"

    try {
      setProcessingOrderId(orderId);

      // 2️⃣ Send UPPERCASE to Backend
      console.log("Calling updateStatus API with id:", orderId, "status:", apiStatus);
      await updateStatus({ id: orderId, status: apiStatus }).unwrap();
      console.log("API call successful");

      // 3️⃣ Update Shared Context State
      setNewOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, status: uiStatus } : order
        )
      );

      showSuccessAlert(
        apiStatus === "ACCEPTED" ? "Order Accepted" : "Order Rejected"

      );
    } catch (error) {
      console.error("ORDER STATUS ERROR:", error);
      showErrorAlert(error?.data?.message || "Failed to update order");
    } finally {
      setProcessingOrderId(null);
      console.log("Processing completed for orderId:", orderId);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">New Orders ({orders.length})</h1>
      {console.log("Rendering orders:", orders)}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {newOrders.map((order) => (
          <div
            key={order.orderId}
            className="rounded-2xl bg-white shadow-md p-5 space-y-4"
          >
            {/* Header */}
            <div className="flex justify-between">
              <h2 className="font-bold text-lg">{order.customOrderId}</h2>
              <span className="text-orange-600 font-bold">₹{order.total}</span>
            </div>

            {/* Customer */}
            <div>
              <p className="font-semibold">{order.customer?.name}</p>
              <p className="text-sm text-gray-500">{order.customer?.phone}</p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
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

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-xs text-gray-400">
                {order.createdAt || "Just now"}
              </div>

              <div className="flex gap-2">
                {order.status === "accepted" ? (
                  <span className="px-4 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
                    ✅ Order Accepted
                  </span>
                ) : order.status === "rejected" ? (
                  <span className="px-4 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-700">
                    ❌ Order Rejected
                  </span>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="success"
                      disabled={processingOrderId === order.orderId}
                      onClick={() => handleUpdateStatus(order.orderId, "ACCEPTED")}
                    >
                      {processingOrderId === order.orderId ? "Processing..." : "Accept"}
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      disabled={processingOrderId === order.orderId}
                      onClick={() => handleUpdateStatus(order.orderId, "REJECTED")}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {newOrders.length === 0 && (
          <div className="text-gray-400 text-center col-span-full py-20">
            No new orders
          </div>
        )}
      </div>
    </div>
  );
};

export default NewOrders;