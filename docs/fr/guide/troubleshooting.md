# WIP
<!-- # La divertida guía de problemas comunes y cómo solucionarlos

![Solución de problemas](https://media.giphy.com/media/LHZyixOnHwDDy/giphy.gif)

Bienvenido a la guía de solución de problemas de **TresJS v2**. ¡Donde 3D significa _"Dificultades Deslumbrantemente Deliciosas"_! Sabemos que el 3D puede ser tan complejo como una bola de lana enredada 🧶 o tan impredecible como un gato en un teclado 🐈 ⌨️, ¡pero no temas!

Esta guía está destinada a ayudarte a resolver los problemas más comunes que puedes encontrar al usar TresJS v2.

## ¡No puedo ver mi escena 3D 😭!

Has seguido la [guía de inicio](/guide/getting-started.md) pero aún no puedes ver tu escena renderizada.

Estas son las razones más comunes por las que es posible que no puedas ver tu escena:

### Verifica la altura de tu lienzo 📏

Otro problema común es que el componente `TresCanvas` crea por defecto un elemento `canvas` que toma el `width` y `height` del elemento padre. Si el elemento padre no tiene altura, el lienzo tampoco la tendrá.

![No se encontró altura](/canvas-height.png)

También verás este error en la consola:

![Advertencia de altura del lienzo](/canvas-height-warning.png)

Una forma sencilla de solucionar esto es establecer la altura del elemento padre en `100%`:

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

O también puedes establecer la propiedad `window-size` del componente `TresCanvas`:

```vue
<TresCanvas window-size>
  <TresPerspectiveCamera />
  <TresOrbitControls />
</TresCanvas>
```

## Error al resolver el componente: TresComponent...

![](/failed-to-resolve-component.png)

Dado que **TresJS v2** utiliza un Renderizador Personalizado de Vue dentro de la instancia principal de la aplicación Vue, el renderizador principal de Vue que actúa como padre no reconocerá los componentes dentro del componente `TresCanvas`. Aunque no afecta la representación, mostrará una advertencia en la consola.

![](/failed-to-resolve-component.png)

En este momento, no hay soporte nativo de Vue para definir el renderizador utilizado en la etiqueta `<template />`, pero hay una solución rápida para eliminar las advertencias.

Ve a tu archivo `vite.config.ts` y agrega la siguiente configuración al `@vitejs/plugin-vue`:

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

Esto eliminará la advertencia de la consola.

# ¡Ayúdanos a hacer que TresJS sea purr-fecto! 😼

Sabemos que incluso los mejores gatos dormilones ocasionalmente cometen errores, ¡y necesitamos tu ayuda para hacer que TresJS sea aún mejor! Si encuentras un error, por favor abre un ticket en [el repositorio](https://github.com/Tresjs/playground) y **por favor proporciona un enlace de reproducción**.

::: warning
Los tickets sin un enlace de reproducción serán cerrados.
:::

Nuestro equipo de amantes de los gatos programadores se pondrá en acción para eliminar esos molestos errores y mejorar TresJS para todos. ¡Juntos, hagamos que TresJS sea el maullido del renderizado 3D en Vue! -->
