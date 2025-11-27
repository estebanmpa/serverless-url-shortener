// Request type for creating a short URL
export interface CreateShortUrlRequest {
    url: string
}

// Request type for getting a URL
export interface GetUrlRequest {
    shortCode: string
}

// Response type from the API
export interface UrlResponse {
    url: string
    shortUrl: string
}

// API Error type
export interface ApiError {
    message: string
    statusCode?: number
}