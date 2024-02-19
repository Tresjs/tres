# Module Nuxt `@tresjs/nuxt`

![TresJS Nuxt Module](/nuxt-stones.png)

<a href="https://www.npmjs.com/package/@tresjs/nuxt"><img src="https://img.shields.io/npm/v/@tresjs/nuxt/latest?color=%2382DBCA" alt="npm package"></a>

Voici le module Nuxt officiel pour TresJS! 🎉.

Le dépot se trouve [ici](https://github.com/Tresjs/nuxt)

## Installation

::: code-group

```bash [pnpm]
pnpm add three @tresjs/nuxt 
```

```bash [npm]
npm install three @tresjs/nuxt 
```

```bash [yarn]
yarn add three @tresjs/nuxt 
```

:::

## Fonctionnalités

- 🤓 Importation automatique des composants et des composables de [l'écosystème TresJS](https://github.com/orgs/Tresjs/repositories)
- `TresCanvas` est disponible uniquement dans le client, pas besoin d'ajouter `.client` au nom du composant ou `<ClientOnly />`
- Configure automatiquement le compilateur de Vue pour accepter les composants de TresJS, voir [pourquoi?](/guide/troubleshooting.html#failed-resolve-component-trescomponent-%F0%9F%A4%94)?
- Toute la magie de DX qui viens avec Nuxt ✨

## Usage

Ajoutez `@tresjs/nuxt` à la section `modules` de votre `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
})
```

C'est tout! Maintenant vous pouvez utilisez `@tresjs/nuxt` dans votre application Nuxt ✨

Si vous souhaitez utiliser n'importe quel autre paquet de l'écosytème TresJS, installez simplement le paquet et il sera automatiquement importé par le module 🧙🏼‍♂️.

| Package                     | Version                                                                                            |
| --------------------------- | :------------------------------------------------------------------------------------------------- |
| [Cientos](https://github.com/Tresjs/cientos) | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00) |
| [Post-processing](https://github.com/Tresjs/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff69b4) |

```bash
# Avec pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```