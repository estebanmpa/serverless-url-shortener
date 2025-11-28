import { GetUrlRequest, UrlResponse } from "../../common/types";


export async function getUrlService({ shortCode }: GetUrlRequest): Promise<UrlResponse> {
    const mapping = { url: 'http://www.aws.com', shortUrl: shortCode } as UrlResponse;

    if (!mapping) {
        throw new Error('Short URL not found');
    }

    return mapping;
}

