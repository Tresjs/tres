import Anthropic from '@anthropic-ai/sdk'
import {
  buildAnalysisPrompt,
  buildFeasibilityPrompt,
  FEASIBILITY_SYSTEM_PROMPT,
  SYSTEM_PROMPT,
} from './prompts'

interface AnalysisResponse {
  summary: string
  package: string | null
  suggestedDocs: Array<{ title: string, url: string, reason: string }>
  missingInfo: string[]
  authorMessage: string
  greeting: string
  joke: string
}

interface FeasibilityResponse {
  analysis: string
  suggestedDocs: Array<{ title: string, url: string, reason: string }>
}

export async function analyzeIssue(
  apiKey: string,
  issueTitle: string,
  issueBody: string,
  relevantDocs: Array<{ title: string, url: string, content: string }>,
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

export async function analyzeFeasibility(
  apiKey: string,
  question: string,
  issueTitle: string,
  issueBody: string,
  relevantDocs: Array<{ title: string, url: string, content: string }>,
  codeFiles: Array<{ path: string, content: string }>,
): Promise<FeasibilityResponse> {
  const client = new Anthropic({ apiKey })

  // Build code context
  const codeContext = codeFiles.length > 0
    ? `\n\nRelevant source code from the TresJS monorepo:\n${codeFiles.map(f => `--- ${f.path} ---\n\`\`\`typescript\n${f.content}\n\`\`\``).join('\n\n')}`
    : ''

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    system: FEASIBILITY_SYSTEM_PROMPT + codeContext,
    messages: [
      {
        role: 'user',
        content: buildFeasibilityPrompt(question, issueTitle, issueBody, relevantDocs),
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Unexpected response type')
  }

  let jsonStr = content.text
  const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (jsonMatch) {
    jsonStr = jsonMatch[1]
  }

  return JSON.parse(jsonStr.trim()) as FeasibilityResponse
}
