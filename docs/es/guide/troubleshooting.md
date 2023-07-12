# Una divertida guía de problemas comunes y como resolverlos

![Troubleshooting](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

Bienvenido a la **Guía de resolución de problemas de TresJs v2** Sabemos que trabajar con 3D puede ser complejo, pero no temas, estamos aquí para ayudarte

## ¡No puedo ver mi escena 😭!

¿Has seguido los pasos de la sección [Empezando](/guide/getting-started.md) pero aun así no puedes ver tu escena en pantalla?

Estas son algunas de las razones mas comunes:

### Revisa la altura de tu canvas 📏

Un problema común es que el componente `TresCanvas` crea por defecto un elemento `canvas` que toma el ancho y el alto de su elemento padre. Si tu elemento padre no tiene altura, el canvas tampoco la tendrá

![No height found](/canvas-height.png)

Ademas verás un error como este en la consola

![Canvas height warning](/canvas-height-warning.png)

Una forma muy fácil de resolver esto es configurar la altura del elemento padre a `100%`:

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #000;
}
```

O también puedes agrega el prop `window-size` al componente `TresCanvas`:

```vue
<TresCanvas window-size>
  <TresPerspectiveCamera />
  <TresOrbitControls />
</TresCanvas>
```

## Errores en consola componente: TresComponent... 🤔

![](/failed-to-resolve-component.png)

Desde la **TresJs v2**, se esta usando una solución llamada Vue Custom renderer dentro de la instancia principal de la aplicación de Vue, Vue no reconocerá por defecto los componentes dentro del componente `TresCanvas`.

Incluso si estos no afectan al desarrollo de nuestra escena, mostrará warning en la consola

![](/failed-to-resolve-component.png)

En este momento, no existe una solución definitiva para el renderizado usando el `<template />` pero hemos desarrollado una solución provisoria para eliminar estos warnings

ve a tu `vite.config.ts` y añade la siguiente configuración:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      // Other config
      ...templateCompilerOptions,
    }),
  ],
})
```

Esto eliminara el mensaje en la consola.

# Ayúdanos a hacer TresJs Purr-fect! 😼

Sabemos que incluso los mejores ocasionalmente cometemos errores, y ¡necesitamos tu ayuda para hacer TresJs aún mejor! Si encuentras algún bug por favor no dudes en abrir un ticket acá [the
repo](https://github.com/Tresjs/playground) **Recuerda proporcionar un link a la reproducción del error**

::: warning
Los tickets sin un link de reproducción serán cerrados
:::

Nuestro team, saltará a la acción para resolver estos bugs fastidiosos y mejorar Tresjs para todos. Juntos podemos hacer de esta una librería Increíble.
