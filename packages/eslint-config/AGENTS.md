# @tresjs/eslint-config

Opinionated ESLint configuration based on `@antfu/eslint-config` with TresJS-specific preferences.

## Key Customizations

Built on top of `@antfu/eslint-config` with these modifications:

### Vue-specific
- Max attributes per line: `10` for single-line, `1` for multi-line elements

### General
- Forces curly braces on control statements
- Disables `antfu/top-level-function` (allows arrow functions at top level)

### Optional Nuxt ruleset
- Additional Nuxt-specific rules when enabled (sourced from `@nuxt/eslint-config`)

## Usage

```js
// eslint.config.js
import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig()
```

### With Nuxt rules

```js
import { nuxt, tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig(
  {}, // @antfu/eslint-config options
  nuxt,
)
```

## Structure

- **[src/index.ts](src/index.ts)**: Main config export
- **[src/rules/](src/rules/)**: Custom rule definitions
