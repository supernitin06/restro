// src/sockets/ordersSocket.js
import { io } from "socket.io-client";

export const ordersSocket = io("http://192.168.1.108:5004/delivery-partner", {
  autoConnect: false,
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
