import { useMutation } from '@tanstack/react-query';
import { register } from '../api';

export function useRegisterMutation({ onSuccess }: { onSuccess: () => void }) {

    return useMutation(register, {
        onSuccess,
    });
}