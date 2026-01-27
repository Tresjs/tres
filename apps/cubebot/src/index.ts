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
