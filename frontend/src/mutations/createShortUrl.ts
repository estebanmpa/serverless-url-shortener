import { CreateShortUrl, ShortUrlResponse } from '@/types/types'

const API_ENDPOINT = 'https://your-api-gateway-url.amazonaws.com'

/**
 * API function to create a short URL
 * This is a pure function that makes the API call
 */
export const createShortUrlMutation = async (data: CreateShortUrl): Promise<ShortUrlResponse> => {
    const response = await fetch(`${API_ENDPOINT}/shorten`, {
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