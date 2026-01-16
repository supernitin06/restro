// src/sockets/mainSocket.js
import { io } from "socket.io-client";

export const mainSocket = io("https://resto-grandma.onrender.com", {
  autoConnect: false,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
