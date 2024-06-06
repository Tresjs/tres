# 継承する 🔌

Tres は基本的な機能を提供しますが、サードパーティのエレメントを簡単に追加できます。

ほとんどの3Dシーンは基本ライブラリーの一部とならないの`OrbitControls`というものを利用しています。`three/addons/controls/OrbitControls`からインポートしたらご利用可能になります。

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

## エレメントを動的に拡張する

コンポーネントに動的に追加も可能です。

```vue {2,3,4,7,13,15}
<script setup lang="ts">
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'
// エレメントを追加する
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
