import { defineConfig } from 'vite-plus'

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    options: { typeAware: true, typeCheck: true },
    ignorePatterns: ['**/auto-imports.d.ts', '**/components.d.ts'],
  },
  fmt: {
    singleQuote: true,
    semi: false,
  },
})
