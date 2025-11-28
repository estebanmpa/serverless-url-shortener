import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { createShortUrlMutation } from '@/mutations/createShortUrl'
import { CreateShortUrlRequest, UrlResponse } from '@/types/types'

/**
 * Custom hook that wraps the createShortUrl mutation
 * This hook can be used in components to shorten URLs
 */
export function useCreateShortUrl(): UseMutationResult<
    UrlResponse,
    Error,
    CreateShortUrlRequest
> {
    return useMutation<UrlResponse, Error, CreateShortUrlRequest>({
        mutationFn: createShortUrlMutation,
        onSuccess: (data: UrlResponse) => {
            console.log('URL shortened successfully:', data)
        },
        onError: (error: Error) => {
            console.error('Failed to shorten URL:', error)
        },
    })
}