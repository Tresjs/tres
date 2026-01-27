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
