# v-log

### Problème

Lorsque vous devez logger votre instance, vous devez utiliser la référence du modèle, puis vous pouvez logger:

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

Ça fait BEAUCOUP de code pour un simple log non?

## Usage

Avec la nouvelle directive v-log fourni par **TresJS**, vous pouvez le faire en ajoutant simmplement `v-log` à votre instance.

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

Notez que vous pouvez passer un modificateur avec le nom d'une propriété, par exemple `v-log:material`, et loggez directement la propriété `material` 😍
