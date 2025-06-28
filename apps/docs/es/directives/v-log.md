# v-log

### Problema

Cuando tenga que registrar su instancia, debe usar la referencia de la plantilla y luego registrarla:

```vue
<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const sphereRef = shallowRef()

watch(sphereRef, (value) => {
  console.log(value) // Really for a log?!!! 😫
})
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
    />
    <OrbitControls />
  </TresCanvas>
</template>
```

¿Y hay MUCHO código solo para un simple registro, verdad?

## Uso

Con la nueva directiva v-log proporcionada por **TresJS**, puedes hacer esto simplemente agregando `v-log` a la instancia.

```vue{2,10,12}
<script setup lang="ts">
import { OrbitControls, Sphere, vLog } from '@tresjs/cientos'
</script>
<template>
    <TresCanvas >
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere
      ref="sphereRef"
      :scale="0.5"
      v-log:material  <!-- will print just the material 🎉 -->
    />
    <OrbitControls v-log />
  </TresCanvas>
</template>
```

Tenga en cuenta que puede pasar un modificador con el nombre de una propiedad, por ejemplo `v-log:material`, y registrará directamente la propiedad `material` 😍
