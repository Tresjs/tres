# Shaders

Deze handleiding helpt u aan de slag te gaan met shaders in TresJS.

We zullen een eenvoudige scène bouwen met een blob. Vervolgens zullen we de blob animeren om deze zachtjes te vervormen.

::: warning
_Basis kennis over hoe shaders werken is noodzakelijk_
:::

<SandboxDemo url="https://play.tresjs.org/#eNqVVltv2zYU/iuE91BntSU7cYrBS4q0QTt0WNcgyfZSFxsjH9tMJVIjKdle4P++j9TFVJMU3oMDndvH71x4mIferSbzJs+jsqDetHdmEi1yywzZImcpl8vzWc+aWe/1TIosV9qyB2ZWPE3V+poWbMcWWmXsBaJf/By4ONRLLktuBqwwdE1yTvo3pfI24sLC5d7EidLd0E/6TthLJa1WqXnsLkhaZToRf1JilT5ufe1KE72YyZlMlDSW3aXqzpE9D5j3ZZGmR0BpnAopFkpnBl4PM8lYcSsymgK95GmBjxHbDbz+TZanwhbz0Chp3bDoj6LxgOHPURPwXtM/Bclk+0zA8WjATivv3Z5PSdrS5mbFUThw+nsma4awJMcBDeTQtbTnBZZFqjhydDn5nEuut0Iuq4jyj7JSKjFnGReyf1TVgDn7hGVqTumVMsIKJcHFyx+51WLDfvQu/by2Dtg4GrmyuuBOXLRlL9EAgHfVDmJPGeKwonnk9G2S0eZJzI3DTJT5BnPbxdw+g+kKFKRZCloHWTqxTbKDX1NZpn8F7rlW92gohH1lAsA6BqWGb+HqjV6jqU27F5ovM4x22PBcUyKMg89oLoosr9qI2EPbB4rvAXypUuUwfavQoIGLibZuTE/bjlV8KjYPTMn6toJteH/71Z2pzP3+A0NdLB8wSnluaM52R+z8dX28WLB+ffciP/ctr442yrglLXgaNXcw8t2qrCBQY7tQkNw5BmdxtaiwliBYQk8BAomxs/3uYUlKXA8Tlz722A/j8XjWc0tgrtaG8TRfcbYWEtLQiH+rcAB0N1DcqB3uFWmTuzaXdMkz0pxNm9HHAZ/HuPrV7wsOmi5UCe3k1H1zHwfRUZhK8MI31oT388J4NBpB6pz3kcyKaVrAXNfM+YdHopkTNBLn1XF15E2+Ik2/kMrI6i3O10vj/I8H7MT/HMPmrCbGDx/m17eDTcMdhNhQ9LQ7MwuHrsK5NB2FsfkMU4ybHH0fu1lPtbK8yXIIUqvo6gOLGcgj58cJX+G1eiLfMZz3vyeSdoe95UYkbd7tvEwmk+fYNmI1aFCcxcEU9ga96nUaZjyP7o2SeFv97M9qA8qA56ACnvXCx9AZZr2VtbmZxnEyl4jHJROljiTZWOZZHLpfnESn0SieC2Njp4b3rOcfng5w9Wz+H+wqAvCvQvha3T3Frol/zVH+A/Bb34tJhPGvkRtllAkXE2K7x/wQXOd3AcTTn8D3JZksLAP+P8EaO7i+gfvFGEsSiFgTtImybnVrP2wUjf10OHAV8D1oOA7nlIkDQBtXl/wkehWn4i6EbNYmZtIarPeFWH4zkYnKcpGS/pS769adTP//0q9eZ3VBLb9kRcnXJ/T3ZlNRvsKwkC5R7n0rcSfJVuZ3N7/TBt+tES9skdbNecZ4TUalheNYub0t5By0Az/P9oO/YHgeb827jSXpXtDHRO02J6/93GyDdtYqxRdfOO/v23H5nSrtMzuJTtqC7/4DVvHLxg==" />

## De scene opzetten (optoneel)

We importeren alle modules die we nodig hebben. Om het gemakkelijker te maken zullen we de orbit-controls van cientos importeren en gebruiken,
[kijk hier om te zien hoe](/nl/cookbook/orbit-controls).

Laten we nu onze camera in de `[11,11,11]` positie plaatsen.

Om ons ten slotte te helpen met de locatie, voegen we een eenvoudig vlak toe, geroteerd in de X-as, met `[10, 10]` eenheden.

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

Zoals u weet is elke instantie in [ThreeJs](https://threejs.org/) beschikbaar in **TresJs**, en dat geldt ook voor `ShaderMaterial`. We hoeven alleen maar het voorvoegsel `Tres` toe te voegen om het te gebruiken.

Voor onze blob kunnen we een eenvoudige `SphereGeometry` gebruiken, waarbij enkele breedte- en hoogtesegmenten worden toegevoegd om een vloeiend effect te creëren, en onze blob 4 eenheden in de positieve Y-as plaatsen

```vue
<TresMesh :position="[0, 4, 0]">
  <TresSphereGeometry :args="[2, 32, 32]" />
  <TresShaderMaterial />
</TresMesh>
```

Het `ShaderMaterial` accepteert speciale eigenschappen, zoals `uniforms` `vertexShader` en `fragmentShader`, zodat we het in onze scriptsectie kunnen maken en de binding met onze instantie kunnen maken.

Voor dit voorbeeld zien onze uniformen er als volgt uit:

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

Onze fragment shader ziet er als volgt uit:

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

En tot slot onze vertexShader:

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

## De blob animeren

Vergelijkbaar met wat we leren in het voorbeeld van [Basic Animations](/nl/cookbook/basic-animations), beginnen we met het verwijzen naar onze blob, met behulp van [Template Ref](https://vuejs.org/guide/essentials/template-refs.html)

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
      <TresShaderMaterial :vertexShader="vertexShader" :fragmentShader="fragmentShader" :uniforms="uniforms"/>
    </TresMesh>
  </TresCanvas>
</template>
```
Zodra we dat hebben, kunnen we de `onLoop` callback gebruiken om onze `uTime` te animeren.

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

En dat is alles, onze basisshader werkt soepel. 🎉

## Gebruik van GLSL vite-pluging (optioneel)

_Deze stap is volledig optioneel en uit scope van het **TresJs** team_

Het inline definiëren van onze shader is niet altijd het beste idee, maar als u [vite](https://vitejs.dev/) gebruikt, kunt u uw `GLSL`-bestanden in een ander bestand plaatsen door gewoon de [vite-plugin-glsl](https://www.npmjs.com/package/vite-plugin-glsl) (bekijk de link voor de officiële documentatie).

En je zou een structuur kunnen hebben die er ongeveer zo uitziet:

```
├── src/
│   ├── myTresJsComponent.vue
│   ├── shaders/
│       ├── vertexShader.glsl
│       ├── fragmentShader.glsl
```
