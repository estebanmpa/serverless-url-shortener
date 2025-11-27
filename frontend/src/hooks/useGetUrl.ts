import { getUrl } from '@/queries/getUrl'
import { UrlResponse } from '@/types/types'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

/**
 * Custom hook that fetches the redirect URL for a given short code
 * This hook can be used in components to resolve short URLs
 */
export function useGetUrl(shortCode: string): UseQueryResult<UrlResponse, Error> {
    return useQuery<UrlResponse, Error>({
        queryKey: ['GET_URL', shortCode],
        queryFn: () => getUrl(shortCode),
        enabled: !!shortCode, // Only run the query if shortCode is not empty
        retry: false, // Don't retry on failure (404 should fail immediately)
        staleTime: 1000 * 60 * 60, // Cache for 1 hour
    })
}
