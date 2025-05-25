## 🏗️ What is Kubernetes (K8s)?
- Kubernetes is an open-source platform to automate deploying, scaling, and managing containerized applications.
- It manages our Docker containers across multiple hosts, ensuring our app is highly available and scalable.
- Think of Kubernetes as the orchestrator that runs and manages our containers in production.

## Why Kubernetes?
- Handles deployment, scaling, and updates automatically.
- Manages container health and restarts failed containers.
- Provides load balancing and service discovery.
- Manages persistent storage and configuration.

## What We Need Before Starting
1. Docker images pushed to a container registry (Docker Hub or AWS ECR).
2. Kubernetes cluster (we will set it up on your AWS VM or use a managed Kubernetes service).
3. kubectl CLI tool installed to interact with Kubernetes cluster

## Step 1: Installing Kubernetes CLI Tools

### Tool-1: kubectl

**What is kubectl?**

kubectl is the official Kubernetes CLI (Command Line Interface) tool that allows you to interact with your Kubernetes cluster. It's like git for Kubernetes — everything from deploying applications to inspecting pods happens through this tool.

**Why do we install kubectl?**
1. To apply YAML manifests (e.g., Deployment, Service files).
2. To inspect and debug resources like pods, services, and logs.
3. To execute commands inside pods for testing connectivity.

```bash
curl -LO "https://dl.k8s.io/release/$(curl -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
kubectl version --client
```
---
### Tool-2: kind (Kubernetes in Docker)

**What is kind?**

kind stands for Kubernetes IN Docker. It lets us run a full Kubernetes cluster locally using Docker containers as nodes. It's fast and ideal for development and testing purposes.

**Why use kind?**
1. Lightweight and runs without needing a cloud provider.
2. Ideal for local testing of multi-service applications.
3. Works well with kubectl, so we can use standard Kubernetes YAML files.

```bash
curl -Lo ./kind https://kind.sigs.k8s.io/dl/latest/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind
kind version
```
### Creating a Cluster with Kind

```bash
kind create cluster --name 3tier-cluster
```
This creates:

- A Kubernetes control plane node inside a Docker container.
- Networking between services and pods.
- we can now access the cluster using kubectl because kind automatically configures the context.

### Verify the Cluster

```bash
kubectl cluster-info
kubectl get nodes
```

**Expected output:**

- One control-plane node listed as Ready.
- Kubernetes API server endpoint shown in cluster-info.
  
