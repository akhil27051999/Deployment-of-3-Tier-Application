# PROJECT : End-to-End DevOps Deployment for 3-Tier Application from Development to Production

## Project Summary

This project demonstrates a complete DevOps lifecycle for a simple 3-tier microservices application — consisting of a frontend, backend, and PostgreSQL database — deployed from development to production using modern DevOps tools and best practices.

         ![image](https://github.com/user-attachments/assets/2187559e-298e-43d2-9ea9-ee6234de2a40)


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

## Project Section-wise Overview

### Section 1: Provisioning AWS EC2 Virtual Machine and SSH Access

- Created a Virtual Machine (VM) on AWS using the EC2 service.
- Configured security groups to allow SSH and necessary application ports.
- Generated and downloaded an SSH key pair for secure access.
- Connected to the EC2 instance securely using SSH from a local machine.
- Set up the environment to prepare for application deployment.

---

### Section 2: Installing Docker and Containerizing the Application

- Installed Docker engine on the AWS EC2 VM.
- Created Dockerfiles for each microservice: frontend, backend, and database.
- Built Docker images locally for all services.
- Ran and tested Docker containers on the VM to verify application functionality.
- Pushed Docker images to Docker Hub for easy distribution and later use in Kubernetes.

---

### Section 3: Kubernetes Setup and Deployment

- Installed and configured Kubernetes cluster (using tools like `kubeadm`, `minikube`, or cloud-managed Kubernetes).
- Created Kubernetes manifests including Deployments, Services, and ConfigMaps for each microservice.
- Deployed microservices on the Kubernetes cluster using `kubectl apply`.
- Verified pod statuses and application accessibility within the cluster.
- Tested service discovery and networking between microservices.

---

### Section 4: Continuous Integration (CI) with GitHub Actions

- Created GitHub repository to host the microservices source code.
- Defined GitHub Actions workflows for automated build and test pipelines.
- Automated Docker image build and push on every commit or pull request.
- Enabled early detection of errors and streamlined code integration.

---

### Section 5: Continuous Delivery (CD) with ArgoCD

- Stored Kubernetes manifests in a Github repository to act as the GitOps source.
- Installed and configured ArgoCD to watch Github manifests and sync deployments to Kubernetes.
- Established a Continuous Delivery pipeline via Github that triggers ArgoCD sync upon manifest changes.
- Automated deployment of new application versions with zero manual intervention.

---

### Section 6: Monitoring and Visualization using Prometheus and Grafana

- Deployed Prometheus to collect metrics and logs from Kubernetes pods and services.
- Configured Prometheus exporters for application and infrastructure monitoring.
- Set up Grafana dashboards for real-time visualization of application health and performance.
- Implemented alerting rules for proactive incident management.
