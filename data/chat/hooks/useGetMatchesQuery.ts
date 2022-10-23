import { useQuery } from "@tanstack/react-query";

import { getMatches } from "../api";

export const getMatchesQueryKey = 'chats';
export function useGetMatchesQuery() {
    return useQuery([getMatchesQueryKey], getMatches);
}
