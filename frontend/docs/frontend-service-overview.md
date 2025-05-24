# 📦 Frontend Microservice – Containerization Guide

This document provides a step-by-step guide for understanding the frontend microservice and containerizing it using Docker.

---

## 📁 Directory Structure

The `frontend/` directory contains the following files:

| File/Folder     | Purpose                                                           |
|----------------|-------------------------------------------------------------------|
| `app.js`       | Main React/HTML/JS application logic and UI rendering.            |
| `package.json` | Project metadata and dependencies. Defines how the app should start. |
| `Dockerfile`   | Instructions to build a Docker image for the frontend service.    |

---

## 🐳 Docker Containerization of Frontend Microservice

Follow the steps below to build and run the frontend microservice inside a Docker container.

---

### Step 1: Navigate to the Frontend Directory

```bash
cd frontend/
```
### Step 2 : Build the Docker Image

```bash
docker build -t frontend-service .
```

### Step 3 : Run the Docker Container

```bash
docker run -d \
  -p 3000:3000 \
  --name frontend-container \
  frontend-service
```
- `-d`: Run container in detached mode
- `-p 3000:3000`: Expose port 3000 to access the frontend app via http://localhost:3000
- `--name frontend-container`: Name the container for easier management
- `frontend-service`: Docker image built in Step 2


### Step 4: Verify Frontend is Running

```bash
curl http://localhost:3000
```

### Expected Output
![Screenshot 2025-05-24 131101](https://github.com/user-attachments/assets/07b38abf-b7a8-4392-b50a-9ca1b97429f3)
