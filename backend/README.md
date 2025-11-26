# Backend

Lambda functions for URL shortening service.

## Functions

### create-short-url
- **Method**: POST
- **Endpoint**: `/shorten`
- **Purpose**: Creates a short URL and stores mapping in DynamoDB
- **Input**: `{ "url": "https://example.com" }`
- **Output**: `{ "shortUrl": "https://api.../abc123", "shortCode": "abc123" }`

### redirect
- **Method**: GET
- **Endpoint**: `/{shortCode}`
- **Purpose**: Retrieves original URL and redirects user
- **Input**: shortCode in path parameter
- **Output**: 302 redirect to original URL



