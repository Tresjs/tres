import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({
  ignores: ['dist', 'node_modules', 'public', '.github', 'docs/blog'],
}, {
  rules: {
    'style/max-statements-per-line': 'off',
    'vue/attribute-hyphenation': 'off',
    'jsdoc/check-alignment': 'off',
  },
})
