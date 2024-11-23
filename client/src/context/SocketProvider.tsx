"use client";
import React, {
  useRef,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react"; // Import React explicitly
import io, { Socket } from "socket.io-client";
import { Back_URL } from "../config";

interface SocketContextType {
  socket: React.MutableRefObject<Socket | null>;
}

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useWebSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context.socket.current;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(Back_URL);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
