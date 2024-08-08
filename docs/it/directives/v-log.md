# v-log

### Problema

Quando hai bisogno di loggare la tua instanza hai bisogno di creare prima una reference:

```vue
<script setup lang="ts">
import { shallowRef, watch } from "vue";

const sphereRef = shallowRef();

watch(sphereRef, (value) => {
  console.log(value); // Davvero solo per un log?!!! 😫
});
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera :position="[0, 2, 5]" />
    <Sphere ref="sphereRef" :scale="0.5" />
    <OrbitControls />
  </TresCanvas>
</template>
```

Non trovi che sia troppo codice per un semplice log?

## Utilizzo

Con la nuova direttiva v-log fornita da **TresJS**, potete farlo semplicemente aggiungendo `v-log` all'istanza.

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
      v-log:material  <!-- mostrerà solo il materiale 🎉 -->
    />
    <OrbitControls v-log />
  </TresCanvas>
</template>
```

Nota che puoi passare un modificatore con il nome di una proprietà, per esempio `v-log:material`, e registrerà direttamente la proprietà `material` 😍
