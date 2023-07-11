# Guía de migración

Esta guía tiene como objetivo ayudarte con la migración de la v1 ha la mas reciente v2 de Tresjs
This guide is intended to help you migrate from v1 to brand new shiny v2 🤩✨ of TresJS.

::: code-group

```bash [pnpm]
pnpm update @tresjs/core
```

```bash [npm]
npm update @tresjs/core
```

```bash [yarn]
yarn upgrade @tresjs/core
```

:::

## ¡Lo nuevo!

### Vue Custom Renderer

**TresJS** ahora utiliza [Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#createrenderer) 🎉, vive dentro del componente `TresCanvas` que es el responsable de la creación del `WebGLRenderer` y la `Scene`.

### Soporte para Typescript y Intellisense 🦾

![TresJS v2 Intellisense](/v2-intellisense.gif)

Esta es probablemente una de las **funcionalidades mas solicitadas en TresJs**. Ahora los componentes de TresJs trabajan en conjunto con Volar, para proveerte intellisense y tipado.

**TresJS** ahora genera los tipos de todos tus componentes al momento de hacer la compilación, basado en el catalogo de Threejs. Esto significa que podrás usar todos los componentes de Threejs y obtener intellisense

### TresJs Plugin es opcional 👍

El `TresPlugin` ahora es opcional. Tu podrás usar Tresjs importando lo directamente desde `tresjs/core`:

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="cameraFov"
      :aspect="cameraAspect"
      :near="cameraNear"
      :far="cameraFar"
    />
    <TresMesh :geometry="geometry" :material="material" />
  </TresCanvas>
</template>
```

::: tip
Esta es la forma recomendada para obtener mejor rendimiento, tree-shaking será mejor porque solo se importarán los componentes que se usaran
:::

### TresScene no es necesario

El componente `<TresScene />` queda deprecado, la escena ahora vive dentro de `<TresCanvas />`.

Al comienzo, pensamos que podría ser una buena idea trabajar estos componentes de forma separada, pero pronto nos dimos cuenta que realmente no es util.

Las escenas se crean de esta manera:

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera
      :position="cameraPosition"
      :fov="cameraFov"
      :aspect="cameraAspect"
      :near="cameraNear"
      :far="cameraFar"
    />
    <TresMesh :geometry="geometry" :material="material" />
  </TresCanvas>
</template>
```

Para migrar tu código, debes remover el componente `<TresScene />` y colocar todos tus componentes de Tresjs dentro del componente padre `<TresCanvas />`

### `useCatalog` esta deprecado

La función del `useCatalog` esta ahora deprecada para la v2. Ahora puedes importar todo el catalogo directamente desde `@tresjs/core`

Puedes leer mas información aquí: [Extending](/advanced/extending.md)

Cambia de esto:

```ts {2,5,7}
// Wrong ❌
import { useCatalog } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

const { extend } = useCatalog()

extend({ TextGeometry })
```

A esto:

```ts {2,6}
// Correct ✅
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

// Add the element to the catalogue
extend({ TextGeometry })
```

### En los modelos el `getModel` fue deprecado

La función `getModel` fue deprecada. Ahora puedes usar el model directamente

Cambia de esto:

```vue {7,9-12}
// Wrong ❌
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })

const modelRef = ref()

watch(modelRef, ({ getModel }) => {
  const model = getModel()
  model.position.set(0, 0, 0)
})
</script>
<template>
  <primitive :object="nodes.MyModel" />
</template>
```

A esto:

```vue {7,9-12}
// Correct ✅
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })

const modelRef = ref()

watch(modelRef, model => {
  // Do something with the model
  model.position.set(0, 0, 0)
})
</script>
<template>
  <primitive :object="nodes.MyModel" />
</template>
```

### Las cámaras necesitan vivir antes de cualquier control🎥

El componente `TresOrbitControls` necesita ser colocado después de la cámara. Esto es así debido a que los componentes `controls` necesitan la cámara para trabajar de manera correcta

Cambia de esto:

```vue {3,5}
// Wrong ❌
<template>
  <TresCanvas>
    <TresOrbitControls />
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

A esto:

```vue {3,5}
// Correct ✅
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresOrbitControls />
  </TresCanvas>
</template>
```
