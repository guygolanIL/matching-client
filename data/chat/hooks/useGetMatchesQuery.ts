import { useQuery } from "@tanstack/react-query";
import { getMatches } from "../api";

export function useGetMatchesQuery() {
    return useQuery(['chats'], getMatches);
}
