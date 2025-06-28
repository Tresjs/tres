# v-log

### 实际场景
当你需要记录实例时，你需要使用 `ref` 引用，然后将它们记录下来：

```vue
<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const sphereRef = shallowRef()

watch(sphereRef, (value) => {
  console.log(value) // 只是为了记录log?!!! 😫
})
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
    />
    <OrbitControls />
  </TresCanvas>
</template>
```
为了简单的日志而添加了大量的代码？

## 推荐使用

通过 **TresJS** 提供的新指令 `v-log` ，您可以通过将其添加到实例中来记录日志。

```vue{2,10,12}
<script setup lang="ts">
import { OrbitControls, Sphere, vLog } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
      v-log:material  <!-- 仅打印材质 🎉 -->
    />
    <OrbitControls v-log />
  </TresCanvas>
</template>
```

请注意，可以配置一个修饰符，使用属性的名称，例如 `v-log:material`，将直接记录 material 属性。😍
