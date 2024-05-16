import { tresLintConfig } from './src/index'

export default tresLintConfig({
  files: ['**/*.vue'],
  rules: {
    'vue/attribute-hyphenation': 'off' // To allow camelCase attributes in cases that require, like material-uniforms, shadowMapSizes, etc.
  },
})
