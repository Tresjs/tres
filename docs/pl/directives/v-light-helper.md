# v-light-helper 🔆

Dzięki nowej dyrektywie **TresJS**, dostarczanej przez TresJS, możesz szybko dodać odpowiedniego pomocnika do swoich świateł za pomocą zaledwie jednej linii kodu 😍.

Obsługiwane są następujące światła:

- DirectionalLight
- PointLight
- SpotLight
- HemisphereLight

## Użycie

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
