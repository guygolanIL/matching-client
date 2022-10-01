import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api";

export function useUserProfileQuery() {
    return useQuery(['user-profile'], getUserProfile);
}