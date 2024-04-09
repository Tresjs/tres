import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({
  ignores: ['playground', 'docs', 'dist', 'node_modules', 'public'],
})
