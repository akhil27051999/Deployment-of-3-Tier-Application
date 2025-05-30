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

- job_name: 'kubernetes-nodes'
  kubernetes_sd_configs:
    - role: node
  relabel_configs:
    - source_labels: [__address__]
      regex: '(.*):10250'
      replacement: '${1}:9100'
      target_label: __address__

This means: discover all Kubernetes nodes, and scrape their Node Exporter metrics on port 9100.
	
**6. For your microservices, you can expose a /metrics HTTP endpoint (usually using client libraries like Prometheus client for Go, Python, Java, Node.js). Prometheus scrapes these endpoints based on the service discovery rules and scrape configs.**

### Summary

**1. What Prometheus scrapes:**	Metrics exposed on /metrics endpoints (not logs)

**2.  it discovers targets:**	Kubernetes service discovery (pods, services, nodes)

**3. Components exposing metrics:**	Kubelet, API server, Node Exporter, kube-state-metrics, etc.

**4. Logs?**	Prometheus does not scrape logs; use logging tools (e.g., Loki)
