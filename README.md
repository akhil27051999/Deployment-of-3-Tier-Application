# PROJECT : Three Tier Microservices Architechture From Development to Production

## Project Summary
This project demonstrates a real-time DevOps workflow by deploying a 3-tier application (Frontend, Backend, and Database) on AWS using Docker, Kubernetes, GitHub Actions, GitLab, ArgoCD, Prometheus, and Grafana.

## 📁 Project Structure

```text
devops-project/
│
├── frontend/                 # Frontend application (React or HTML)
│   └── Dockerfile            # Dockerfile to containerize frontend
│
├── backend/                  # Backend API service (Node.js or Python)
│   └── Dockerfile            # Dockerfile to containerize backend
│
├── database/                 # Database setup (PostgreSQL)
│   └── init.sql              # Initialization SQL script for DB
│
├── k8s-manifests/            # GitLab repository (used for ArgoCD GitOps)
│   └── apps/
│       ├── frontend/         # Kubernetes manifests for frontend
│       ├── backend/          # Kubernetes manifests for backend
│       └── db/               # Kubernetes manifests for PostgreSQL
│
├── .github/
│   └── workflows/            # GitHub Actions CI pipeline
│       └── ci-cd.yml         # Workflow for CI and image push + GitLab sync
│
└── README.md                 # Project documentation

