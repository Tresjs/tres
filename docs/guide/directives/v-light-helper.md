# v-light-helper 🔆

With the new directive v-light-helper provided by **TresJS**, you can add fast the respective helper to your lights with just one line of code 😍.

```vue{3}
<script setup lang="ts">
import { OrbitControls, Sphere, vLightHelper } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <TresDirectionalLight
        v-light-helper
      />
      <TresPointLight
        v-light-helper
      />
      <TresSpotLight
        v-light-helper
      />

      <TresHemisphereLight
        v-light-helper
      />
  </TresCanvas>
</template>
```

::: warning
This directive just work with the following lights:DirectionalLight,PointLight, SpotLight, HemisphereLight.
By this way you can't tweaks the props for the helper if you need to do that, please use the normal helper instance
:::
