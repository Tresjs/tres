# v-always-look-at 👀

 Avec la nouvelle directive v-always-look-at fournie par **TresJS**, vous pouvez facilement ajouter une commande à un [Objet 3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) pour toujours regarder une position spécifique, cela pourrait être passé en tant que Vector3 ou Array..

## Usage

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
Peu importe où la boîte se déplace, elle regardera toujours la position [0,0,0]

### Pourquoi ne pas utiliser la méthode intégrée look-at?

Vous pourriez demander, c'est bien mais je peux utiliser la méthode `:look-at` directement dans le composant, pourquoi aurais-je besoin de ça?

La réponse est qu'avec la méthode `:look-at`, vous indiquerez de regarder cette position une seule fois, lorsque l'instance est montée, puis si l'objet change, il ne sera pas mis à jour.

### Vous pouvez également consulter une autre instance!

Un autre avantage est que vous pouvez regarder une instance en mouvement, par exemple avec la caméra, comme ceci:

```vue{4,6,20,23}
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

// ici nous mettons à jour la position de la sphère et la caméra suivra toujours l'objet
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
