// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    ignores: ['**/*.md'],
    rules: {
      '@stylistic/comma-dangle': ['off', 'always-multiline'],
    },
  },
)
