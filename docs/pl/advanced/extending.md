# Rozszerzania 🔌

Tres oferuje podstawową funkcjonalność, ale łatwo można dodać elementy zewnętrzne i rozszerzyć je do wewnętrznego katalogu.

Większość doświadczeń 3D wykorzystuje `OrbitControls`, który nie jest częścią biblioteki głównej. Możesz dodać go do swojego projektu, importując go z modułu `three/addons/controls/OrbitControls`.

```js
import { OrbitControls } from "three/addons/controls/OrbitControls";
```

## Dynamiczne rozszerzanie elementu

Możesz również dodawać go dynamicznie w swoich komponentach:

```vue {2,3,4,7,13,15}
<script setup lang="ts">
import { extend } from "@tresjs/core";
import { OrbitControls } from "three/addons/controls/OrbitControls";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

// Añadimos OrbitControls al catalogo interno
extend({ TextGeometry, OrbitControls });
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <TresOrbitControls
      v-if="state.renderer"
      :args="[state.camera, state.renderer?.domElement]"
    />
    <TresMesh>
      <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
      <TresMeshMatcapMaterial :matcap="matcapTexture" />
    </TresMesh>
  </TresCanvas>
</template>
```
