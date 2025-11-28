import { CreateShortUrlRequest, UrlResponse } from '../../common/types.js';
import { generateShortCode, isValidUrl, buildShortUrl } from '../../common/utils.js';

export async function createShortUrlService({ url }: CreateShortUrlRequest): Promise<UrlResponse> {
    // Validate URL
    if (!url || !isValidUrl(url)) {
        throw new Error('Invalid URL format.');
    }

    // Generate unique short code
    const shortCode = generateShortCode();
    const shortUrl = buildShortUrl(shortCode)

    const response: UrlResponse = {
        url,
        shortUrl
    }

    return response;
}