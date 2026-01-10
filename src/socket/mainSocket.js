// src/sockets/mainSocket.js
import { io } from "socket.io-client";

export const mainSocket = io("http://192.168.1.108:5004", {
  autoConnect: false,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
