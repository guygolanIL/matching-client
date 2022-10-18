import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateOnboardingStatus } from "../api";
import { getOnboardingStatusQueryKey } from "./useGetOnboardingStatusQuery";

export function useUpdateOnboardingStatusMutation() {
    const queryClient = useQueryClient();

    return useMutation(updateOnboardingStatus, {
        onSuccess(data, variables, context) {
            queryClient.refetchQueries([getOnboardingStatusQueryKey]);
        },
    });
}