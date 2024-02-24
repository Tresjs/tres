# v-always-look-at 👀

Mit der neuen Direktive `v-always-look-at`, die von **TresJS** bereitgestellt wird, kannst du ein [Object3D](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D) anweisen, immer eine spezifische Position anzuschauen. Dies kann als Vector3 oder Array übergeben werden.

## Benutzung

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

Egal, wohin sich die Box bewegt, sie wird immer auf die Position [0,0,0] ausgerichtet sein.

### Warum nicht die eingebaute Methode look-at verwenden?

Eine berechtigte Frage wäre, warum man nicht die `:look-at`-Methode direkt in der Komponente verwenden sollte.

Die Antwort ist, dass mit der Methode `:look-at` angegeben wird, dass die Position nur einmal beim Mounten der Instanz angeschaut wird. Wenn sich das Objekt ändert, wird dies nicht aktualisiert.

### Du kannst auch andere Instanzen anschauen!

Ein weiterer Vorteil ist, dass du mit der Kamera auch nicht-stationäre Objekte beobachten kannst:

Zum Beispiel:

```vue{4,6,20,23}
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

// Die Position der Kugel wird verändert, aber die Kamera folgt ihr.
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
