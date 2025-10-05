// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // Your custom configs here
  {
    rules: {
      'vue/attribute-hyphenation': 'off',
      'vue/first-attribute-linebreak': 'off',
    },
  },
)
