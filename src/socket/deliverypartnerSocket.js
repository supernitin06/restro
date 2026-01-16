// src/sockets/ordersSocket.js
import { io } from "socket.io-client";

export const ordersSocket = io("https://resto-grandma.onrender.com/delivery-partner", {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
