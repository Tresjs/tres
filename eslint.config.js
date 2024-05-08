import { nuxt, tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({}, nuxt, {
  rules: {
    'style/max-statements-per-line': 'off',
  },
})
