import { GetShortUrlRequest, ShortUrlResponse } from '../../common/types.js';

export async function getShortUrlService({ shortCode }: GetShortUrlRequest): Promise<ShortUrlResponse> {
    const mapping = { url: 'http://www.aws.com' } as ShortUrlResponse;

    if (!mapping) {
        throw new Error('Short URL not found');
    }

    return mapping;
}

