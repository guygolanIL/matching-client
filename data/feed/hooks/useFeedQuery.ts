import { useQuery } from '@tanstack/react-query';
import { feed } from '../api';

export const feedQueryKey = 'feed';
export function useFeedQuery() {
    const { data, isLoading, refetch } = useQuery([feedQueryKey], feed);

    return {
        feed: data,
        isFeedLoading: isLoading,
        refetch
    };
}