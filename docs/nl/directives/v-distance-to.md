# v-distance-to

Heb je geprobeerd de afstand tussen twee Object3D's te berekenen?

Met de nieuwe directive `v-distance-to` is het eenvoudiger dan ooit, u hoeft alleen het doelobject aan te geven om de meting uit te voeren en het resultaat zal in uw console verschijnen.

Bovendien wordt er een pijl gemaakt om aan te geven welke objecten u meet.

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

Het gebruik van `v-distance-to` is reactief, dus het werkt perfect met @tres/leches 🍰.

::: warning
`v-distance-to` meet geen object in beweging binnen de renderLoop.
:::
