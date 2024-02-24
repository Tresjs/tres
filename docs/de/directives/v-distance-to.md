# v-distance-to

Hast du schon einmal versucht, die Distanz zwischen zwei Object3Ds zu berechnen?

Mit der neuen Direktive `v-distance-to` ist es einfacher als je zuvor. Du musst nur das Zielobjekt für die Messung angeben und das Ergebnis wird in deiner Konsole erscheinen.

Zusätzlich wird ein Pfeil erstellt, um anzuzeigen, welche Objekte du misst.

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

Die Verwendung von `v-distance-to` ist reaktiv, sodass sie perfekt mit `@tres/leches` 🍰 funktioniert.

::: warning
`v-distance-to` wird kein Objekt in Bewegung innerhalb des RenderLoops messen.
:::