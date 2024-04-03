---
title: Shaders
description: Les shaders ouvrent un monde de possibilités.
author: alvarosabu
thumbnail: /recipes/shaders.png
difficulty: 2
---

# Shaders

Ce guide vous aidera à démarrer avec les shaders dans TresJS.

Nous allons construire une scène simple avec un blob. Ensuite, nous l'animerons pour le déformer doucement.

::: warning
_Il est nécessaire d’avoir des connaissances de base sur le fonctionnement des shaders_
:::

<SandboxDemo url="https://play.tresjs.org/#eNqVVltv2zYU/iuE91BntSU7cYrBS4q0QTt0WNcgyfZSFxsjH9tMJVIjKdle4P++j9TFVJMU3oMDndvH71x4mIferSbzJs+jsqDetHdmEi1yywzZImcpl8vzWc+aWe/1TIosV9qyB2ZWPE3V+poWbMcWWmXsBaJf/By4ONRLLktuBqwwdE1yTvo3pfI24sLC5d7EidLd0E/6TthLJa1WqXnsLkhaZToRf1JilT5ufe1KE72YyZlMlDSW3aXqzpE9D5j3ZZGmR0BpnAopFkpnBl4PM8lYcSsymgK95GmBjxHbDbz+TZanwhbz0Chp3bDoj6LxgOHPURPwXtM/Bclk+0zA8WjATivv3Z5PSdrS5mbFUThw+nsma4awJMcBDeTQtbTnBZZFqjhydDn5nEuut0Iuq4jyj7JSKjFnGReyf1TVgDn7hGVqTumVMsIKJcHFyx+51WLDfvQu/by2Dtg4GrmyuuBOXLRlL9EAgHfVDmJPGeKwonnk9G2S0eZJzI3DTJT5BnPbxdw+g+kKFKRZCloHWTqxTbKDX1NZpn8F7rlW92gohH1lAsA6BqWGb+HqjV6jqU27F5ovM4x22PBcUyKMg89oLoosr9qI2EPbB4rvAXypUuUwfavQoIGLibZuTE/bjlV8KjYPTMn6toJteH/71Z2pzP3+A0NdLB8wSnluaM52R+z8dX28WLB+ffciP/ctr442yrglLXgaNXcw8t2qrCBQY7tQkNw5BmdxtaiwliBYQk8BAomxs/3uYUlKXA8Tlz722A/j8XjWc0tgrtaG8TRfcbYWEtLQiH+rcAB0N1DcqB3uFWmTuzaXdMkz0pxNm9HHAZ/HuPrV7wsOmi5UCe3k1H1zHwfRUZhK8MI31oT388J4NBpB6pz3kcyKaVrAXNfM+YdHopkTNBLn1XF15E2+Ik2/kMrI6i3O10vj/I8H7MT/HMPmrCbGDx/m17eDTcMdhNhQ9LQ7MwuHrsK5NB2FsfkMU4ybHH0fu1lPtbK8yXIIUqvo6gOLGcgj58cJX+G1eiLfMZz3vyeSdoe95UYkbd7tvEwmk+fYNmI1aFCcxcEU9ga96nUaZjyP7o2SeFv97M9qA8qA56ACnvXCx9AZZr2VtbmZxnEyl4jHJROljiTZWOZZHLpfnESn0SieC2Njp4b3rOcfng5w9Wz+H+wqAvCvQvha3T3Frol/zVH+A/Bb34tJhPGvkRtllAkXE2K7x/wQXOd3AcTTn8D3JZksLAP+P8EaO7i+gfvFGEsSiFgTtImybnVrP2wUjf10OHAV8D1oOA7nlIkDQBtXl/wkehWn4i6EbNYmZtIarPeFWH4zkYnKcpGS/pS769adTP//0q9eZ3VBLb9kRcnXJ/T3ZlNRvsKwkC5R7n0rcSfJVuZ3N7/TBt+tES9skdbNecZ4TUalheNYub0t5By0Az/P9oO/YHgeb827jSXpXtDHRO02J6/93GyDdtYqxRdfOO/v23H5nSrtMzuJTtqC7/4DVvHLxg==" />

## Configurer la scène (facultatif)

Nous importons tous les modules dont nous avons besoin. Pour plus de commodité, nous pouvons utiliser les orbit-controls de cientos.
[Voir ici comment](/cookbook/orbit-controls).

Mettons notre caméra en position `[11,11,11]`.

Enfin, pour nous aider avec le placement, ajoutons un plan simple, tourné sur l'axe X, avec une mesure de `[10, 10]` unités.

```vue
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

Comme vous le savez, chaque instance dans [ThreeJs](https://threejs.org/) est disponible dans **TresJs**, nous pouvons donc également utiliser le `ShaderMaterial`, il suffit d'ajouter le préfixe `Tres` pour l'utiliser.

Pour notre blob, nous pourrions utiliser un simple `SphereGeometry` en ajoutant des `widthSegments` et `heightSegments` pour créer un effet fluide et positionner notre blob 4 unités sur l'axe Y positif.

```vue
<TresMesh :position="[0, 4, 0]">
  <TresSphereGeometry :args="[2, 32, 32]" />
  <TresShaderMaterial />
</TresMesh>
```

Le `ShaderMaterial` accepte des propriétés spéciales, telles que `uniforms`, `vertexShader` et `fragmentShader`, afin que nous puissions le créer dans notre section de script et établir la connexion à notre instance.

Pour cet exemple, nos uniformes ressemblent à ceci :

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

Notre fragment shader ressemble à ceci :

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

Et enfin notre `vertexShader`:

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

## Animer le blob

Semblable à ce que nous avons appris dans l'exemple des [Animations de bases](/cookbook/basic-animations), Nous commençons par référencer notre blob en utilisant [Template Ref](https://vuejs.org/guide/essentials/template-refs.html)

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
      <TresShaderMaterial />
    </TresMesh>
  </TresCanvas>
</template>
```
Une fois que nous avons fait cela, nous pouvons utiliser le rappel `onLoop` pour animer notre `uTime`.

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

Et voilà, notre shader de base fonctionne correctement.

## Avec GLSL vite-plugin (optionel)

_Cette étape est totalement facultative et hors du cadre de l'équipe **TresJs**._

Définir notre shader en ligne n'est pas toujours la meilleure idée, mais si vous utilisez [vite](https://vitejs.dev/), vous pouvez mettre vos fichiers `GLSL` dans un fichier différent en utilisant le [vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl). (voir lien pour la documentation officielle)

Et vous devriez avoir une structure similaire à celle-ci :

```
├── src/
│   ├── myTresJsComponent.vue
│   ├── shaders/
│       ├── vertexShader.glsl
│       ├── fragmentShader.glsl
```