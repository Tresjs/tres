import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({
  ignores: ['**/node_modules/**', 'dist', 'README.md'],
})
