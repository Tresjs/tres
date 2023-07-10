# Extend 🔌

Tres offers bare bones functionality, but it's easy to add third-party elements and extend them into its internal catalogue.

Most of 3D experience uses `OrbitControls` which is not part of the core library. You can add it to your project by importing it from the `three/addons/controls/OrbitControls` module.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

## Extending an element dynamically

Or you can also add it dynamically in your components:

```vue {2,3,4,7,13,15}
<script setup lang="ts">
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

// Add the element to the catalogue
extend({ TextGeometry, OrbitControls })
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
    <TresMesh>
      <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
      <TresMeshMatcapMaterial :matcap="matcapTexture" />
    </TresMesh>
  </TresCanvas>
</template>
```
