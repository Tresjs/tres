import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({
  // typescript is not a dependency here, so autodetection fails when the install does not hoist it
  typescript: true,
  ignores: ['**/*.md'],
})
