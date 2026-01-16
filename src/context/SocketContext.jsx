import React, { createContext, useContext, useEffect } from "react";
import { mainSocket } from "../socket/mainSocket";
import { ordersSocket } from "../socket/ordersSocket";
import { restaurantSocket } from "../socket/restaurantSocket";
import toast from "react-hot-toast";

const SocketContext = createContext(null);

export const SocketProvider = ({ children, authToken, restaurantId }) => {
  const [newOrders, setNewOrders] = React.useState(() => {
    try {
      const stored = localStorage.getItem("NEW_ORDERS");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [notifications, setNotifications] = React.useState([]);

  // Persist orders
  useEffect(() => {
    localStorage.setItem("NEW_ORDERS", JSON.stringify(newOrders));
  }, [newOrders]);

  useEffect(() => {
    if (!authToken) return;

    /* =============================
       1️⃣ Attach auth token & Connect
    ============================== */
    mainSocket.auth = { token: authToken };
    ordersSocket.auth = { token: authToken };
    restaurantSocket.auth = { token: authToken };

    // Debug only
    // mainSocket.on("CONNECTION_ESTABLISHED", (data) => console.log("🔌 Connection established", data));

    const connectSockets = () => {
      if (!mainSocket.connected) mainSocket.connect();
      if (!ordersSocket.connected) ordersSocket.connect();
      if (!restaurantSocket.connected) restaurantSocket.connect();
    };

    connectSockets();

    // console.log("🔌 Connecting sockets...");

    /* =============================
       2️⃣ Event Handlers
    ============================== */
    // const onConnected = () => console.log("✅ Socket connected");
    // const onJoinedRoom = (data) => console.log("🏠 Joined restaurant room:", data);
    const onConnected = () => { }; // Silence logs
    const onJoinedRoom = () => { }; // Silence logs

    const onNewOrder = (payload) => {
      // console.log("🆕 NEW_ORDER received:", payload);
      const orderData = payload?.data || payload;
      if (!orderData?.orderId) return;

      const newOrder = {
        ...orderData,
        orderId: orderData.orderId,
        customOrderId: orderData.customOrderId || orderData.orderId,
        total: orderData.price?.grandTotal || 0,
        customer: orderData.deliveryAddress,
        items: orderData.items?.map((item) => ({
          name: item.name,
          quantity: item.quantity,
        })),
        location: orderData.deliveryAddress?.addressLine,
        status: orderData.status?.toLowerCase(),
        receivedAt: new Date().toISOString(),
      };

      // Update Orders List (Prevent Duplicates)
      setNewOrders((prev) => {
        if (prev.some((o) => o.orderId === newOrder.orderId)) return prev;
        return [newOrder, ...prev];
      });
      // Add Notification
      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "New Order",
          message: `Order #${newOrder.customOrderId} received`,
          type: "success",
          read: false,
          time: new Date().toISOString(),
          orderId: newOrder.orderId
        },
        ...prev,
      ]);
    };

    /* =============================
       3️⃣ Attach Listeners
    ============================== */
    ordersSocket.on("connect", onConnected);
    ordersSocket.on("JOINED_RESTAURANT_ROOM", onJoinedRoom);
    ordersSocket.on("NEW_ORDER", onNewOrder);

    // Join Room
    if (restaurantId) {
      ordersSocket.emit("JOIN_RESTAURANT_ROOM", { restaurantId });
    }



    /* =============================
       5️⃣ Order status updates
    ============================== */
    const onOrderStatusUpdated = (data) => {
      console.log("🔄 ORDER_STATUS_UPDATED:", data);
    };



    ordersSocket.on("ORDER_STATUS_UPDATED", onOrderStatusUpdated);
    ordersSocket.on("ORDER_PICKED_UP", (data) => {
      console.log("✅ ORDER_PICKED_UP:", data);
      toast.success("Order Picked Up Successfully");

    });



    /* =============================
       🧹 CLEANUP (VERY IMPORTANT)
    ============================== */
    return () => {
      ordersSocket.off("connect", onConnected);
      ordersSocket.off("JOINED_RESTAURANT_ROOM", onJoinedRoom);
      ordersSocket.off("NEW_ORDER", onNewOrder);
      ordersSocket.off("ORDER_STATUS_UPDATED", onOrderStatusUpdated);

      mainSocket.disconnect();
      ordersSocket.disconnect();
      restaurantSocket.disconnect();
    };
  }, [authToken, restaurantId]);

  return (
    <SocketContext.Provider
      value={{
        mainSocket,
        ordersSocket,
        restaurantSocket,
        newOrders,
        setNewOrders,
        notifications,
        setNotifications
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSockets = () => useContext(SocketContext);
