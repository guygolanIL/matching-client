import { useQuery } from "@tanstack/react-query";

import { getPublicUserProfile } from "../api";

export function useGetPublicUserProfileQuery(userId: number) {
    return useQuery(['user-profile', userId], () => getPublicUserProfile(userId));
}