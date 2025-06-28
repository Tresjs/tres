# v-light-helper 🔆

Met de nieuwe directive v-light-helper aangeboden door **TresJS**, kun je met slechts één regel code snel de betreffende helper aan je lampen toevoegen 😍.

De volgende lights worden ondersteund:
- DirectionalLight
- PointLight
- SpotLight
- HemisphereLight

## Gebruik

```vue{2,8,11,14,17}
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
