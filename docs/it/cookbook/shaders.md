# Shaders

Questa guida ti aiuterà a iniziare con gli shader in TresJS.

Costruiremo una scena semplice con un blob. Poi animeremo il blob per deformarlo dolcemente.

::: warning
_Sono necessarie conoscenze di base sul funzionamento degli shader_
:::

<SandboxDemo url="https://play.tresjs.org/#eNqVVltv2zYU/iuE91BntSU7cYrBS4q0QTt0WNcgyfZSFxsjH9tMJVIjKdle4P++j9TFVJMU3oMDndvH71x4mIferSbzJs+jsqDetHdmEi1yywzZImcpl8vzWc+aWe/1TIosV9qyB2ZWPE3V+poWbMcWWmXsBaJf/By4ONRLLktuBqwwdE1yTvo3pfI24sLC5d7EidLd0E/6TthLJa1WqXnsLkhaZToRf1JilT5ufe1KE72YyZlMlDSW3aXqzpE9D5j3ZZGmR0BpnAopFkpnBl4PM8lYcSsymgK95GmBjxHbDbz+TZanwhbz0Chp3bDoj6LxgOHPURPwXtM/Bclk+0zA8WjATivv3Z5PSdrS5mbFUThw+nsma4awJMcBDeTQtbTnBZZFqjhydDn5nEuut0Iuq4jyj7JSKjFnGReyf1TVgDn7hGVqTumVMsIKJcHFyx+51WLDfvQu/by2Dtg4GrmyuuBOXLRlL9EAgHfVDmJPGeKwonnk9G2S0eZJzI3DTJT5BnPbxdw+g+kKFKRZCloHWTqxTbKDX1NZpn8F7rlW92gohH1lAsA6BqWGb+HqjV6jqU27F5ovM4x22PBcUyKMg89oLoosr9qI2EPbB4rvAXypUuUwfavQoIGLibZuTE/bjlV8KjYPTMn6toJteH/71Z2pzP3+A0NdLB8wSnluaM52R+z8dX28WLB+ffciP/ctr442yrglLXgaNXcw8t2qrCBQY7tQkNw5BmdxtaiwliBYQk8BAomxs/3uYUlKXA8Tlz722A/j8XjWc0tgrtaG8TRfcbYWEtLQiH+rcAB0N1DcqB3uFWmTuzaXdMkz0pxNm9HHAZ/HuPrV7wsOmi5UCe3k1H1zHwfRUZhK8MI31oT388J4NBpB6pz3kcyKaVrAXNfM+YdHopkTNBLn1XF15E2+Ik2/kMrI6i3O10vj/I8H7MT/HMPmrCbGDx/m17eDTcMdhNhQ9LQ7MwuHrsK5NB2FsfkMU4ybHH0fu1lPtbK8yXIIUqvo6gOLGcgj58cJX+G1eiLfMZz3vyeSdoe95UYkbd7tvEwmk+fYNmI1aFCcxcEU9ga96nUaZjyP7o2SeFv97M9qA8qA56ACnvXCx9AZZr2VtbmZxnEyl4jHJROljiTZWOZZHLpfnESn0SieC2Njp4b3rOcfng5w9Wz+H+wqAvCvQvha3T3Frol/zVH+A/Bb34tJhPGvkRtllAkXE2K7x/wQXOd3AcTTn8D3JZksLAP+P8EaO7i+gfvFGEsSiFgTtImybnVrP2wUjf10OHAV8D1oOA7nlIkDQBtXl/wkehWn4i6EbNYmZtIarPeFWH4zkYnKcpGS/pS769adTP//0q9eZ3VBLb9kRcnXJ/T3ZlNRvsKwkC5R7n0rcSfJVuZ3N7/TBt+tES9skdbNecZ4TUalheNYub0t5By0Az/P9oO/YHgeb827jSXpXtDHRO02J6/93GyDdtYqxRdfOO/v23H5nSrtMzuJTtqC7/4DVvHLxg==" />

## Impostazione della scena (opzionale)

Importiamo tutti i moduli di cui abbiamo bisogno. Per renderlo più comodo, importeremo e useremo i controlli orbitali di Cientos,
[Guarda qui per vedere come](/cookbook/orbit-controls).

Ora, mettiamo la telecamera nella posizione `[11,11,11]`.

Infine solo per aiutarci con la posizione, aggiungiamo un semplice piano, ruotato nell'asse X, con unità `[10, 10]`.

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
</script>

<template>
  <TresCanvas clear-color="#111" window-size>
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

Come sapete ogni istanza in [ThreeJs](https://threejs.org/) è disponibile in **TresJs**, così è il `ShaderMaterial`, abbiamo solo bisogno di aggiungere il prefisso `Tres` per usarlo.

Per il nostro blob, potremmo usare un semplice `SphereGeometry` aggiungendo alcuni widthSegments e heightSegments per creare un effetto liscio, e mettere il nostro blob 4 unità nell'asse positivo Y

```vue
<TresMesh :position="[0, 4, 0]">
  <TresSphereGeometry :args="[2, 32, 32]" />
  <TresShaderMaterial />
</TresMesh>
```

Il `ShaderMaterial` accetta proprietà speciali, come `uniforms` `vertexShader` e `fragmentShader`, così possiamo crearlo nella nostra sezione di script e fare il bind con la nostra istanza.

Per questo esempio, le nostre divise sono così:

```ts
import { Vector2 } from "three";

// ...
const uniforms = {
  uTime: { value: 0 },
  uAmplitude: { value: new Vector2(0.1, 0.1) },
  uFrequency: { value: new Vector2(20, 5) },
};
// ..
```

Il nostro shader frammento si presenta così:

```ts
// ...
const fragmentShader = `
precision mediump float;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(1.0, vUv.y, 0.5, 1.0);
}
`;
// ..
```

E infine il nostro vertexShader:

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
`;
// ..
```

## Animare il blob

Simile a quello che impariamo nell'esempio [Animazioni di base](/cookbook/basic-animations), iniziamo facendo riferimento al nostro blob, usando [Template Ref](https://vuejs.org/guide/essentials/template-refs.html)

```vue
<script setup lang="ts">
import { shallowRef } from "vue";
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";

const blobRef = shallowRef(null);
// ...
</script>

<template>
  <TresCanvas clear-color="#111" window-size>
    <OrbitControls />
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <TresMesh ref="blobRef" :position="[0, 4, 0]">
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

Una volta che abbiamo ottenuto che, potremmo usare il `onLoop` callback per animare il nostro `uTime`.

```ts
import { TresCanvas, useRenderLoop } from "@tresjs/core";

// ...
const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {
  if (blobRef.value) {
    blobRef.value.material.uniforms.uTime.value = elapsed;
  }
});
// ...
```

E questo è tutto, abbiamo il nostro shader base senza intoppi. 🎉

## Usare GLSL vite-pluging (optional)

_Questo passaggio è completamente facoltativo ed è fuori dalla portata del team **TresJs**_

Definire il nostro shader in linea non è sempre l'idea migliore, ma se stai usando [vite](https://vitejs.dev/) puoi mettere i tuoi file `GLSL` in un file diverso semplicemente usando il [vite-plugin-glsl](https:/www.npmjs.com/package/vite-plugin-glsl) (controlla il link per la documentazione ufficiale).

E si potrebbe avere una struttura simile a questa:

```
├── src/
│   ├── myTresJsComponent.vue
│   ├── shaders/
│       ├── vertexShader.glsl
│       ├── fragmentShader.glsl
```
