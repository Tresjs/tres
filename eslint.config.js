import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({
  ignores: ['**/node_modules/**', 'public', 'README.md', 'docs/blog'],
}, {
  rules: {
    'style/max-statements-per-line': 'off',
    'jsdoc/check-alignment': 'off',
  },
})
