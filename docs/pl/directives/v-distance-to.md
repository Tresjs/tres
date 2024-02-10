# v-distance-to

Czy próbowałeś obliczyć odległość między dwoma Object3D?

Dzięki nowej dyrektywie `v-distance-to` jest to łatwiejsze niż kiedykolwiek wcześniej. Wystarczy tylko wskazać obiekt docelowy do wykonania pomiaru, a wynik pojawi się w konsoli.

Dodatkowo zostanie utworzona strzałka wskazująca, które obiekty są mierzone.

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

Użycie `v-distance-to` jest reaktywne, więc doskonale współpracuje z @tres/leches 🍰.

::: Uwagi
`v-distance-to` nie zmierzy obiektu w ruchu w ramach renderLoop.
:::
