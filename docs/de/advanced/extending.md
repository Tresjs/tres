# Erweitern 🔌

Tres bietet grundlegende Funktionalitäten, aber es ist einfach, Drittanbieterelemente hinzuzufügen.

Die meisten 3D-Erlebnisse nutzen `OrbitControls`, die nicht Teil der Hauptbibliothek sind. Du kannst sie zu deinem Projekt hinzufügen, indem du sie aus dem Modul `three/addons/controls/OrbitControls` importierst.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

## Ein Element dynamisch erweitern

Du kannst es auch dynamisch in deinen Komponenten hinzufügen:

```vue {2,3,4,7,13,15}
<script setup lang="ts">
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

// Element dem Katalog hinzufügen
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
