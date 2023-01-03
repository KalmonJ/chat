import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return {
    socket,
    isConnected,
  };
};
