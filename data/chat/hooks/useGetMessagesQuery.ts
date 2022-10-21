import { useQuery } from "@tanstack/react-query";

import { getMatchMessages } from "../api";

export const getMessageKey = 'messages';
export function useGetMessagesQuery(matchId: number) {
    return useQuery([getMessageKey], () => getMatchMessages(matchId), {
        refetchInterval: 60000
    });
}