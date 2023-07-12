# OrbitControls

<StackBlitzEmbed projectId="tresjs-orbit-controls" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) es una camera controller que te permite orbitar alrededor de una target. Es una forma buena para explorar tu escena.

Sin embargo, no es parte del core de TresJs. Entonces, para usarlo, necesitarías importarlo del modulo `three/examples/jsm/controls/OrbitControls`.

Eso crea una problema porque **TresJs** automáticamente crea un catálogo del core de Three para que puedes usarlos como componentes y el OrbitControls no es parte del core.

Afortunadamente, **TresJs** provee una manera para extender el catálogo del componentes. Puedes hacerlo usando el método `extend`.

Para más información sobre como extender tu catálogo revisa la sección [extending](/advanced/extending.md).

## Usando OrbitControls

Para usar `OrbitControls` necesitamos importarlo del modulo `three/examples/jsm/controls/OrbitControls`.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

Después, necesitas extender el catálogo de componentes usando el método `extend`.

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

Puedes usar el [useThree](/api/composables#usethree) composable para conseguir la cámara y el renderer.

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

Aquí es donde mejor parte empieza. ✨  
El paquete `cientos` provee un componente llamado `<OrbitControls />` que es un wrapper del `OrbitControls` del modulo [`three-stdlib`](https://github.com/pmndrs/three-stdlib).

¿El mejor parte? No necesitas extender el catálogo o pasar ningún argumento.
Ya funciona. 💯

```vue
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45," 1, 0.1, 1000] />
    <OrbitControls />
  </TresCanvas>
</template>
```
