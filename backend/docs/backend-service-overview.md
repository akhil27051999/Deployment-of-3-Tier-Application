# 📦 Backend Microservice – Containerization Guide

This document provides a step-by-step guide for understanding the backend microservice and containerizing it using Docker.

## 📁 Directory Structure

The `backend/` directory contains the following files:

| File/Folder     | Purpose                                                                 |
|------------------|-------------------------------------------------------------------------|
| `app.js`         | Main Node.js application logic. Handles routes, requests, and database integration. |
| `package.json`   | Project metadata and dependencies. Defines how the app should start.   |
| `Dockerfile`     | Instructions to build a Docker image for the backend service.          |


## 🐳 Docker Containerization of Backend Microservice

Follow the steps below to build and run the backend microservice inside a Docker container.

---

### Step 1: Navigate to the Backend Directory

```bash
cd backend/
```
### Step 2: Write Dockerfile for Backend Microservice

**Step-by-step Explanation:**

`FROM node:18-alpine`
- Uses the official Node.js 18 image based on Alpine Linux. Alpine is a minimal, lightweight Linux distribution which makes the image smaller and faster to download.

`WORKDIR /app`
- Sets the working directory inside the container to /app. All subsequent commands will be run relative to this directory.

`COPY package.json ./*`
- Copies package.json and package-lock.json (if available) from your local project directory to the container. These files specify the Node.js dependencies.

`RUN npm install`
- Installs the Node.js dependencies inside the container based on the copied package.json. Doing this before copying the full source code helps leverage Docker layer caching and speeds up rebuilds when dependencies don’t change.

`COPY . `.
- Copies the rest of your backend source code files into the working directory /app in the container.

`EXPOSE 4000`
- Declares that the container will listen on port 4000 at runtime. This is the port your backend service runs on.

`CMD ["node", "app.js"]`
- Specifies the command to start your backend service when the container runs — here, it runs app.js with Node.js.

### Step 3 : Build the Docker Image

```bash
docker build -t backend-service .
```

### Step 4 : Set Environment Variables

The backend requires environment variables to connect to the PostgreSQL database:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `POSTGRES_HOST`

These are passed when running the container.

### Step 5 : Run the Docker Container

```bash
docker run -d \
  -p 5000:5000 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=mydb \
  -e POSTGRES_HOST=host.docker.internal \
  --name backend-container \
  backend-service
```
- `-d`: Detached mode
- `-p 5000:5000`: Exposes port 5000
- `-e`: Sets the required environment variables
- `--name`: Names the container backend-container
- `backend-service`: Image built in Step 2

### Step 6: Verify Backend is Running

```bash
curl http://localhost:5000
```

### Expected output

![Screenshot 2025-05-24 134130](https://github.com/user-attachments/assets/c3dc4e3b-c06f-4af5-b258-fe446f4e829f)
