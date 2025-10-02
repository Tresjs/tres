import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({
  rules: {
    // TODO: temporary fix for Error while loading rule 'jsonc/no-useless-escape': Cannot read properties of undefined (reading 'allowRegexCharacters')
    'jsonc/no-useless-escape': 'off',
  },
})
