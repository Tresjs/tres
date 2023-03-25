# Introducción

<ClientOnly>
    <FirstScene style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;"/>
</ClientOnly>

::: code-group

```bash [npm]
npm install three @tresjs/core -D
```

```bash [yarn]
yarn add three @tresjs/core -D
```

```bash [pnpm]
pnpm add three @tresjs/core -D
```

:::

## Prueba sin instalaciones

Puedes hacer fork a este template en [StackBlitz](https://stackblitz.com/edit/tresjs-basic?file=src/App.vue) y jugar con el 😋 sin instalar nada.

<StackBlitzEmbed projectId="tresjs-basic" />

## Motivación

[ThreeJS](https://threejs.org/) es una maravillosa librería que potencia la creación de sitios web en 3D usando **WebGL**. Se actualiza constantemente, un desafío para los mantenedores de [TroisJS](https://troisjs.github.io/)

EL ecosistema de React tiene una impresionante librería llamada [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) que permite construir escenas declarativas, de manera reusable, que reaccionan a tu estado.

En mi búsqueda de algo similar en el ecosistema de VueJs, encontré una librería llamada [Lunchbox](https://github.com/breakfast-studio/lunchboxjs) la cual funciona bajo el mismo concepto de R3F, posee un [custom Vue3 Renderer](https://vuejs.org/api/custom-renderer.html). También soy un contribuidor de esta librería.

El único problema es mezclar diferentes renderers en Vue 3 es algo que la comunidad de Vue aún esta trabajando. Puedes visitar [here](https://github.com/vuejs/vue-loader/pull/1645) para mas información.

Hasta entonces hay una solución similar a [React Reconciliation](https://reactjs.org/docs/reconciliation.html) necesitarías crear 2 `Apps` puede no ser lo ideal

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

Asi que inspirado por ambas librerías, empecé algo que no necesite un **custom renderer** pero lo suficientemente inteligente como para generar componentes de Vue basados en los constructores de ThreeJs con 0 o nada necesidad de mantenimiento.

Eso es **TresJs**.
