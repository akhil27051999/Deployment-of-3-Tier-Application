# 📦 Frontend Microservice – Containerization Guide

This document provides a step-by-step guide for understanding the frontend microservice and containerizing it using Docker.

## 📁 Directory Structure

The `frontend/` directory contains the following files:

| File/Folder     | Purpose                                                           |
|----------------|-------------------------------------------------------------------|
| `app.js`       | Main React/HTML/JS application logic and UI rendering.            |
| `package.json` | Project metadata and dependencies. Defines how the app should start. |
| `Dockerfile`   | Instructions to build a Docker image for the frontend service.    |


## 🐳 Docker Containerization of Frontend Microservice

**Follow the steps below to build and run the frontend microservice inside a Docker container.**


### Step 1: Navigate to the Frontend Directory

```bash
cd frontend/
```
---
### Step 2: Write Dockerfile for Frontend Microservice

**Step-by-step Explanation**

`FROM node:18-alpine`

- Uses the official Node.js 18 image based on Alpine Linux. Alpine is a minimal, lightweight Linux distribution that helps keep container sizes small and boot times fast — ideal for frontend builds.

`WORKDIR /app`

- Sets the working directory inside the container to /app. All subsequent commands (like copying files or running npm) are executed relative to this directory.

`COPY package*.json ./`

- Copies package.json and package-lock.json from your local machine to the container. These files list project dependencies, scripts, and metadata.

`RUN npm install`

- Installs all project dependencies inside the container. This is a key step to prepare the frontend app (especially if it uses React, Vue, etc.).

`COPY . .`

- Copies all remaining frontend source code and assets into the container’s working directory.

`EXPOSE 3000`

- Specifies that the application inside the container will run and listen on port 3000. This is the default port for many frontend development servers (e.g., React’s development server).

`CMD ["npm", "start"]`

- Defines the command that runs when the container starts. It runs the start script defined in your package.json, which typically starts the frontend server.

---
### Step 3 : Build the Docker Image

```bash
docker build -t frontend-service .
```

---
### Step 4 : Run the Docker Container

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

---
### Step 5: Verify Frontend is Running

```bash
curl http://localhost:3000
```
---
### Expected Output
![Screenshot 2025-05-24 131101](https://github.com/user-attachments/assets/07b38abf-b7a8-4392-b50a-9ca1b97429f3)
