# Renderer

El componente `Renderer` es el componente principal de TresJs. Es eso que crea ThreeJS `WebGLRenderer` y renderiza tu escena.

```vue{2,7}
<template>
  <TresCanvas shadows :output-encoding="sRGBEncoding">
    <TresPerspectiveCamera />
    <TresScene>
      <!-- Your scene goes here -->
    </TresScene>
  </TresCanvas>
</template>
```

## Props

| Prop                        | Descripción                                                                                                                                                | defecto            |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **shadows**                 | Habilitar sombras en el Renderer                                                                                                                           | `false`            |
| **shadowMapType**           | Poner el tipo del mapa de sombra                                                                                                                           | `PCFSoftShadowMap` |
| **physicallyCorrectLights** | Si usará el modo de luz que es correcto en la realidad. Ve [lights / physical example](https://threejs.org/examples/#webgl_lights_physical).               | `false`            |
| **outputEncoding**          | Define el output encoding                                                                                                                                  | `LinearEncoding`   |
| **toneMapping**             | Define la exposición de mapping tone usado por el renderer.                                                                                                | `NoToneMapping`    |
| **context**                 | Se puede usar eso para pegar el renderer al [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) que ya existe.      |                    |
| **powerPreference**         | Provee una pista al navegador que indica que configuración de GPU es apto para este contexto WebGL. Puede ser "high-performance", "low-power" o "default". | `default`          |
| **preserveDrawingBuffer**   | Si preserva los buffers hasta que se despeja manualmente o son sobreescritos.                                                                              | `false`            |
| **clearColor**              | El color que el renderer usará de fondo para el canvas.                                                                                                    | `#000000`          |
| **windowSize**              | Si usa el tamaño de la ventana como el tamaño del canvas o el elemento padre.                                                                              | `false`            |

## Valores por Defecto

Tres intenta ser lo mas configurable posible. Eso es porque no se añaden casi ningún valor por defecto para el componente `Renderer`. Necesitas indicar los props que quieres usar. La sola excepción es el `antialias`. Se inicia en `true` por defecto.
