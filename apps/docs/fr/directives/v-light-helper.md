# v-light-helper 🔆

Avec la nouvelle directive v-light-helper fourni par **TresJS**, vous pouvez ajouter rapidement l'assistant correspondant à vos lumières avec une seule ligne de code 😍.

Les lumières suivantes sont prises en charge:
- DirectionalLight
- PointLight
- SpotLight
- HemisphereLight

## Usage

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
