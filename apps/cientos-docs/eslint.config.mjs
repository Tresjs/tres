import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig(
  {
    ignores: ['.data/**', 'CLAUDE.md'],
  },
  {
    // MDC slot directives (`#title`) have no space after `#`; these rules would
    // "fix" them into `# title` headings and break the slots. See #1437.
    files: ['content/**/*.md'],
    rules: {
      'markdown/no-missing-atx-heading-space': 'off',
      'markdown/no-multiple-h1': 'off',
    },
  },
)
