const baseConfig = [
  // General Rules
  {
    name: 'tres:general',
    rules: {
      'curly': ['error', 'all'],
      'style/function-call-spacing': ['error', 'never'],
      'node/prefer-global/process': 'off',
      'antfu/top-level-function': 'off',
      'perfectionist/sort-imports': 'off',
      'style/max-statements-per-line': 'off',
      'jsdoc/check-alignment': 'off',
    },
  },

  // Vue Rules
  {
    name: 'tres:vue',
    files: ['**/*.vue'],
    rules: {
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 10 },
        multiline: { max: 1 },
      }],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': ['warn', {
        html: {
          void: 'always',
          normal: 'never',
        },
      }],
      'vue/attribute-hyphenation': 'off',
      'vue/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: false,
      }],
    },
  },
]

export default baseConfig
