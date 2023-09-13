# v-log

### Problem

When you have to log your instance you have to use the template reference and then log them:

```vue{3}
<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const sphereRef = shallowRef()

watch(sphereRef, value => {
    console.log(value) // Really for a log?!!! 😫
})
</script>
<template>
    <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
    />
    <OrbitControls />
  </TresCanvas>
</template>
```

And is A LOT of code just for a simple log right?

## Solution

With the new directive v-log provided by **TresJS**, you can do this by just adding `v-log` to the instance.

```vue{3}
<script setup lang="ts">
import { OrbitControls, Sphere, vLog } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
      v-log:material  <!-- will print just the material 🎉 -->
    />
    <OrbitControls v-log />
  </TresCanvas>
</template>
```

Note that you can pass a modifier with the name of a property, for example `v-log:material`, and will log directly the `material` property 😍

::: warning
The component `<TresCanvas >` will not log the canvas or the scene.
:::
