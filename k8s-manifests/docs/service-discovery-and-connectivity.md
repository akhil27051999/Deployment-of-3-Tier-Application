## 🔍 Service Discovery & Microservices Connectivity in Kubernetes

**In our 3-tier microservices architecture (Frontend ↔ Backend ↔ PostgreSQL DB), Kubernetes **Service Discovery** plays a vital role in enabling seamless communication between the components.**

### Overview

- **Frontend**: Node.js app exposed to external users.
- **Backend**: Node.js app that connects with both frontend and database.
- **Database (PostgreSQL)**: Stores application data; accessible only to backend.

We deployed all three components inside a Kubernetes cluster using Deployments and Services, ensuring each component can find and talk to others reliably using internal DNS.

---

### 🔗 How Microservices Connect

| From       | To           | Type of Communication | Service Type  | DNS Name in Cluster                             |
|------------|--------------|------------------------|----------------|--------------------------------------------------|
| Frontend   | Backend      | HTTP REST API          | ClusterIP      | `http://backend-service.default.svc.cluster.local` |
| Backend    | PostgreSQL DB| TCP (Port 5432)        | ClusterIP      | `postgres-service.default.svc.cluster.local`     |
| User       | Frontend     | HTTP                   | NodePort       | `http://<NodeIP>:<NodePort>`                     |

---

### ⚙️ Service Discovery using DNS

- Kubernetes uses an internal **DNS server** (`kube-dns` or `CoreDNS`) to resolve service names. When a service is created (e.g., `backend-service`), Kubernetes assigns it a DNS name:
  `<service-name>.<namespace>.svc.cluster.local`

- So the `backend` can reach PostgreSQL by simply using:

```bash
postgres-service.default.svc.cluster.local
```
---
## 🔬 How We Verified Connectivity

### ✅ From Frontend to Backend
```bash
kubectl exec -it <frontend-pod> -- /bin/sh
# Inside the pod:
ping backend-service
curl http://backend-service:5000/api/...
```

### ✅ From Backend to PostgreSQL
```bash
kubectl exec -it <backend-pod> -- /bin/sh
# Inside the pod:
ping postgres-service
psql -h postgres-service -U myuser -d mydb
```

### ✅ DNS Check
```bash
nslookup backend-service
nslookup postgres-service
```
This confirmed the backend could resolve service names to internal IPs correctly.

## Outputs:
![Screenshot 2025-05-25 011647](https://github.com/user-attachments/assets/fff2ad3c-ce9d-4c8b-a397-674be1099f9f)
![Screenshot 2025-05-25 011938](https://github.com/user-attachments/assets/2c9be808-dad8-4c53-b38d-d96c0a3de689)


## 📌 Conclusion: 
- Service discovery in Kubernetes enables microservices to communicate using predictable DNS names and service abstractions, removing the need for hardcoded IPs. 
- Our setup followed Kubernetes best practices to ensure smooth internal and external connectivity across all components.
