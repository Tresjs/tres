import type { Octokit } from 'octokit'

function decodeBase64(base64: string): string {
  const binary = atob(base64)
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0))
  return new TextDecoder('utf-8').decode(bytes)
}

const TRESJS_ORG = 'Tresjs'
const TRES_REPO = 'tres'

// Key files per package for feasibility analysis
const PACKAGE_FILES: Record<string, string[]> = {
  core: [
    'packages/core/src/composables/index.ts',
    'packages/core/src/core/nodeOps.ts',
    'packages/core/src/components/TresCanvas.vue',
    'packages/core/src/types/index.ts',
  ],
  cientos: [
    'packages/cientos/src/index.ts',
    'packages/cientos/src/core/index.ts',
  ],
  nuxt: [
    'packages/nuxt/src/module.ts',
  ],
  postprocessing: [
    'packages/postprocessing/src/index.ts',
    'packages/postprocessing/src/core/EffectComposerThree.vue',
  ],
  leches: [
    'packages/leches/src/index.ts',
  ],
}

// General architecture files when package unknown
const GENERAL_FILES = [
  'packages/core/src/composables/index.ts',
  'packages/core/src/types/index.ts',
]

interface CodeFile {
  path: string
  content: string
}

export async function fetchRelevantCode(
  octokit: Octokit,
  detectedPackage: string | null,
  keywords: string[] = [],
): Promise<CodeFile[]> {
  const filePaths = detectedPackage && PACKAGE_FILES[detectedPackage]
    ? PACKAGE_FILES[detectedPackage]
    : GENERAL_FILES

  const files: CodeFile[] = []

  for (const path of filePaths) {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: TRESJS_ORG,
        repo: TRES_REPO,
        path,
        ref: 'main',
      })

      if ('content' in data && data.type === 'file') {
        const content = decodeBase64(data.content)
        // Truncate large files
        files.push({
          path,
          content: content.slice(0, 4000),
        })
      }
    }
    catch (error) {
      console.error(`Failed to fetch ${path}:`, error)
    }
  }

  // If keywords provided, try to find more specific files via search
  if (keywords.length > 0 && files.length < 5) {
    const searchResults = await searchCodeInRepo(octokit, keywords.slice(0, 2))
    for (const result of searchResults.slice(0, 2)) {
      if (!files.some(f => f.path === result.path)) {
        files.push(result)
      }
    }
  }

  return files.slice(0, 6) // Limit total files for context
}

async function searchCodeInRepo(
  octokit: Octokit,
  keywords: string[],
): Promise<CodeFile[]> {
  const files: CodeFile[] = []

  try {
    const query = `${keywords.join(' ')} repo:${TRESJS_ORG}/${TRES_REPO} language:typescript`
    const { data } = await octokit.rest.search.code({
      q: query,
      per_page: 3,
    })

    for (const item of data.items) {
      try {
        const { data: fileData } = await octokit.rest.repos.getContent({
          owner: TRESJS_ORG,
          repo: TRES_REPO,
          path: item.path,
          ref: 'main',
        })

        if ('content' in fileData && fileData.type === 'file') {
          const content = decodeBase64(fileData.content)
          files.push({
            path: item.path,
            content: content.slice(0, 3000),
          })
        }
      }
      catch {
        // Skip files that can't be fetched
      }
    }
  }
  catch (error) {
    console.error('Code search failed:', error)
  }

  return files
}
