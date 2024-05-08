# Étendre 🔌

Tres offre les fonctionnalités de base, mais il est facile d'ajouter des éléments tiers et de les étendre dans votre catalogue interne.

La plupart des expériences 3D utilisent « OrbitControls », qui ne fait pas partie de la bibliothèque principale. Vous pouvez l'ajouter à votre projet en l'important depuis le module`three/addons/controls/OrbitControls`.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

## Étendre un élément dynamiquement

Vous pouvez également l'ajouter dynamiquement dans vos composants :

```vue {2,3,4,7,13,15}
<script setup lang="ts">
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

// Nous ajoutons OrbitControls au catalogue interne
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
```
