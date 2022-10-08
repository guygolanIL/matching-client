
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

type ClientToServerEvents = {
    message: (a: any) => void;
};

type ServerToClientEvents = {
    pong: () => void;
};


export function useChat() {
    const [socket, setSocket] = useState<Socket<ServerToClientEvents, ClientToServerEvents> | null>();
    const [isConnected, setIsConnected] = useState(false);
    const [lastPong, setLastPong] = useState<string>();

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(`ws://${apiUrl}`);

        socket.on('connect', () => {
            console.log(`client connects ${apiUrl}`);
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            console.log('client disconn');
            setIsConnected(false);
        });

        socket.on('pong', () => {
            console.log('client pong');
            setLastPong(new Date().toISOString());
        });

        setSocket(socket);

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('pong');
            setSocket(null);
        };
    }, []);

    return { socket, isConnected, lastPong };
}
