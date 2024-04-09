# Nuxt module `@tresjs/nuxt`

![TresJS Nuxt Module](/nuxt-stones.png)

<a href="https://www.npmjs.com/package/@tresjs/nuxt"><img src="https://img.shields.io/npm/v/@tresjs/nuxt/latest?color=%2382DBCA" alt="npm package"></a>

¡Aquí está el módulo oficial de Nuxt para TresJS! 🎉.

El repositorio está [aquí](https://github.com/Tresjs/nuxt)

## Instalación

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

## Características

- 🤓 Importación automática de componentes y composables del [ecosistema de TresJS](https://github.com/orgs/Tresjs/repositories)
- `TresCanvas` esta disponible solo en el cliente, no es necesario agregar `.client` al nombre del componente o `<ClientOnly />`
- Configura automáticamente el compilador de Vue para admitir componentes de TresJS, consulta [por qué](/guide/troubleshooting)
- Toda la magia de DX que viene con Nuxt ✨

## Uso

Agrega `@tresjs/nuxt` a la sección `modules` de `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
})
```

¡Eso es todo! Ahora puedes usar `@tresjs/nuxt` en tu aplicación Nuxt ✨

Si deseas utilizar cualquier paquete del ecosistema de TresJS, puedes instalar los paquetes que desees utilizar y serán importados automáticamente por el módulo 🧙🏼‍♂️.

| Package                     | Version                                                                                            |
| --------------------------- | :------------------------------------------------------------------------------------------------- |
| [Cientos](https://github.com/Tresjs/cientos) | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00) |
| [Post-processing](https://github.com/Tresjs/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff69b4) |

```bash
# Usando pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```
