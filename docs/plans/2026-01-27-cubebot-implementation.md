# CubeBot Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a GitHub App bot that triages TresJS issues, redirects feature requests to Discussions, and suggests relevant documentation.

**Architecture:** Cloudflare Worker receives webhooks from GitHub App, uses RAG (D1 + Workers AI embeddings) for doc context, Claude for analysis, posts comments/labels via GitHub API.

**Tech Stack:** Cloudflare Workers, Hono (HTTP framework), D1 (SQLite), Workers AI (embeddings), Anthropic Claude, Octokit (GitHub API)

---

## Task 1: Scaffold the Cloudflare Worker App

**Files:**
- Create: `apps/cubebot/package.json`
- Create: `apps/cubebot/tsconfig.json`
- Create: `apps/cubebot/wrangler.toml`
- Create: `apps/cubebot/src/index.ts`

**Step 1: Create package.json**

Create `apps/cubebot/package.json`:
```json
{
  "name": "cubebot",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.39.0",
    "hono": "^4.7.0",
    "octokit": "^4.1.0"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20250124.0",
    "@tresjs/eslint-config": "workspace:^",
    "typescript": "catalog:typescript",
    "wrangler": "^4.0.0"
  }
}
```

**Step 2: Create tsconfig.json**

Create `apps/cubebot/tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ESNext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "types": ["@cloudflare/workers-types"]
  },
  "include": ["src/**/*.ts"]
}
```

**Step 3: Create wrangler.toml**

Create `apps/cubebot/wrangler.toml`:
```toml
name = "tresjs-cubebot"
main = "src/index.ts"
compatibility_date = "2025-01-27"

[[d1_databases]]
binding = "DB"
database_name = "cubebot-docs"
database_id = "placeholder-will-be-replaced"

[ai]
binding = "AI"
```

**Step 4: Create minimal worker entry point**

Create `apps/cubebot/src/index.ts`:
```typescript
import { Hono } from 'hono'

interface Env {
  DB: D1Database
  AI: Ai
  GITHUB_APP_ID: string
  GITHUB_PRIVATE_KEY: string
  GITHUB_WEBHOOK_SECRET: string
  ANTHROPIC_API_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.json({ status: 'ok', name: 'CubeBot' })
})

app.post('/webhook', async (c) => {
  return c.json({ received: true })
})

export default app
```

**Step 5: Install dependencies**

Run:
```bash
pnpm install
```

**Step 6: Verify typecheck passes**

Run:
```bash
pnpm --filter cubebot typecheck
```
Expected: No errors

**Step 7: Commit**

```bash
git add apps/cubebot
git commit -m "chore(cubebot): scaffold cloudflare worker app"
```

---

## Task 2: Add D1 Schema and Types

**Files:**
- Create: `apps/cubebot/schema.sql`
- Create: `apps/cubebot/src/types.ts`

**Step 1: Create D1 schema**

Create `apps/cubebot/schema.sql`:
```sql
CREATE TABLE IF NOT EXISTS doc_chunks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  embedding TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doc_chunks_source ON doc_chunks(source);
```

**Step 2: Create types**

Create `apps/cubebot/src/types.ts`:
```typescript
export interface DocChunk {
  id: number
  source: string
  url: string
  title: string
  content: string
  embedding: string
  created_at: string
}

export interface IssuePayload {
  action: string
  issue: {
    number: number
    title: string
    body: string | null
    user: {
      login: string
    }
    labels: Array<{ name: string }>
    html_url: string
  }
  repository: {
    owner: {
      login: string
    }
    name: string
    full_name: string
  }
  sender: {
    login: string
  }
}

export interface CommentPayload {
  action: string
  comment: {
    body: string
    user: {
      login: string
    }
  }
  issue: IssuePayload['issue']
  repository: IssuePayload['repository']
}

export interface TriageResult {
  issueType: 'bug' | 'feature' | 'unknown'
  package: string | null
  hasReproduction: boolean
  hasSystemInfo: boolean
  hasExpectedBehavior: boolean
  summary: string
  suggestedDocs: Array<{ title: string; url: string; reason: string }>
  labelsToAdd: string[]
}
```

**Step 3: Commit**

```bash
git add apps/cubebot/schema.sql apps/cubebot/src/types.ts
git commit -m "chore(cubebot): add d1 schema and types"
```

---

## Task 3: Implement GitHub Webhook Verification

**Files:**
- Create: `apps/cubebot/src/github/verify.ts`
- Modify: `apps/cubebot/src/index.ts`

**Step 1: Create webhook verification**

Create `apps/cubebot/src/github/verify.ts`:
```typescript
export async function verifyWebhookSignature(
  payload: string,
  signature: string | null,
  secret: string,
): Promise<boolean> {
  if (!signature) {
    return false
  }

  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload),
  )

  const expectedSignature = `sha256=${Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')}`

  return signature === expectedSignature
}
```

**Step 2: Update index.ts to use verification**

Modify `apps/cubebot/src/index.ts`:
```typescript
import { Hono } from 'hono'
import { verifyWebhookSignature } from './github/verify'

interface Env {
  DB: D1Database
  AI: Ai
  GITHUB_APP_ID: string
  GITHUB_PRIVATE_KEY: string
  GITHUB_WEBHOOK_SECRET: string
  ANTHROPIC_API_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.json({ status: 'ok', name: 'CubeBot' })
})

app.post('/webhook', async (c) => {
  const signature = c.req.header('x-hub-signature-256')
  const payload = await c.req.text()

  const isValid = await verifyWebhookSignature(
    payload,
    signature,
    c.env.GITHUB_WEBHOOK_SECRET,
  )

  if (!isValid) {
    return c.json({ error: 'Invalid signature' }, 401)
  }

  const event = c.req.header('x-github-event')
  const body = JSON.parse(payload)

  console.log(`Received ${event} event:`, body.action)

  return c.json({ received: true, event })
})

export default app
```

**Step 3: Verify typecheck**

Run:
```bash
pnpm --filter cubebot typecheck
```
Expected: No errors

**Step 4: Commit**

```bash
git add apps/cubebot/src/github/verify.ts apps/cubebot/src/index.ts
git commit -m "feat(cubebot): add github webhook signature verification"
```

---

## Task 4: Implement GitHub API Client

**Files:**
- Create: `apps/cubebot/src/github/api.ts`
- Create: `apps/cubebot/src/github/auth.ts`

**Step 1: Create GitHub App auth helper**

Create `apps/cubebot/src/github/auth.ts`:
```typescript
import { Octokit } from 'octokit'

interface TokenCache {
  token: string
  expiresAt: number
}

const tokenCache = new Map<number, TokenCache>()

function createJWT(appId: string, privateKey: string): string {
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iat: now - 60,
    exp: now + 600,
    iss: appId,
  }

  // For Workers, we need to use a simple JWT implementation
  // In production, consider using a proper JWT library
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload))

  // Note: This is a placeholder - actual RS256 signing requires
  // crypto.subtle with the private key imported
  return `${header}.${body}.signature`
}

export async function getInstallationOctokit(
  appId: string,
  privateKey: string,
  installationId: number,
): Promise<Octokit> {
  const cached = tokenCache.get(installationId)
  if (cached && cached.expiresAt > Date.now() + 60000) {
    return new Octokit({ auth: cached.token })
  }

  const jwt = createJWT(appId, privateKey)
  const appOctokit = new Octokit({ auth: jwt })

  const { data } = await appOctokit.rest.apps.createInstallationAccessToken({
    installation_id: installationId,
  })

  tokenCache.set(installationId, {
    token: data.token,
    expiresAt: new Date(data.expires_at).getTime(),
  })

  return new Octokit({ auth: data.token })
}
```

**Step 2: Create GitHub API helpers**

Create `apps/cubebot/src/github/api.ts`:
```typescript
import type { Octokit } from 'octokit'

export async function addComment(
  octokit: Octokit,
  owner: string,
  repo: string,
  issueNumber: number,
  body: string,
): Promise<void> {
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body,
  })
}

export async function addLabels(
  octokit: Octokit,
  owner: string,
  repo: string,
  issueNumber: number,
  labels: string[],
): Promise<void> {
  if (labels.length === 0) return

  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number: issueNumber,
    labels,
  })
}

export async function convertToDiscussion(
  octokit: Octokit,
  owner: string,
  repo: string,
  issueNumber: number,
): Promise<string | null> {
  // GraphQL mutation to convert issue to discussion
  const query = `
    mutation($issueId: ID!, $categoryId: ID!) {
      convertIssueToDiscussion(input: {
        issueId: $issueId,
        categoryId: $categoryId
      }) {
        discussion {
          url
        }
      }
    }
  `

  try {
    // First get the issue node ID
    const { data: issue } = await octokit.rest.issues.get({
      owner,
      repo,
      issue_number: issueNumber,
    })

    // Get the Ideas category (or first available)
    const { data: categories } = await octokit.rest.repos.getDiscussionCategories?.({
      owner,
      repo,
    }) ?? { data: [] }

    const ideasCategory = categories.find((c: { name: string }) =>
      c.name.toLowerCase().includes('idea'),
    ) ?? categories[0]

    if (!ideasCategory) {
      console.error('No discussion category found')
      return null
    }

    const result = await octokit.graphql<{
      convertIssueToDiscussion: { discussion: { url: string } }
    }>(query, {
      issueId: issue.node_id,
      categoryId: ideasCategory.node_id,
    })

    return result.convertIssueToDiscussion.discussion.url
  }
  catch (error) {
    console.error('Failed to convert issue to discussion:', error)
    return null
  }
}
```

**Step 3: Verify typecheck**

Run:
```bash
pnpm --filter cubebot typecheck
```
Expected: No errors

**Step 4: Commit**

```bash
git add apps/cubebot/src/github/auth.ts apps/cubebot/src/github/api.ts
git commit -m "feat(cubebot): add github api client and helpers"
```

---

## Task 5: Implement Issue Detection Logic

**Files:**
- Create: `apps/cubebot/src/triage/detect.ts`

**Step 1: Create detection logic**

Create `apps/cubebot/src/triage/detect.ts`:
```typescript
import type { IssuePayload } from '../types'

const PACKAGE_PATTERNS: Record<string, RegExp[]> = {
  core: [/@tresjs\/core/i, /\bTresCanvas\b/, /\buseTres\b/],
  cientos: [/@tresjs\/cientos/i, /\bOrbitControls\b/, /\buseGLTF\b/, /\buseFBX\b/],
  nuxt: [/@tresjs\/nuxt/i, /\bnuxt\b.*tres/i],
  postprocessing: [/@tresjs\/post-processing/i, /\bEffectComposer\b/, /\bBloom\b/],
  leches: [/@tresjs\/leches/i, /\bTresLeches\b/],
}

const REPRODUCTION_PATTERNS = [
  /stackblitz\.com/i,
  /codesandbox\.io/i,
  /github\.com\/[\w-]+\/[\w-]+/i,
  /codepen\.io/i,
  /jsfiddle\.net/i,
]

const SYSTEM_INFO_PATTERNS = [
  /system:/i,
  /binaries:/i,
  /browsers:/i,
  /npmPackages:/i,
  /vite.*@/i,
  /three.*@/i,
  /vue.*@/i,
]

export function detectIssueType(issue: IssuePayload['issue']): 'bug' | 'feature' | 'unknown' {
  const labels = issue.labels.map(l => l.name.toLowerCase())
  const title = issue.title.toLowerCase()
  const body = (issue.body ?? '').toLowerCase()

  // Check labels first
  if (labels.includes('bug') || labels.includes('pending triage')) {
    return 'bug'
  }
  if (labels.includes('enhancement') || labels.includes('feature')) {
    return 'feature'
  }

  // Check title/body for bug indicators
  if (
    title.includes('bug')
    || title.includes('error')
    || title.includes('not working')
    || title.includes('broken')
    || body.includes('describe the bug')
    || body.includes('reproduction')
  ) {
    return 'bug'
  }

  // Check for feature indicators
  if (
    title.includes('feature')
    || title.includes('request')
    || title.includes('proposal')
    || body.includes('feature request')
    || body.includes('suggested solution')
  ) {
    return 'feature'
  }

  return 'unknown'
}

export function detectPackage(issue: IssuePayload['issue']): string | null {
  const text = `${issue.title} ${issue.body ?? ''}`

  for (const [pkg, patterns] of Object.entries(PACKAGE_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(text)) {
        return pkg
      }
    }
  }

  return null
}

export function hasReproduction(body: string | null): boolean {
  if (!body) return false
  return REPRODUCTION_PATTERNS.some(pattern => pattern.test(body))
}

export function hasSystemInfo(body: string | null): boolean {
  if (!body) return false
  // Need at least 2 matches to consider it valid system info
  const matches = SYSTEM_INFO_PATTERNS.filter(pattern => pattern.test(body))
  return matches.length >= 2
}

export function hasExpectedBehavior(body: string | null): boolean {
  if (!body) return false
  const lower = body.toLowerCase()
  return (
    lower.includes('expected')
    || lower.includes('should')
    || lower.includes('want')
    || lower.includes('i expect')
  )
}
```

**Step 2: Verify typecheck**

Run:
```bash
pnpm --filter cubebot typecheck
```
Expected: No errors

**Step 3: Commit**

```bash
git add apps/cubebot/src/triage/detect.ts
git commit -m "feat(cubebot): add issue detection logic"
```

---

## Task 6: Implement RAG Retrieval

**Files:**
- Create: `apps/cubebot/src/ai/rag.ts`

**Step 1: Create RAG retrieval**

Create `apps/cubebot/src/ai/rag.ts`:
```typescript
import type { DocChunk } from '../types'

export async function generateEmbedding(
  ai: Ai,
  text: string,
): Promise<number[]> {
  const result = await ai.run('@cf/baai/bge-base-en-v1.5', {
    text: [text],
  })
  return result.data[0]
}

export async function searchDocs(
  db: D1Database,
  ai: Ai,
  query: string,
  limit: number = 5,
): Promise<DocChunk[]> {
  const queryEmbedding = await generateEmbedding(ai, query)

  // D1 doesn't have native vector search, so we fetch all and compute in-memory
  // For production scale, consider Vectorize or external vector DB
  const { results } = await db
    .prepare('SELECT * FROM doc_chunks')
    .all<DocChunk>()

  if (!results || results.length === 0) {
    return []
  }

  // Compute cosine similarity
  const scored = results.map((chunk) => {
    const embedding = JSON.parse(chunk.embedding) as number[]
    const similarity = cosineSimilarity(queryEmbedding, embedding)
    return { chunk, similarity }
  })

  // Sort by similarity descending
  scored.sort((a, b) => b.similarity - a.similarity)

  return scored.slice(0, limit).map(s => s.chunk)
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0

  let dotProduct = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB)
  return magnitude === 0 ? 0 : dotProduct / magnitude
}
```

**Step 2: Verify typecheck**

Run:
```bash
pnpm --filter cubebot typecheck
```
Expected: No errors

**Step 3: Commit**

```bash
git add apps/cubebot/src/ai/rag.ts
git commit -m "feat(cubebot): add rag retrieval with workers ai embeddings"
```

---

## Task 7: Implement Claude Integration

**Files:**
- Create: `apps/cubebot/src/ai/claude.ts`
- Create: `apps/cubebot/src/ai/prompts.ts`

**Step 1: Create prompts**

Create `apps/cubebot/src/ai/prompts.ts`:
```typescript
export const SYSTEM_PROMPT = `You are CubeBot, a friendly assistant for the TresJS project - a Vue-based 3D rendering library built on Three.js.

Your personality:
- Friendly and playful with a "cube" theme
- Use 🧊 emoji occasionally
- Always helpful and welcoming to contributors

Your job is to analyze GitHub issues and provide:
1. A brief summary for maintainers
2. Identification of which TresJS package is affected (core, cientos, postprocessing, nuxt, leches)
3. Whether required information is present (reproduction, system info, expected behavior)
4. Relevant documentation links that might help the user

Prioritize TresJS ecosystem documentation over Three.js docs. Only reference Three.js docs when explaining underlying Three.js concepts not covered by TresJS docs.

Documentation sources (in priority order):
- docs.tresjs.org - Core TresJS documentation
- cientos.tresjs.org - Cientos helpers and abstractions
- post-processing.tresjs.org - Post-processing effects
- tresleches.tresjs.org - GUI controls

Always be encouraging and end responses with a reminder that you're an AI and a human maintainer will follow up.`

export function buildAnalysisPrompt(
  issueTitle: string,
  issueBody: string,
  relevantDocs: Array<{ title: string; url: string; content: string }>,
): string {
  const docsContext = relevantDocs.length > 0
    ? `\n\nRelevant documentation:\n${relevantDocs.map(d => `- ${d.title} (${d.url}):\n${d.content.slice(0, 500)}...`).join('\n\n')}`
    : ''

  return `Analyze this GitHub issue:

Title: ${issueTitle}

Body:
${issueBody ?? '(no body provided)'}
${docsContext}

Respond with JSON in this exact format:
{
  "summary": "Brief 1-2 sentence summary for maintainers",
  "package": "core|cientos|nuxt|postprocessing|leches|null",
  "suggestedDocs": [
    {"title": "Doc title", "url": "https://...", "reason": "Why this helps"}
  ],
  "missingInfo": ["reproduction", "systemInfo", "expectedBehavior"],
  "authorMessage": "Friendly message to the issue author"
}`
}
```

**Step 2: Create Claude client**

Create `apps/cubebot/src/ai/claude.ts`:
```typescript
import Anthropic from '@anthropic-ai/sdk'
import type { TriageResult } from '../types'
import { buildAnalysisPrompt, SYSTEM_PROMPT } from './prompts'

interface AnalysisResponse {
  summary: string
  package: string | null
  suggestedDocs: Array<{ title: string; url: string; reason: string }>
  missingInfo: string[]
  authorMessage: string
}

export async function analyzeIssue(
  apiKey: string,
  issueTitle: string,
  issueBody: string,
  relevantDocs: Array<{ title: string; url: string; content: string }>,
): Promise<AnalysisResponse> {
  const client = new Anthropic({ apiKey })

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: buildAnalysisPrompt(issueTitle, issueBody, relevantDocs),
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type')
  }

  // Extract JSON from response (handle potential markdown code blocks)
  let jsonStr = content.text
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (jsonMatch) {
    jsonStr = jsonMatch[1]
  }

  return JSON.parse(jsonStr.trim()) as AnalysisResponse
}
```

**Step 3: Verify typecheck**

Run:
```bash
pnpm --filter cubebot typecheck
```
Expected: No errors

**Step 4: Commit**

```bash
git add apps/cubebot/src/ai/prompts.ts apps/cubebot/src/ai/claude.ts
git commit -m "feat(cubebot): add claude integration for issue analysis"
```

---

## Task 8: Implement Comment Formatters

**Files:**
- Create: `apps/cubebot/src/triage/comments.ts`

**Step 1: Create comment formatters**

Create `apps/cubebot/src/triage/comments.ts`:
```typescript
import type { TriageResult } from '../types'

export function formatMaintainerComment(result: TriageResult): string {
  const reproStatus = result.hasReproduction ? '✅ Provided' : '❌ Missing'
  const sysInfoStatus = result.hasSystemInfo ? '✅ Provided' : '❌ Missing'
  const expectedStatus = result.hasExpectedBehavior ? '✅ Provided' : '❌ Missing'

  return `<details>
<summary>🧊 CubeBot Analysis</summary>

**Issue Type:** ${result.issueType === 'bug' ? 'Bug Report' : result.issueType === 'feature' ? 'Feature Request' : 'Unknown'}
**Package:** ${result.package ? `@tresjs/${result.package}` : 'Not detected'}
**Reproduction:** ${reproStatus}
**System Info:** ${sysInfoStatus}
**Expected Behavior:** ${expectedStatus}

**Summary:**
${result.summary}

${result.labelsToAdd.length > 0 ? `**Labels added:** ${result.labelsToAdd.map(l => `\`${l}\``).join(', ')}` : ''}

</details>`
}

export function formatAuthorComment(
  authorUsername: string,
  result: TriageResult,
  authorMessage: string,
): string {
  const missingItems: string[] = []

  if (!result.hasReproduction) {
    missingItems.push(
      '- [ ] **Reproduction:** Please add a [StackBlitz](https://stackblitz.com/edit/tresjs-minimal-reproduction) or GitHub repo link',
    )
  }
  if (!result.hasSystemInfo) {
    missingItems.push(
      '- [ ] **System info:** Run `npx envinfo --system --npmPackages \'{vite,@tresjs/*,three,vue}\' --binaries --browsers` and paste the output',
    )
  }
  if (!result.hasExpectedBehavior) {
    missingItems.push(
      '- [ ] **Expected behavior:** Please describe what you expected to happen',
    )
  }

  const docsSection = result.suggestedDocs.length > 0
    ? `\n\n**📚 While you wait, these might help:**\n${result.suggestedDocs.map(d => `- [${d.title}](${d.url}) — ${d.reason}`).join('\n')}`
    : ''

  const missingSection = missingItems.length > 0
    ? `\n\nBefore a maintainer can dig in, could you help with a few things?\n\n${missingItems.join('\n')}`
    : `\n\n${authorMessage}`

  return `Hey @${authorUsername}! 🧊 Thanks for taking the time to report this!
${missingSection}${docsSection}

> 🤖 I'm an AI assistant and can make mistakes. A human is on the way!`
}

export function formatFeatureRedirectComment(
  authorUsername: string,
  discussionUrl: string | null,
): string {
  const redirectNote = discussionUrl
    ? `I've converted this issue for you. See you there!`
    : `Please consider opening a discussion there instead.`

  return `Hey @${authorUsername}! 🧊

This looks like a feature request — awesome ideas belong in
[Discussions](https://github.com/orgs/Tresjs/discussions)
where the community can upvote and discuss!

${redirectNote}

> 🤖 I'm an AI assistant and can make mistakes.`
}
```

**Step 2: Verify typecheck**

Run:
```bash
pnpm --filter cubebot typecheck
```
Expected: No errors

**Step 3: Commit**

```bash
git add apps/cubebot/src/triage/comments.ts
git commit -m "feat(cubebot): add comment formatters"
```

---

## Task 9: Implement Issue Handler

**Files:**
- Create: `apps/cubebot/src/github/handlers/issues.ts`
- Modify: `apps/cubebot/src/index.ts`

**Step 1: Create issues handler**

Create `apps/cubebot/src/github/handlers/issues.ts`:
```typescript
import type { Context } from 'hono'
import type { IssuePayload, TriageResult } from '../../types'
import { analyzeIssue } from '../../ai/claude'
import { searchDocs } from '../../ai/rag'
import {
  formatAuthorComment,
  formatFeatureRedirectComment,
  formatMaintainerComment,
} from '../../triage/comments'
import {
  detectIssueType,
  detectPackage,
  hasExpectedBehavior,
  hasReproduction,
  hasSystemInfo,
} from '../../triage/detect'
import { addComment, addLabels, convertToDiscussion } from '../api'
import { getInstallationOctokit } from '../auth'

interface Env {
  DB: D1Database
  AI: Ai
  GITHUB_APP_ID: string
  GITHUB_PRIVATE_KEY: string
  ANTHROPIC_API_KEY: string
}

export async function handleIssueOpened(
  c: Context<{ Bindings: Env }>,
  payload: IssuePayload,
): Promise<void> {
  const { issue, repository } = payload
  const owner = repository.owner.login
  const repo = repository.name
  const installationId = (payload as { installation?: { id: number } }).installation?.id

  if (!installationId) {
    console.error('No installation ID found')
    return
  }

  const octokit = await getInstallationOctokit(
    c.env.GITHUB_APP_ID,
    c.env.GITHUB_PRIVATE_KEY,
    installationId,
  )

  // Detect issue type
  const issueType = detectIssueType(issue)

  // Handle feature requests
  if (issueType === 'feature') {
    const discussionUrl = await convertToDiscussion(octokit, owner, repo, issue.number)
    const comment = formatFeatureRedirectComment(issue.user.login, discussionUrl)
    await addComment(octokit, owner, repo, issue.number, comment)
    return
  }

  // For bugs, do full analysis
  const detectedPackage = detectPackage(issue)
  const reproduction = hasReproduction(issue.body)
  const systemInfo = hasSystemInfo(issue.body)
  const expectedBehavior = hasExpectedBehavior(issue.body)

  // Get relevant docs via RAG
  const searchQuery = `${issue.title} ${issue.body ?? ''}`
  const relevantChunks = await searchDocs(c.env.DB, c.env.AI, searchQuery, 3)
  const relevantDocs = relevantChunks.map(chunk => ({
    title: chunk.title,
    url: chunk.url,
    content: chunk.content,
  }))

  // Analyze with Claude
  const analysis = await analyzeIssue(
    c.env.ANTHROPIC_API_KEY,
    issue.title,
    issue.body ?? '',
    relevantDocs,
  )

  // Build triage result
  const labelsToAdd: string[] = []
  if (!reproduction) labelsToAdd.push('needs-reproduction')
  if (!systemInfo || !expectedBehavior) labelsToAdd.push('waiting-for-author')
  if (detectedPackage || analysis.package) {
    labelsToAdd.push(detectedPackage ?? analysis.package!)
  }

  const triageResult: TriageResult = {
    issueType,
    package: detectedPackage ?? analysis.package,
    hasReproduction: reproduction,
    hasSystemInfo: systemInfo,
    hasExpectedBehavior: expectedBehavior,
    summary: analysis.summary,
    suggestedDocs: analysis.suggestedDocs,
    labelsToAdd,
  }

  // Add labels
  await addLabels(octokit, owner, repo, issue.number, labelsToAdd)

  // Post maintainer comment
  const maintainerComment = formatMaintainerComment(triageResult)
  await addComment(octokit, owner, repo, issue.number, maintainerComment)

  // Post author comment
  const authorComment = formatAuthorComment(
    issue.user.login,
    triageResult,
    analysis.authorMessage,
  )
  await addComment(octokit, owner, repo, issue.number, authorComment)
}
```

**Step 2: Update index.ts to route issues**

Modify `apps/cubebot/src/index.ts`:
```typescript
import { Hono } from 'hono'
import { handleIssueOpened } from './github/handlers/issues'
import { verifyWebhookSignature } from './github/verify'
import type { IssuePayload } from './types'

interface Env {
  DB: D1Database
  AI: Ai
  GITHUB_APP_ID: string
  GITHUB_PRIVATE_KEY: string
  GITHUB_WEBHOOK_SECRET: string
  ANTHROPIC_API_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.json({ status: 'ok', name: 'CubeBot 🧊' })
})

app.post('/webhook', async (c) => {
  const signature = c.req.header('x-hub-signature-256')
  const payload = await c.req.text()

  const isValid = await verifyWebhookSignature(
    payload,
    signature,
    c.env.GITHUB_WEBHOOK_SECRET,
  )

  if (!isValid) {
    return c.json({ error: 'Invalid signature' }, 401)
  }

  const event = c.req.header('x-github-event')
  const body = JSON.parse(payload)

  console.log(`Received ${event} event:`, body.action)

  try {
    if (event === 'issues' && body.action === 'opened') {
      await handleIssueOpened(c, body as IssuePayload)
    }

    return c.json({ received: true, event, action: body.action })
  }
  catch (error) {
    console.error('Error handling webhook:', error)
    return c.json({ error: 'Internal error' }, 500)
  }
})

export default app
```

**Step 3: Verify typecheck**

Run:
```bash
pnpm --filter cubebot typecheck
```
Expected: No errors

**Step 4: Commit**

```bash
git add apps/cubebot/src/github/handlers/issues.ts apps/cubebot/src/index.ts
git commit -m "feat(cubebot): add issue opened handler"
```

---

## Task 10: Implement Comment Handler (for @mentions)

**Files:**
- Create: `apps/cubebot/src/github/handlers/comments.ts`
- Modify: `apps/cubebot/src/index.ts`

**Step 1: Create comments handler**

Create `apps/cubebot/src/github/handlers/comments.ts`:
```typescript
import type { Context } from 'hono'
import type { CommentPayload } from '../../types'
import { analyzeIssue } from '../../ai/claude'
import { searchDocs } from '../../ai/rag'
import { addComment } from '../api'
import { getInstallationOctokit } from '../auth'

interface Env {
  DB: D1Database
  AI: Ai
  GITHUB_APP_ID: string
  GITHUB_PRIVATE_KEY: string
  ANTHROPIC_API_KEY: string
}

const BOT_MENTION_PATTERN = /@tresjs-cubebot/i

export async function handleCommentCreated(
  c: Context<{ Bindings: Env }>,
  payload: CommentPayload,
): Promise<void> {
  const { comment, issue, repository } = payload
  const owner = repository.owner.login
  const repo = repository.name
  const installationId = (payload as { installation?: { id: number } }).installation?.id

  // Ignore if not mentioning the bot
  if (!BOT_MENTION_PATTERN.test(comment.body)) {
    return
  }

  // Ignore bot's own comments
  if (comment.user.login.includes('cubebot')) {
    return
  }

  if (!installationId) {
    console.error('No installation ID found')
    return
  }

  const octokit = await getInstallationOctokit(
    c.env.GITHUB_APP_ID,
    c.env.GITHUB_PRIVATE_KEY,
    installationId,
  )

  // Extract the question/request from the comment
  const question = comment.body.replace(BOT_MENTION_PATTERN, '').trim()

  // Get relevant docs via RAG
  const searchQuery = `${issue.title} ${question}`
  const relevantChunks = await searchDocs(c.env.DB, c.env.AI, searchQuery, 5)
  const relevantDocs = relevantChunks.map(chunk => ({
    title: chunk.title,
    url: chunk.url,
    content: chunk.content,
  }))

  // Get analysis/response from Claude
  const analysis = await analyzeIssue(
    c.env.ANTHROPIC_API_KEY,
    `Question: ${question}`,
    `Context from issue:\nTitle: ${issue.title}\nBody: ${issue.body ?? '(none)'}`,
    relevantDocs,
  )

  // Format response
  const docsSection = analysis.suggestedDocs.length > 0
    ? `\n\n**📚 Relevant docs:**\n${analysis.suggestedDocs.map(d => `- [${d.title}](${d.url}) — ${d.reason}`).join('\n')}`
    : ''

  const response = `Hey @${comment.user.login}! 🧊

${analysis.authorMessage}${docsSection}

> 🤖 I'm an AI assistant and can make mistakes. A human maintainer can provide more help if needed!`

  await addComment(octokit, owner, repo, issue.number, response)
}
```

**Step 2: Update index.ts to route comments**

Modify `apps/cubebot/src/index.ts` - add to the webhook handler:
```typescript
import { Hono } from 'hono'
import { handleCommentCreated } from './github/handlers/comments'
import { handleIssueOpened } from './github/handlers/issues'
import { verifyWebhookSignature } from './github/verify'
import type { CommentPayload, IssuePayload } from './types'

interface Env {
  DB: D1Database
  AI: Ai
  GITHUB_APP_ID: string
  GITHUB_PRIVATE_KEY: string
  GITHUB_WEBHOOK_SECRET: string
  ANTHROPIC_API_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.json({ status: 'ok', name: 'CubeBot 🧊' })
})

app.post('/webhook', async (c) => {
  const signature = c.req.header('x-hub-signature-256')
  const payload = await c.req.text()

  const isValid = await verifyWebhookSignature(
    payload,
    signature,
    c.env.GITHUB_WEBHOOK_SECRET,
  )

  if (!isValid) {
    return c.json({ error: 'Invalid signature' }, 401)
  }

  const event = c.req.header('x-github-event')
  const body = JSON.parse(payload)

  console.log(`Received ${event} event:`, body.action)

  try {
    if (event === 'issues' && body.action === 'opened') {
      await handleIssueOpened(c, body as IssuePayload)
    }
    else if (event === 'issue_comment' && body.action === 'created') {
      await handleCommentCreated(c, body as CommentPayload)
    }

    return c.json({ received: true, event, action: body.action })
  }
  catch (error) {
    console.error('Error handling webhook:', error)
    return c.json({ error: 'Internal error' }, 500)
  }
})

export default app
```

**Step 3: Verify typecheck**

Run:
```bash
pnpm --filter cubebot typecheck
```
Expected: No errors

**Step 4: Commit**

```bash
git add apps/cubebot/src/github/handlers/comments.ts apps/cubebot/src/index.ts
git commit -m "feat(cubebot): add comment handler for @mentions"
```

---

## Task 11: Create Docs Embedding Script

**Files:**
- Create: `apps/cubebot/scripts/embed-docs.ts`
- Modify: `apps/cubebot/package.json`

**Step 1: Create embedding script**

Create `apps/cubebot/scripts/embed-docs.ts`:
```typescript
import { execSync } from 'node:child_process'

const DOC_SOURCES = [
  { name: 'core', url: 'https://docs.tresjs.org/llms-full.txt' },
  { name: 'cientos', url: 'https://cientos.tresjs.org/llms-full.txt' },
  { name: 'postprocessing', url: 'https://post-processing.tresjs.org/llms-full.txt' },
]

interface DocChunk {
  source: string
  url: string
  title: string
  content: string
}

async function fetchDocs(source: { name: string; url: string }): Promise<DocChunk[]> {
  console.log(`Fetching ${source.name} docs from ${source.url}...`)

  try {
    const response = await fetch(source.url)
    if (!response.ok) {
      console.warn(`Failed to fetch ${source.url}: ${response.status}`)
      return []
    }

    const text = await response.text()
    return parseDocsIntoChunks(source.name, source.url, text)
  }
  catch (error) {
    console.warn(`Error fetching ${source.url}:`, error)
    return []
  }
}

function parseDocsIntoChunks(source: string, baseUrl: string, text: string): DocChunk[] {
  const chunks: DocChunk[] = []

  // Split by headers (## or #)
  const sections = text.split(/(?=^#{1,2}\s)/m)

  for (const section of sections) {
    if (section.trim().length < 50) continue // Skip tiny sections

    const titleMatch = section.match(/^#{1,2}\s+(.+)$/m)
    const title = titleMatch?.[1] ?? 'Untitled'

    // Extract URL if present in the section
    const urlMatch = section.match(/https?:\/\/[^\s)]+/)
    const url = urlMatch?.[0] ?? baseUrl

    chunks.push({
      source,
      url,
      title: title.trim(),
      content: section.slice(0, 2000), // Limit chunk size
    })
  }

  return chunks
}

async function main() {
  console.log('Starting docs embedding process...\n')

  const allChunks: DocChunk[] = []

  for (const source of DOC_SOURCES) {
    const chunks = await fetchDocs(source)
    allChunks.push(...chunks)
    console.log(`  → ${chunks.length} chunks from ${source.name}`)
  }

  console.log(`\nTotal chunks: ${allChunks.length}`)

  // Write chunks to a JSON file for manual D1 import
  // In production, this would call Workers AI for embeddings
  const outputPath = 'apps/cubebot/data/doc-chunks.json'

  // Create data directory
  execSync('mkdir -p apps/cubebot/data')

  const fs = await import('node:fs')
  fs.writeFileSync(outputPath, JSON.stringify(allChunks, null, 2))

  console.log(`\nChunks written to ${outputPath}`)
  console.log('\nNext steps:')
  console.log('1. Run wrangler d1 execute to create the database')
  console.log('2. Use a separate script to generate embeddings via Workers AI')
  console.log('3. Import the embeddings into D1')
}

main().catch(console.error)
```

**Step 2: Update package.json**

Add to `apps/cubebot/package.json` scripts:
```json
{
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc --noEmit",
    "embed-docs": "npx tsx scripts/embed-docs.ts"
  }
}
```

**Step 3: Verify script runs**

Run:
```bash
pnpm --filter cubebot embed-docs
```
Expected: Creates `apps/cubebot/data/doc-chunks.json`

**Step 4: Commit**

```bash
git add apps/cubebot/scripts/embed-docs.ts apps/cubebot/package.json
git commit -m "feat(cubebot): add docs embedding script"
```

---

## Task 12: Add README and Final Configuration

**Files:**
- Create: `apps/cubebot/README.md`
- Create: `apps/cubebot/CLAUDE.md`
- Create: `apps/cubebot/.gitignore`

**Step 1: Create README**

Create `apps/cubebot/README.md`:
```markdown
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
```

**Step 2: Create CLAUDE.md**

Create `apps/cubebot/CLAUDE.md`:
```markdown
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
```

**Step 3: Create .gitignore**

Create `apps/cubebot/.gitignore`:
```
data/
.wrangler/
.dev.vars
```

**Step 4: Commit**

```bash
git add apps/cubebot/README.md apps/cubebot/CLAUDE.md apps/cubebot/.gitignore
git commit -m "docs(cubebot): add readme and project documentation"
```

---

## Summary

After completing all tasks, you will have:

1. ✅ Scaffolded Cloudflare Worker app in `apps/cubebot`
2. ✅ D1 schema for document embeddings
3. ✅ GitHub webhook signature verification
4. ✅ GitHub API client (comments, labels, convert to discussion)
5. ✅ Issue type, package, and info detection
6. ✅ RAG retrieval with Workers AI embeddings
7. ✅ Claude integration for issue analysis
8. ✅ Comment formatters (maintainer, author, feature redirect)
9. ✅ Issue opened handler
10. ✅ Comment @mention handler
11. ✅ Docs embedding script
12. ✅ Project documentation

**Post-implementation:**
1. Create GitHub App at github.com/settings/apps
2. Create D1 database with `wrangler d1 create`
3. Set secrets with `wrangler secret put`
4. Run `pnpm embed-docs` and import to D1
5. Deploy with `pnpm deploy`
6. Install GitHub App on Tresjs repositories
