# Backend - URL Shortener Service

AWS Serverless backend for URL shortening service using Lambda, API Gateway, and DynamoDB.

## 🏗️ Architecture

- **Language**: TypeScript (ESM)
- **Runtime**: Node.js 20.x
- **Framework**: AWS SAM (Serverless Application Model)
- **Database**: DynamoDB
- **API**: API Gateway REST API

## 📁 Project Structure

```
backend/
├── src/
│   ├── common/
│   │   ├── types.ts          # TypeScript type definitions
│   │   ├── dynamodb.ts       # DynamoDB helper functions
│   │   └── utils.ts          # Utility functions (short code generation, validation)
│   └── functions/
│       ├── createShortUrl/
│       │   ├── handler.ts    # Lambda handler
│       │   └── service.ts    # Business logic
│       └── getRedirect/
│           ├── handler.ts    # Lambda handler
│           └── service.ts    # Business logic
├── events/                   # Sample event payloads for local testing
├── template.yaml            # AWS SAM template
├── samconfig.toml          # SAM CLI configuration
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- AWS CLI configured with credentials
- AWS SAM CLI ([Installation Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))

### Installation

```bash
# Install dependencies
npm install

# Build TypeScript code
npm run build
```

## 📝 Available Scripts

### Development
```bash
npm run build          # Compile TypeScript to JavaScript
npm run clean          # Clean build artifacts
npm run prepare        # Clean and build
```

### AWS SAM - Build & Deploy
```bash
npm run sam:build      # Build SAM application
npm run sam:deploy     # Deploy to AWS (guided)
npm run package        # Build TypeScript + SAM
npm run deploy         # Full deployment (build + deploy)
```

### Local Testing
```bash
npm run local          # Start local API Gateway
npm run sam:local      # Alternative: start local API
npm run sam:invoke:create    # Test create function locally
npm run sam:invoke:redirect  # Test redirect function locally
```

## 🔧 API Endpoints

### Create Short URL
- **Method**: POST
- **Endpoint**: `/shorten`
- **Purpose**: Creates a short URL and stores mapping in DynamoDB
- **Request Body**:
  ```json
  {
    "url": "https://example.com/very/long/url"
  }
  ```
- **Response**:
  ```json
  {
    "url": "https://example.com/very/long/url",
    "shortCode": "abc123",
    "shortUrl": "https://api.../abc123"
  }
  ```

### Redirect to Original URL
- **Method**: GET
- **Endpoint**: `/{shortCode}`
- **Purpose**: Retrieves original URL and redirects user
- **Input**: shortCode in path parameter
- **Output**: 302 redirect to original URL

## 🧪 Local Testing

### Start Local API
```bash
npm run local
```
API will be available at `http://localhost:3000`

### Test Create Short URL
```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Test Redirect
```bash
curl -i http://localhost:3000/abc123
```

## 🚀 Deployment

### First Time Deployment
```bash
# Interactive guided deployment
npm run sam:deploy

# You'll be prompted for:
# - Stack name
# - AWS region
# - Environment (dev/staging/prod)
# - Confirmation for resource creation
```

### Subsequent Deployments
```bash
npm run deploy
```

### Configuration
Edit `samconfig.toml` to set default parameters:
- `stack_name`: CloudFormation stack name
- `region`: AWS region
- `parameter_overrides`: Environment variables

## 🗄️ DynamoDB Schema

**Table Name**: `UrlShortener-{Environment}`

**Primary Key**:
- `shortCode` (String) - Hash key

**Attributes**:
- `url` (String) - Original URL
- `createdAt` (Number) - Timestamp
- `expiresAt` (Number) - Optional TTL timestamp

**Features**:
- Pay-per-request billing
- TTL enabled on `expiresAt` attribute
- DynamoDB Streams enabled

## 🔐 IAM Permissions

Lambda functions have minimal required permissions:
- **CreateShortUrl**: DynamoDB PutItem
- **GetRedirect**: DynamoDB GetItem

## 📊 Monitoring

CloudWatch Log Groups:
- `/aws/lambda/url-shortener-create-{Environment}`
- `/aws/lambda/url-shortener-redirect-{Environment}`

Log retention: 7 days

## 🛠️ Technology Stack

- **TypeScript**: Type-safe code
- **AWS Lambda**: Serverless compute
- **API Gateway**: REST API
- **DynamoDB**: NoSQL database
- **nanoid**: Short code generation
- **AWS SDK v3**: AWS service interactions
- **esbuild**: Fast bundling

## 📦 Dependencies

- `@aws-sdk/client-dynamodb`: DynamoDB client
- `@aws-sdk/lib-dynamodb`: DynamoDB document client
- `nanoid`: Unique ID generation

## 🔄 CI/CD

To integrate with CI/CD pipeline:

```bash
# Build and package
npm run package

# Deploy (non-interactive)
sam deploy --no-confirm-changeset --no-fail-on-empty-changeset
```

## 🐛 Troubleshooting

### Build Issues
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

### SAM Issues
```bash
# Rebuild SAM
npm run sam:build

# Validate template
sam validate
```

## 📝 Environment Variables

Set in `template.yaml` under `Globals.Function.Environment`:
- `TABLE_NAME`: DynamoDB table name
- `API_BASE_URL`: Base URL for generated short URLs



