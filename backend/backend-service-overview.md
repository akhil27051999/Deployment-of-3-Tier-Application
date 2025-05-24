# 📦 Backend Microservice – Containerization Guide

This document provides a step-by-step guide for understanding the backend microservice and containerizing it using Docker.

---

## 📁 Directory Structure

The `backend/` directory contains the following files:

| File/Folder     | Purpose                                                                 |
|------------------|-------------------------------------------------------------------------|
| `app.js`         | Main Node.js application logic. Handles routes, requests, and database integration. |
| `package.json`   | Project metadata and dependencies. Defines how the app should start.   |
| `Dockerfile`     | Instructions to build a Docker image for the backend service.          |

---

## 🐳 Docker Containerization of Backend Microservice

Follow the steps below to build and run the backend microservice inside a Docker container.

---

### Step 1: Navigate to the Backend Directory

```bash
cd backend/
```

### Step 2 : Build the Docker Image

```bash
docker build -t backend-service .
```

### Step 3 : Set Environment Variables

The backend requires environment variables to connect to the PostgreSQL database:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `POSTGRES_HOST`

These are passed when running the container.

### Step 4 : Set Environment Variables

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

### Step 5: Verify Backend is Running

```bash
curl http://localhost:5000
```

### Expected output

![Screenshot 2025-05-24 134130](https://github.com/user-attachments/assets/c3dc4e3b-c06f-4af5-b258-fe446f4e829f)
