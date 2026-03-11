# GitHub Action Workflow Trigger (Cloudflare Worker)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/luxysiv/cloudflare-gateway-pihole-trigger)

A lightweight **Cloudflare Worker** designed to automatically trigger a GitHub Action workflow on a schedule (Cron Trigger) using the GitHub API.

## 🚀 Features
* **Automated Scheduling:** Uses Cloudflare Cron Triggers to run at specific intervals.
* **Secure:** Utilizes Environment Variables (Secrets) for sensitive GitHub Tokens.
* **Modern ES Modules:** Built with the latest Cloudflare Worker standards for better performance.
* **One-Click Deploy:** Ready to be deployed via the "Deploy to Workers" button.

## 🛠️ Setup Instructions

### 1. Prerequisites
* A **GitHub Personal Access Token (PAT)** with `workflow` scope.
* A Cloudflare account.
* A GitHub repository with an existing workflow file (e.g., `.github/workflows/main.yml`).

### 2. Deployment
Click the **Deploy to Cloudflare Workers** button above. Follow the prompts to connect your GitHub account and deploy the code.

### 3. Configuration (Environment Variables)
Once deployed, you **must** add the following Environment Variables in the Cloudflare Dashboard (**Settings > Variables > Environment Variables**):

| Variable | Description | Example |
| :--- | :--- | :--- |
| `GITHUB_TOKEN` | Your GitHub Personal Access Token | `ghp_xxxxxxxxxxxx` |
| `GITHUB_USER` | Your GitHub username | `octocat` |
| `GITHUB_REPO` | The name of your repository | `my-awesome-project` |
| `WORKFLOW_ID` | The filename of your workflow | `main.yml` |

### 4. Customizing the Schedule
To change how often the trigger runs, edit the `wrangler.toml` file in your repository:

```toml
[triggers]
crons = ["0 0 * * *"] # This runs every day at midnight (UTC)
