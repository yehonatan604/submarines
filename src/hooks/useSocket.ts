import { useContext, useEffect } from "react";
import socketContext from "../context/socket.context";

const useSocket = () => {
    const { socket, connect, connected, on, emit, isAvailable } = useContext(socketContext);

    useEffect(() => {
        if (!connected) {
            connect();
        }
    }, [connected, connect]);

    return {
        socket,
        connect,
        connected,
        on,
        emit,
        isAvailable,
    };
}

export default useSocket;