# v-distance-to

Hai provato a calcolare la distanza tra due oggetti 3D?

Con la nuova direttiva`v-distance-to` è più facile che mai, si dovrebbe solo indicare l'oggetto di destinazione per eseguire la misura e il risultato apparirà nella console.

Inoltre, verrà creata una freccia per indicare quali oggetti stai misurando.

```vue{2,8,13}
<script setup lang="ts">
import { OrbitControls, Sphere, vLog } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphere1Ref"
      :position="[-2, slider, 0]"
      :scale="0.5"
    />
    <Sphere
      v-distance-to="sphere1Ref"
      :position="[2, 0, 0]"
      :scale="0.5"
    />
    <TresGridHelper :args="[10, 10]" />
    <OrbitControls />
  </TresCanvas>
</template>
```

L'uso di `v-distance-to` è reattivo, quindi funziona perfettamente con @tres/leches 🍰.

::: warning
`v-distance-to` non misurerà un oggetto in movimento all'interno del renderLoop.
:::
