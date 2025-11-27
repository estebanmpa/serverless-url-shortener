import { nanoid } from 'nanoid';

/**
 * Generate a unique short code
 * Using nanoid with 8 characters gives us 62^8 = ~218 trillion combinations
 */
export function generateShortCode(length: number = 8): string {
    return nanoid(length);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
        return false;
    }
}

/**
 * Build the full short URL from the short code
 */
export function buildShortUrl(shortCode: string): string {
    const baseUrl = process.env.API_BASE_URL || 'https://example.com';
    return `${baseUrl}/${shortCode}`;
}


