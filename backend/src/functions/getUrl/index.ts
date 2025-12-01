import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getUrlService } from './service.js';
import { LambdaResponse } from '../../common/returns.js';


export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const shortCode = event.pathParameters?.shortCode;

        if (!shortCode) {
            throw new Error('Short URL not found');
        }

        const result = await getUrlService({ shortCode });
        return LambdaResponse(200, result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        return LambdaResponse(400, { message: errorMessage });
    }
};