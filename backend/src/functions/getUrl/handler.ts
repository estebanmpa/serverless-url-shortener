import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getUrlService } from './service.js';
import { GetUrlRequest } from '../../common/types.js';

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
};

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    console.log('Event:', JSON.stringify(event, null, 2));

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: '',
        };
    }

    try {
        // Parse request body
        const body: GetUrlRequest = JSON.parse(event.body || '{}');

        // Call service
        const result = await getUrlService(body);

        return {
            statusCode: 200,
            headers: CORS_HEADERS,
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error('Error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Internal server error';

        return {
            statusCode: 400,
            headers: CORS_HEADERS,
            body: JSON.stringify({
                message: errorMessage,
            }),
        };
    }
};