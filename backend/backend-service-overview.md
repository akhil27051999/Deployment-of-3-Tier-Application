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

## 🐳 Docker Containerization

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
