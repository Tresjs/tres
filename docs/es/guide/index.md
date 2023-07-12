# Introduction

<ClientOnly>
    <FirstScene style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;"/>
</ClientOnly>

Esta es la documentación para la `v2.0.0` en adelante de Tresjs. Si estas buscando la documentación para la version 1, revisa acá [V1 TresJs](https://v1.tresjs.org/).

::: code-group

```bash [npm]
npm install three @tresjs/core
```

```bash [yarn]
yarn add three @tresjs/core
```

```bash [pnpm]
pnpm add three @tresjs/core
```

:::

## Typescript

TresJs esta escrito en Typescript. Si estas usando Typescript, tendrás muchos beneficios para los tipados. Asegúrate de instalar los tipados para Threejs

::: code-group

```bash [npm]
npm install @types/three -D
```

```bash [yarn]
yarn add @types/three -D
```

```bash [pnpm]
pnpm add @types/three -D
```

:::

## Vite

Si estas usando Vite, tendrás que añadir la siguiente configuración en `vite.config.ts`:

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions
    }),
  ],
}),
```

Esto es necesario para hacer que el compilador funcione con el custom renderer y no arroje advertencias en la consola. para mas información revisa [acá](/guide/troubleshooting.html).

## Prueba Tresjs online

Contamos con un template oficial en [StackBlitz](https://stackblitz.com/):

![](/stackblitz-starter.png)

<StackBlitzEmbed projectId="tresjs-basic" />

## Playground

Ademas puedes revisar ejemplos de las utilidades, y "como hacer" en nuestro playground. mas info [aquí](https://playground.tresjs.org/).

![](/public/playground.png)

## Motivation

[TresJs](https://threejs.org/) es una maravillosa librería que potencia la creación de sitios web en 3D usando **WebGL**. Se actualiza constantemente, un desafío para los mantenedores de [TroisJS](https://troisjs.github.io/)

EL ecosistema de React tiene una impresionante librería llamada [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) que permite construir escenas declarativas, de manera reusable, que reaccionan a tu estado.

En my búsqueda de algo similar en el ecosistema de VueJs, encontré una librería sorprendente llamada [Lunchbox](https://github.com/breakfast-studio/lunchboxjs) la cual funciona bajo el mismo concepto de R3F, posee un [custom Vue3 Renderer](https://vuejs.org/api/custom-renderer.html). También soy un contribuidor de esta librería.

El único problema es mezclar diferentes renderers en Vue 3 es algo que la comunidad de Vue aún esta trabajando. Puedes visitar [here](https://github.com/vuejs/vue-loader/pull/1645) para mas información.

```ts
// Example Vite setup
import { createApp } from 'vue'
import { createApp as createLunchboxApp } from 'lunchboxjs'
import App from './App.vue'
import LunchboxApp from './LunchboxApp.vue'

// html app
const app = createApp(App)
app.mount('#app')

// lunchbox app
const lunchboxApp = createLunchboxApp(LunchboxApp)
// assuming there's an element with ID `lunchbox` in your HTML app
lunchboxApp.mount('#lunchbox')
```

Asi que inspirado por ambas librerías, empecé ~~algo que no necesite un **custom renderer** pero lo suficientemente inteligente como para generar componentes de Vue basados en los constructores de ThreeJs con 0 o nada necesidad de mantenimiento.~~

Aunque la v1 fue una solución decente, tenia algunas limitaciones que solo pueden ser solventadas creando un **custom renderer** de manera apropiada. Después de muchas pruebas de concepto, decidimos crear una nueva versión de TresJs que esta basada en un custom renderer, sin afectar de manera significativa al usuario

Para aprender mas acerca de como migrar de la v1 revisa nuestra [guía](/guide/migration-guide.html).

Eso es **TresJs**.
