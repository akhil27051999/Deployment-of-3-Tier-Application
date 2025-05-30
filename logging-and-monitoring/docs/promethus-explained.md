## How Prometheus Scrapes Metrics from Kubernetes

**1. Prometheus scrapes metrics endpoints exposed by Kubernetes components and workloads.**

**2. These endpoints are usually HTTP /metrics endpoints that expose metrics in a Prometheus format.**

**3. Kubernetes Components that expose metrics:**

- Kubelet
- API Server
- Controller Manager
- Scheduler
- Node Exporter (for node-level metrics)
- cAdvisor (container metrics)
- kube-state-metrics (state metrics about Kubernetes objects)
		
**4. How does Prometheus discover these endpoints?**
- Prometheus uses service discovery mechanisms configured in its prometheus.yml or via the Helm chart defaults.
- For Kubernetes, this typically includes discovering:
  - Services with specific labels/annotations
  - Pods with specific labels/annotations
  - Endpoints
  - Nodes
			
**5. Example:**
The Prometheus config might have a scrape job like this:

```yaml
- job_name: 'kubernetes-nodes'
  kubernetes_sd_configs:
    - role: node
  relabel_configs:

    - source_labels: [__address__]
      regex: '(.*):10250'
      replacement: '${1}:9100'
      target_label: __address__
```

This means: discover all Kubernetes nodes, and scrape their Node Exporter metrics on port 9100.
	
**6. For your microservices, you can expose a /metrics HTTP endpoint (usually using client libraries like Prometheus client for Go, Python, Java, Node.js). Prometheus scrapes these endpoints based on the service discovery rules and scrape configs.**

## Outputs

![Screenshot 2025-05-24 000320](https://github.com/user-attachments/assets/06bfb411-81c8-41c0-a47a-0555b56f14b6)
![Screenshot 2025-05-23 233404](https://github.com/user-attachments/assets/fd4c7805-128e-4a87-a5ee-029525904580)
![Screenshot 2025-05-23 234730](https://github.com/user-attachments/assets/db14a8ba-3957-4b5c-b145-d7c95c568535)
![Screenshot 2025-05-24 000422](https://github.com/user-attachments/assets/8e9af681-a73c-4a3b-8944-2a7644280795)
![Screenshot 2025-05-23 233249](https://github.com/user-attachments/assets/fe8e0648-dc25-4e33-b168-e4f2221d3bb9)
![Screenshot 2025-05-24 000422](https://github.com/user-attachments/assets/ddf4e5d1-fb24-4529-a002-7c38234c66b2)
![Screenshot 2025-05-23 233339](https://github.com/user-attachments/assets/efc99b91-3182-4059-be6a-7fd313e0d9bb)


### Summary

**1. What Prometheus scrapes:**	Metrics exposed on /metrics endpoints (not logs)

**2.  it discovers targets:**	Kubernetes service discovery (pods, services, nodes)

**3. Components exposing metrics:**	Kubelet, API server, Node Exporter, kube-state-metrics, etc.

**4. Logs?**	Prometheus does not scrape logs; use logging tools (e.g., Loki)
