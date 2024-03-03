# Erweitern 🔌

Tres bietet grundlegende Funktionalitäten, aber es ist einfach, Drittanbieterelemente hinzuzufügen und den internen Katalog zu erweitern.

Die meisten 3D-Szenen nutzen `OrbitControls`, die allerdings nicht Teil der Hauptbibliothek sind. Um es zu deinem Projekt hinzufügen, kannst du es aus dem Modul `three/addons/controls/OrbitControls` importieren.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

## Ein Element dynamisch erweitern

Oder du erweiterst den Katalog dynamisch innerhalb deiner Komponente:

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
