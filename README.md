# 🔗 URL Shortener - AWS Serverless

A modern, full-stack serverless URL shortener built with React, TypeScript, AWS Lambda, DynamoDB, and API Gateway.

## ✨ Features

-   **Serverless Architecture:** Automatically scales, no server management.
-   **Fast & Efficient:** Powered by AWS Lambda and DynamoDB.
-   **Modern UI:** React with TanStack Router and Mantine UI.
-   **Type-Safe:** Full TypeScript for frontend & backend.
-   **Local Development:** Test locally with AWS SAM CLI.

## 🚀 Getting Started

### Prerequisites

-   Node.js 20.x or later
-   npm or yarn
-   AWS Account & AWS CLI configured
-   AWS SAM CLI ([Installation Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))

### Local Development

1.  **Backend:**
    ```bash
    cd backend
    npm install
    npm run local
    ```
    API will be available at `http://localhost:3000`

2.  **Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    Frontend will be available at `http://localhost:5173`

## 📦 Deployment

### Backend Deployment

```bash
cd backend
npm run sam:deploy # First time (interactive)
npm run deploy     # Subsequent deployments
```
The API Gateway endpoint URL will be in the stack outputs.

### Frontend Deployment

1.  **Build Frontend:**
    ```bash
    cd frontend
    npm run build
    ```

2.  **Deploy to S3:**
    After deploying the backend, get the S3 bucket name (e.g., from stack outputs `WebAppS3BucketName`) and the API Gateway endpoint (`ApiEndpoint`).
    
    You'll need to set the API endpoint as an environment variable during the frontend build. For example, using `VITE_API_ENDPOINT`.
    
    ```bash
    # Example deployment script (adjust VITE_API_ENDPOINT as needed)
    export VITE_API_ENDPOINT="YOUR_API_GATEWAY_URL" # Replace with actual API Gateway URL
    cd frontend
    npm run build
    aws s3 sync dist/ s3://YOUR_FRONTEND_BUCKET_NAME --delete
    ```
    Replace `YOUR_FRONTEND_BUCKET_NAME` with the S3 bucket name from your SAM stack outputs.

## 🛠️ Development Scripts

-   **Frontend:** `npm run dev`, `npm run build`
-   **Backend:** `npm run build`, `npm run local`, `npm run deploy`

## 📝 License

MIT