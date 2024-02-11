# v-log

### Problem

Wenn du deine Instanz loggen musst, musst du die Template-Referenz verwenden und diese dann loggen:

```vue
<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const sphereRef = shallowRef()

watch(sphereRef, (value) => {
  console.log(value) // Echt jetzt?!!! 😫
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

Und das ist VIEL Code nur für ein einfaches Log, nicht wahr?

## Benutzung

Mit der neuen Direktive v-log, die von **TresJS** bereitgestellt wird, kannst du dies tun, indem du einfach `v-log` zur Instanz hinzufügst.

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
      v-log:material  <!-- wird nur das Material loggen 🎉 -->
    />
    <OrbitControls v-log />
  </TresCanvas>
</template>
```

Beachte, dass du einen Modifikator mit dem Namen einer Eigenschaft übergeben kannst, zum Beispiel `v-log:material`, und es wird direkt die `material` Eigenschaft gelogged 😍
