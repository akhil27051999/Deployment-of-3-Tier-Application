# Kubernetes Deployments

### Overview
A Kubernetes Deployment is a resource that manages the lifecycle of pods and replica sets for your applications. It helps you declaratively update, scale, and maintain your app with high availability.

## Why Use Deployments?
1. Ensure our app runs the desired number of replicas.
2. Enable rolling updates for zero downtime deployments.
3. Automatically replace failed pods (self-healing).
4. Easily rollback to previous versions if needed.
5. Declaratively manage our app state.

## Deployment YAML Structure

A typical deployment YAML includes:

1. `replicas`: Number of pod instances.
2. `selector`: Defines how to find pods managed by this deployment.
3. `template`: Pod specification including container image, ports, and labels.

**Example snippet:**

```yaml

apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: backend:1.0
        ports:
        - containerPort: 5000
```

## Lifecycle

1. `Creation`: Kubernetes creates ReplicaSets and pods.
2. `Monitoring`: Pods are continuously monitored and restarted if necessary.
3. `Updates`: Rolling updates allow seamless version changes.
4. `Rollback`: Easy rollback to previous versions if something breaks.
5. `Scaling`: Increase or decrease pod replicas based on demand.

## How we used Deployments in our Project

- Created Deployments for PostgreSQL database, backend API, and frontend UI.
- Managed independent lifecycle and updates for each microservice.
- Ensured high availability and scalability.

## Troubleshooting

**1. Check deployment status:**
```bash
kubectl get deployments
```

**2. Describe deployment details and events:**
```bash
kubectl describe deployment <deployment-name>
```

**3. Monitor rollout progress:**
```bash
kubectl rollout status deployment/<deployment-name>
```

**4. Rollback a deployment if needed:**
```bash
kubectl rollout undo deployment/<deployment-name>
```
---

# Kubernetes Services

### Overview
A Kubernetes Service is an abstraction that defines a logical set of pods and a policy to access them. It provides a stable IP address and DNS name for pods, enabling communication between different components of your application.

## Why Use Services?
1. Enable reliable network access to pods despite pod restarts or rescheduling.
2. Expose pods inside the cluster (ClusterIP) or outside the cluster (NodePort, LoadBalancer).
3. Load balance traffic across multiple pods.
4. Facilitate service discovery within the cluster.

## Types of Services

1. `ClusterIP (default)`: Exposes the service on an internal cluster IP. Accessible only within the cluster.
2. `NodePort`: Exposes the service on each node’s IP at a static port. Accessible outside the cluster via <NodeIP>:<NodePort>.
3. `LoadBalancer`: Provisions an external load balancer to expose the service outside the cluster (cloud environments).
4. `ExternalName`: Maps the service to a DNS name.

## Service YAML Structure

A typical service YAML includes:
- `type`: Service type (ClusterIP, NodePort, etc.).
- `selector`: Labels to identify the pods the service routes traffic to.
- `ports`: The ports exposed by the service and the target ports on pods.

## Example snippet:

```yaml

apiVersion: v1
kind: Service
metadata:
  name: backend-service
spec:
  type: ClusterIP
  selector:
    app: backend
  ports:
  - protocol: TCP
    port: 5000
    targetPort: 5000
```

## How we used Services in our Project

1. Created ClusterIP services for backend and PostgreSQL to enable internal communication.
2. Created NodePort service for frontend to expose it outside the cluster on a node port.
3. Allowed frontend to communicate with backend and backend to communicate with the database via service DNS names.

## Troubleshooting Connectivity

**1. To check service details and assigned IPs/ports.**
```bash
kubectl get svc 
```

**2. To see endpoints and event details.**
```bash
kubectl describe svc <service-name>
```

**3. Test connectivity by curl or ping between pods using service names.**

**4. Debug DNS issues using tools like nslookup or dig inside pods.**

---

## How They Work Together

### 📦 PostgreSQL – DB Layer

- `postgres-deployment.yaml` : Runs the official PostgreSQL image
- Sets environment variables like: `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- Port exposed: `5432`

- `postgres-service.yaml` : Internal ClusterIP service
-  Used by backend to connect via postgres-service:`5432`

### 🔧 Backend – API Layer
- `backend-deployment.yaml` : Custom image (e.g., Flask/Django/Node)
- Uses `DB_HOST=postgres-service` to connect to the DB
- Port exposed: `5000`
- Replicas: `2` (for high availability)

- `backend-service.yaml` : Exposes backend internally via ClusterIP
- Frontend uses `http://backend-service:5000` to reach backend

### 🎨 Frontend – UI Layer
- `frontend-deployment.yaml` : Container for frontend (React, Vue, Angular, etc.)
- Sets `BACKEND_URL=http://backend-service:5000`
- Port exposed: `3000`

- `frontend-service.yaml` : NodePort service
- Makes UI accessible from outside the cluster : Port `80` → container port `3000`


## Expected Output
![Screenshot 2025-05-25 003103](https://github.com/user-attachments/assets/c1740ffc-5b95-4b6a-9a70-f5f05c85646d)
