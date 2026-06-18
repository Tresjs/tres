import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig(
  {
    ignores: ['.data/**', 'CLAUDE.md'],
  },
  {
    // Nuxt UI landing pages use MDC slots (`# title`, `# description`) inside
    // page components, which legitimately produce multiple H1s.
    files: ['content/**/*.md'],
    rules: {
      'markdown/no-multiple-h1': 'off',
    },
  },
)
