// Request type for creating a short URL
export type CreateShortUrl = {
    url: string
}

// Response type from the API
export type ShortUrlResponse = {
    url: string
    shortCode: string
    shortUrl: string
}

// API Error type
export interface ApiError {
    message: string
    statusCode?: number
}