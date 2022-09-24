import { useMutation } from '@tanstack/react-query';
import { login } from '../api';

export function useLoginMutation({ onSuccess }: { onSuccess: (a: { message: string }) => void }) {
    return useMutation(login, {
        onSuccess(data, variables, context) {
            onSuccess(data.result);
        },
    });
}