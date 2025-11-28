import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { GetUrlRequest, UrlResponse } from '../../common/types';
import { Configuration } from '../../common/config';
import { buildShortUrl } from '../../common/utils';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export async function getUrlService({ shortCode }: GetUrlRequest): Promise<UrlResponse> {
    const command = new GetCommand({
        TableName: Configuration.DynamoDbTable,
        Key: {
            shortCode
        },
    });

    const dbResponse = await docClient.send(command);

    if (!dbResponse.Item) {
        throw new Error('Short URL not found');
    }

    const shortUrl = buildShortUrl(dbResponse.Item.shortCode)
    const response: UrlResponse = {
        url: dbResponse.Item.url,
        shortUrl
    }

    return response;
}


