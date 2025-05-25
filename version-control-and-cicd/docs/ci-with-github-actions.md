## ⚙️ CI Workflow Overview

The CI pipeline defined in `.github/workflows/ci.yml` triggers on:
1. Push to main branch
2. Pull request to main branch

**What It Does**
1. Checks out code
2. Sets up Docker Buildx
3. Authenticates to Docker Hub

## Builds & pushes Docker images for:

- `backend` → `akhilthyadi/my-backend:latest`
- `frontend` → `akhilthyadi/my-frontend:latest`

## 🔐 Docker Hub Secrets
Before running this pipeline, store your Docker credentials in the GitHub repository secrets:

### Secret Name	Description
1. `DOCKER_USERNAME`	Our Docker Hub username (e.g., akhilthyadi)
2. `DOCKER_PASSWORD`	Docker Hub password or access token

**we can add these in GitHub by going to:**
`Repository Settings → Secrets → Actions → New repository secret`

## Successful Build
Once the pipeline is triggered, it builds and pushes the images. You’ll see logs like:

```bash
Successfully tagged akhilthyadi/my-backend:latest
Successfully pushed akhilthyadi/my-backend:latest
Successfully tagged akhilthyadi/my-frontend:latest
Successfully pushed akhilthyadi/my-frontend:latest
```

## How to Test the Pipeline
- Modify any file inside containerization/apps/backend/ or frontend/
- Commit and push to main (or create a PR)
- Watch the Actions tab in GitHub for your workflow status

