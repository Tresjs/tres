import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({
  ignores: ['**/node_modules/**', 'public', 'README.md', 'docs/blog'],
}, {
  rules: {
    'style/max-statements-per-line': 'off',
    // TODO: temporary fix for Error while loading rule 'jsonc/no-useless-escape': Cannot read properties of undefined (reading 'allowRegexCharacters')
    'jsonc/no-useless-escape': 'off',
  },
})
