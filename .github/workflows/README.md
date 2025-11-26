# CI/CD Workflows

GitHub Actions workflows for automated deployment.

## Workflows

- `deploy.yml` - Deploys both backend (SAM) and frontend (S3) on push to main

## Required Secrets

Configure these in GitHub repository settings:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`



