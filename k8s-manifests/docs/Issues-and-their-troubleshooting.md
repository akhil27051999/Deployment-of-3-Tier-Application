#  Kubernetes Troubleshooting Guide

This section covers real-world issues encountered during deployment and how they were resolved.

## ❌ Issue: ImagePullBackOff / ErrImagePull

### Cause:
The container image couldn't be pulled from the registry.

### Common Reasons:
1. Incorrect image name or tag.
2. Private image without authentication.
3. Image not pushed to Docker Hub or registry.

### Resolution:

**1. Verify image name and tag in the deployment YAML:**

```yaml
image: your-dockerhub-username/backend:latest
```

**2. Make sure the image exists on Docker Hub:**

```bash
docker push your-dockerhub-username/backend:latest
```

**3. Describe the pod to see the exact error:**

```bash
kubectl describe pod <pod-name>
```

**4. If using a private registry, create a Kubernetes secret:**

```bash
kubectl create secret docker-registry regcred \
  --docker-username=your-username \
  --docker-password=your-password \
  --docker-email=your-email
```

**5. Then reference it in your deployment YAML:**

```yaml
imagePullSecrets:
  - name: regcred
```

---
## ❌ Issue: CrashLoopBackOff

### Cause:
The container keeps crashing after starting.

### Common Reasons:

1. Misconfigured environment variables.
2. Application error (e.g., DB connection failed).
3. Required service not ready yet (e.g., backend starting before DB).

### Resolution:

**1. Check pod logs to inspect errors:**

```bash
kubectl logs <pod-name>
```

**2. Make sure dependent services (like DB) are running:**

```bash
kubectl get pods
kubectl get svc
```

**3. Use readinessProbe and livenessProbe in deployments to delay service startup until ready.**
**4. Double-check env variables and DB connection strings.**

---

## 🔍 Issue: Microservices Not Communicating

### Symptom:
Services can’t talk to each other (e.g., backend can’t reach DB or frontend can’t reach backend).

### Troubleshooting Steps:

**1. Verify Services Are Running:**

```bash
kubectl get svc
```

**2.DNS Lookup from Pod:**

```bash
kubectl exec -it <pod-name> -- nslookup <service-name>
```

**3. Ping or Curl Service:**

- From one pod (e.g., backend), check connectivity to DB:

```bash
kubectl exec -it backend-pod -- /bin/sh
```
- ping db-service

```bash
curl http://db-service:5432
```
**4. Check Service Selectors Match Pod Labels:**

```bash
kubectl describe svc <service-name>
```

**5. Make sure selector matches the labels in pod/deployment.**

Use Full Cluster DNS Names for Reliability:

```pgsql
<service-name>.<namespace>.svc.cluster.local
```
---
## Summary of Fixes Applied in Our Project

| **Problem**                  | **Diagnosis**                           | **Fix**                                                                 |
|-----------------------------|------------------------------------------|-------------------------------------------------------------------------|
| `ImagePullBackOff`          | Wrong image name/tag                     | Rebuilt & pushed the correct Docker image to Docker Hub                |
| Backend crash loop          | PostgreSQL not ready at startup          | Used readiness probes and ensured proper service startup order         |
| DNS resolution failed       | Incorrect service name or namespace      | Verified DNS with `nslookup` and used full DNS names                   |
| Frontend couldn't reach backend | Service type was ClusterIP             | Used `NodePort` for frontend and `ClusterIP` for internal services     |


