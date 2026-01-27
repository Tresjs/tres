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
