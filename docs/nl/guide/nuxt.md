# Nuxt module `@tresjs/nuxt`

![TresJS Nuxt Module](/nuxt-stones.png)

<a href="https://www.npmjs.com/package/@tresjs/nuxt"><img src="https://img.shields.io/npm/v/@tresjs/nuxt/latest?color=%2382DBCA" alt="npm package"></a>

Een officiele Nuxt module voor TresJS is hier 🎉.

Repository is [hier](https://github.com/Tresjs/nuxt)

## Installatie

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

## Functionaliteiten

- 🤓 Auto-import componenten and composables van het [TresJS ecosystem](https://github.com/orgs/Tresjs/repositories)
- `TresCanvas` client only, je hoeft niet `.client` toe te voegen aan de component naam of `<ClientOnly />`
- Configureert automatisch de vue compiler om TresJS componenten te ondersteunen, zie [waarom](/nl/guide/troubleshooting)
- Alle DX Magie die komt met Nuxt ✨

## Gebruik

 Voeg `@tresjs/nuxt` toe aan de `modules` sectie van `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
})
```

Dat is alles! Je kan nu `@tresjs/nuxt` gebruiken in je Nuxt app ✨

Als u elk ander pakket uit het TresJS-ecosysteem wilt gebruiken, kunt u de pakketten die u wilt gebruiken installeren en deze worden automatisch geïmporteerd door de module 🧙🏼‍♂️.

| Package                     | Versie                                                                                            |
| --------------------------- | :------------------------------------------------------------------------------------------------- |
| [Cientos](https://github.com/Tresjs/cientos) | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00) |
| [Post-processing](https://github.com/Tresjs/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff69b4) |

```bash
# Using pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```
