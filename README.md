# PROJECT : DevOps End-to-End Deployment for 3-Tier Application

## Project Summary

This project demonstrates a complete DevOps lifecycle for a simple 3-tier microservices application — consisting of a frontend, backend, and PostgreSQL database — deployed from development to production using modern DevOps tools and best practices.

## 🛠️ DevOps Tools Stack

| **Function**          | **Tool(s)**                     |
|-----------------------|--------------------------------|
| **Source Control**    | **GitHub**                     |
| **Containerization**  | **Docker**                     |
| **Orchestration**     | **Kubernetes (on AWS EC2)**    |
| **Artifact Registry** | **Docker Hub**                 |
| **CI/CD Tools**       | **GitHub Actions (CI), GitLab + ArgoCD (CD with GitOps)** |
| **Monitoring**        | **Prometheus + Grafana**       |

## 📂 Directory Overview

- frontend/ – Frontend app + Dockerfile
- backend/ – API service + Dockerfile
- db/ – PostgreSQL with init.sql
- k8s-manifests/ – Kubernetes YAMLs (in GitLab)
- .github/workflows/ – GitHub Actions CI pipeline
- README.md – Project documentation

## 📁 Project Structure

```text
devops-project/
│
├── backend/                        # Backend microservice (Node.js)
│   ├── Dockerfile                  # Dockerfile for backend container
│   ├── app.js                      # Main backend application
│   └── package.json                # Node.js dependencies
│
├── db/                             # PostgreSQL database
│   └── init.sql                    # SQL script to initialize DB
│
├── frontend/                       # Frontend microservice (React/JS)
│   ├── Dockerfile                  # Dockerfile for frontend container
│   ├── app.js                      # Main frontend application
│   └── package.json                # Frontend dependencies
│
├── k8s-manifests/                  # Kubernetes manifests (used in GitLab)
│   └── apps/
│       ├── frontend/
│       │   ├── deployment.yaml
│       │   └── service.yaml
│       ├── backend/
│       │   ├── deployment.yaml
│       │   └── service.yaml
│       └── db/
│           ├── deployment.yaml
│           └── service.yaml
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml               # GitHub Actions CI for build & push
│
└── README.md                       # Project documentation
