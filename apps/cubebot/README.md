# CubeBot 🧊

GitHub App bot for TresJS issue triage and documentation assistance.

## Features

- Auto-triages new issues (bug vs feature detection)
- Redirects feature requests to GitHub Discussions
- Checks for required bug report info (reproduction, system info)
- Suggests relevant documentation via RAG
- Responds to @mentions with doc-based assistance

## Setup

### 1. Create GitHub App

1. Go to github.com/settings/apps → New GitHub App
2. Name: `tresjs-cubebot`
3. Permissions:
   - Issues: Read & Write
   - Discussions: Read & Write
4. Subscribe to events: `issues`, `issue_comment`
5. Generate and download private key (`.pem` file)

### 2. Cloudflare Setup

```bash
# Create D1 database
pnpm wrangler d1 create cubebot-docs

# Copy the database_id from output and update wrangler.toml

# Apply schema to remote D1
cd apps/cubebot
pnpm wrangler d1 execute cubebot-docs --remote --file=schema.sql
```

### 3. Deploy Worker

```bash
cd apps/cubebot
pnpm wrangler deploy
```

### 4. Set Secrets

```bash
cd apps/cubebot

# App ID from GitHub App page
pnpm wrangler secret put GITHUB_APP_ID

# Contents of the .pem private key file
pnpm wrangler secret put GITHUB_PRIVATE_KEY

# Generate with: openssl rand -hex 32
# Use same value in GitHub App webhook settings
pnpm wrangler secret put GITHUB_WEBHOOK_SECRET

# From console.anthropic.com
pnpm wrangler secret put ANTHROPIC_API_KEY
```

### 5. Configure GitHub App Webhook

1. Go to your GitHub App settings
2. Set Webhook URL: `https://tresjs-cubebot.<account>.workers.dev/webhook`
3. Set Webhook secret: same value as `GITHUB_WEBHOOK_SECRET`
4. Save

### 6. Seed Documentation (RAG)

```bash
# Seed one source at a time (core | cientos | postprocessing)
# Add &clear=true on the first call to wipe existing docs first
curl -X POST https://tresjs-cubebot.<account>.workers.dev/admin/seed-docs?source=core \
  -H "Authorization: Bearer <ADMIN_SECRET>"

curl -X POST https://tresjs-cubebot.<account>.workers.dev/admin/seed-docs?source=cientos \
  -H "Authorization: Bearer <ADMIN_SECRET>"

curl -X POST https://tresjs-cubebot.<account>.workers.dev/admin/seed-docs?source=postprocessing \
  -H "Authorization: Bearer <ADMIN_SECRET>"
```

This fetches `llms-full.txt` from TresJS doc sites, generates embeddings via Workers AI, and stores them in D1.

### 7. Install GitHub App

Install the app on the TresJS organization or specific repositories.

## Development

```bash
cd apps/cubebot

# Start local dev server
pnpm wrangler dev

# Use ngrok to expose for webhook testing
ngrok http 8787
```

## Architecture

See [design doc](../../.claude/plans/2026-01-27-cubebot-design.md) for full architecture details.
