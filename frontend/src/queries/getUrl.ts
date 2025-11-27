import { GetUrlRequest, UrlResponse } from "@/types/types"

const API_ENDPOINT = 'https://your-api-gateway-url.amazonaws.com/Prod'

/**
 * API function to get the redirect URL from a short code
 * This calls the backend redirect endpoint which returns redirect info
 */
export const getUrl = async ({ shortCode }: GetUrlRequest): Promise<UrlResponse> => {
    const response = await fetch(`${API_ENDPOINT}/url/${shortCode}`)

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Short URL not found')
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return await response.json()
}
