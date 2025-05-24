### What is Kubernetes (K8s)?
• Kubernetes is an open-source platform to automate deploying, scaling, and managing containerized applications.
• It manages your Docker containers across multiple hosts, ensuring your app is highly available and scalable.
• Think of Kubernetes as the orchestrator that runs and manages your containers in production.

### Why Kubernetes?
• Handles deployment, scaling, and updates automatically.
• Manages container health and restarts failed containers.
• Provides load balancing and service discovery.
• Manages persistent storage and configuration.

### What You Need Before Starting
1. Docker images pushed to a container registry (Docker Hub or AWS ECR).
2. Kubernetes cluster (we will set it up on your AWS VM or use a managed Kubernetes service).
3. kubectl CLI tool installed to interact with Kubernetes cluster

## Installing Kubernetes CLI Tools

### Tool 1: kubectl
**What is kubectl?**
kubectl is the official Kubernetes CLI (Command Line Interface) tool that allows you to interact with your Kubernetes cluster. It's like git for Kubernetes — everything from deploying applications to inspecting pods happens through this tool.

**Why do we install kubectl?**
1. To apply YAML manifests (e.g., Deployment, Service files).
2. To inspect and debug resources like pods, services, and logs.
3. To execute commands inside pods for testing connectivity.
