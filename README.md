# PROJECT : DevOps End-to-End Deployment for 3-Tier Application

## Project Summary

This project demonstrates a complete DevOps lifecycle for a simple 3-tier microservices application — consisting of a frontend, backend, and PostgreSQL database — deployed from development to production using modern DevOps tools and best practices.

## 🛠️ DevOps Tools Stack

| **Function**          | **Tool(s)**                     |
|-----------------------|--------------------------------|
| **Source Control**    | GitHub                     |
| **Containerization**  | Docker                     |
| **Orchestration**     | Kubernetes (on AWS EC2)    |
| **Artifact Registry** | Docker Hub                 |
| **CI/CD Tools**       | GitHub Actions (CI), GitLab + ArgoCD (CD with GitOps) |
| **Monitoring**        | Prometheus + Grafana       |

## 📂 Directory Overview

| Directory / File         | Description                                  |
|-------------------------|----------------------------------------------|
| `frontend/`             | Frontend application source code and Dockerfile |
| `backend/`              | Backend API service source code and Dockerfile  |
| `db/`                   | PostgreSQL database initialization script (`init.sql`) |
| `k8s-manifests/`        | Kubernetes deployment manifests stored in GitLab  |
| `.github/workflows/`    | GitHub Actions CI pipeline configurations        |
| `README.md`             | Project documentation and instructions            |


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

```

## 🚀 Step 1: Launch an AWS EC2 VM and Connect via SSH

Follow these steps to create a virtual machine (VM) on AWS and connect to it using SSH:

### 1. Create an AWS Account
- Go to [https://aws.amazon.com/](https://aws.amazon.com/) and sign up for a free account if you don’t have one.

### 2. Log into AWS Management Console
- Open [https://console.aws.amazon.com/](https://console.aws.amazon.com/) and log in.

### 3. Launch an EC2 Instance
- Navigate to **Services** → **EC2** → **Instances**.
- Click **Launch Instances**.
- Choose an Amazon Machine Image (AMI), for example, **Amazon Linux 2 AMI (x86_64)**.
- Choose an instance type, e.g., **t2.micro** (free tier eligible).
- Click **Next: Configure Instance Details** and keep default settings.
- Click **Next: Add Storage**, keep default.
- Click **Next: Add Tags**, optionally add tags like `Name=DevOps-VM`.
- Click **Next: Configure Security Group**.
  - Create a new security group or use existing.
  - Add a rule for **SSH** with:
    - Type: SSH
    - Protocol: TCP
    - Port Range: 22
    - Source: Your IP (for security)
- Click **Review and Launch**.
- Click **Launch**.
- When prompted, create a new key pair or use an existing one.
  - Download the `.pem` file and save it securely.

### 4. Connect to Your EC2 Instance via SSH
- Open your terminal (Linux/macOS) or use **PuTTY** on Windows.
- Change permissions of your `.pem` key file to secure it:

  ```bash
  chmod 400 /path/to/your-key.pem

