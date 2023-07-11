# Renderer

El componente `Renderer` es el componente principal de Tres. Es eso que crea ThreeJS `WebGLRenderer` y defina tu escena de Tres.

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera />
      <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

## Canvas size

El componente `Renderer` usará el tamaño del componente su padre. Si deseas usar el total del tamaño disponible del viewport, puedes usar la propiedad `window-size`

```vue
<template>
  <TresCanvas window-size>
    <!-- Tu escena va aquí -->
  </TresCanvas>
</template>
```

O puedes usar CSS para configurar el tamaño de tu app

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

## Presets

Tresjs viene con algunas configuraciones listas para ti, y que puedes usar en el renderer. Puedes usarlas configurando el prop `preset`

### Realistic

El `realistic` preset configura tu renderer para escenas mas realistas en 3D.

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- Your scene goes here -->
  </TresCanvas>
</template>
```

Es equivalente a:

```ts
renderer.shadows: true,
renderer.physicallyCorrectLights: true,
renderer.outputColorSpace: SRGBColorSpace,
renderer.toneMapping: ACESFilmicToneMapping,
renderer.toneMappingExposure: 3,
renderer.shadowMap.enabled: true,
renderer.shadowMap.type: PCFSoftShadowMap
```

## Props

| Prop                        | Descripción                                                                                                                                                     | Defacto            |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **shadows**                 | Habilitar sombres en el Renderer                                                                                                                                | `false`            |
| **shadowMapType**           | Poner el tipo del mapa de sombre                                                                                                                                | `PCFSoftShadowMap` |
| **physicallyCorrectLights** | Si usará el modo de luz que es físicamente correcto. Ve [lights / physical example](https://threejs.org/examples/#webgl_lights_physical).                       | `false`            |
| **outputEncoding**          | Definer el output encoding                                                                                                                                      | `LinearEncoding`   |
| **toneMapping**             | Definer la exposición de mapping tone usado por renderer.                                                                                                       | `NoToneMapping`    |
| **context**                 | Se puede usar eso para pegar el renderer al [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) que ya existe.           |                    |
| **powerPreference**         | Provee una pista al agente usuario que indica que configuración de GPU es apto para este contexto WebGL. Puede ser "high-performance", "low-power" o "default". | `default`          |
| **preserveDrawingBuffer**   | Si preserva los buffers hasta que se despeja manualmente o son sobrescribió.                                                                                    | `false`            |
| **clearColor**              | El color que el renderer usará para despejar el canvas.                                                                                                         | `#000000`          |
| **windowSize**              | Si usa el tamaño de la ventana como el tamaño del canvas o el elemento padre.                                                                                   | `false`            |
| **disableRender**           | Deshabilitar el render con requestAnimationFrame API, util para PostProcessing                                                                                  | `false`            |
| **camera**                  | Una cámara configurable de forma manual para el renderer.                                                                                                       |                    |

## Propiedades por defecto

Tres intenta ser el menos tendencioso que es posible. Eso es porque no se pega casi nada valor de defacto para el componente `Renderer`. Necesitas pegar los props que quieres usar. La sola excepción es el `antialias` prop. Se pega a `true` por defacto.
