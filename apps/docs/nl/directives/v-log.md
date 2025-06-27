# v-log

### Probleem

Wanneer u uw instantie moet loggen, moet u de template reference gebruiken en deze vervolgens loggen:

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

Vind je niet dat dat dit VEEL code is voor een simpele log?

## Gebruik

Met de nieuwe directive v-log aangeboden door **TresJS**, kun je dit doen door aleen `v-log` toe te voegen aan de instantie.

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
      v-log:material  <!-- zal alleen het materiaal loggen 🎉 -->
    />
    <OrbitControls v-log />
  </TresCanvas>
</template>
```

Houd er rekening mee dat u een modifier kunt doorgeven met de naam van een eigenschap, bijvoorbeeld `v-log:material`, en deze zal direct de `material` eigenschap loggen 😍
