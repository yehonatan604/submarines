// SocketProvider.tsx
import Constants from "expo-constants";
import { useCallback, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getToken } from "../../helpers/storage.helper";
import socketContext from "../socket.context";

const SOCKET_URL = Constants?.expoConfig?.extra?.apiUrl;

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  const connect = useCallback(async () => {
    const token = await getToken();
    if (!socket && token) {
      const newSocket = io(SOCKET_URL, {
        transports: ["websocket"],
        autoConnect: true,
        auth: {
          token,
        },
      });

      setSocket(newSocket);

      newSocket.connect();

      newSocket.on("connect", () => {
        console.log("Connected with id:", newSocket.id);
        setConnected(true);
      });

      newSocket.on("disconnect", () => {
        setConnected(false);
      });
    }
  }, [socket]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [socket]);

  const emit = useCallback(
    (event: string, ...args: any[]) => {
      if (socket?.connected) {
        socket.emit(event, ...args);
      }
    },
    [socket]
  );

  const on = useCallback(
    (event: string, callback: (...args: any[]) => void) => {
      socket?.on(event, callback);
    },
    [socket]
  );

  return (
    <socketContext.Provider
      value={{
        isAvailable: !!socket,
        connected,
        connect,
        disconnect,
        socket,
        emit,
        on,
      }}
    >
      {children}
    </socketContext.Provider>
  );
};
