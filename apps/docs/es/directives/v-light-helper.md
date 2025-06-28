# v-light-helper 🔆

Con la nueva directiva v-light-helper proporcionada por **TresJS**, puedes agregar rápidamente el ayudante respectivo a tus luces con solo una línea de código 😍.

Se admiten las siguientes luces:
- DirectionalLight
- PointLight
- SpotLight
- HemisphereLight

## Uso

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
