import React, { createContext, useContext, useEffect } from "react";
import { mainSocket } from "../socket/mainSocket";
import { ordersSocket } from "../socket/ordersSocket";
import { restaurantSocket } from "../socket/restaurantSocket";


const SocketContext = createContext();

export const SocketProvider = ({ children, authToken, restaurantId }) => {
  useEffect(() => {
    if (!authToken) return;

    // Pass auth token
    mainSocket.auth = { token: authToken };
    ordersSocket.auth = { token: authToken };

    // Connect sockets
    mainSocket.connect();
    ordersSocket.connect();
    restaurantSocket.connect();
    console.log("Sockets connected");

    // Join restaurant room
    if (restaurantId) {
      ordersSocket.emit("JOIN_RESTAURANT_ROOM", { restaurantId });
      ordersSocket.on("JOINED_RESTAURANT_ROOM", (data) => {
        console.log("Joined restaurant room:", data);
      });
    }
   ordersSocket.on("CONNECTION_ESTABLISHED", (data) => {
  console.log("Socket connected wdhbvcvjdvh:", data.message);
  console.log("User Type:", data.userType);
  console.log("Time:", data.timestamp);
});


    // Cleanup
    return () => {
      mainSocket.disconnect();
      ordersSocket.disconnect();
    };
  }, [authToken, restaurantId]);

  return (
    <SocketContext.Provider value={{ mainSocket, ordersSocket, restaurantSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSockets = () => useContext(SocketContext);
