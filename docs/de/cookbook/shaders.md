---
title: Shaders
description: Shaders bieten eine Welt voller Möglichkeiten.
author: alvarosabu
thumbnail: /recipes/shaders.png
difficulty: 2
---

# Shaders

Diese Anleitung wird dir helfen, deine ersten Schritte mit Shadern in TresJS zu machen.

Wir werden eine einfache Szene mit einem Blob erstellen. Anschließend animieren wir ihn, um ihn sanft zu verzerren.

::: warning
_Es sind Grundkenntnisse über Shader erforderlich_
:::

<SandboxDemo url="https://play.tresjs.org/#eNqVVltv2zYU/iuE91BntSU7cYrBS4q0QTt0WNcgyfZSFxsjH9tMJVIjKdle4P++j9TFVJMU3oMDndvH71x4mIferSbzJs+jsqDetHdmEi1yywzZImcpl8vzWc+aWe/1TIosV9qyB2ZWPE3V+poWbMcWWmXsBaJf/By4ONRLLktuBqwwdE1yTvo3pfI24sLC5d7EidLd0E/6TthLJa1WqXnsLkhaZToRf1JilT5ufe1KE72YyZlMlDSW3aXqzpE9D5j3ZZGmR0BpnAopFkpnBl4PM8lYcSsymgK95GmBjxHbDbz+TZanwhbz0Chp3bDoj6LxgOHPURPwXtM/Bclk+0zA8WjATivv3Z5PSdrS5mbFUThw+nsma4awJMcBDeTQtbTnBZZFqjhydDn5nEuut0Iuq4jyj7JSKjFnGReyf1TVgDn7hGVqTumVMsIKJcHFyx+51WLDfvQu/by2Dtg4GrmyuuBOXLRlL9EAgHfVDmJPGeKwonnk9G2S0eZJzI3DTJT5BnPbxdw+g+kKFKRZCloHWTqxTbKDX1NZpn8F7rlW92gohH1lAsA6BqWGb+HqjV6jqU27F5ovM4x22PBcUyKMg89oLoosr9qI2EPbB4rvAXypUuUwfavQoIGLibZuTE/bjlV8KjYPTMn6toJteH/71Z2pzP3+A0NdLB8wSnluaM52R+z8dX28WLB+ffciP/ctr442yrglLXgaNXcw8t2qrCBQY7tQkNw5BmdxtaiwliBYQk8BAomxs/3uYUlKXA8Tlz722A/j8XjWc0tgrtaG8TRfcbYWEtLQiH+rcAB0N1DcqB3uFWmTuzaXdMkz0pxNm9HHAZ/HuPrV7wsOmi5UCe3k1H1zHwfRUZhK8MI31oT388J4NBpB6pz3kcyKaVrAXNfM+YdHopkTNBLn1XF15E2+Ik2/kMrI6i3O10vj/I8H7MT/HMPmrCbGDx/m17eDTcMdhNhQ9LQ7MwuHrsK5NB2FsfkMU4ybHH0fu1lPtbK8yXIIUqvo6gOLGcgj58cJX+G1eiLfMZz3vyeSdoe95UYkbd7tvEwmk+fYNmI1aFCcxcEU9ga96nUaZjyP7o2SeFv97M9qA8qA56ACnvXCx9AZZr2VtbmZxnEyl4jHJROljiTZWOZZHLpfnESn0SieC2Njp4b3rOcfng5w9Wz+H+wqAvCvQvha3T3Frol/zVH+A/Bb34tJhPGvkRtllAkXE2K7x/wQXOd3AcTTn8D3JZksLAP+P8EaO7i+gfvFGEsSiFgTtImybnVrP2wUjf10OHAV8D1oOA7nlIkDQBtXl/wkehWn4i6EbNYmZtIarPeFWH4zkYnKcpGS/pS769adTP//0q9eZ3VBLb9kRcnXJ/T3ZlNRvsKwkC5R7n0rcSfJVuZ3N7/TBt+tES9skdbNecZ4TUalheNYub0t5By0Az/P9oO/YHgeb827jSXpXtDHRO02J6/93GyDdtYqxRdfOO/v23H5nSrtMzuJTtqC7/4DVvHLxg==" />

## Einrichten der Szene (optional)

Wir importieren alle Module, die wir benötigen. Zusätzlich können wir die Orbit-Controls von Cientos verwenden.  [Siehe hier, wie das geht](/de/examples/orbit-controls).

Nun positionieren wir unsere Kamera an der Position `[11,11,11]`.

Um uns bei der Positionierung zu helfen, fügen wir zum Schluß eine einfache Ebene  mit den Maßen `[10, 10]` hinzu, die um die X-Achse gedreht ist.

```vue{12,14-17}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
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

Wie du weißt, ist jede Instanz aus [ThreeJs](https://threejs.org/) in **TresJs** verfügbar, also können wir auch `ShaderMaterial` verwenden. Wir müssen lediglich das Präfix `Tres` hinzufügen, um es zu nutzen.

Für unseren Blob können wir eine einfache `SphereGeometry` verwenden. Durch das Hinzufügen von `widthSegments` und `heightSegments` erzielen wir einen sanften Effekt. Wir platzieren unseren Blob 4 Einheiten entlang der positiven Y-Achse.

```html
<TresMesh :position="[0, 4, 0]">
  <TresSphereGeometry :args="[2, 32, 32]" />
  <TresShaderMaterial />
</TresMesh>
```

Das `ShaderMaterial` akzeptiert spezielle Props wie `uniforms`, `vertexShader` und `fragmentShader`. Wir können diese Objekte in unserem Skriptbereich erstellen und später der Komponente übergeben.

Für dieses Beispiel sehen unsere Uniforms so aus:

```ts
import { Vector2 } from 'three'

//...
const uniforms = {
  uTime: { value: 0 },
  uAmplitude: { value: new Vector2(0.1, 0.1) },
  uFrequency: { value: new Vector2(20, 5) },
}
//..
```

Unser Fragment-Shader sieht so aus:

```ts
//...
const fragmentShader = `
precision mediump float;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(1.0, vUv.y, 0.5, 1.0);
}
`
//..
```

Und schließlich unser `vertexShader`:

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
//..
```

## Animieren des Blobs

Ähnlich wie wir im Beispiel [Grundlegende Animationen](/de/examples/basic-animations) gelernt haben, beginnen wir, indem wir unseren Blob mit einer [Template-Ref](https://vuejs.org/guide/essentials/template-refs.html) referenzieren.
<!-- TODO: Ich bin verwirrt - text und code stimmen nicht überein -->

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'

const blobRef = shallowRef(null)
//...
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
      <TresShaderMaterial
        :vertex-shader="vertexShader"
        :fragment-shader="fragmentShader"
        :uniforms="uniforms"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

Nun können wir den `onLoop`-Callback nutzen, um `uTime` zu animieren.

 ```ts
import { TresCanvas, useRenderLoop } from '@tresjs/core'

 //...
 const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
   if (blobRef.value) {
     blobRef.value.material.uniforms.uTime.value = elapsed
   }
})
 //...
```

Somit haben unseren ersten grundlegenden Shader zum Laufen gebracht!

## Verwendung des GLSL vite-plugins (optional)

_Dieser Schritt ist vollständig optional und liegt außerhalb des Scopes des **TresJs**-Teams_

Wenn du nicht immer deine Shader inline definieren möchtest, kannst du [vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl) nutzen, um `GLSL`-Code in separate Dateien auszulagern.

Dann könnte man den Code zum Beispiel so organisieren:

```
├── src/
│   ├── myTresJsComponent.vue
│   ├── shaders/
│       ├── vertexShader.glsl
│       ├── fragmentShader.glsl
```