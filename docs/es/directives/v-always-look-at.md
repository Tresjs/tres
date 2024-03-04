# v-always-look-at 👀

Con la nueva directiva v-always-look-at proporcionada por **TresJS**, puedes agregar fácilmente un comando [Object3D](https://tresjs.org/docs/index.html?q=object#api/en /core/Object3D) para mirar siempre una posición específica, esto podría pasarse como Vector3 o Array.

## Uso

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
No importa dónde se mueva la caja, siempre se observará la posición [0,0,0]

### ¿Por qué no utilizar el método integrado de revisión?

Podrías preguntar, esto está bien, pero puedo usar el método `:look-at` directamente en el componente, ¿por qué debería necesitar esto?

La respuesta es que con el método `:look-at` se te indicará mirar esa posición solo una vez, cuando la instancia esté montada, luego si el objeto cambia esto no se actualizará.

### ¡Puedes observar otra instancia también!

Otra ventaja es que puedes observar una instancia en movimiento, por ejemplo con la cámara, así:

```vue{4,6,20,23}
<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { Box, vAlwaysLookAt } from '@tresjs/cientos'

const sphereRef = shallowRef()

const { onLoop } = useRenderLoop()

// here we update the position of the sphere and the camera will always follow the object
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
