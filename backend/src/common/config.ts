/**
 * REMEMBER:
 * SAM does not automatically read from a .env file for Lambdas (even locally).
 * We must provide all environment variables explicitly in the template.yaml 
 * or pass them via the CLI when running locally.
 */
export const Configuration = {
    ApiBaseUrl: process.env.API_BASE_URL,
    DynamoDbTable: process.env.TABLE_NAME
}