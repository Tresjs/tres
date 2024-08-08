# v-always-look-at 👀

Con la nuova direttiva v-always-look-at fornita da **TresJS**, è possibile aggiungere facilmente un comando [Object3D](https://threejs.org/docs/index.html"q=object#api/en/core/Object3D) per guardare sempre una posizione specifica, questo potrebbe essere passato come Vector3 o Array.

## Utilizzo

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

Non importa dove il `Box` si muoverà guarderà sempre alla posizione [0,0,0]

### Perché non usare il metodo integrato look-at?

Si potrebbe chiedere, questo va bene ma posso usare il metodo `:look-at` direttamente nel componente, perché dovrei averne bisogno?

La risposta è che con il metodo `:look-at` indicherai di guardare quella posizione solo una volta, quando l'istanza è montata, quindi se l'oggetto cambia questo non verrà aggiornato.

### Puoi guardare anche altre istanze!

Un altro vantaggio è che puoi guardare un'istanza in movimento, ad esempio con la fotocamera, in questo modo:

```vue{4,6,20,23}
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

// qui aggiorniamo la posizione della sfera e la fotocamera seguirà sempre l'oggetto
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
