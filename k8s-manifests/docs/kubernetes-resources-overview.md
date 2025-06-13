# 🧭 Kubernetes Resource Overview – Microservices Project

**This project uses a 3-tier architecture: **Frontend**, **Backend**, and **PostgreSQL (Database)**, deployed on a local Kubernetes cluster via `kind`. Here's a breakdown of the key Kubernetes resources we used, their role, and why they were necessary.**


### 📦 1. Pod
- **What it is:** The smallest unit in Kubernetes, encapsulates a container (or multiple tightly coupled containers).
- **Use Case in Project:** Pods are created automatically via Deployments (you don’t write pod YAMLs directly). Each microservice (frontend, backend, database) runs in its own Pod.

---

### 🚀 2. Deployment
- **What it is:** A controller that ensures the desired number of pod replicas are running and updated.
- **Use Case:**
  - `frontend-deployment.yaml`: Ensures high availability of the frontend.
  - `backend-deployment.yaml`: Manages replicas and updates of the backend.
  - `postgres-deployment.yaml`: Deploys the PostgreSQL pod.

---

### 🌐 3. Service
- **What it is:** An abstraction to expose a set of pods as a network service.
- **Use Cases:**
  - `ClusterIP`: Used for internal communication (e.g., backend ↔ PostgreSQL).
  - `NodePort`: Used to expose the frontend for access via browser.
- **Services Used:**
  - `frontend-service.yaml` → NodePort (external access)
  - `backend-service.yaml` → ClusterIP
  - `postgres-service.yaml` → ClusterIP

---

### 📦 4. ConfigMap
- **What it is:** Used to inject configuration data into pods.
- **Use Case (if needed):** Could be used to manage database connection strings or frontend environment variables.

---

### 🔒 5. Secret 
- **What it is:** Stores sensitive data like DB passwords.
- **Use Case (recommended for production):** Store `POSTGRES_PASSWORD` instead of hardcoding it in YAML.

---

### 📋 6. PersistentVolumeClaim
- **What it is:** Allows pods to request persistent storage.
- **Use Case:** For production-grade PostgreSQL, a PVC would ensure database data is not lost if the pod restarts.

---

### 🧪 7. Readiness & Liveness Probes
- **What they are:** Health checks to determine when a container is ready or healthy.
- **Use Case:** Prevents Kubernetes from sending traffic to a backend service before PostgreSQL is ready.

---

### 📡 8. Ingress
- **What it is:** Manages external HTTP/S access to services.
- **Use Case (Future):** Instead of NodePort, you can use Ingress with a domain name and TLS.


## 📖 Summary Table

| Resource         | Purpose                                       | Used In        |
|------------------|-----------------------------------------------|----------------|
| Pod              | Runs containers                               | All services   |
| Deployment       | Manages pod lifecycle                         | Frontend, Backend, PostgreSQL |
| Service          | Internal/external access to pods              | All services   |
| ConfigMap        | Store config values (optional)                | Env configs    |
| Secret           | Store sensitive data (optional)               | DB passwords   |
| PVC              | Persistent storage (recommended for DB)       | PostgreSQL     |
| Probe            | Ensure readiness and health of services       | Backend        |
| Ingress          | Advanced HTTP routing (not used here)         | Future option  |
