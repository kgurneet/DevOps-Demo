**CI/CD Pipeline Demo
**
This project is a demo website showcasing an automated CI/CD pipeline. It highlights how DevOps practices improve release efficiency, reliability, and deployment workflows.

**Features**

GitHub Triggers: Automatically builds and tests code on every push.

Containerized Builds: Uses Docker to ensure consistent environments across development and production.

AWS Deployment: Seamlessly deploys containerized applications to AWS.

Automated Workflow: Reduces manual effort, increases release speed, and improves reliability.

**Tech Stack**

1. GitHub Actions
2. Docker
3. AWS (ECS / ECR / S3 depending on setup)
4. Node.js / HTML / CSS (frontend demo)

**How It Works**

1. Push code to GitHub → triggers pipeline.
2. Pipeline builds Docker image and runs tests.
3. If successful, image is pushed to AWS ECR.
4. Application is deployed to AWS ECS (or other service).


