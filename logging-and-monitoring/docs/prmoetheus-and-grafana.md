# 📊 Kubernetes Monitoring Stack Setup (Prometheus + Grafana)

This document provides a complete walkthrough for deploying and configuring a **monitoring stack** using **Prometheus** and **Grafana** on a Kubernetes cluster. It includes installation, configurations, access setup, troubleshooting steps, and dashboard integration in Grafana.

---

## ✅ Overview

We installed the **Kube-Prometheus-Stack** (a Helm chart that bundles Prometheus, Grafana, Alertmanager, and exporters) and verified end-to-end monitoring of the Kubernetes cluster using **Grafana dashboards**.

---

## 🛠️ Prerequisites

- A running Kubernetes cluster (e.g., AWS EKS or Kubeadm setup)
- Helm 3 installed
- kubectl configured
- EC2 SSH access for port forwarding

---

## 🚀 Installation Steps

### 1. Add Prometheus Community Helm Repo

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
2. Install Kube Prometheus Stack
bash
Copy
Edit
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace
This installs:

Prometheus server

Grafana

Node exporter

kube-state-metrics

Alertmanager

🔍 Verify Installation
List Services
bash
Copy
Edit
kubectl get svc -n monitoring
You should see:

prometheus-server

prometheus-alertmanager

grafana

Others (exporters)

Check Pod Status
bash
Copy
Edit
kubectl get pods -n monitoring
All pods (Prometheus, Grafana, exporters) should be in Running state.

🌐 Access Grafana Dashboard
1. Port Forward Grafana
bash
Copy
Edit
kubectl port-forward -n monitoring svc/grafana 3001:80
2. SSH Tunnel from Local
On your local machine:

bash
Copy
Edit
ssh -i "your-key.pem" -L 3001:127.0.0.1:3001 ubuntu@<EC2_Public_IP>
3. Open Grafana in Browser
Navigate to:
📎 http://localhost:3001

4. Default Credentials
Username: admin

Password: prom-operator (or fetch using below)

bash
Copy
Edit
kubectl get secret --namespace monitoring prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
📉 Add Prometheus Data Source to Grafana
If not preconfigured:

Navigate to Settings → Data Sources

Add Prometheus

URL:

pgsql
Copy
Edit
http://prometheus-server.monitoring.svc.cluster.local
Save & Test — should show Data source is working.

📊 Import Grafana Dashboards
Recommended Dashboard IDs (from Grafana.com)
Dashboard	ID
Node Exporter Full	1860
Kube Prometheus Stack	6417
Kubernetes Cluster Monitoring	315

Steps:
Click + → Import

Enter Dashboard ID (e.g., 1860)

Select Prometheus as data source

Click Import

🧰 Troubleshooting Summary
Issue	Resolution
curl to NodePort failed	Used kubectl port-forward instead
Port 3000 already in use	Switched to 3001
ss not found inside Grafana	Used netstat instead
Prometheus API: no such host	Used correct internal service name: prometheus-server.monitoring.svc.cluster.local
Grafana not reachable	Created local SSH tunnel with port forwarding

🎉 What We Achieved
✅ Installed full monitoring stack with kube-prometheus-stack

✅ Set up Grafana with port forwarding and remote SSH tunnel

✅ Connected Prometheus as a data source

✅ Imported and viewed real-time dashboards

✅ Troubleshot service access issues and verified successful connections

📂 Directory/Chart Details
If you want to customize the chart:

bash
Copy
Edit
helm show values prometheus-community/kube-prometheus-stack > custom-values.yaml
Then install using:

bash
Copy
Edit
helm upgrade --install prometheus -f custom-values.yaml prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
📌 Useful Commands
bash
Copy
Edit
# Get all services
kubectl get svc -n monitoring

# Get Grafana password
kubectl get secret -n monitoring prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --decode

# Port forward Grafana
kubectl port-forward -n monitoring svc/grafana 3001:80

# SSH tunnel from your laptop
ssh -i "key.pem" -L 3001:127.0.0.1:3001 ubuntu@<your-ec2-ip>
🧠 Final Notes
You now have a production-ready monitoring stack set up and working. From here, you can:

Set up Grafana alerts

Integrate with Slack/Webhooks

Export dashboards as code

Monitor specific microservices via custom Prometheus exporters
