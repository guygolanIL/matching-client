import { useQuery } from "@tanstack/react-query";

import { getPrivateUserProfile } from "../api";

export const getPrivateProfileQueryKey = 'user-profile';
export function useGetPrivateUserProfileQuery() {
    return useQuery([getPrivateProfileQueryKey], getPrivateUserProfile);
}
