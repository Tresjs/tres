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
  {
    // TSL (Three.js Shading Language) node proxies have no clean public types,
    // so `any` on Fn() params is idiomatic.
    files: ['**/tsl/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
