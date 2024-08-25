# Modulo Nuxt `@tresjs/nuxt`

![TresJS Nuxt Module](/nuxt-stones.png)

<a href="https://www.npmjs.com/package/@tresjs/nuxt"><img src="https://img.shields.io/npm/v/@tresjs/nuxt/latest?color=%2382DBCA" alt="npm package"></a>

Il modulo Nuxt ufficiale per TresJS è qui 🎉.

La repository è [qui](https://github.com/Tresjs/nuxt)

## Installazione

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

## Features

- 🤓 Auto-import components e composables dall'[ecosistema TresJS](https://github.com/orgs/Tresjs/repositories)
- `TresCanvas` è client only, non è necessario aggiungere `.client` al nome del compononente o utilizzare `<ClientOnly />`
- Configurazione automatica del compiler di vue per supportare i componenti di TresJS, vedi [perchè](/guide/troubleshooting)
- Tutta la DX che viene con Nuxt ✨

## Usage

Aggiungi `@tresjs/nuxt` alla sezione `modules` del `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["@tresjs/nuxt"],
});
```

E questo è tutto! Ora puoi utilizzare `@tresjs/nuxt` nella tua app ✨

Se si desidera utilizzare qualsiasi pacchetto dell'ecosistema TresJS, è possibile installare i pacchetti desiderati che verranno importati automaticamente dal modulo 🧙🏼‍♂️.

| Package                                                      | Version                                                                                                            |
| ------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- |
| [Cientos](https://github.com/Tresjs/cientos)                 | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00)              |
| [Post-processing](https://github.com/Tresjs/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff69b4) |

```bash
# Usando pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```
