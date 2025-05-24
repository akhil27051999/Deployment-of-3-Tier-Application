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
