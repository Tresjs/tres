# Introduccion

<ClientOnly>
    <div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
      <FirstScene />
    </div>
</ClientOnly>

::: code-group

```bash [npm]
npm install @tresjs/core three
```

```bash [yarn]
yarn add @tresjs/core three
```

```bash [pnpm]
pnpm add @tresjs/core three
```

:::

## Typescript

TresJS está escrito en Typescript y está completamente tipado. Si estás utilizando Typescript, obtendrás todos los beneficios de los tipos. Solo asegúrate de instalar los tipos para three.

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

Si estás utilizando Vite, debes agregar lo siguiente a tu `vite.config.ts`:

```ts
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions
    }),
  ],
})
```

Esto es necesario para que el compilador de plantillas funcione con el renderizador personalizado y no lance advertencias en la consola. Para obtener más información, consulta [aquí](/guide/troubleshooting.html).

## Pruébalo en línea

### Playground

Puedes probar TresJS en línea utilizando el [playground](https://play.tresjs.org/) oficial. ¡Échale un vistazo:

<iframe src="https://play.tresjs.org/" class="w-full rounded shadow-lg outline-none border-none aspect-4/3"></iframe>

### StackBlitz

Tenemos un nuevo inicio de [StackBlitz](https://stackblitz.com/) para probar TresJS en línea. ¡Échale un vistazo:

![](/stackblitz-starter.png)

## Laboratorio

También tenemos un laboratorio de ejemplos hechos con TresJS. Échale un vistazo [aquí](https://labs.tresjs.org/).

![](/tresjs-lab.png)

## Motivación

[ThreeJS](https://threejs.org/) es una maravillosa biblioteca para crear increíbles sitios web 3D con WebGL. También es una biblioteca constantemente actualizada que dificulta a los mantenedores de envoltorios como [TroisJS](https://troisjs.github.io/) mantenerse al día con todas las mejoras.

El ecosistema de React tiene una solución impresionante de **renderizado personalizado** llamada [React-three-fiber](https://docs.pmnd.rs/react-three-fiber) que te permite construir tus escenas de forma declarativa con componentes reutilizables y autocontenidos que reaccionan al estado.

En mi búsqueda de algo similar en el ecosistema de VueJS, encontré esta increíble biblioteca llamada [Lunchbox](https://github.com/breakfast-studio/lunchboxjs) que funciona con el mismo concepto que R3F, proporciona un [renderizador personalizado de Vue3](https://vuejs.org/api/custom-renderer.html). También estoy contribuyendo para mejorar esta biblioteca y que sea tan madura y rica en características como R3F.

El único problema es que mezclar compiladores y renderizadores en Vue 3 es algo en lo que la comunidad de Vue todavía está trabajando. Puedes ver más información [aquí](https://github.com/vuejs/vue-loader/pull/1645).

```ts
// Example Vite setup
import { createApp as createLunchboxApp } from 'lunchboxjs'
import { createApp } from 'vue'
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

Así que me inspiré en ambas bibliotecas para crear un renderizador personalizado de Vue para ThreeJS. Eso es **TresJS v2**.
