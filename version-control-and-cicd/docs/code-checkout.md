# 🗃️ Checking out Developer Code from Git!

### What is Git?
- Git is a version control system used to track changes in your code.
- It allows multiple developers to collaborate by managing different versions of the code.
- Git repositories (repos) can be hosted on platforms like GitHub, GitLab, or Bitbucket.

---

### What is "Checking out" Code?
- "Checking out" code means cloning or downloading the code from the Git repository to your local machine or VM.
- This is the first step to get the application code so you can build, run, and deploy it.

---

### What we need before Starting
1. A GitHub/GitLab repository link (for your 3 microservices: frontend, backend, db).
2. Git installed on your laptop or VM.
3. Access to a terminal or command prompt on your machine or VM.
   

## Steps to Install and provisioning Git

**✅ Step 1: Set up Git on our machine/VM**

If Git is not installed, install it first. On Ubuntu/Linux VM:

```bash
sudo apt update
sudo apt install git -y
```

---

**✅ Step 2: Configure Git (once per machine)**

After installation, set our Git username and email. This is important for tracking commits.

```bash
git config --global user.name "our Name"
git config --global user.email "our.email@example.com"
```

---

**✅ Step 3: Clone the repository**

we will use the git clone command with the repo URL to get the code.

```bash
git clone https://github.com/ourusername/our-microservices-project.git
```
This will create a folder named `Deployment-of-3-Tier-Application` in our current directory with all the code.

---

**✅ Step 4: Check the project structure**

**1. Navigate into the cloned directory:**

```bash
cd Deployment-of-3-Tier-Application
```

**2. List files and folders:**

```bash
ls -l
```

*We should see something like:*

- `frontend/`
- `backend/`
- `db/`
- `README.md`

Each folder represents one microservice.

---

**✅ Step 5: Understanding the code base (basic check)**

1. frontend/ - Contains code related to the frontend UI (usually React, Angular, Vue, or simple HTML/JS).
2. backend/ - Contains API code (Node.js, Python, Java, etc.).
3. db/ - Contains database-related scripts (e.g., SQL scripts, DB config).

---

**✅ Step 6: Basic Git operations**

**1. Check status:**

```bash
git status
```

**2. Pull latest changes (if code updated by others):**

```bash
git pull origin main
```

**3. Add new files/changes:**

```bash
git add .
```

**4. Commit changes:**

``` bash
git commit -m "Your commit message"
```

**5. Push changes:**

```bash
git push origin main
```

## Summary 
1. Install Git.
2. Configure Git with our name and email.
3. Clone the microservices repo to our local/VM machine.
4. Navigate inside and check the project files.
5. Use basic Git commands to manage our code.

