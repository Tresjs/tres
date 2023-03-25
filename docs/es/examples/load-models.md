# Load Models

> Todos los modelos usado en esta guía son de [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c).

Los modelos 3D son disponible en cientos de formatos de archivo, cada uno con propósitos diferentes, características distintos, y complexidad variable.

En esta guía, vamos a enfocarnos en cargando glTF (GL Transmission Format) modelos, que son el formato más común de modelos 3D en el web.

<StackBlitzEmbed projectId="tresjs-gltf-load-model" />

Hay algunas maneras para cargar modelos en TresJS:

## Utilizar `useLoader`

Para cargar el recurso, el `useLoader` composable te permite pasar cualquier tipo de Three.js cargador y un URL. Devuelve un `Promise` con el recurso cargado.

Por una explanación detallada de como usar `useLoader`, ve la documentación de [useLoader](/api/composables#useloader).

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
```

Entonces, puedes pasar la escena de modelo a una componente `TresMesh`:

```html{4}
<Suspense>
  <TresCanvas>
    <TresScene>
      <TresMesh v-bind="scene" />
    </TresScene>
  </TresCanvas>
</Suspense>
```

Nota que en el ejemplo arriba que usamos el componente `Suspense` para 'wrap' el componente `TresCanvas`. Eso es por  `useLoader` devuelve un `Promise` y necesitamos esperarlo resolver antes de renderizar la escena.

## Utilizar `useGLTF`

Una manera más conveniente de cargar modelos es usando el `useGLTF` composable disponible de [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) paquete.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('/models/AkuAku.gltf')
```

Una ventaja de usar `useGLTF`es que puedes pasar un `draco` prop para habilitar [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) por el modelo. Eso reducirá el tamaño del modelo y mejorar el rendimiento.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

## Utilizar `GLTFModel`

El componente `GLTFModel` es un 'wrapper' alrededor de `useGLTF` que es disponible del paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```vue{2,10}
<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
</script>
<template>
  <Suspense>
    <TresCanvas clear-color="#82DBC5" shadows alpha>
      <TresPerspectiveCamera :position="[11, 11, 11]" />
      <OrbitControls />
      <TresScene>
        <GLTFModel path="/models/AkuAku.gltf" draco />
        <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
```

Esta estrategia en particular es más directo pero te da menos control sobre el modelo.

## useFBX

El composable `useFBX` es disponible del paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('/models/AkuAku.fbx')
```

Entonces, es tan directo como añadir la escena a tu escena ?? the scene to your scene:

```html{4}
<Suspense>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresMesh v-bind="scene" />
    </TresScene>
  </TresCanvas>
</Suspense>
```

## FBXModel

El componente `FBXModel` es un 'wrapper' alrededor de `useFBX` que es disponible del paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos). Tiene uso similar al `GLTFModel`:

```vue{2,10}
<script setup lang="ts">
import { OrbitControls, FBXModel } from '@tresjs/cientos'
</script>
<template>
  <Suspense>
    <TresCanvas clear-color="#82DBC5" shadows alpha>
      <TresPerspectiveCamera :position="[11, 11, 11]" />
      <OrbitControls />
      <TresScene>
        <FBXModel path="/models/AkuAku.fbx" />
        <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
```
