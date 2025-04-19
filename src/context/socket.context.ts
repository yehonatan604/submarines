import { createContext } from "react";

type TSocketContext = {
    isAvailable: boolean;
    connected: boolean;
    connect: () => void;
    disconnect: () => void;
    socket: any;
    on: (event: string, callback: (...args: any[]) => void) => void;
    emit: (event: string, ...args: any[]) => void;
};

const socketContext = createContext<TSocketContext>({
    isAvailable: false,
    connected: false,
    connect: () => { },
    disconnect: () => { },
    socket: null,
    on: () => { },
    emit: () => { },
});

export default socketContext;