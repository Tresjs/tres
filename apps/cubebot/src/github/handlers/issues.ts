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
import { addComment, addLabels, closeIssueAsFeatureRequest, isOrgMember } from '../api'
import { getInstallationOctokit } from '../auth'

interface Env {
  DB: D1Database
  AI: Ai
  GITHUB_APP_ID: string
  GITHUB_PRIVATE_KEY: string
  GITHUB_WEBHOOK_SECRET: string
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

  // Check if author is TresJS org member before any action
  const authorIsOrgMember = await isOrgMember(octokit, issue.user.login)

  // Detect issue type
  const issueType = detectIssueType(issue)

  // Handle feature requests - close and redirect to discussions (skip for org members)
  if (issueType === 'feature' && !authorIsOrgMember) {
    const discussionUrl = `https://github.com/${owner}/${repo}/discussions/new?category=ideas`
    const comment = formatFeatureRedirectComment(issue.user.login, discussionUrl)
    await addComment(octokit, owner, repo, issue.number, comment)
    await closeIssueAsFeatureRequest(octokit, owner, repo, issue.number)
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
  // Skip needs reproduction label for org members
  if (!reproduction && !authorIsOrgMember) labelsToAdd.push('needs reproduction')
  if (!systemInfo || !expectedBehavior) labelsToAdd.push('waiting for author')
  const pkgLabel = detectedPackage ?? analysis.package
  if (pkgLabel && pkgLabel !== 'null') {
    labelsToAdd.push(pkgLabel)
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

  // Post author comment (skip reproduction request for org members)
  const authorComment = formatAuthorComment(
    issue.user.login,
    triageResult,
    analysis.authorMessage,
    authorIsOrgMember,
    analysis.greeting,
    analysis.joke,
  )
  await addComment(octokit, owner, repo, issue.number, authorComment)
}
