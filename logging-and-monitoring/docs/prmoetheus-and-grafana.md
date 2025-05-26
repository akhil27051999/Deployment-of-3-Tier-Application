# 📊 Kubernetes Monitoring Stack Setup (Prometheus + Grafana)

This document provides a complete walkthrough for deploying and configuring a **monitoring stack** using **Prometheus** and **Grafana** on a Kubernetes cluster. It includes installation, configurations, access setup, troubleshooting steps, and dashboard integration in Grafana.

---

## Overview

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
```
### 2. Install Kube Prometheus Stack

```bash
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace
```
** This installs:**
- `Prometheus server`
- `Grafana`
- `Node exporter`
- `kube-state-metrics`
- `Alertmanager`

### 🔍 Verify Installation

**1. List Services**
```bash
kubectl get svc -n monitoring
```
**You should see:**
- `prometheus-server`
- `prometheus-alertmanager`
- `grafana`
- `Others (exporters)`

**2. Check Pod Status**
```bash
kubectl get pods -n monitoring
```
**All pods (Prometheus, Grafana, exporters) should be in Running state.**

## 🌐 Access Grafana Dashboard

### 1. Port Forward Grafana
```bash
kubectl port-forward -n monitoring svc/grafana 3001:80
```

### 2. SSH Tunnel from Local
On your local machine:

```bash
ssh -i "your-key.pem" -L 3001:127.0.0.1:3001 ubuntu@<EC2_Public_IP>
```

### 3. Open Grafana in Browser

**Navigate to:**
'http://localhost:3001'

### 4. Default Credentials

- Username: `admin`
- Password: `prom-operator` (or fetch using below)

```bash
kubectl get secret --namespace monitoring prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo
```

## 📉 Add Prometheus Data Source to Grafana

### If not preconfigured:

**Navigate to Settings → Data Sources**
`Add Prometheus`

URL:
 
```pgsql
http://prometheus-server.monitoring.svc.cluster.local
```

**Save & Test — should show Data source is working.**

## 📊 Import Grafana Dashboards

### Recommended Dashboard IDs (from Grafana.com)
**Dashboard	ID**
- Node Exporter Full	`1860`
- Kube Prometheus Stack	`6417`
- Kubernetes Cluster Monitoring	`315`
![Screenshot 2025-05-26 122253](https://github.com/user-attachments/assets/056c1c1a-5e9f-4915-83a2-b2d40cc2f157)
![Screenshot 2025-05-26 122400](https://github.com/user-attachments/assets/bd3e1e59-9c06-4c3b-8866-6aeb1f8840b7)
![Screenshot 2025-05-26 122504](https://github.com/user-attachments/assets/5e475287-aed4-4c0a-8641-bbaf22b2d263)
![Screenshot 2025-05-26 122700](https://github.com/user-attachments/assets/59b0ad87-e6f2-46d4-8403-9f8f433beb54)
![Screenshot 2025-05-26 123223](https://github.com/user-attachments/assets/bf539ca9-6bfe-4598-9980-c0e92a195d95)
**Steps:**

1. Click + → Import

2. Enter Dashboard ID (e.g., 1860)
3. Select Prometheus as data source

4. Click Import

## 🧰 Troubleshooting Summary

**1. curl to NodePort failed	Used kubectl port-forward instead**
- Port `3000` already in use	Switched to `3001`

**2. Prometheus API: no such host**
- Used correct internal service name: prometheus-server.monitoring.svc.cluster.local

  
**3. Grafana not reachable**
- Created local SSH tunnel with port forwarding

## 🎉 What We Achieved from moitoring using Prometheus and Grafana

- ✅ Installed full monitoring stack with kube-prometheus-stack
- ✅ Set up Grafana with port forwarding and remote SSH tunnel
- ✅ Connected Prometheus as a data source
- ✅ Imported and viewed real-time dashboards
- ✅ Troubleshot service access issues and verified successful connections

## 📂 Directory/Chart Details

1. If we want to customize the chart:

```bash
helm show values prometheus-community/kube-prometheus-stack > custom-values.yaml
```

2. Then install using:

```bash
helm upgrade --install prometheus -f custom-values.yaml prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
```

📌 Useful Commands

**1. Get all services**
```bash
kubectl get svc -n monitoring
```
**2. Get Grafana password**
kubectl get secret -n monitoring prometheus-grafana -o jsonpath="{.data.admin-password}" | base64 --decode

**3. Port forward Grafana**
kubectl port-forward -n monitoring svc/grafana 3001:80

**4. SSH tunnel from your laptop**
ssh -i "key.pem" -L 3001:127.0.0.1:3001 ubuntu@<your-ec2-ip>

## 🧠 Final Notes

**we now have a production-ready monitoring stack set up and working. From here, you can:**
- Set up Grafana alerts
- Integrate with Slack/Webhooks
- Export dashboards as code
- Monitor specific microservices via custom Prometheus exporters
