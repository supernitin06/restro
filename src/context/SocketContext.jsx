import React, { createContext, useContext, useEffect } from "react";
import { mainSocket } from "../socket/mainSocket";
import { ordersSocket } from "../socket/ordersSocket";
import { restaurantSocket } from "../socket/restaurantSocket";
import toast from "react-hot-toast";

const SocketContext = createContext(null);

export const SocketProvider = ({ children, authToken, restaurantId }) => {
  console.log(" SocketProvider render", { authToken, restaurantId });

  const [newOrders, setNewOrders] = React.useState(() => {
    try {
      const stored = localStorage.getItem("NEW_ORDERS");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error(" Failed to parse NEW_ORDERS", e);
      return [];
    }
  });

  const [notifications, setNotifications] = React.useState([]);

  /* =============================
     Persist Orders
  ============================== */
  useEffect(() => {
    localStorage.setItem("NEW_ORDERS", JSON.stringify(newOrders));
  }, [newOrders]);

  useEffect(() => {
    console.log("Socket useEffect triggered");

    if (!authToken) {
      console.warn("authToken missing, sockets not connecting");
      return;
    }

    /* =============================
       1 Attach auth token & Connect
    ============================== */
    console.log(" Attaching auth token to sockets");

    mainSocket.auth = { token: authToken };
    ordersSocket.auth = { token: authToken };
    restaurantSocket.auth = { token: authToken };

    const connectSockets = () => {
      console.log(" Connecting sockets...");
      if (!mainSocket.connected) mainSocket.connect();
      if (!ordersSocket.connected) ordersSocket.connect();
      if (!restaurantSocket.connected) restaurantSocket.connect();
    };

    connectSockets();

    /* =============================
        DEBUG: Listen to ALL events
    ============================== */
    mainSocket.onAny((event, ...args) => {
      console.log(` [MainSocket] ${event}`, args);
    });

    ordersSocket.onAny((event, ...args) => {
      console.log(` [OrdersSocket] ${event}`, args);
    });

    restaurantSocket.onAny((event, ...args) => {
      console.log(` [RestaurantSocket] ${event}`, args);
    });

    /* =============================
       Connection Handlers
    ============================== */
    const onMainConnect = () =>
      console.log(" Main Socket Connected:", mainSocket.id);
    const onMainDisconnect = (reason) =>
      console.warn(" Main Socket Disconnected:", reason);
    const onMainError = (err) =>
      console.error(" Main Socket Error:", err.message);

    const onOrdersConnect = () =>
      console.log(" Orders Socket Connected:", ordersSocket.id);
    const onOrdersDisconnect = (reason) =>
      console.warn(" Orders Socket Disconnected:", reason);
    const onOrdersError = (err) =>
      console.error("Orders Socket Error:", err.message);

    const onRestConnect = () =>
      console.log("Restaurant Socket Connected:", restaurantSocket.id);
    const onRestDisconnect = (reason) =>
      console.warn(" Restaurant Socket Disconnected:", reason);
    const onRestError = (err) =>
      console.error(" Restaurant Socket Error:", err.message);

    mainSocket.on("connect", onMainConnect);
    mainSocket.on("disconnect", onMainDisconnect);
    mainSocket.on("connect_error", onMainError);

    ordersSocket.on("connect", onOrdersConnect);
    ordersSocket.on("disconnect", onOrdersDisconnect);
    ordersSocket.on("connect_error", onOrdersError);

    restaurantSocket.on("connect", onRestConnect);
    restaurantSocket.on("disconnect", onRestDisconnect);
    restaurantSocket.on("connect_error", onRestError);

    /* =============================
       Business Logic Handlers
    ============================== */
    const onJoinedRoom = (data) => {
      console.log(" JOINED_RESTAURANT_ROOM", data);
    };

    const onNewOrder = (payload) => {
      console.log(" NEW_ORDER raw payload:", payload);

      const orderData = payload?.data || payload;
      if (!orderData?.orderId) {
        console.warn("NEW_ORDER missing orderId", orderData);
        return;
      }

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

      console.log("Processed newOrder:", newOrder);

      setNewOrders((prev) => {
        if (prev.some((o) => o.orderId === newOrder.orderId)) {
          console.log(" Duplicate order ignored:", newOrder.orderId);
          return prev;
        }
        return [newOrder, ...prev];
      });

      setNotifications((prev) => {
        console.log(" Adding NEW_ORDER notification");
        return [
          {
            id: Date.now(),
            title: "New Order",
            message: `Order #${newOrder.customOrderId} received`,
            type: "order",
            read: false,
            time: new Date().toISOString(),
            orderId: newOrder.orderId,
          },
          ...prev,
        ];
      });

      toast.success(`New Order #${newOrder.customOrderId} received!`);
    };

    // const onUserRegistered = (data) => {
    //   console.log(" USER_REGISTER_SUCCESSFULLY:", data);

    //   toast.success(`${data?.name || "A new user"} has registered!`);

    //   setNotifications((prev) => {
    //     console.log(" Adding USER notification");
    //     return [
    //       {
    //         id: Date.now(),
    //         title: "New User",
    //         message: `${data?.name || "A new user"} has registered.`,
    //         type: "user",
    //         read: false,
    //         time: new Date().toLocaleTimeString([], {
    //           hour: "2-digit",
    //           minute: "2-digit",
    //         }),
    //       },
    //       ...prev,
    //     ];
    //   });
    // };

    const onUserRegistered = (data) => {
      console.log(" USER_REGISTER_SUCCESSFULLY FULL DATA:", data);

      const userName =
        data?.name || data?.user?.name || data?.data?.name || "New User";

      console.log(" Extracted User Name:", userName);

      toast.success(`${userName} has registered!`);

      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "New User Registered",
          message: `${userName} has registered successfully.`,
          type: "user",
          read: false,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...prev,
      ]);
    };

    const onOrderStatusUpdated = (data) => {
      console.log("ORDER_STATUS_UPDATED:", data);
    };

    // const onOrderPickedUp = (data) => {
    //   console.log("ORDER_PICKED_UP:", data);

    //   const orderId = data?.customOrderId || data?.orderId || "";

    //   toast.success(`Order #${orderId} Picked Up Successfully`);

    //   setNotifications((prev) => {
    //     console.log("Adding PICKED_UP notification");
    //     return [
    //       {
    //         id: Date.now(),
    //         title: "Order Picked Up",
    //         message: `Order #${orderId} is out for delivery.`,
    //         type: "delivery",
    //         read: false,
    //         time: new Date().toLocaleTimeString([], {
    //           hour: "2-digit",
    //           minute: "2-digit",
    //         }),
    //         orderId: data?.orderId,
    //       },
    //       ...prev,
    //     ];
    //   });
    // };

    const onOrderPickedUp = (data) => {
      console.log(" ORDER_PICKED_UP FULL DATA:", data);

      const orderId = data?.customOrderId || data?.orderId || "";

      const partnerName =
        data?.deliveryPartner?.name ||
        data?.pickedBy?.name ||
        data?.partner?.name ||
        "Delivery Partner";

      console.log(" Extracted Delivery Partner:", partnerName);

      toast.success(`Order #${orderId} picked up by ${partnerName}`);

      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "Order Picked Up",
          message: `Order #${orderId} picked up by ${partnerName}`,
          type: "delivery",
          read: false,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          orderId: data?.orderId,
        },
        ...prev,
      ]);
    };

    // const onOrderDelivered = (data) => {
    //   console.log("ORDER_DELIVERED_BY_PARTNER:", data);

    //   const orderId = data?.customOrderId || data?.orderId || "";

    //   toast.success(`Order #${orderId} Delivered Successfully`);

    //   setNotifications((prev) => {
    //     console.log(" Adding DELIVERED notification");
    //     return [
    //       {
    //         id: Date.now(),
    //         title: "Order Delivered",
    //         message: `Order #${orderId} has been delivered.`,
    //         type: "delivery",
    //         read: false,
    //         time: new Date().toLocaleTimeString([], {
    //           hour: "2-digit",
    //           minute: "2-digit",
    //         }),
    //         orderId: data?.orderId,
    //       },
    //       ...prev,
    //     ];
    //   });
    // };

    const onOrderDelivered = (data) => {
      console.log(" ORDER_DELIVERED_BY_PARTNER FULL DATA:", data);

      const orderId = data?.customOrderId || data?.orderId || "";

      const deliveredBy =
        data?.deliveryPartner?.name ||
        data?.deliveredBy?.name ||
        data?.partner?.name ||
        "Delivery Partner";

      console.log(" Extracted Delivered By:", deliveredBy);

      toast.success(`Order #${orderId} delivered by ${deliveredBy}`);

      setNotifications((prev) => [
        {
          id: Date.now(),
          title: "Order Delivered",
          message: `Order #${orderId} delivered by ${deliveredBy}`,
          type: "delivery",
          status: "delivered", // use this for GREEN color
          read: false,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          orderId: data?.orderId,
        },
        ...prev,
      ]);
    };

    /* =============================
       Attach Listeners
    ============================== */
    console.log(" Attaching socket listeners");

    ordersSocket.on("JOINED_RESTAURANT_ROOM", onJoinedRoom);
    ordersSocket.on("NEW_ORDER", onNewOrder);
    ordersSocket.on("USER_REGISTER_SUCCESSFULLY", onUserRegistered);
    mainSocket.on("USER_REGISTER_SUCCESSFULLY", onUserRegistered);
    ordersSocket.on("ORDER_STATUS_UPDATED", onOrderStatusUpdated);
    ordersSocket.on("ORDER_PICKED_UP", onOrderPickedUp);
    ordersSocket.on("ORDER_DELIVERED_BY_PARTNER", onOrderDelivered);

    if (restaurantId) {
      console.log(" Emitting JOIN_RESTAURANT_ROOM", restaurantId);
      ordersSocket.emit("JOIN_RESTAURANT_ROOM", { restaurantId });
    }

    /* =============================
       CLEANUP
    ============================== */
    return () => {
      console.log("Cleaning up socket listeners & disconnecting");

      mainSocket.off("connect", onMainConnect);
      mainSocket.off("disconnect", onMainDisconnect);
      mainSocket.off("connect_error", onMainError);

      ordersSocket.off("connect", onOrdersConnect);
      ordersSocket.off("disconnect", onOrdersDisconnect);
      ordersSocket.off("connect_error", onOrdersError);

      restaurantSocket.off("connect", onRestConnect);
      restaurantSocket.off("disconnect", onRestDisconnect);
      restaurantSocket.off("connect_error", onRestError);

      ordersSocket.off("JOINED_RESTAURANT_ROOM", onJoinedRoom);
      ordersSocket.off("NEW_ORDER", onNewOrder);
      ordersSocket.off("USER_REGISTER_SUCCESSFULLY", onUserRegistered);
      mainSocket.off("USER_REGISTER_SUCCESSFULLY", onUserRegistered);
      ordersSocket.off("ORDER_STATUS_UPDATED", onOrderStatusUpdated);
      ordersSocket.off("ORDER_PICKED_UP", onOrderPickedUp);
      ordersSocket.off("ORDER_DELIVERED_BY_PARTNER", onOrderDelivered);

      mainSocket.offAny();
      ordersSocket.offAny();
      restaurantSocket.offAny();

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
        setNotifications,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSockets = () => useContext(SocketContext);
