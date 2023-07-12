# Importar y usar modelos

> Todos los modelos usado en esta guía son de [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c)

Los modelos 3D están disponible en cientos de formatos, cada uno con propósitos diferentes, características distintas, y complejidad variable.

En esta guía, vamos a enfocarnos en glTF (GL Transmission Format) modelos, que son el formato más común de modelos 3D en el web.

<StackBlitzEmbed projectId="tresjs-gltf-load-model" />

Hay algunas maneras para cargar modelos en TresJs:

## usando `useLoader`

Para cargar el recurso, el `useLoader` composable te permite pasar cualquier tipo de `Loader` de Three.js y una URL. Devuelve una `Promise` con el recurso cargado.

Para una explanación detallada de como usar `useLoader`, ve la documentación de [useLoader](/api/composables#useloader).

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
```

Entonces, puedes pasar la escena de modelo a un componente `primitive`:

```html{3}
<TresCanvas>
  <Suspense>
    <primitive :object="scene" />
  </Suspense>
</TresCanvas>
```

> El componente `<primitive />` es parte del núcleo en Tresjs. Cuando usas `<primitive>`, es transformado usando una llamada `createElement` que crea una instancia de Threejs, basado en la propiedad proporcionada en "object"

Nota que en el ejemplo anterior que usamos el componente `Suspense` para 'envolver' el componente `TresCanvas`. Eso es por que el `useLoader` devuelve una `Promise` y necesitamos esperarlo a que se resuelva antes de renderizar la escena.

## Usando `useGLTF`

Una manera más conveniente de cargar modelos es usando el `useGLTF` composable disponible de [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf')
```

Una ventaja de usar `useGLTF`es que puedes pasar un `draco` prop para habilitar [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) por el modelo. Eso reducirá el tamaño del modelo y mejorar el rendimiento.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

Alternativamente puedes fácilmente seleccionas los objetos dentro de tu modelo usando la propiedad `nodes`

```vue
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
</script>
<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <primitive :object="nodes.MyModel" />
    </Suspense>
  </TresCanvas>
</template>
```

## Usando `GLTFModel`

El componente `GLTFModel` es un 'wrapper' alrededor de `useGLTF` que es disponible del paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```vue{2,9}
<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <GLTFModel path="/models/AkuAku.gltf" draco />
    </Suspense>
    <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
  </TresCanvas>
</template>
```

Esta estrategia en particular es más directo pero te da menos control sobre el modelo.

## useFBX

El composable `useFBX` esta disponible del paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('/models/AkuAku.fbx')
```

Entonces, es tan fácil como añadir el modelo a tu escena:

```html{3}
<TresCanvas shadows alpha>
  <Suspense>
    <primitive :object="model.scene" />
  </Suspense>
</TresCanvas>
```

## FBXModel

El componente `FBXModel` es un 'wrapper' alrededor de `useFBX` que esta disponible del paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos). Tiene un uso similar al `GLTFModel`:

```vue{2,9}
<script setup lang="ts">
import { OrbitControls, FBXModel } from '@tresjs/cientos'
</script>
<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
      <Suspense>
        <FBXModel path="/models/AkuAku.fbx" />
      </Suspense>
      <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
  </TresCanvas>
</template>
```
