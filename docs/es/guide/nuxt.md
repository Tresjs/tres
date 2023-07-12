# Modulo de Nuxt `@tresjs/nuxt`

![TresJs Nuxt Module](/nuxt-stones.png)

<a href="https://www.npmjs.com/package/@tresjs/nuxt"><img src="https://img.shields.io/npm/v/@tresjs/nuxt/latest?color=%2382DBCA" alt="npm package"></a>

El modulo oficial de TresJs para Nuxt ¡ha llegado! 🎉.

Visita el repositorio [aquí](https://github.com/Tresjs/nuxt)

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

## Beneficios

- 🤓 Los componentes y composables son auto-importados
- `TresCanvas` trabaja solo del lado del cliente, no necesitas agregar manualmente `.client` al nombre del componente o `<ClientOnly />`
- Configuración del compilador de vue Automática, para los componentes de Tresjs, puedes aprender mas sobre este tema [aquí](/guide/troubleshooting.html#failed-resolve-component-trescomponent-%F0%9F%A4%94)
- Toda la experiencia para el desarrollador que viene con Nuxt ✨

## Así se usa

Añade `@tresjs/nuxt` a la sección de módulos `modules` de `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ['@tresjs/nuxt'],
})
```

Y ¡eso es todo! ✨ ahora puedes disfrutar de los beneficios de `@tresjs/nuxt` en tu aplicación de nuxt

Si quieres usar cualquier paquete del ecosistema de Tresjs, y solo asi ya puedes disfrutar de la funcionalidad de auto-importación de los módulos 🧙🏼‍♂️.

| Paquete                                                      | Version                                                                                                            |
| ------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- |
| [Cientos](https://github.com/Tresjs/cientos)                 | ![cientos version](https://img.shields.io/npm/v/@tresjs/cientos/latest.svg?label=%20&color=%23f19b00)              |
| [Post-processing](https://github.com/Tresjs/post-processing) | ![post-processing version](https://img.shields.io/npm/v/@tresjs/post-processing/latest.svg?label=%20&color=ff69b4) |

```bash
# Using pnpm
pnpm add @tresjs/cientos @tresjs/post-processing
```
