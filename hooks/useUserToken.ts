import { useAsyncStorage } from '../util/async-storage';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const queryKey = ['initial-token-fetch'];

export function useUserToken() {
    const { getItem, removeItem, setItem } = useAsyncStorage('@user-token');
    const { isLoading, data: userToken, } = useQuery(queryKey, async () => getItem());
    const queryClient = useQueryClient();

    return {
        userToken,
        isLoading,
        setUserToken(token: string) {
            queryClient.setQueryData(queryKey, token);
            setItem(token);
        },
        eraseUserToken() {
            removeItem().then(() => queryClient.setQueriesData(queryKey, null));
        }
    }
}