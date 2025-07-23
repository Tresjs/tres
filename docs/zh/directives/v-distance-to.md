# v-distance-to

你有尝试过计算两个Object3Ds之间的距离吗？

有了新的指令 `v-distance-to` ，比之前更容易了，你只需指定目标对象进行测量，结果将打印在控制台中。

此外，将创建一个箭头来指示你正在测量的对象。

```vue{2,8,13}
<script setup lang="ts">
import { OrbitControls, Sphere, vDistanceTo } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphere1Ref"
      :position="[-2, slider, 0]"
      :scale="0.5"
    />
    <Sphere
      v-distance-to="sphere1Ref"
      :position="[2, 0, 0]"
      :scale="0.5"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
```

`v-distance-to`是响应式的，因此它与 @tres/leches 完美配合🍰.

::: warning
`v-distance-to` 不会在renderLoop中测量运动中的对象。
:::
