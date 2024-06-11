import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({
  ignores: ['dist', 'node_modules', 'public', '.github', 'docs/blog'],
}, {
  rules: {
    'style/max-statements-per-line': 'off',
    'jsdoc/check-alignment': 'off',
  },
})
