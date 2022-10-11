
import { useSocketConnection } from '../../hooks/useSocket';

export type UseChatOptions = {
    onNewMessage: () => void;
}
export function useChat(options?: UseChatOptions) {
    const { socket, isConnected } = useSocketConnection({
        messagesUpdated() {
            options?.onNewMessage();
        },
    });




    return {
        isConnected
    }
}   
