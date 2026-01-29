import type { Context } from 'hono'
import type { CommentPayload } from '../../types'
import { analyzeFeasibility } from '../../ai/claude'
import { searchDocs } from '../../ai/rag'
import { detectPackage } from '../../triage/detect'
import { addComment } from '../api'
import { getInstallationOctokit } from '../auth'
import { fetchRelevantCode } from '../code'

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

  // Detect package from issue for targeted code fetch
  const detectedPackage = detectPackage(issue)

  // Extract keywords from question for code search
  const keywords = extractKeywords(question)

  // Fetch relevant code from the monorepo
  const codeFiles = await fetchRelevantCode(octokit, detectedPackage, keywords)

  // Get relevant docs via RAG
  const searchQuery = `${issue.title} ${question}`
  const relevantChunks = await searchDocs(c.env.DB, c.env.AI, searchQuery, 3)
  const relevantDocs = relevantChunks.map(chunk => ({
    title: chunk.title,
    url: chunk.url,
    content: chunk.content,
  }))

  // Get feasibility analysis from Claude with code context
  const analysis = await analyzeFeasibility(
    c.env.ANTHROPIC_API_KEY,
    question,
    issue.title,
    issue.body ?? '',
    relevantDocs,
    codeFiles,
  )

  // Format response
  const docsSection = analysis.suggestedDocs.length > 0
    ? `\n\n**📚 Relevant docs:**\n${analysis.suggestedDocs.map(d => `- [${d.title}](${d.url}) — ${d.reason}`).join('\n')}`
    : ''

  const codeNote = codeFiles.length > 0
    ? `\n\n<details><summary>📂 Code files analyzed</summary>\n\n${codeFiles.map(f => `- \`${f.path}\``).join('\n')}\n</details>`
    : ''

  const response = `🧊 **Analysis**

${analysis.analysis}${docsSection}${codeNote}

> 🤖 I'm an AI assistant and can make mistakes. A human maintainer can provide more help if needed!`

  await addComment(octokit, owner, repo, issue.number, response)
}

function extractKeywords(text: string): string[] {
  // Extract potential code-related keywords
  const words = text.toLowerCase().split(/\s+/)
  const techTerms = words.filter(w =>
    w.length > 3
    && !['what', 'think', 'this', 'that', 'with', 'would', 'could', 'should', 'about', 'have', 'from'].includes(w),
  )
  return [...new Set(techTerms)].slice(0, 5)
}
