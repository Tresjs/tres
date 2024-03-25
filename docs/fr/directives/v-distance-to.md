# v-distance-to

Avez-vous déja essayé de calculer la distance entre deux objets 3D?

Avec la nouvelle directive `v-distance-to` c'est plus facile que jamais, vous devez uniquement indiquer l'objet cible pour effectuer la mesure et le résultat apparaîtra dans votre console.

De plus, une flèche sera créée pour indiquer les objets que vous mesurez.

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

L'utilisation de `v-distance-to` est réactive, donc ça marche parfaitement avec @tres/leches 🍰.

::: warning
`v-distance-to` ne mesurera pas un objet en mouvement dans la renderLoop.
:::
