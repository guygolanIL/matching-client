import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePrivateUserProfile } from '../api';
import { getPrivateProfileQueryKey } from './useGetPrivateUserProfileQuery';

export function useUpdateUserProfileMutation() {
    const queryClient = useQueryClient();
    return useMutation(updatePrivateUserProfile, {
        onSuccess(data, variables, context) {
            queryClient.refetchQueries([getPrivateProfileQueryKey]);
        },
    });
}