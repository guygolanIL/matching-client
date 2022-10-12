
import { useAuth } from '../../contexts/auth';
import { useCreateMessageMutation } from '../../data/chat/hooks/useCreateMessageMutation';
import { useGetMessagesQuery } from '../../data/chat/hooks/useGetMessagesQuery';
import { useSocketConnection } from '../../hooks/useSocketConnection';
import { byDate } from '../../util/sort';

export type UseChatOptions = {
    onNewMessage: () => void;
}
export function useChat(matchId: number, options?: UseChatOptions) {
    const { userId } = useAuth();
    const { mutate } = useCreateMessageMutation(userId!);
    const { data, refetch } = useGetMessagesQuery(matchId);

    const { isConnected } = useSocketConnection({
        messagesUpdated() {
            refetch();
        },
    });

    function sendMessage(content: string) {
        mutate({
            matchId,
            payload: {
                content,
            },
        });
    }

    const sortedMessages = data?.sort(byDate('desc', message => new Date(message.createdAt)));

    return {
        isConnected,
        messages: sortedMessages,
        sendMessage
    }
}   
