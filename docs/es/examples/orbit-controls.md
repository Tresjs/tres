# OrbitControls

<StackBlitzEmbed projectId="tresjs-orbit-controls" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) es una camera controller que te permite orbitar alrededor de una target. Es una forma buena para explorar tu escena.

Sin embargo, no es parte del core de ThreeJS. Entonces, para usarlo, necesitarías importarlo del modulo `three/examples/jsm/controls/OrbitControls`.

Eso crea una problema porque **TresJS** automáticamente crea un catálogo del core de Three para que puedes usarlos como componentes.

Afortunadamente, **TresJS** provee una forma a extender el catálogo de componentes. Puedes hacerlo por usar el `extend` método usando el [useCatalogue](/api/composables#usecatalog) composable.

Para más información sobre como extender tu catálogo TresJS catalog, hacer referencia a la sección [extending](/advanced/extending.md).

## Usando OrbitControls

Para usar `OrbitControls` necesitas importarlo del modulo `three/examples/jsm/controls/OrbitControls`.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

Entonces, necesitas extender el catálogo de componentes usando el método `extend` del [useCatalogue](/api/composables#usecatalog) composable.

```js
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })
```

Ahora, puedes usar el componente `TresOrbitControls` en tu escena.

```vue
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
  </TresCanvas>
</template>
```

Dado que [OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) necesita una referencia a la cámara y el renderer, necesitas pasarlas como argumentos.

puedes usar el [useThree](/api/composables#usethree) composable para conseguir la cámara y el renderer.

```ts
import { useThree } from '@tresjs/core'

const { state } = useTres()
```

Entonces, el código final estaría algo así:

```vue
<script setup lang="ts">
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })

const { state } = useThree()
</script>
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45," 1, 0.1, 1000] />
    <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
  </TresCanvas>
</template>
```

## OrbitControls usando `cientos`

Aquí es donde el parte elevado empiece. ✨  
El `cientos` package provee un componente se llama `<OrbitControls />` lo que es un wrapper del `OrbitControls` del modulo [`three-stdlib`](https://github.com/pmndrs/three-stdlib).

¿El parte más agradable? No necesitas extender el catálogo o pasar ningún argumento.  
Ya funciona. 💯

```vue
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45," 1, 0.1, 1000] />
    <OrbitControls />
  </TresCanvas>
</template>
```
