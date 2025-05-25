# 🤖 Argo CD Deployment for 3-Tier Application

**This section explains how the 3-tier application (frontend, backend, database) is deployed and managed using Argo CD**.

---

## Repo Structure

- `k8s-manifests/apps/frontend` - Kubernetes manifests for Frontend (deployment + service)
- `k8s-manifests/apps/backend` - Kubernetes manifests for Backend (deployment + service)
- `k8s-manifests/apps/db` - Kubernetes manifests for Database (deployment + service)

---

## Argo CD Applications Setup

We create **three Argo CD Applications** for each component, pointing to their respective paths in the repository:

| Application Name | Path                             | Namespace (destination) |
|------------------|---------------------------------|------------------------|
| frontend         | `k8s-manifests/apps/frontend`   | `default`              |
| backend          | `k8s-manifests/apps/backend`    | `default`              |
| db               | `k8s-manifests/apps/db`         | `default`              |

**Note:** All components deploy to the `default` Kubernetes namespace for simplicity.

---

## Sync & Deployment

- Each application syncs manifests from the GitHub repo at `HEAD`.
- Sync Policy can be manual initially and switched to automatic after validation.
- Argo CD monitors the cluster state and keeps resources in sync with Git repository.

---

## How to Access Applications

1. Verify pods are running in the `default` namespace:
   ```bash
   kubectl get pods -n default
Check services in default namespace:

bash
Copy
Edit
kubectl get svc -n default
To test frontend locally, use port forwarding:

bash
Copy
Edit
kubectl port-forward svc/frontend 8080:80 -n default
Then access: http://localhost:8080

Troubleshooting Steps
1. Application OutOfSync or SyncFailed
Check Argo CD UI or CLI for sync status and error messages:

bash
Copy
Edit
argocd app get <app-name>
Common cause: Kubernetes namespace missing or incorrect in manifests or Argo CD app spec.

Fix: Ensure namespaces exist before syncing or update Argo CD app destination namespace.

2. Missing Namespace Error
If error shows something like namespaces "frontend" not found, create namespace manually:

bash
Copy
Edit
kubectl create namespace frontend
Or change Argo CD application to deploy to existing namespace (default).

3. Resources Not Created (No Pods or Services)
Check if Argo CD has synced the latest manifests successfully.

Verify resource manifests paths and repo URL are correct in Argo CD app settings.

Check Kubernetes events for failures:

bash
Copy
Edit
kubectl get events -n <namespace>
Use:

bash
Copy
Edit
kubectl describe deployment <deployment-name> -n <namespace>
to see deployment issues (e.g., image pull errors).

4. Pods Not Running or CrashLoopBackOff
Describe pods for errors:

bash
Copy
Edit
kubectl describe pod <pod-name> -n <namespace>
Check pod logs:

bash
Copy
Edit
kubectl logs <pod-name> -n <namespace>
5. Service Not Found or No Endpoints
Confirm services exist:

bash
Copy
Edit
kubectl get svc -n <namespace>
Describe service to check ports and selectors:

bash
Copy
Edit
kubectl describe svc <service-name> -n <namespace>
Make sure deployment labels match service selector labels.

Notes
Make sure Argo CD has access to your GitHub repo URL and correct revision.

Always check Argo CD application status after any changes.

Sync apps manually after fixing issues or enable auto-sync with caution.
