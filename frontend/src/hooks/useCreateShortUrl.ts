import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { createShortUrlMutation } from '@/mutations/createShortUrl'
import { CreateShortUrl, ShortUrlResponse } from '@/types/types'

/**
 * Custom hook that wraps the createShortUrl mutation
 * This hook can be used in components to shorten URLs
 */
export function useCreateShortUrl(): UseMutationResult<
    ShortUrlResponse,
    Error,
    CreateShortUrl
> {
    return useMutation<ShortUrlResponse, Error, CreateShortUrl>({
        mutationFn: createShortUrlMutation,
        onSuccess: (data) => {
            console.log('URL shortened successfully:', data)
        },
        onError: (error) => {
            console.error('Failed to shorten URL:', error)
        },
    })
}