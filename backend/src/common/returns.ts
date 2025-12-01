export const LambdaResponse = (statusCode: number, body: any) => {
    return {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET"
        },
        statusCode,
        body: JSON.stringify(body),
    }
}
