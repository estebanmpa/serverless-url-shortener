# 🔗 URL Shortener - AWS Serverless

A modern, full-stack serverless URL shortener built with React, TypeScript, AWS Lambda, DynamoDB, and API Gateway.

## ✨ Features

- 🚀 **Serverless Architecture** - Zero server management, scales automatically
- ⚡ **Fast & Efficient** - Powered by AWS Lambda and DynamoDB
- 🎨 **Modern UI** - Built with React, TanStack Router, and Mantine UI
- 🔒 **Type-Safe** - Full TypeScript implementation (frontend & backend)
- 📦 **ESM Modules** - Modern JavaScript module system
- 🧪 **Local Development** - Test locally with AWS SAM CLI
- 💰 **Cost-Effective** - Runs on AWS Free Tier

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- TanStack Router (file-based routing)
- TanStack Query (data fetching)
- Mantine UI (component library)
- Vite (build tool)

**Backend:**
- Node.js 20.x with TypeScript (ESM)
- AWS Lambda (serverless functions)
- API Gateway (REST API)
- DynamoDB (NoSQL database)
- AWS SAM (Infrastructure as Code)

### System Design

```
┌─────────────┐      HTTPS      ┌──────────────┐
│   Browser   │ ──────────────> │  S3 Static   │
│             │                  │   Website    │
└─────────────┘                  └──────────────┘
      │
      │ API Calls
      ▼
┌─────────────────────────────────────────────┐
│           API Gateway (REST)                │
└─────────────────────────────────────────────┘
      │                            │
      │ POST /shorten              │ GET /{code}
      ▼                            ▼
┌──────────────────┐         ┌──────────────────┐
│  CreateShortUrl  │         │   GetRedirect    │
│     Lambda       │         │      Lambda      │
└──────────────────┘         └──────────────────┘
      │                            │
      └────────────┬───────────────┘
                   ▼
            ┌─────────────┐
            │  DynamoDB   │
            │   Table     │
            └─────────────┘
```

## 📁 Project Structure

```
url-shortener/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── routes/         # TanStack Router routes
│   │   ├── hooks/          # Custom React hooks
│   │   ├── queries/        # API query functions
│   │   ├── mutations/      # API mutation functions
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                 # AWS Lambda functions
│   ├── src/
│   │   ├── common/         # Shared utilities
│   │   │   ├── types.ts   # Type definitions
│   │   │   ├── dynamodb.ts # DynamoDB helpers
│   │   │   └── utils.ts   # Utility functions
│   │   └── functions/
│   │       ├── createShortUrl/
│   │       │   ├── handler.ts
│   │       │   └── service.ts
│   │       └── getRedirect/
│   │           ├── handler.ts
│   │           └── service.ts
│   ├── events/             # Test event payloads
│   ├── template.yaml       # AWS SAM template
│   ├── samconfig.toml     # SAM configuration
│   └── package.json
│
├── infrastructure/         # Additional IaC (optional)
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or later
- **npm** or **yarn**
- **AWS Account** (for deployment)
- **AWS CLI** configured with credentials
- **AWS SAM CLI** ([Installation Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run build
```

### Local Backend Testing

```bash
# Start local API Gateway
cd backend
npm run local
```

API will be available at `http://localhost:3000`

## 🧪 Testing

### Test Backend Locally

**Create Short URL:**
```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com/very/long/url"}'
```

**Test Redirect:**
```bash
curl -i http://localhost:3000/abc123
```

**Invoke Functions Directly:**
```bash
cd backend
npm run sam:invoke:create
npm run sam:invoke:redirect
```

## 📦 Deployment

### Backend Deployment

```bash
cd backend

# First time deployment (interactive)
npm run sam:deploy

# Subsequent deployments
npm run deploy
```

You'll be prompted for:
- Stack name (e.g., `url-shortener-stack`)
- AWS region (e.g., `us-east-1`)
- Environment (dev/staging/prod)

After deployment, note the **API Gateway endpoint URL** from the outputs.

### Frontend Deployment

1. Update API endpoint in frontend:
   ```typescript
   // frontend/src/mutations/createShortUrl.ts
   const API_ENDPOINT = 'YOUR_API_GATEWAY_URL'
   
   // frontend/src/queries/getRedirect.ts
   const API_ENDPOINT = 'YOUR_API_GATEWAY_URL'
   ```

2. Build and deploy:
   ```bash
   cd frontend
   npm run build
   
   # Deploy to S3 or hosting service of choice
   # Example with S3:
   aws s3 sync dist/ s3://your-bucket-name
   ```

## 🔧 Configuration

### Backend Environment Variables

Set in `backend/template.yaml`:
- `TABLE_NAME`: DynamoDB table name
- `API_BASE_URL`: Base URL for generated short URLs

### Frontend Configuration

Update API endpoints in:
- `frontend/src/mutations/createShortUrl.ts`
- `frontend/src/queries/getRedirect.ts`

## 📊 API Documentation

### POST /shorten
Create a short URL

**Request:**
```json
{
  "url": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "url": "https://example.com/very/long/url",
  "shortCode": "abc123",
  "shortUrl": "https://api.../abc123"
}
```

### GET /{shortCode}
Redirect to original URL

**Response:** 302 redirect to original URL

## 🛠️ Development Scripts

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend
```bash
npm run build        # Compile TypeScript
npm run local        # Start local API
npm run deploy       # Deploy to AWS
npm run clean        # Clean build artifacts
```

## 💰 Cost Estimation

Running on AWS Free Tier:
- **Lambda**: 1M free requests/month
- **API Gateway**: 1M free API calls/month
- **DynamoDB**: 25 GB free storage, 25 read/write capacity units
- **S3**: 5 GB free storage, 20k GET requests, 2k PUT requests

Expected monthly cost: **$0** (within free tier limits)

## 🔐 Security

- CORS enabled for API endpoints
- Input validation on all endpoints
- DynamoDB encryption at rest
- CloudWatch logging enabled
- Minimal IAM permissions (least privilege)

## 📈 Scalability

- **Lambda**: Auto-scales to handle traffic
- **DynamoDB**: On-demand pricing, auto-scaling
- **API Gateway**: Handles millions of requests
- **Short codes**: 62^8 = 218 trillion combinations (nanoid)

## 🐛 Troubleshooting

### Backend Issues

```bash
# Check CloudWatch logs
aws logs tail /aws/lambda/url-shortener-create-dev --follow

# Validate SAM template
cd backend
sam validate

# Rebuild
npm run clean && npm install && npm run build
```

### Frontend Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## 📚 Resources

- [AWS SAM Documentation](https://docs.aws.amazon.com/serverless-application-model/)
- [React Documentation](https://react.dev/)
- [TanStack Router](https://tanstack.com/router)
- [Mantine UI](https://mantine.dev/)
- [DynamoDB Guide](https://docs.aws.amazon.com/dynamodb/)



