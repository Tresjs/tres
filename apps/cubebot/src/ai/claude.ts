import Anthropic from '@anthropic-ai/sdk'
import { buildAnalysisPrompt, SYSTEM_PROMPT } from './prompts'

interface AnalysisResponse {
  summary: string
  package: string | null
  suggestedDocs: Array<{ title: string, url: string, reason: string }>
  missingInfo: string[]
  authorMessage: string
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
