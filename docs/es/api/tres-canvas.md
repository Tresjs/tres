# TresCanvas

El componente `TresCanvas` es el componente principal de Tres. Es el que crea el `WebGLRenderer` de ThreeJS.

```vue{2,5}
<template>
  <TresCanvas shadows :output-encoding="SRGBColorSpace">
    <TresPerspectiveCamera />
      <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

## Tamaño del lienzo

El componente `TresCanvas` utilizará el tamaño del elemento padre como tamaño del lienzo. Si deseas utilizar el tamaño de la ventana como tamaño del lienzo, puedes establecer la propiedad `window-size` en `true`.

```vue
<template>
  <TresCanvas window-size>
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

Or you can use CSS to set your canvas size.

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#canvas {
  height: 100%;
  width: 100%;
}
```

## Presets

Tres viene con algunos presets para el componente `TresCanvas`. Puedes usarlos estableciendo la propiedad `preset`.

### Realista

El preset `realista` facilita la configuración del renderizador para escenas 3D más realistas.

```vue
<template>
  <TresCanvas preset="realistic">
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

It's equivalent to:

```ts
renderer.shadows = true
renderer.physicallyCorrectLights = true
renderer.outputColorSpace = SRGBColorSpace
renderer.toneMapping = ACESFilmicToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
```

## Props

| Prop | Descripción | Valor por defecto |
| ---- | ---- | --- |
| **alpha** | Controla el valor alfa predeterminado. Cuando se establece en true, el valor es 0. De lo contrario, es 1. | false |
| **antialias** | Indica si se debe realizar el antialiasing. | `true` |
| **camera** | Una cámara manual que se utilizará por el renderizador. | |
| **clearColor** | El color que el renderizador utilizará para borrar el lienzo. | `#000000` |
| **context** | Esto se puede usar para adjuntar el renderizador a un [RenderingContext](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext) existente. | |
| **depth** | Indica si el búfer de dibujo tiene un [búfer de profundidad](https://en.wikipedia.org/wiki/Z-buffering) de al menos 16 bits. | `true` |
| **disableRender** | Desactiva el renderizado en requestAnimationFrame, útil para PostProcessing. | `false` |
| **failIfMajorPerformanceCaveat** | Indica si la creación del renderizador fallará si se detecta un bajo rendimiento. Consulta la [especificación de WebGL](https://registry.khronos.org/webgl/specs/latest/1.0/#5.2) para más detalles. | `false` |
| **logarithmicDepthBuffer** | Indica si se debe utilizar un búfer de profundidad logarítmico. Puede ser necesario utilizar esto si se manejan diferencias enormes de escala en una sola escena. Ten en cuenta que esta configuración utiliza gl_FragDepth si está disponible, lo cual deshabilita la optimización [Early Fragment Test](https://www.khronos.org/opengl/wiki/Early_Fragment_Test) y puede causar una disminución en el rendimiento. | `false` |
| **outputColorSpace** | Define la codificación de salida. | `LinearEncoding` |
| **powerPreference** | Proporciona una sugerencia al agente de usuario que indica qué configuración de GPU es adecuada para este contexto WebGL. Puede ser "high-performance", "low-power" o "default". | `default` |
| **precision** | Precisión del shader. Puede ser "highp", "mediump" o "lowp". | "highp" si es compatible con el dispositivo |
| **premultipliedAlpha** | Indica si el renderizador asumirá que los colores tienen [alfa premultiplicado](https://en.wikipedia.org/wiki/Glossary_of_computer_graphics#premultiplied_alpha). | `true` |
| **preserveDrawingBuffer** | Indica si se deben preservar los búferes hasta que se borren o se sobrescriban manualmente. | `false` |
| **shadows** | Habilita las sombras en el renderizador. | `false` |
| **shadowMapType** | Establece el tipo de mapa de sombras. | `PCFSoftShadowMap` |
| **stencil** | Indica si el búfer de dibujo tiene un [búfer de stencil](https://en.wikipedia.org/wiki/Stencil_buffer) de al menos 8 bits. | `true` |
| **toneMapping** | Define la exposición de mapeo de tonos utilizada por el renderizador. | `ACESFilmicToneMapping` |
| **toneMappingExposure** | Nivel de exposición del mapeo de tonos. | `1` |
| **useLegacyLights** | Indica si se debe utilizar el modo de iluminación heredado o no. | `true` |
| **windowSize** | Indica si se debe utilizar el tamaño de la ventana como el tamaño del lienzo o el elemento padre. | `false` |

### Valores predeterminados

Tres intenta ser lo menos opinado posible. Es por eso que no establece casi ningún valor predeterminado para el componente `TresCanvas`. Utiliza los valores predeterminados de [three.js](https://threejs.org/). La única excepción es la propiedad `antialias`, que se establece en `true` de forma predeterminada.

## Propiedades públicas expuestas

| Propiedad | Descripción |
| ---- | ---- |
| context | ver [useTresContext](composables#usetrescontext) |
