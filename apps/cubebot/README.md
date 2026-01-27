# CubeBot 🧊

GitHub App bot for TresJS issue triage and documentation assistance.

## Features

- Auto-triages new issues (bug vs feature detection)
- Redirects feature requests to GitHub Discussions
- Checks for required bug report info (reproduction, system info)
- Suggests relevant documentation
- Responds to @mentions with doc-based assistance

## Setup

### 1. Create GitHub App

1. Go to github.com/settings/apps → New GitHub App
2. Name: `tresjs-cubebot`
3. Webhook URL: `https://your-worker.workers.dev/webhook`
4. Permissions:
   - Issues: Read & Write
   - Discussions: Read & Write
5. Subscribe to events: `issues`, `issue_comment`
6. Generate and download private key

### 2. Cloudflare Setup

```bash
# Create D1 database
wrangler d1 create cubebot-docs

# Update wrangler.toml with database ID

# Apply schema
wrangler d1 execute cubebot-docs --local --file=schema.sql

# Set secrets
wrangler secret put GITHUB_APP_ID
wrangler secret put GITHUB_PRIVATE_KEY
wrangler secret put GITHUB_WEBHOOK_SECRET
wrangler secret put ANTHROPIC_API_KEY
```

### 3. Embed Documentation

```bash
pnpm embed-docs
# Then import embeddings to D1 (see scripts/README.md)
```

### 4. Deploy

```bash
pnpm deploy
```

## Development

```bash
# Start local dev server
pnpm dev

# Use ngrok or similar to expose for webhook testing
ngrok http 8787
```

## Architecture

See [design doc](../../.claude/plans/2026-01-27-cubebot-design.md) for full architecture details.
