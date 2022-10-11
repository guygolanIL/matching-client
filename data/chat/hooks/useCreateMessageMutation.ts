import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMatchMessage, CreateMatchMessageRequest, Message } from "../api";
import { getMessageKey } from "./useGetMessagesQuery";

export function useCreateMessageMutation(userId: number) {
    const queryClient = useQueryClient();
    return useMutation(({ matchId, payload }: { matchId: number; payload: CreateMatchMessageRequest }) => createMatchMessage(matchId, payload), {
        onMutate: async ({ matchId, payload }) => {

            await queryClient.cancelQueries([getMessageKey]);

            const previousMessages = queryClient.getQueryData<Array<Message>>([getMessageKey]);
            queryClient.setQueryData<Array<Message>>([getMessageKey], (old) => {
                const newMessage: Message = {
                    content: payload.content,
                    id: Math.random(),
                    createdByUserId: userId,
                    matchId
                }
                return old ? [...old, newMessage] : [newMessage];
            });

            return { previousMessages };
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData([getMessageKey], context?.previousMessages)
        },

        onSettled: () => {
            queryClient.invalidateQueries([getMessageKey])
        },
    });
}