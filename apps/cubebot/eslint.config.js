import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig(
  {
    ignores: ['**/*.md'],
  },
  {
    // Cloudflare Worker: console is the primary observability channel
    // (observability.logs is enabled in wrangler.toml)
    rules: {
      'no-console': 'off',
    },
  },
)
