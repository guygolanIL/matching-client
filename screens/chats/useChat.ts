import { useEffect } from 'react';

import { useAuthContext } from '../../contexts/auth';
import { useSocketContext } from '../../contexts/socket/socket';
import { useCreateMessageMutation } from '../../data/chat/hooks/useCreateMessageMutation';
import { useGetMessagesQuery } from '../../data/chat/hooks/useGetMessagesQuery';
import { byDate } from '../../util/sort';

export function useChat(matchId: number) {
    const { userId } = useAuthContext();
    const { mutate } = useCreateMessageMutation(userId!);
    const { data, refetch } = useGetMessagesQuery(matchId);

    const socketContext = useSocketContext();

    useEffect(() => {
        const subscription = socketContext.subscribe('messagesUpdated', () => {
            refetch();
        });

        return () => subscription.unsubscribe();
    }, []);

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
        messages: sortedMessages,
        sendMessage
    }
}   
