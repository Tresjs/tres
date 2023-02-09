# Extend 🔌

Tres offers bare bones functionality, but it's easy to add third-party elements and extend them into its internal catalogue.

## Adding a third-party element

Most of 3D experience uses `OrbitControls` which is not part of the core library. To add it, you need to import it and add it to the `extends` option when installing the plugin:

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

app.use(plugin, {
  extends: {
    OrbitControls,
  },
})
```

This will automatically add a `<TresOrbitControls>` to the catalogue, so you can use it in your templates:

```vue
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <TresScene>
      <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
    </TresScene>
  </TresCanvas>
</template>
```

## Extending an element dynamically <Badge type="tip" text="^1.1.0" />

Or you can also add it dynamically in your components:

```vue{2,3,5,8,17,19}
<script setup lang="ts">
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const { extend } = useCatalogue()

// Add the element to the catalogue
extend({ TextGeometry, OrbitControls })

/* Rest of the code */
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[5, 5, 5]" />
    <TresScene>
      <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
      <TresMesh>
        <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
        <TresMeshMatcapMaterial :matcap="matcapTexture" />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
```
