# v-log

### Problem

Wenn du deine Instanz loggen möchtest, musst du normalerweise die Template-Referenz verwenden und diese dann loggen:

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

Das ist VIEL Code nur für ein einfaches Log, oder?

## Benutzung

Mit der neuen Direktive v-log, die von **TresJS** bereitgestellt wird, kannst du das gleiche tun, indem du einfach `v-log` zur Instanz hinzufügst.

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

Du kannst auch einen Modifikator mit dem Namen einer Eigenschaft übergeben. Zum Beispiel `v-log:material`, damit direkt die `material` Eigenschaft gelogged wird 😍.
