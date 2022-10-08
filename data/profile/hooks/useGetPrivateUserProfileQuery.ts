import { useQuery } from "@tanstack/react-query";

import { getPrivateUserProfile } from "../api";

export function useGetPrivateUserProfileQuery() {
    return useQuery(['user-profile'], getPrivateUserProfile);
}
