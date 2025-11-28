import { Configuration } from '../../common/config.js';
import { CreateShortUrlRequest, UrlResponse } from '../../common/types.js';
import { generateShortCode, isValidUrl, buildShortUrl } from '../../common/utils.js';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const createShortUrlService = async ({ url }: CreateShortUrlRequest): Promise<UrlResponse> => {
    // Validate URL
    if (!url || !isValidUrl(url)) {
        throw new Error('Invalid URL format.');
    }

    // Generate unique short code
    const shortCode = generateShortCode();

    const command = new PutCommand({
        TableName: Configuration.DynamoDbTable,
        Item: {
            shortCode,
            url,
        },
    });

    await docClient.send(command);

    const shortUrl = buildShortUrl(shortCode)

    const response: UrlResponse = {
        url,
        shortUrl
    }

    return response;
}