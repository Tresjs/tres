---
title: Shaders
description: Shaders abren un mundo de posibilidades.
author: alvarosabu
thumbnail: /recipes/shaders.png
difficulty: 2
---

# Shaders

Esta guía te ayudará a comenzar con los shaders en TresJS.

Construiremos una escena simple con un blob. Luego alo animaremos para distorsionarlo suavemente.

::: warning
_Es necesario tener conocimientos básicos sobre cómo funcionan los shaders_
:::

<SandboxDemo url="https://play.tresjs.org/#eNqVVltv2zYU/iuE91BntSU7cYrBS4q0QTt0WNcgyfZSFxsjH9tMJVIjKdle4P++j9TFVJMU3oMDndvH71x4mIferSbzJs+jsqDetHdmEi1yywzZImcpl8vzWc+aWe/1TIosV9qyB2ZWPE3V+poWbMcWWmXsBaJf/By4ONRLLktuBqwwdE1yTvo3pfI24sLC5d7EidLd0E/6TthLJa1WqXnsLkhaZToRf1JilT5ufe1KE72YyZlMlDSW3aXqzpE9D5j3ZZGmR0BpnAopFkpnBl4PM8lYcSsymgK95GmBjxHbDbz+TZanwhbz0Chp3bDoj6LxgOHPURPwXtM/Bclk+0zA8WjATivv3Z5PSdrS5mbFUThw+nsma4awJMcBDeTQtbTnBZZFqjhydDn5nEuut0Iuq4jyj7JSKjFnGReyf1TVgDn7hGVqTumVMsIKJcHFyx+51WLDfvQu/by2Dtg4GrmyuuBOXLRlL9EAgHfVDmJPGeKwonnk9G2S0eZJzI3DTJT5BnPbxdw+g+kKFKRZCloHWTqxTbKDX1NZpn8F7rlW92gohH1lAsA6BqWGb+HqjV6jqU27F5ovM4x22PBcUyKMg89oLoosr9qI2EPbB4rvAXypUuUwfavQoIGLibZuTE/bjlV8KjYPTMn6toJteH/71Z2pzP3+A0NdLB8wSnluaM52R+z8dX28WLB+ffciP/ctr442yrglLXgaNXcw8t2qrCBQY7tQkNw5BmdxtaiwliBYQk8BAomxs/3uYUlKXA8Tlz722A/j8XjWc0tgrtaG8TRfcbYWEtLQiH+rcAB0N1DcqB3uFWmTuzaXdMkz0pxNm9HHAZ/HuPrV7wsOmi5UCe3k1H1zHwfRUZhK8MI31oT388J4NBpB6pz3kcyKaVrAXNfM+YdHopkTNBLn1XF15E2+Ik2/kMrI6i3O10vj/I8H7MT/HMPmrCbGDx/m17eDTcMdhNhQ9LQ7MwuHrsK5NB2FsfkMU4ybHH0fu1lPtbK8yXIIUqvo6gOLGcgj58cJX+G1eiLfMZz3vyeSdoe95UYkbd7tvEwmk+fYNmI1aFCcxcEU9ga96nUaZjyP7o2SeFv97M9qA8qA56ACnvXCx9AZZr2VtbmZxnEyl4jHJROljiTZWOZZHLpfnESn0SieC2Njp4b3rOcfng5w9Wz+H+wqAvCvQvha3T3Frol/zVH+A/Bb34tJhPGvkRtllAkXE2K7x/wQXOd3AcTTn8D3JZksLAP+P8EaO7i+gfvFGEsSiFgTtImybnVrP2wUjf10OHAV8D1oOA7nlIkDQBtXl/wkehWn4i6EbNYmZtIarPeFWH4zkYnKcpGS/pS769adTP//0q9eZ3VBLb9kRcnXJ/T3ZlNRvsKwkC5R7n0rcSfJVuZ3N7/TBt+tES9skdbNecZ4TUalheNYub0t5By0Az/P9oO/YHgeb827jSXpXtDHRO02J6/93GyDdtYqxRdfOO/v23H5nSrtMzuJTtqC7/4DVvHLxg==" />

## Configurando la escena (opcional)

Importamos todos los módulos que necesitamos. Para mayor comodidad, podemos usar los orbit-controls de cientos.
[Consulta aquí para ver cómo](/cookbook/orbit-controls).

Ahora, coloquemos nuestra cámara en la posición `[11,11,11]`.

Por último, para ayudarnos con la ubicación, agreguemos un plano simple, rotado en el eje X, con una medida de `[10, 10]` unidades.

```vue
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas
    clear-color="#111"
    window-size
  >
    <OrbitControls />
    <TresPerspectiveCamera :position="[11, 11, 11]" />

    <TresMesh :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10]" />
      <TresMeshBasicMaterial color="#444" />
    </TresMesh>
  </TresCanvas>
</template>
```

## ShaderMaterial

Como sabes, cada instancia en [ThreeJs](https://threejs.org/) está disponible en **TresJs**, por lo que también podemos usar el `ShaderMaterial`, solo necesitamos agregar el prefijo `Tres` para utilizarlo.

Para nuestro blob, podríamos usar una simple `SphereGeometry` agregando algunos `widthSegments` y `heightSegments` para crear un efecto suave, y colocar nuestro blob 4 unidades en el eje Y positivo.

```vue
<TresMesh :position="[0, 4, 0]">
  <TresSphereGeometry :args="[2, 32, 32]" />
  <TresShaderMaterial />
</TresMesh>
```

El `ShaderMaterial` acepta propiedades especiales, como `uniforms`, `vertexShader` y `fragmentShader`, por lo que podemos crearlo en nuestra sección de script y hacer la conexión con nuestra instancia.

Para este ejemplo, nuestros uniforms se ven así:

```ts
import { Vector2 } from 'three'

// ...
const uniforms = {
  uTime: { value: 0 },
  uAmplitude: { value: new Vector2(0.1, 0.1) },
  uFrequency: { value: new Vector2(20, 5) },
}
// ..
```

Nuestro fragment shader se ve así:

```ts
// ...
const fragmentShader = `
precision mediump float;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(1.0, vUv.y, 0.5, 1.0);
}
`
// ..
```

Y finalmente nuestro `vertexShader`:

```ts
const vertexShader = `
uniform vec2 uAmplitude;
uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * uFrequency.x - uTime) * uAmplitude.x;
    modelPosition.x += cos(modelPosition.y * uFrequency.y - uTime) * uAmplitude.y;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    vUv = uv;
}
`
// ..
```

## Animando el blob

Similar a lo que aprendimos en el ejemplo de [Animaciones básicas](/cookbook/basic-animations), comenzamos haciendo referencia a nuestro blob utilizando [Template Ref](https://vuejs.org/guide/essentials/template-refs.html)

```vue
<script setup lang="ts">
import { OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { shallowRef } from 'vue'

const blobRef = shallowRef(null)
// ...
</script>

<template>
  <TresCanvas
    clear-color="#111"
    window-size
  >
    <OrbitControls />
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <TresMesh
      ref="blobRef"
      :position="[0, 4, 0]"
    >
      <TresSphereGeometry :args="[2, 32, 32]" />
      <TresShaderMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```
Una vez que hayamos hecho eso, podemos usar el callback `onLoop` para animar nuestro `uTime`.

 ```ts
import { TresCanvas, useRenderLoop } from '@tresjs/core'

 // ...
 const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
   if (blobRef.value) {
     blobRef.value.material.uniforms.uTime.value = elapsed
   }
})
 // ...
```

Y eso es todo, tenemos nuestro shader básico funcionando sin problemas.

## Usando GLSL vite-plugin (opcional)

_Este paso es completamente opcional y está fuera del alcance del equipo de **TresJs**_

Definir nuestro shader en línea no siempre es la mejor idea, pero si estás utilizando [vite](https://vitejs.dev/), puedes colocar tus archivos `GLSL` en un archivo diferente utilizando el [vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl) (consulta el enlace para obtener la documentación oficial).

Y podrías tener una estructura similar a esta:

```
├── src/
│   ├── myTresJsComponent.vue
│   ├── shaders/
│       ├── vertexShader.glsl
│       ├── fragmentShader.glsl
```
