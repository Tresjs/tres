# 扩展 🔌

Tres 提供基本功能，但可以轻松添加第三方元素并将其扩展到内部目录中。

大部分 3D 体验使用的是 `OrbitControls`，但是它不是核心库的一部分。您可以从 `three/addons/controls/OrbitControls` 模块中导入，将其添加到您的项目中。

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

## 动态扩展元素

或者也可以在组件中动态添加：

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
