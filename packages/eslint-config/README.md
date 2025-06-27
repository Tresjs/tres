<picture><img src=".github/repo-banner.png" /></picture>

<div align="center">

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![code style][antfu-src]][antfu-href]

---

</div>

> Opinionated but flexible ESlint config, based on `@antfu/eslint-config` with TresJS preferences. Also includes optional rulesets for Nuxt.

[Release Notes](/CHANGELOG.md)

## Features

This is my personal ESlint configuration, based on the excellent [`@antfu/eslint-config`](https://github.com/antfu/eslint-config). It only deviates for some minor tweaks and personal preferences, since I agree almost completely with Anthony's style choices.

My config also adds some additional and optional rulesets for Nuxt.

Some of the main features, inherited directly from `@antfu/eslint-config`:

- Single quotes, no semi
- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one line of config
- Designed to work with TypeScript, JSX, Vue out-of-box
- Lints also for json, yaml, toml, markdown
- Opinionated, but [very customizable](#customization)
- [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new), compose easily!
- Using [ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)
- Respects `.gitignore` by default
- Optional [React](#react), [Svelte](#svelte), [UnoCSS](#unocss), [Astro](#astro) support
- Optional [formatters](#formatters) support for CSS, HTML, etc.
- **Style principle**: Minimal for reading, stable for diff, consistent

My own customizations and preferences:

- (Vue) Set maximum allowed attributes per line on HTML elements (`10` for singleline, `1` for multiline)
- (General) Force use of curly braces on control statements
- (General) Disable `antfu/top-level-function` to allow arrow syntax on top level functions
- (Nuxt - *Optional*) Set some specific Nuxt rules if not already covered by Antfu's config (sourced from `@nuxt/eslint-config`)
- ... and some other minor tweaks

## 🛠️ Setup

### Installation

```bash
pnpm i -D eslint @tresjs/eslint-config
```

### Configuration

With [`"type": "module"`](https://nodejs.org/api/packages.html#type) in `package.json` (recommended):

#### Basic use

Using the default config without arguments uses the following `@antfu/eslint-config` options as defaults:

- autodetects Vue
- autodetects Typescript
- enables ESlint Stylistic

```js
// eslint.config.js
import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig()
```

#### Setting options and using custom rules

It is possible to add custom rules with the following configuration.

- The first item must contain options to be passed to `@antfu/eslint-config` (read more on [its docs](https://github.com/antfu/eslint-config) for possible options). **It must always be present even if left empty.**
- From the second item going on, you can add as many custom ESlint flat config objects as you need.

```js
// eslint.config.js
import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig(
  // @antfu/eslint-config options, must be the first argument
  {
    stylistic: false,
  },
  // Addtionals flat configs start from here
  {
    rules: {
      curly: 'off',
    },
  },
)
```

##### Using optional Nuxt

This package also provides optional configuration for Nuxt. To use it, simply add the `nuxt` config to the list of configs.

```js
// eslint.config.js
import { nuxt, tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig(
  {}, // @antfu/eslint-config options, must always be present as first item even if empty
  nuxt,
  {
    // ESlint Flat config rule object
  },
)
```

## 📝 VS Code Support

If you use VS Code, you should manually enable support for ESLint flat config.

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
  // Enable the ESLint flat config support
  "eslint.experimental.useFlatConfig": true
}
```

For more settings, check the "VS Code support" section in [antfu/eslint-config](https://github.com/antfu/eslint-config#vs-code-support-auto-fix)

## 📝 License

[MIT](https://github.com/tresjs/eslint-config/blob/main/LICENSE)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@tresjs/eslint-config/latest.svg?style=flat&colorA=18181B&colorB=88E5C3
[npm-version-href]: https://npmjs.com/package/@tresjs/eslint-config

[npm-downloads-src]: https://img.shields.io/npm/dm/@tresjs/eslint-config.svg?style=flat&colorA=18181B&colorB=88E5C3
[npm-downloads-href]: https://npmjs.com/package/@tresjs/eslint-config

[code-quality-src]: https://img.shields.io/codacy/grade/2089b728f6904916aff7a595c4197b09.svg?style=flat&colorA=18181B&colorB=88E5C3
[code-quality-href]: https://app.codacy.com/gh/tresjs/eslint-config

[bundle-size-src]: https://img.shields.io/bundlephobia/minzip/@tresjs/eslint-config.svg?style=flat&colorA=18181B&colorB=88E5C3
[bundle-size-href]: https://bundlephobia.com/result?p=@tresjs/eslint-config

[license-src]: https://img.shields.io/npm/l/@tresjs/eslint-config.svg?style=flat&colorA=18181B&colorB=88E5C3
[license-href]: https://npmjs.com/package/@tresjs/eslint-config

[antfu-src]: https://antfu.me/badge-code-style.svg
[antfu-href]: https://github.com/antfu/eslint-config
