# v-always-look-at 👀

With the new directive v-always-look-at provided by **TresJS**, you can add easily command an [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) to always look at a specific position, this could be passed as a Vector3 or an Array.

```vue{3}
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
No matter where the Box move will always look-at the position [0,0,0]

### Why not use the in built method look-at?

You could ask, this is fine but I can use the :look-at method directly in the component, why should I need this?

The answers is that with the method :look-at you will indicated to look at that position just once, when the instance is mounted, then if the object changes this will not get updated

## You can look at other instance too!

Another advantage is that you can look at an instance in movement, for example with the camera, like so:

```vue{3}
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

// here we update the position of the sphere and the camera will always follow the object
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
