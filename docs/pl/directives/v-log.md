# v-log

### Problem

Kiedy musisz zalogować swoją instancję, musisz użyć referencji szablonu, a następnie zalogować je:

```vue
<script setup lang="ts">
import { shallowRef, watch } from "vue";

const sphereRef = shallowRef();

watch(sphereRef, (value) => {
  console.log(value); // Really for a log?!!! 😫
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

I to jest DUŻO kodu tylko dla prostego loga, prawda?

## Użycie

Dzięki nowej dyrektywie v-log dostarczanej przez **TresJS**, możesz to zrobić, dodając `v-log` do instancji.

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
      v-log:material  <!-- wyświetli tylko materiał 🎉 -->
    />
    <OrbitControls v-log />
  </TresCanvas>
</template>
```

Zauważ, że możesz przekazać modyfikator o nazwie właściwości, na przykład `v-log:material` i zostanie bezpośrednio dodana właściwość `material` 😍
