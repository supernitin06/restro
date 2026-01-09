// src/sockets/restaurantSocket.js
import { io } from "socket.io-client";

export const restaurantSocket = io("https://resto-grandma.onrender.com/restaurant", {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
