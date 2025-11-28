import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createShortUrlService } from './service.js';
import { CreateShortUrlRequest } from '../../common/types.js';


export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        // Parse request body
        const body: CreateShortUrlRequest = JSON.parse(event.body || '{}');

        // Call service
        const result = await createShortUrlService({ ...body });

        return {
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error) {
        console.error('Error:', error);

        const errorMessage = error instanceof Error ? error.message : 'Internal server error';

        return {
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: 400,
            body: JSON.stringify({
                message: errorMessage,
            }),
        };
    }
};