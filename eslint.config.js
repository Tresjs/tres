import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({
  ignores: ['docs', 'dist', 'node_modules', 'public', '.github'],
}, {
  rules: {
    'style/max-statements-per-line': 'off',
  },
})
