# PROJECT : Three Tier Microservices Architechture From Development to Production

## Project Summary
This project demonstrates a real-time DevOps workflow by deploying a 3-tier application (Frontend, Backend, and Database) on AWS using Docker, Kubernetes, GitHub Actions, GitLab, ArgoCD, Prometheus, and Grafana.

## Project Structure
'''
devops-project/
│
├── frontend/               # React/HTML App
│   └── Dockerfile
│
├── backend/                # Node.js or Python API
│   └── Dockerfile
│
├── database/               # PostgreSQL with init.sql
│
├── k8s-manifests/          # In GitLab (for ArgoCD)
│   └── apps/
│       ├── frontend/
│       ├── backend/
│       └── db/
│
├── .github/workflows/      # GitHub CI
│   └── ci-cd.yml
└── README.md

'''
