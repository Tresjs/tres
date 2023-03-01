# 扩展 🔌

Tres 提供了基础的功能，但很容易添加第三方元素并将其扩展到其内部目录中。

## 添加第三方元素

大多数 3D 效果都会使用非 Three 核心模块中的 `OrbitControls` 。在 TresJS 中添加它，只需要引入该模块并在安装插件的时候作为 `extends` 的属性值即可:

```js
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

app.use(plugin, {
  extends: {
    OrbitControls,
  },
});
```

TresJS 自动将 `<TresOrbitControls>` 添加到目录中，然后您可以直接在模板中使用:

```vue
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <TresScene>
      <TresOrbitControls
        v-if="state.renderer"
        :args="[state.camera, state.renderer?.domElement]"
      />
    </TresScene>
  </TresCanvas>
</template>
```

## 动态扩展元素 <Badge type="tip" text="^1.1.0" />

你同样可以在某个组件中动态添加第三方元素:

```vue{2,3,5,8,17,19}
<script setup lang="ts">
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const { extend } = useCatalogue()

// Add the element to the catalogue
extend({ TextGeometry, OrbitControls })

/* Rest of the code */
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <TresScene>
      <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
      <TresMesh>
        <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
        <TresMeshMatcapMaterial :matcap="matcapTexture" />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
```
