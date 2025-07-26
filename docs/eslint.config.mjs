import { tresLintConfig } from '@tresjs/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default tresLintConfig(withNuxt({}))
