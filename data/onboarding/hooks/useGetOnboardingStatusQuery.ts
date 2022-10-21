import { useQuery } from "@tanstack/react-query";

import { QueryError } from "../../types";

import { getOnboardingStatus, OnboardingStatusResponse } from "../api";

export const getOnboardingStatusQueryKey = 'onboarding-status';
export function useGetOnboardingStatusQuery() {
    return useQuery<OnboardingStatusResponse['result'], QueryError>([getOnboardingStatusQueryKey], getOnboardingStatus);
}