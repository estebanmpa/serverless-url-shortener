import { CreateShortUrlRequest, UrlResponse } from '@/types/types'
import { Configuration } from '@/utils/config'


/**
 * API function to create a short URL
 * This is a pure function that makes the API call
 */
export const createShortUrlMutation = async (data: CreateShortUrlRequest): Promise<UrlResponse> => {
    const response = await fetch(`${Configuration.ApiGatewayBaseUrl}/url`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to shorten URL' }))
        throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
}
