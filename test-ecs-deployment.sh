#!/bin/bash

# Test ECS Deployment Script for Perkflow Landing Page
# This script tests the current ECS deployment and can trigger a new deployment

set -e

# Configuration
AWS_REGION="us-east-1"
ECS_CLUSTER="perflow-production"
ECS_SERVICE="landing-page-prod"
ECR_REPOSITORY="perflow-production-landing-page"
TARGET_GROUP_ARN="arn:aws:elasticloadbalancing:us-east-1:048204778361:targetgroup/ecs-landing-prod-tg/5d2b45e5f064a4f6"
ALB_DNS="perflow-production-alb-43791247.us-east-1.elb.amazonaws.com"

echo "🔍 Testing Perkflow Landing Page ECS Deployment"
echo "================================================"

# Check ECS Service Status
echo "📊 Checking ECS Service Status..."
SERVICE_STATUS=$(aws ecs describe-services \
  --cluster $ECS_CLUSTER \
  --services $ECS_SERVICE \
  --region $AWS_REGION \
  --query 'services[0].{Status:status,Running:runningCount,Desired:desiredCount,TaskDef:taskDefinition}' \
  --output table)

echo "$SERVICE_STATUS"

# Check Target Group Health
echo "🏥 Checking Target Group Health..."
TARGET_HEALTH=$(aws elbv2 describe-target-health \
  --target-group-arn $TARGET_GROUP_ARN \
  --region $AWS_REGION \
  --query 'TargetHealthDescriptions[0].TargetHealth.State' \
  --output text)

echo "Target Health: $TARGET_HEALTH"

# Test Load Balancer
echo "🌐 Testing Load Balancer..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://$ALB_DNS)
echo "HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Load Balancer is responding correctly"
else
    echo "❌ Load Balancer issue detected"
fi

# Check Recent Service Events
echo "📝 Recent Service Events..."
aws ecs describe-services \
  --cluster $ECS_CLUSTER \
  --services $ECS_SERVICE \
  --region $AWS_REGION \
  --query 'services[0].events[0:5].[createdAt,message]' \
  --output table

# Optional: Force new deployment
if [ "$1" = "--deploy" ]; then
    echo "🚀 Triggering new deployment..."
    aws ecs update-service \
      --cluster $ECS_CLUSTER \
      --service $ECS_SERVICE \
      --force-new-deployment \
      --region $AWS_REGION
    
    echo "⏳ Waiting for deployment to complete..."
    aws ecs wait services-stable \
      --cluster $ECS_CLUSTER \
      --services $ECS_SERVICE \
      --region $AWS_REGION
    
    echo "✅ Deployment completed!"
fi

echo "================================================"
echo "🎉 ECS Deployment Test Complete"
