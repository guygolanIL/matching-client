import React, { PropsWithChildren, useState, useEffect, useContext } from 'react';
import Constants from "expo-constants";
import { io, Socket } from "socket.io-client";

import { useAppState } from '../../hooks/useAppState';
import { MatchInfo } from '../../data/chat/api';

const socketUrl = Constants.expoConfig?.extra?.socketUrl;

type ClientToServerEvents = {
    identify: (identification: { userId: number }) => void;
};

type ServerToClientEvents = {
    messagesUpdated: () => void;
    matchCreated: (match: MatchInfo) => void;
};
type ServerEvent = keyof ServerToClientEvents;

type AppSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

type SocketSubscription = { unsubscribe: () => void }

type ISocketContext = {
    _socket: AppSocket | null;
    isConnected: boolean;
    subscribe(event: ServerEvent, handler: ServerToClientEvents[ServerEvent]): SocketSubscription;
    history: Array<string>;
};
const defaultContext: ISocketContext = {
    _socket: null,
    isConnected: false,
    subscribe: () => ({ unsubscribe: () => { } }),
    history: [],
};
const SocketContext = React.createContext<ISocketContext>(defaultContext);

export function SocketProvider(props: PropsWithChildren<{
    userId: number | undefined;
}>) {
    const [socket, setSocket] = useState<AppSocket | null>(null);
    const [eventsHistory, setEventsHistory] = useState<Array<string>>([]);
    const [isConnected, setIsConnected] = useState(false);

    useAppState({
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

        socket.on('disconnect', () => setIsConnected(false));

        setSocket(socket);

        return () => {
            socket.disconnect();
            socket.removeAllListeners();
            setSocket(null);
        };
    }, [userId]);


    return (
        <SocketContext.Provider value={{
            _socket: socket,
            isConnected,
            subscribe(event: ServerEvent, handler: ServerToClientEvents[ServerEvent]) {
                const wrappedHandler: ServerToClientEvents[ServerEvent] = (args) => {
                    console.log('handler', event, args);
                    if (!socket) {
                        console.warn(`tried to listen to event <${event}> when socket is still uninitialized`);
                        return;
                    }
                    setEventsHistory(old => ([...old, event]));
                    handler(args);
                };
                socket?.on(event, wrappedHandler);

                const subscription: SocketSubscription = {
                    unsubscribe() {
                        socket?.off(event, wrappedHandler);
                    },
                };

                return subscription;
            },
            history: eventsHistory,
        }}>
            {props.children}
        </SocketContext.Provider>
    );
}


type Hooks = {
    [Key in ServerEvent as `useOn${Capitalize<Key>}`]: EventHook<Key>;
};
type EventHook<Event extends ServerEvent> = (handler: ServerToClientEvents[Event]) => void;
function createEventEffectHook(context: ISocketContext, event: ServerEvent): EventHook<ServerEvent> {
    return (handler) => {
        const subscription = context.subscribe(event, handler);
        return () => subscription.unsubscribe();
    };
}

export function useSocketContext(): [ISocketContext, Hooks] {
    const context = useContext(SocketContext);

    return [context, {
        useOnMatchCreated: createEventEffectHook(context, 'matchCreated'),
        useOnMessagesUpdated: createEventEffectHook(context, 'messagesUpdated'),
    }];
}
