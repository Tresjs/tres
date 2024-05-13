# v-rotate  <Badge type="warning" text="deprecated since v4" />

::: warning
This directive has been removed on the `v4` due incompatibility with the new renderer loop.
:::

## Problem

When you want to simply add rotation to your mesh, you have to use the template reference, [useRenderLoop](/api/composables#userenderloop) and then assign the axis and the speed, but before check if you mesh is already available:

```vue
<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { useRenderLoop } from '@tresjs/core'

const boxRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  if (boxRef.value) {
    boxRef.value.rotation.x = elapsed
  }
})
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <TresMesh
      ref="boxRef"
      :scale="0.5"
    >
      <TresBoxGeometry />
      <TresMesh>
        <OrbitControls />
      </TresMesh>
    </TresMesh>
  </TresCanvas>
</template>
```

And is A LOT of code just for a simple rotation right? Normally we need something fast to see if something is working

## Usage

With the new directive v-rotate provided by **TresJS**, you can do this by just adding `v-rotate` to the instance.

```vue{2,8}
<script setup lang="ts">
import { vRotate } from '@tresjs/core'
</script>
<template>
    <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <TresMesh
      v-rotate // 😍
    >
      <TresBoxGeometry />
    </TresMesh>
  </TresCanvas>
</template>
```
By default `v-rotate` uses [Quaternions](https://threejs.org/docs/index.html?q=quater#api/en/math/Quaternion) so you don't have to worry by [Gimbal Lock](https://en.wikipedia.org/wiki/Gimbal_lock), or check if you mesh is available in the first frames.

## Modifiers

You can control the axis and the rotation speed by adding modifiers

```vue{2,8}
<script setup lang="ts">
import { vRotate } from '@tresjs/core'
</script>
<template>
    <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <TresMesh
      v-rotate:x.y="0.1" // the axis will be x and y with a speed of 0.1
    >
      <TresBoxGeometry />
    </TresMesh>
  </TresCanvas>
</template>
```
