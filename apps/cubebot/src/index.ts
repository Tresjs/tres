import { Hono } from 'hono'
import { handleSeedDocs } from './admin/seed-docs'
import { handleCommentCreated } from './github/handlers/comments'
import { handleIssueOpened } from './github/handlers/issues'
import { verifyWebhookSignature } from './github/verify'
import type { Env } from './env'
import type { CommentPayload, IssuePayload } from './types'

const app = new Hono<{ Bindings: Env }>()

app.get('/', (c) => {
  return c.json({ status: 'ok', name: 'CubeBot 🧊' })
})

// Admin endpoint to seed documentation embeddings
app.post('/admin/seed-docs', handleSeedDocs)

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
    // Return 200, not 500: GitHub retries webhook deliveries on 5xx, but the
    // handler may have already posted comments or added labels before failing.
    // A retry would duplicate those side effects, so we acknowledge and log.
    console.error('Error handling webhook:', error)
    return c.json({ received: true, error: 'Internal error' }, 200)
  }
})

export default app
