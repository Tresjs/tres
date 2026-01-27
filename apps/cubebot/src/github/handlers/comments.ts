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
  GITHUB_WEBHOOK_SECRET: string
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
