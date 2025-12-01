import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createShortUrlService } from './service.js';
import { CreateShortUrlRequest } from '../../common/types.js';
import { LambdaResponse } from '../../common/returns.js';


export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    try {
        const body: CreateShortUrlRequest = JSON.parse(event.body || '{}');
        const result = await createShortUrlService({ ...body });
        return LambdaResponse(200, result);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        return LambdaResponse(400, { message: errorMessage });
    }
};