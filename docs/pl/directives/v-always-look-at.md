# v-always-look-at 👀

Dzięki nowej dyrektywie v-always-look-at dostarczonej przez **TresJS**, możesz łatwo zadbać o to, aby [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) zawsze patrzył na określoną pozycję, którą można przekazać jako Vector3 lub tablicę.

## Użycie

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

Nie ważne, gdzie przeniesiesz Box, zawsze patrzy na pozycję [0,0,0].

### Dlaczego nie używać wbudowanej metody look-at?

Możesz zapytać, dlaczego nie używać metody `:look-at` bezpośrednio w komponencie? Dlaczego potrzebuję tego?

Odpowiedź brzmi, że za pomocą metody `:look-at` wskażesz, aby patrzył na tę pozycję tylko raz, gdy instancja jest zamontowana, a następnie, jeśli obiekt się zmieni, to nie zostanie zaktualizowany.

### Możesz patrzeć na inne instancje też!

Inną zaletą jest to, że możesz patrzeć na instancję w ruchu, na przykład z kamerą, tak:

```vue{4,6,20,23}
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

// tutaj aktualizujemy pozycję kuli, a kamera zawsze będzie podążać za obiektem
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
