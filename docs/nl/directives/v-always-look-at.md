# v-always-look-at 👀

Met de nieuwe directive v-always-look-at aangeboden door **TresJS**, kunt u eenvoudig een opdracht [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) toevoegen om altijd naar een specifieke positie te kijken, dit kan worden doorgegeven als een Vector3 of een Array.

## Gebruik

```vue{3,9}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]" />
      <Box
        v-always-look-at="new Vector3(0, 0, 0)"
      />
  </TresCanvas>
</template>
```
Het maakt niet uit waar de 'Box'-beweging naartoe gaat, er wordt altijd naar de positie [0,0,0] gekeken

### Waarom zou u niet de ingebouwde methode 'look-at' gebruiken?

Je zou kunnen vragen: dit is prima, maar ik kan de `:look-at`-methode rechtstreeks in de component gebruiken, waarom zou ik dit nodig hebben?

Het antwoord is dat je met de methode `:look-at` aangeeft dat je slechts één keer naar die positie wilt kijken, wanneer de instantie is aangekoppeld. Als het object verandert, wordt dit niet bijgewerkt.

### Je kunt ook naar een andere instantie kijken!

Een ander voordeel is dat je bijvoorbeeld met de camera een bewegende instantie als volgt kunt bekijken:

```vue{4,6,20,23}
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

// hier werken we de positie van de bol bij en zal de camera het object altijd volgen
onLoop(({ elapsed }) => {
  if (sphereRef.value) {
    sphereRef.value.value.position.y = Math.sin(elapsed) * 1.5
  }
})
</script>
<template>
    <TresCanvas >
      <TresPerspectiveCamera :position="[0, 2, 5]"
        v-always-look-at="sphereRef"
      />
      <Sphere
        ref="sphereRef"
        :scale="0.5"
      />
  </TresCanvas>
</template>
```
