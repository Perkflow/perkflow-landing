# Perkflow Landing Page - ECS Deployment Guide

## Prerequisites

- AWS CLI configured
- Docker installed
- Access to perkflow-landing GitHub repository

## GitHub Secrets Required

Add these secrets to your GitHub repository settings:

### AWS Credentials
```
AWS_ACCESS_KEY_ID: AKIAQWOJ2RN4T7OSVPNS
AWS_SECRET_ACCESS_KEY: (your secret key)
```

### Environment Variables
```
PAYLOAD_CMS_URL: https://cms.perkflow.io
NEXT_PUBLIC_HOST: https://api.perkflow.io/v1
```

### Slack Notifications
```
SLACK_WEBHOOK_URL_PRODUCTION: (your production Slack webhook)
SLACK_WEBHOOK_URL_SANDBOX: (your sandbox Slack webhook)
```

## ECS Infrastructure

The landing page is deployed on AWS ECS with the following configuration:

- **Cluster**: `perflow-production`
- **Service**: `landing-page-prod`
- **Task Definition**: `perflow-production-landing-page`
- **Launch Type**: Fargate
- **CPU**: 256 units (0.25 vCPU)
- **Memory**: 512 MB
- **Port**: 3000
- **Load Balancer**: Connected to ALB target group `ecs-landing-prod-tg`

## Manual Deployment Steps

### 1. Build Docker Image Locally

```bash
# Navigate to landing page directory
cd /Users/abraham/Developer/active/perkflow-landing

# Build Docker image
docker build -t perkflow-landing:latest .

# Test locally
docker run -p 3000:3000 \
  -e PAYLOAD_CMS_URL=https://cms.perkflow.io \
  -e NEXT_PUBLIC_HOST=https://api.perkflow.io/v1 \
  perkflow-landing:latest
```

### 2. Push to ECR

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin 048204778361.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag perkflow-landing:latest \
  048204778361.dkr.ecr.us-east-1.amazonaws.com/perflow-production-landing-page:latest

# Push to ECR
docker push 048204778361.dkr.ecr.us-east-1.amazonaws.com/perflow-production-landing-page:latest
```

### 3. Deploy to ECS

```bash
# Update ECS service to use new image
aws ecs update-service \
  --cluster perflow-production \
  --service landing-page-prod \
  --force-new-deployment \
  --region us-east-1

# Wait for deployment to complete
aws ecs wait services-stable \
  --cluster perflow-production \
  --services landing-page-prod \
  --region us-east-1
```

## Automated Deployment via GitHub Actions

Once GitHub secrets are configured:

1. Push code to `main` or `master` branch
2. GitHub Actions will automatically:
   - Build Docker image
   - Push to ECR
   - Create new task definition with updated image
   - Update ECS service
   - Wait for deployment to complete
   - Send Slack notification

## Verify Deployment

```bash
# Check ECS service status
aws ecs describe-services \
  --cluster perflow-production \
  --services landing-page-prod \
  --region us-east-1

# Check running tasks
aws ecs list-tasks \
  --cluster perflow-production \
  --service-name landing-page-prod \
  --region us-east-1

# View service events
aws ecs describe-services \
  --cluster perflow-production \
  --services landing-page-prod \
  --query 'services[0].events[0:10]' \
  --region us-east-1
```

## Access Application

Once deployed, the landing page will be accessible via:
- Load Balancer: `http://perflow-production-alb-43791247.us-east-1.elb.amazonaws.com`
- Production Domain: `https://perkflow.io`

## Troubleshooting

### Check ECS Service Health
```bash
aws ecs describe-services \
  --cluster perflow-production \
  --services landing-page-prod \
  --query 'services[0].{Status:status,Running:runningCount,Desired:desiredCount}' \
  --region us-east-1
```

### View Container Logs
```bash
# Get task ARN
TASK_ARN=$(aws ecs list-tasks \
  --cluster perflow-production \
  --service-name landing-page-prod \
  --query 'taskArns[0]' \
  --output text \
  --region us-east-1)

# View logs
aws logs get-log-events \
  --log-group-name "/ecs/perflow-production/landing-page" \
  --log-stream-name "ecs/landing-page/$(echo $TASK_ARN | cut -d'/' -f3)" \
  --region us-east-1
```

### Check Target Group Health
```bash
aws elbv2 describe-target-health \
  --target-group-arn arn:aws:elasticloadbalancing:us-east-1:048204778361:targetgroup/ecs-landing-prod-tg/5d2b45e5f064a4f6 \
  --region us-east-1
```

### Test Load Balancer
```bash
curl http://perflow-production-alb-43791247.us-east-1.elb.amazonaws.com
```

## Rollback

To rollback to a previous version:

```bash
# List previous task definition revisions
aws ecs list-task-definitions \
  --family-prefix perflow-production-landing-page \
  --region us-east-1

# Update service to use previous revision
aws ecs update-service \
  --cluster perflow-production \
  --service landing-page-prod \
  --task-definition perflow-production-landing-page:2 \
  --region us-east-1
```

## Slack Notifications

Deployment status will be sent to Slack:
- ✅ Success: Green notification with ECS deployment details
- ❌ Failure: Red notification with error details

## Environment Variables

The application uses:
- `PAYLOAD_CMS_URL`: CMS backend URL
- `NEXT_PUBLIC_HOST`: API backend URL
- `PORT`: Container port (3000)
- `NODE_ENV`: Environment (production)

These are configured in the task definition and GitHub Secrets.
