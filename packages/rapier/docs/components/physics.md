# Physics

The `<Physics />` component act as a provider and it need to wrapper our
physic scene.

```vue{4,10-14}
<script setup lang="ts" >
import { TresCanvas } from '@tresjs/core'
import { Physics } from '@tresjs/rapier'
</script>
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera :position="[11, 11, 11]" :look-at="[0, 0, 0]" />
    <Suspense>
      <Physics>
        // your scene with physics goes here
      </Physics>
    </Suspense>
  </TresCanvas>
</template>
```

:::warning
 Note that in order to work the `<Physics />` needs to be wrapped in a
`<Suspense >` component
:::

## Props

| Prop      | Description                   | default |
| :-------- | :---------------------------- | :------ |
| `gravity` | Sets the gravity of the world | `[0, -9.8, 0]` |
| `debug`   | Enables debug mode            | `false` |
| `timestep`   | Sets the new simulation timestep in seconds.          | `1` |

## Expose object

SOON
