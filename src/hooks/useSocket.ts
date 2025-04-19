import { useContext, useEffect, useState } from "react";
import socketContext from "../context/socket.context";
import useAuth from "./useAuth";

const useSocket = () => {
    const { user } = useAuth();
    const { socket, connect, connected, on, emit, isAvailable } = useContext(socketContext);
    const [players, setPlayers] = useState<any[]>([]);

    const joinLobby = () => {
        if (socket && user?._id) {
            socket.emit("join-lobby", { userId: user._id });
        }
    };

    useEffect(() => {
        if (!connected) connect();
    }, [connected]);

    useEffect(() => {
        if (socket) {
            const handler = (playerList: any[]) => {
                setPlayers(playerList);
            };
            socket.on("available-users", handler);

            return () => {
                socket.off("available-users", handler);
            };
        }
    }, [socket]);

    return {
        socket,
        connect,
        connected,
        on,
        emit,
        isAvailable,
        players,
        user,
        joinLobby,
    };
};

export default useSocket;
