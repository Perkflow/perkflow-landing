# Perkflow Landing Page - Deployment Guide

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

### EC2 Access
```
EC2_HOST: (ALB DNS or instance IP)
SSH_PRIVATE_KEY: (contents of ~/.ssh/perflow-key.pem)
```

### Slack Notifications
```
SLACK_WEBHOOK_URL_PRODUCTION: (your production Slack webhook)
SLACK_WEBHOOK_URL_SANDBOX: (your sandbox Slack webhook)
```

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

### 3. Deploy to EC2 via ALB

Since EC2 instances are in private subnets, we'll use Systems Manager (SSM) to deploy:

```bash
# Get instance ID
INSTANCE_ID=$(aws ec2 describe-instances \
  --filters "Name=tag:Project,Values=Perflow" "Name=instance-state-name,Values=running" \
  --query "Reservations[0].Instances[0].InstanceId" \
  --output text \
  --region us-east-1)

# Deploy via SSM
aws ssm send-command \
  --instance-ids $INSTANCE_ID \
  --document-name "AWS-RunShellScript" \
  --parameters 'commands=[
    "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 048204778361.dkr.ecr.us-east-1.amazonaws.com",
    "docker pull 048204778361.dkr.ecr.us-east-1.amazonaws.com/perflow-production-landing-page:latest",
    "docker stop perkflow-landing || true",
    "docker rm perkflow-landing || true",
    "docker run -d --name perkflow-landing --restart unless-stopped -p 3000:3000 -e PAYLOAD_CMS_URL=https://cms.perkflow.io -e NEXT_PUBLIC_HOST=https://api.perkflow.io/v1 048204778361.dkr.ecr.us-east-1.amazonaws.com/perflow-production-landing-page:latest"
  ]' \
  --region us-east-1
```

## Automated Deployment via GitHub Actions

Once GitHub secrets are configured:

1. Push code to `main` or `master` branch
2. GitHub Actions will automatically:
   - Build Docker image
   - Push to ECR
   - Deploy to EC2
   - Send Slack notification

## Verify Deployment

```bash
# Check if container is running
aws ssm send-command \
  --instance-ids $INSTANCE_ID \
  --document-name "AWS-RunShellScript" \
  --parameters 'commands=["docker ps | grep perkflow-landing"]' \
  --region us-east-1

# Check container logs
aws ssm send-command \
  --instance-ids $INSTANCE_ID \
  --document-name "AWS-RunShellScript" \
  --parameters 'commands=["docker logs perkflow-landing --tail 50"]' \
  --region us-east-1
```

## Access Application

Once deployed, the landing page will be accessible via:
- Internal: `http://<ALB-DNS>:3000`
- External (after DNS setup): `https://perkflow.io`

## Troubleshooting

### Check EC2 Instance Health
```bash
aws elbv2 describe-target-health \
  --target-group-arn $(aws elbv2 describe-target-groups \
    --names perflow-production-tg \
    --query 'TargetGroups[0].TargetGroupArn' \
    --output text) \
  --region us-east-1
```

### View Container Logs
```bash
aws ssm start-session --target $INSTANCE_ID
# Then run: docker logs perkflow-landing
```

### Test Locally
```bash
curl http://perflow-production-alb-43791247.us-east-1.elb.amazonaws.com
```

## Slack Notifications

Deployment status will be sent to Slack:
- ✅ Success: Green notification with deployment details
- ❌ Failure: Red notification with error details

## Environment Variables

The application uses:
- `PAYLOAD_CMS_URL`: CMS backend URL
- `NEXT_PUBLIC_HOST`: API backend URL

These are configured in GitHub Secrets and injected during deployment.
