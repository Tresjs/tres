# v-light-helper 🔆

With the new directive v-light-helper provided by **TresJS**, you can quickly add the respective helper to your lights with just one line of code 😍.

The following lights are supported:
- DirectionalLight
- PointLight
- SpotLight
- HemisphereLight
- RectAreaLightHelper

## Usage

```vue{2,8,11,14,17}
<script setup lang="ts">
import { vLightHelper } from '@tresjs/core'
import { OrbitControls, Sphere,  } from '@tresjs/cientos'
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
