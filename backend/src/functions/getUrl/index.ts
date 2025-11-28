import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getUrlService } from './service.js';


export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const shortCode = event.pathParameters?.shortCode;

        if (!shortCode) {
            throw new Error('Short URL not found');
        }

        // Call service
        const result = await getUrlService({ shortCode });

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
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