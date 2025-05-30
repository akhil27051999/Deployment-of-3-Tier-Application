# 🖥️ Provisioning AWS EC2 Virtual Machine and SSH Access

**This section guides us through creating a Virtual Machine (EC2 instance) on AWS and connecting to it securely via SSH.**

---

### Step 1: Sign in to AWS Management Console

1. Open [AWS Console](https://aws.amazon.com/console/).
2. Sign in with your AWS account credentials.

---

### Step 2: Launch an EC2 Instance

1. Navigate to **EC2 Dashboard** by searching "EC2" in the AWS Console.
2. Click **Launch Instance**.
3. Configure the instance:
   - **Name**: `My EC2 Instance`
   - **AMI**: Choose **Amazon Linux 2 AMI** or **Ubuntu Server 22.04 LTS**
   - **Instance Type**: Choose `t3.micro` (eligible for free tier)
4. Click **Next: Configure Instance Details** and accept defaults.
5. Click **Next: Add Storage** (default 30GB is fine).
6. Click **Next: Add Tags** and add a tag if desired.
7. Click **Next: Configure Security Group**:
   - Create a new security group.
   - Add rules:
     - **SSH**: TCP, port 22, source: your IP (or anywhere `0.0.0.0/0` but less secure)
     - **HTTP** (optional for frontend app): TCP, port 80, source: anywhere
     - **Custom TCP** (optional for backend ports)
8. Review and **Launch**.
   
![Screenshot 2025-05-27 003802](https://github.com/user-attachments/assets/19d67475-222a-4c3c-b915-a068084050ba)

---

### Step 3: Create or Use an Existing Key Pair

1. Choose **Create a new key pair**.
2. Name it `my-pem-key`.
3. Download the `.pem` file and save it securely.
4. You will use this key to SSH into the VM.
5. Click **Launch Instances**.

---

### Step 4: Connect to Your EC2 Instance via SSH

1. Find your instance’s **Public IPv4** address from EC2 dashboard.
2. Open a terminal on your local machine.
3. Change permissions for the `.pem` file:
   ```bash
   chmod 400 devops-project-key.pem
4. SSH to the Machine with the location of the pem key and user
   ```bash
   ssh -i "C:\Home\Users\Downloads\my_pem_key.pem" ubuntu@<IP-Address>
