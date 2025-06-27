# v-light-helper 🔆

Mit der neuen Direktive `v-light-helper`, die von **TresJS** bereitgestellt wird, kannst du schnell den entsprechenden Helfer zu deinen Lichtern hinzufügen.

Die folgenden Lichter werden unterstützt:
- DirectionalLight
- PointLight
- SpotLight
- HemisphereLight

## Usage

```vue{2,8,11,14,17}
<script setup lang="ts">
import { vLightHelper } from '@tresjs/core'
import { OrbitControls, Sphere } from '@tresjs/cientos'
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
