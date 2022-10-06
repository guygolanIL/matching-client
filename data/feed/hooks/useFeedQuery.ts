import { useQuery } from '@tanstack/react-query';
import { feed } from '../api';

export function useFeedQuery() {
    const { data, isLoading, refetch } = useQuery(['feed'], feed);

    return {
        feed: data?.result,
        isFeedLoading: isLoading,
        refetch
    };
}