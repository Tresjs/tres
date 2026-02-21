<script setup lang="ts">
import { computedAsync } from '@vueuse/core'

interface GitHubURLInfo {
  type: 'permalink' | 'issue' | 'pr' | 'repo' | 'wiki' | 'unknown' // Only declare 'type' once, including 'wiki'
  owner: string
  repo: string
  path?: string
  lines?: string
  number?: string
  title?: string
  page?: string // For wiki page name
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
    // Check for wiki URL
    if (pathParts[2] === 'wiki' && pathParts[3]) {
      // Handles links like https://github.com/owner/repo/wiki/Page-Name
      return {
        type: 'wiki',
        owner,
        repo,
        page: pathParts[3],
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

const displayTitle = computedAsync(async () => {
  if (urlInfo.value.type === 'permalink') {
    return `${urlInfo.value.repo}/${urlInfo.value.path}`
  }
  else if (urlInfo.value.type === 'repo') {
    return `${urlInfo.value.owner}/${urlInfo.value.repo}`
  }
  else if (urlInfo.value.type === 'issue' || urlInfo.value.type === 'pr') {
    return await fetchGitHubTitle(urlInfo.value.owner, urlInfo.value.repo, urlInfo.value.type, urlInfo.value.number!)
  }
  else if (urlInfo.value.type === 'wiki') {
    // For wiki, use the page slug (replace dashes with spaces for readability)
    // Optionally, you could fetch the actual page title from the HTML, but this is a simple fallback
    return urlInfo.value.page ? urlInfo.value.page.replace(/-/g, ' ') : 'Wiki Page'
  }
  else {
    return props.href
  }
})

const suffix = computed(() => {
  if (urlInfo.value.type === 'permalink') {
    return urlInfo.value.lines ? `#${urlInfo.value.lines}` : ''
  }
  else if (urlInfo.value.type === 'issue' || urlInfo.value.type === 'pr') {
    return `#${urlInfo.value.number}`
  }
  else if (urlInfo.value.type === 'wiki') {
    // For wiki links, always show 'wiki' as the suffix
    return 'wiki'
  }
  else {
    return ''
  }
})

const icon = computed(() => {
  if (urlInfo.value.type === 'issue') {
    return 'octicon:issue-opened-16'
  }
  else if (urlInfo.value.type === 'pr') {
    return 'octicon:git-pull-request-16'
  }
  else {
    return 'i-simple-icons-github'
  }
})
</script>

<template>
  <a
    v-if="urlInfo.type !== 'unknown'"
    :href="props.href"
    :target="props.target"
    class="inline-flex translate-y-0.5 items-center gap-1 bg-gray-100 hover:bg-gray-200 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md text-xs text-muted no-underline transition-colors"
  >
    <span class="flex items-center gap-1 px-1 py-0.5">
      <UIcon
        v-if="icon"
        :name="icon"
      />
      {{ displayTitle }}
    </span>
    <span
      v-if="suffix"
      class="bg-gray-300 dark:bg-gray-700 px-1 py-0.5 rounded-r-md"
    >
      {{ suffix }}
    </span>
  </a>
  <NuxtLink
    v-else
    class="text-primary border-b border-transparent hover:border-primary font-medium focus-visible:outline-primary [&>code]:border-dashed hover:[&>code]:border-primary hover:[&>code]:text-primary"
    :href="props.href"
    :target="props.target"
  >
    <slot></slot>
  </NuxtLink>
</template>
