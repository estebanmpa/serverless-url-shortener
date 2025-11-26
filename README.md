# URL Shortener - AWS Serverless

A serverless URL shortener built with AWS Lambda, DynamoDB, API Gateway, and S3.

## Project Structure

```
url-shortener/
├── frontend/                  # Static website (HTML/CSS/JS)
├── backend/                   # Lambda functions
│   └── functions/
│       ├── create-short-url/  # POST /shorten endpoint
│       └── redirect/          # GET /{shortCode} endpoint
├── infrastructure/            # AWS SAM templates
├── .github/
│   └── workflows/            # CI/CD with GitHub Actions
└── README.md
```

## Architecture

- **Frontend**: S3 Static Website
- **Backend**: AWS Lambda + API Gateway
- **Database**: DynamoDB
- **Deployment**: AWS SAM + GitHub Actions
- **Cost**: AWS Free Tier

## Setup

TODO: Add setup instructions

## Deployment

TODO: Add deployment instructions



