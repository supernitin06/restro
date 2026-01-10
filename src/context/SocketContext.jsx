import React, { createContext, useContext, useEffect } from "react";
import { mainSocket } from "../socket/mainSocket";
import { ordersSocket } from "../socket/ordersSocket";
import { restaurantSocket } from "../socket/restaurantSocket";

const SocketContext = createContext(null);

export const SocketProvider = ({ children, authToken, restaurantId }) => {
  useEffect(() => {
    if (!authToken) return;

    /* =============================
       1️⃣ Attach auth token
    ============================== */
    mainSocket.auth = { token: authToken };
    ordersSocket.auth = { token: authToken };
    restaurantSocket.auth = { token: authToken };

    /* =============================
       2️⃣ Connect sockets
    ============================== */
    mainSocket.connect();
    ordersSocket.connect();
    restaurantSocket.connect();

    console.log("🔌 Connecting sockets...");

    /* =============================
       3️⃣ Connection confirmation
    ============================== */
    const onConnected = (data) => {
      console.log("✅ Socket connected:", data);
    };

    ordersSocket.on("CONNECTION_ESTABLISHED", onConnected);

    /* =============================
       4️⃣ Join restaurant room
    ============================== */
    const onJoinedRoom = (data) => {
      console.log("🏠 Joined restaurant room:", data);
    };

    if (restaurantId) {
      ordersSocket.emit("JOIN_RESTAURANT_ROOM", { restaurantId });
      ordersSocket.on("JOINED_RESTAURANT_ROOM", onJoinedRoom);
    }

    /* =============================
       5️⃣ Order status updates
    ============================== */
    const onOrderStatusUpdated = (data) => {
      console.log("🔄 ORDER_STATUS_UPDATED:", data);
    };

    ordersSocket.on("ORDER_STATUS_UPDATED", onOrderStatusUpdated);

    /* =============================
       🧹 CLEANUP (VERY IMPORTANT)
    ============================== */
    return () => {
      console.log("🧹 Disconnecting sockets");

      ordersSocket.off("CONNECTION_ESTABLISHED", onConnected);
      ordersSocket.off("JOINED_RESTAURANT_ROOM", onJoinedRoom);
      ordersSocket.off("ORDER_STATUS_UPDATED", onOrderStatusUpdated);

      mainSocket.disconnect();
      ordersSocket.disconnect();
      restaurantSocket.disconnect();
    };
  }, [authToken, restaurantId]);

  return (
    <SocketContext.Provider
      value={{ mainSocket, ordersSocket, restaurantSocket }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSockets = () => useContext(SocketContext);
