# Uitbreiden 🔌

Tres biedt eenvoudige functionaliteit, maar het is eenvoudig om elementen van derden toe te voegen en deze uit te breiden naar de interne catalogus.

Het grootste deel van de 3D-ervaring maakt gebruik van `OrbitControls`, wat geen deel uitmaakt van de kernbibliotheek. U kunt het aan uw project toevoegen door het te importeren vanuit de module `three/addons/controls/OrbitControls`.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

## Een element dynamisch uitbreiden

Of u kunt het ook dynamisch toevoegen aan uw componenten:

```vue {2,3,4,7,13,15}
<script setup lang="ts">
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

// Voeg het element toe aan de catalogus
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
