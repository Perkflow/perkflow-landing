#!/bin/bash

# Perkflow Landing Page - Quick Deployment Script

set -e

echo "🚀 Perkflow Landing Page Deployment"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# Configuration
ECR_REPO="048204778361.dkr.ecr.us-east-1.amazonaws.com/perflow-production-landing-page"
AWS_REGION="us-east-1"

# Step 1: Build Docker image
print_status "Building Docker image..."
docker build -t perkflow-landing:latest .

# Step 2: Login to ECR
print_status "Logging into Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin 048204778361.dkr.ecr.us-east-1.amazonaws.com

# Step 3: Tag and push
print_status "Tagging image..."
docker tag perkflow-landing:latest $ECR_REPO:latest
docker tag perkflow-landing:latest $ECR_REPO:$(git rev-parse --short HEAD)

print_status "Pushing to ECR..."
docker push $ECR_REPO:latest
docker push $ECR_REPO:$(git rev-parse --short HEAD)

# Step 4: Deploy to EC2 via SSM
print_status "Getting EC2 instance ID..."
INSTANCE_ID=$(aws ec2 describe-instances \
  --filters "Name=tag:Project,Values=Perflow" "Name=instance-state-name,Values=running" \
  --query "Reservations[0].Instances[0].InstanceId" \
  --output text \
  --region $AWS_REGION)

if [ -z "$INSTANCE_ID" ] || [ "$INSTANCE_ID" == "None" ]; then
  print_error "No running EC2 instances found!"
  exit 1
fi

print_status "Deploying to EC2 instance: $INSTANCE_ID"

aws ssm send-command \
  --instance-ids $INSTANCE_ID \
  --document-name "AWS-RunShellScript" \
  --parameters 'commands=[
    "echo \"Logging into ECR...\"",
    "aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 048204778361.dkr.ecr.us-east-1.amazonaws.com",
    "echo \"Pulling latest image...\"",
    "docker pull 048204778361.dkr.ecr.us-east-1.amazonaws.com/perflow-production-landing-page:latest",
    "echo \"Stopping old container...\"",
    "docker stop perkflow-landing || true",
    "docker rm perkflow-landing || true",
    "echo \"Starting new container...\"",
    "docker run -d --name perkflow-landing --restart unless-stopped -p 3000:3000 -e PAYLOAD_CMS_URL=https://cms.perkflow.io -e NEXT_PUBLIC_HOST=https://api.perkflow.io/v1 048204778361.dkr.ecr.us-east-1.amazonaws.com/perflow-production-landing-page:latest",
    "echo \"Cleaning up old images...\"",
    "docker image prune -af --filter \"until=24h\"",
    "echo \"Deployment complete!\"",
    "docker ps | grep perkflow-landing"
  ]' \
  --region $AWS_REGION \
  --output json > /tmp/ssm-command.json

COMMAND_ID=$(cat /tmp/ssm-command.json | jq -r '.Command.CommandId')

print_status "Command sent! Command ID: $COMMAND_ID"
print_warning "Waiting for deployment to complete..."

sleep 10

# Get command status
aws ssm get-command-invocation \
  --command-id $COMMAND_ID \
  --instance-id $INSTANCE_ID \
  --region $AWS_REGION \
  --query 'StandardOutputContent' \
  --output text

print_status "Deployment completed successfully!"
echo ""
echo "📊 Deployment Summary:"
echo "====================="
echo "Image: $ECR_REPO:latest"
echo "Instance: $INSTANCE_ID"
echo "Region: $AWS_REGION"
echo ""
echo "🌐 Access your application:"
echo "ALB: http://perflow-production-alb-43791247.us-east-1.elb.amazonaws.com"
echo "Domain: https://perkflow.io (after DNS setup)"
