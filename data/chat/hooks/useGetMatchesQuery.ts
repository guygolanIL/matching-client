import { useQuery } from "@tanstack/react-query";

import { getMatches } from "../api";

export const GetMatchesQueryKey = 'chats';
export function useGetMatchesQuery() {
    return useQuery([GetMatchesQueryKey], getMatches);
}
