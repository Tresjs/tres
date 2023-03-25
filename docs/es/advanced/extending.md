# Extender 🔌

Tres se ofrece funcionalidad esencial, pero está fácil a añadir elementos externos y extenderles en su catálogo internal.

## Añadir un element externo

La mayoría de experiencias 3D usa `OrbitControls` que no es una parte de la biblioteca core. Para añadirle, necesitas importarle y añadirle a la opción `extends` cuando  instala el plugin:

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

app.use(plugin, {
  extends: {
    OrbitControls,
  },
})
```

Automáticamente se añade un `<TresOrbitControls>` al catálogo, para que puedes usarlo en tus plantillas:

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

## Extender un elemento dínamicamente <Badge type="tip" text="^1.1.0" />

O también puedes añadirlo dínamicamente en tus componentes:

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
