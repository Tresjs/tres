<script setup lang="ts">
interface GitHubURLInfo {
  type: 'permalink' | 'issue' | 'pr' | 'repo' | 'unknown'
  owner: string
  repo: string
  path?: string
  lines?: string
  number?: string
  title?: string
}

const props = defineProps<{
  href: string
  target: string
}>()

// Parse GitHub URL to determine type and extract information
const parseGitHubURL = (url: string): GitHubURLInfo => {
  try {
    const urlObj = new URL(url)
    if (urlObj.hostname !== 'github.com') {
      return { type: 'unknown', owner: '', repo: '' }
    }
    const pathParts = urlObj.pathname.split('/').filter(Boolean)
    // Repo root: https://github.com/owner/repo
    if (pathParts.length === 2) {
      return { type: 'repo', owner: pathParts[0] || '', repo: pathParts[1] || '' }
    }
    if (pathParts.length < 2) {
      return { type: 'unknown', owner: '', repo: '' }
    }
    const owner = pathParts[0] || ''
    const repo = pathParts[1] || ''
    // Check for issue URL
    if (pathParts[2] === 'issues' && pathParts[3]) {
      return {
        type: 'issue',
        owner,
        repo,
        number: pathParts[3]!,
      }
    }
    // Check for PR URL
    if (pathParts[2] === 'pull' && pathParts[3]) {
      return {
        type: 'pr',
        owner,
        repo,
        number: pathParts[3]!,
      }
    }
    // Check for permalink URL (blob/commit/tree)
    if (pathParts[2] === 'blob' && pathParts.length > 4) {
      const filePath = pathParts.slice(4).join('/')
      const hashLines = urlObj.hash ? urlObj.hash.substring(1) : ''
      return {
        type: 'permalink',
        owner,
        repo,
        path: filePath,
        lines: hashLines || undefined,
      }
    }
    return { type: 'unknown', owner, repo }
  }
  catch {
    return { type: 'unknown', owner: '', repo: '' }
  }
}

// Fetch issue or PR title from GitHub API
const fetchGitHubTitle = async (owner: string, repo: string, type: 'issue' | 'pr', number: string): Promise<string> => {
  try {
    const endpoint = type === 'issue' ? 'issues' : 'pulls'
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/${endpoint}/${number}`)
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    const data = await response.json()
    return data.title || `${type === 'issue' ? 'Issue' : 'PR'} #${number}`
  }
  catch (error) {
    console.warn('Failed to fetch GitHub title:', error)
    return `${type === 'issue' ? 'Issue' : 'PR'} #${number}`
  }
}

// Parse URL and get display information
const urlInfo = computed(() => parseGitHubURL(props.href))

// Reactive title for issues and PRs
const displayTitle = ref<string>('')
const suffix = ref<string>('')
const icon = ref<string>('i-simple-icons-github')

// Watch for URL changes and update display information
watch(urlInfo, async (info) => {
  if (info.type === 'permalink') {
    displayTitle.value = `${info.repo}/${info.path}`
    suffix.value = info.lines ? `#${info.lines}` : ''
  }
  else if (info.type === 'repo') {
    displayTitle.value = `${info.owner}/${info.repo}`
    suffix.value = ''
  }
  else if (info.type === 'issue' || info.type === 'pr') {
    suffix.value = `#${info.number}`
    displayTitle.value = await fetchGitHubTitle(info.owner, info.repo, info.type, info.number!)
    icon.value = info.type === 'issue' ? 'octicon:issue-opened-16' : 'octicon:git-pull-request-16'
  }
  else {
    displayTitle.value = props.href
    suffix.value = ''
  }
}, { immediate: true })
</script>

<template>
  <a
    :href="props.href"
    :target="props.target"
    class="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-md text-xs text-muted no-underline transition-colors"
  >
    <span class="flex items-center gap-1 px-1 py-0.5">
      <UIcon :name="icon" />
      {{ displayTitle }}
    </span>
    <span
      v-if="suffix"
      class="bg-gray-300 px-1 py-0.5 rounded-r-md"
    >
      {{ suffix }}
    </span>
  </a>
</template>
