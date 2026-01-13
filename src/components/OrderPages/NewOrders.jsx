import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import Button from "../../components/ui/Button";
import { useSockets } from "../../context/SocketContext";
import { showSuccessAlert, showErrorAlert } from "../../utils/toastAlert";
import { useUpdateOrderStatusMutation, useGetOrdersQuery } from "../../api/services/orderApi";

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
      const body = { status };
      if (status === "REJECTED") {
        body.message =
          "Sorry, the order is not available today. Please try again later.";
      }
      await updateStatus({ id: orderId, ...body }).unwrap();
      showSuccessAlert(
        status === "ACCEPTED"
          ? "Order accepted successfully!"
          : "Order rejected"
      );
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
          <div
            key={order.orderId}
            className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            {/* Gradient top accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>

            <div className="p-6 flex flex-col h-full space-y-5">
              {/* ===== HEADER ===== */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {order.customOrderId}
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-gray-400">
                    {order.createdAt || "Just now"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ₹{order.total}
                  </p>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600 dark:bg-yellow-900 dark:text-yellow-400">
                    New
                  </span>
                </div>
              </div>

              {/* ===== CUSTOMER ===== */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 shadow-inner backdrop-blur-sm">
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {order.customer?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {order.customer?.phone}
                </p>
              </div>

              {/* ===== LOCATION ===== */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin size={16} className="text-gray-400 dark:text-gray-400" />
                <span className="line-clamp-1">{order.location}</span>
              </div>

              {/* ===== ITEMS ===== */}
              <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                {order.items?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    <span>{item.name}</span>
                    <span className="font-medium">× {item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* ===== FOOTER ===== */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 mt-auto">
                {order.status === "ACCEPTED" ? (
                  <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400 shadow-sm">
                    ✅ Accepted
                  </span>
                ) : order.status === "REJECTED" ? (
                  <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400 shadow-sm">
                    ❌ Rejected
                  </span>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="success"
                      disabled={processingOrderId === order.orderId}
                      onClick={() =>
                        handleUpdateStatus(order.orderId, "ACCEPTED")
                      }
                    >
                      {processingOrderId === order.orderId
                        ? "Processing..."
                        : "Accept"}
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      disabled={processingOrderId === order.orderId}
                      onClick={() =>
                        handleUpdateStatus(order.orderId, "REJECTED")
                      }
                    >
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
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
