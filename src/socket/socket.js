import { io } from "socket.io-client";

// Initializes the socket connection
// We use autoConnect: false to have control over when the socket connects (e.g. after login)
export const socket = io("https://resto-grandma.onrender.com", {
    autoConnect: false,
});
