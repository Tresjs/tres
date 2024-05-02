# Extend 🔌

Tres offre funzionalità bare bones, ma è facile aggiungere elementi di terze parti ed estenderli nel suo catalogo interno.

La maggior parte dell'esperienza 3D utilizza`OrbitControls` che non fa parte della libreria principale. Puoi aggiungerlo al tuo progetto importandolo dal modulo `three/addons/controls/OrbitControls` .

```js
import { OrbitControls } from "three/addons/controls/OrbitControls";
```

## Estendere dinamicamente un elemento

Oppure puoi aggiungerlo dinamicamente nei tuoi componenti:

```vue {2,3,4,7,13,15}
<script setup lang="ts">
import { extend } from "@tresjs/core";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

// Aggiungere l'elemento al catalogo
extend({ TextGeometry, OrbitControls });
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
