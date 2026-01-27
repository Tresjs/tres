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
