import { useQuery } from "@tanstack/react-query";

import { getOnboardingStatus } from "../api";

export const getOnboardingStatusQueryKey = 'onboarding-status';
export function useGetOnboardingStatusQuery() {
    return useQuery([getOnboardingStatusQueryKey], getOnboardingStatus);
}