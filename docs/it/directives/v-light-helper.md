# v-light-helper 🔆

Con la nuova direttiva v-light-helper fornita da \*TresJS\*\*, puoi aggiungere rapidamente il rispettivo helper alle tue luci con una sola riga di codice 😍.

Sono supportate le seguenti luci:

- Luce direzionale
- PointLight
- riflettori
- Luce per l'illuminazione

## Utilizzo

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
