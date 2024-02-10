# WIP
<!-- # Extender 🔌

Tres ofrece la funcionalidad básica, pero es fácil agregar elementos de terceros y extenderlos en su catálogo interno.

La mayoría de las experiencias en 3D utilizan `OrbitControls`, que no forma parte de la biblioteca principal. Puedes agregarlo a tu proyecto importándolo desde el módulo `three/addons/controls/OrbitControls`.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

## Extender un elemento dinámicamente

También puedes agregarlo dinámicamente en tus componentes:

```vue {2,3,4,7,13,15}
<script setup lang="ts">
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

// Añadimos OrbitControls al catalogo interno
extend({ TextGeometry, OrbitControls })
</script>

<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <TresOrbitControls
      v-if="state.renderer"
      :args="[state.camera, state.renderer?.domElement]"
    />
    <TresMesh>
      <TresTextGeometry
        :args="['TresJS', { font, ...fontOptions }]"
        center
      />
      <TresMeshMatcapMaterial :matcap="matcapTexture" />
    </TresMesh>
  </TresCanvas>
</template>
``` -->
