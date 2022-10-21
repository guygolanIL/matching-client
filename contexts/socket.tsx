import React, { PropsWithChildren, useState, useEffect, useContext } from 'react';
import Constants from "expo-constants";
import { io, Socket } from "socket.io-client";
import { useAppState } from '../hooks/useAppState';
import { MatchInfo } from '../data/chat/api';

const socketUrl = Constants.expoConfig?.extra?.socketUrl;

type ClientToServerEvents = {
    identify: (identification: { userId: number }) => void;
};

type ServerToClientEvents = {
    messagesUpdated: () => void;
    matchCreated: (match: MatchInfo) => void;
};
type ServerEvent = keyof ServerToClientEvents;

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>

type ISocketContext = {
    socket: AppSocket | null;
    isConnected: boolean;
};
const defaultContext: ISocketContext = {
    isConnected: false,
    socket: null,
};
const SocketContext = React.createContext<ISocketContext>(defaultContext);

export function SocketProvider(props: PropsWithChildren<{
    userId: number | undefined;
}>) {
    const [socket, setSocket] = useState<AppSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const appState = useAppState({
        onChange(newState) {
            if (newState === 'background') {
                socket?.disconnect();
            }
            if (newState === 'active') {
                socket?.connect();
            }
        },
    });

    const { userId } = props;

    useEffect(() => {
        const socket: AppSocket = io(socketUrl);
        socket.on('connect', () => {
            setIsConnected(true);
            if (userId) {
                socket?.emit('identify', { userId })
            }
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        setSocket(socket);

        return () => {
            socket.close();
            socket.off('connect');
            socket.off('disconnect');
            setSocket(null);
        };
    }, [userId]);


    return (
        <SocketContext.Provider value={{
            socket,
            isConnected,
        }}>
            {props.children}
        </SocketContext.Provider>
    );
}

export function useSocketContext(options?: Partial<ServerToClientEvents>): ISocketContext {
    const context = useContext(SocketContext);

    useEffect(() => {
        if (options) {
            Object.entries(options).forEach(([eventName, handler]) => {
                if (!context.socket) {
                    console.warn(`tried to listen to event <${eventName}> when socket is still uninitialized`);
                }
                context.socket?.on(eventName as ServerEvent, handler);
            });
        }

        return () => {
            if (options) {
                Object.entries(options).forEach(([eventName, handler]) => {
                    context.socket?.off(eventName as ServerEvent, handler);
                });
            }
        };
    }, [context, options]);


    return context;
}
