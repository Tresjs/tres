# v-distance-to

¿Has intentado calcular la distancia entre dos Object3D?

Con la nueva directiva `v-distance-to` es más fácil que nunca, solo debes indicar el objeto objetivo para realizar la medida y el resultado aparecerá en tu consola.

Además, se creará una flecha para indicar qué objetos estás midiendo.

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

El uso de `v-distance-to` es reactivo, por lo que funciona perfectamente con @tres/leches 🍰.

::: warning
`v-distance-to` no medirá un objeto en movimiento dentro del renderLoop.
:::
