import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig(
  {
    // public/fonts holds generated font atlases with intentional irregular whitespace
    ignores: ['**/*.md', '.nuxt/**', '.output/**', 'dist/**', 'public/fonts/**'],
  },
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
