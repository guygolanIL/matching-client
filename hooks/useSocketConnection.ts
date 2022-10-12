import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../contexts/auth";

const socketUrl = Constants.expoConfig?.extra?.socketUrl;

type ClientToServerEvents = {
    identify: (identification: { userId: number }) => void;
};

type ServerToClientEvents = {
    messagesUpdated: () => void;
};


export function useSocketConnection(options?: ServerToClientEvents) {
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>();
    const [isConnected, setIsConnected] = useState(false);
    const { userId } = useAuth();

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`${socketUrl}`);
        socket.on('connect', () => {
            setIsConnected(true);
            if (userId) {
                socket?.emit('identify', { userId })
            }
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        if (options) {
            Object.entries(options).forEach(([event, handler]) => {
                socket.on(event as keyof ServerToClientEvents, handler);
            })
        }

        socket.on('messagesUpdated', () => {

        });

        setSocket(socket);

        return () => {
            socket.close();
            socket.off('connect');
            socket.off('disconnect');
            setSocket(null);
        };
    }, [userId]);

    return {
        socket,
        isConnected
    }
}