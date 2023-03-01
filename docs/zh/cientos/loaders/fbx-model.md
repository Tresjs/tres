# Using `FBXModel`

`FBXModel` 是 [`useFBX`](./use-fbx.md) 组合式函数对应的组件，它接受与 props 相同的选项。

```vue{2,10}
<script setup lang="ts">
import { OrbitControls, FBXModel } from '@tresjs/cientos'
</script>
<template>
  <Suspense>
    <TresCanvas clear-color="#82DBC5" shadows alpha>
      <TresPerspectiveCamera :position="[11, 11, 11]" />
      <OrbitControls />
      <TresScene>
        <FBXModel path="/models/AkuAku.fbx" />
        <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
```

## Props

| Prop   | Description             | Default     |
| :----- | :---------------------- | ----------- |
| `path` | Path to the model file. | `undefined` |
