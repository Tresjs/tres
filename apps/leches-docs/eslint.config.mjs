import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig(
  {
    ignores: ['.data/**', 'CLAUDE.md'],
  },
  {
    // MDC slot directives (`#title`) have no space after `#`; formatting them
    // as headings breaks the slots.
    files: ['content/**/*.md'],
    rules: {
      'markdown/no-missing-atx-heading-space': 'off',
      'markdown/no-multiple-h1': 'off',
    },
  },
)
