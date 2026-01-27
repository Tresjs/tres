# CubeBot

GitHub App bot for TresJS issue triage built on Cloudflare Workers.

## Tech Stack

- **Runtime:** Cloudflare Workers
- **Framework:** Hono
- **Database:** Cloudflare D1
- **AI:** Anthropic Claude + Workers AI (embeddings)
- **GitHub:** Octokit

## Key Files

- `src/index.ts` - Worker entry point, webhook routing
- `src/github/handlers/` - Event handlers for issues and comments
- `src/ai/` - Claude integration and RAG retrieval
- `src/triage/` - Issue detection and comment formatting
- `scripts/embed-docs.ts` - Documentation embedding script

## Testing Locally

```bash
pnpm dev
# Expose via ngrok for webhook testing
```

## Secrets Required

- `GITHUB_APP_ID`
- `GITHUB_PRIVATE_KEY`
- `GITHUB_WEBHOOK_SECRET`
- `ANTHROPIC_API_KEY`
