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
