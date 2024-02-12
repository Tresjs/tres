# v-always-look-at 👀

使用 **TresJS** 提供的新指令 `v-always-look-at`，您可以轻松地使 [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) 始终朝向特定位置，可以传入 Vector3 对象或数组。

## 推荐使用

```vue{3,9}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <Box
        v-always-look-at="new Vector3(0, 0, 0)"
      />
  </TresCanvas>
</template>
```
无论 Box 移动到何处，它都将始终朝向位置 [0,0,0]。

### 为什么不使用内置的 look-at 方法呢？

您可能会问，我可以直接在组件中使用 `:look-at` 方法，为什么我需要这个呢？

答案是使用 `:look-at` 方法时，您只会在实例挂载时指示其一次性朝向该位置，然后如果对象更改，它将不会更新。

### 您还可以查看其他实例！

另一个优势是您可以查看一个在移动中的实例，例如使用相机，如下所示：

```vue{4,6,20,23}
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

// 在这里，我们更新了球体的位置，相机将始终跟随该对象
onLoop(({ elapsed }) => {
  if (sphereRef.value) {
    sphereRef.value.value.position.y = Math.sin(elapsed) * 1.5
  }
})
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]"
        v-always-look-at="sphereRef"
      />
      <Sphere
        ref="sphereRef"
        :scale="0.5"
      />
  </TresCanvas>
</template>
```
