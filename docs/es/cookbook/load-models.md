---
title: Cargar Modelos
description: Carga modelos 3D en tus escenas de Tres.
author: alvarosabu
thumbnail: /recipes/gltf-model.png
difficulty: 1
---

# Cargar Modelos

> Todos los modelos utilizados en esta guía son de [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c).

Los modelos 3D están disponibles en cientos de formatos de archivo, cada uno con diferentes propósitos, características variadas y complejidad variable.

Para esta guía, nos vamos a centrar en cargar modelos gLTF (GL Transmission Format), que son el formato más común para modelos 3D en la web.

<SandboxDemo url="https://play.tresjs.org/#eNqVVdtu2zgQ/RVC++AsVpacuu12tc7CidsGu+i2Re0+VX2gpbHMhCIJkrLjBvn3DqmLJfeCFPCDNXNmeOZ+H6w0mEulol0FQRLMTKaZssSArdQ/qWClktqSe+JgCyp21JAHstGyJKO5RdmNiTOpYfR3D/tOr5ldSGG15N+BMxBWmoHFFTUsW25pLvf/UxWS5Yfrq4XkUi8VzSAkb+VKCkCVYqLoPNqtBhilonP0sSj44aoS4tAgovgochG6R1ORSWEsKTi5IPepICTjQLV/LiGj317/+eJq+nIUOo3xlExCrK7ASyhXW5qQDeWmFtQQpLY6KEhOI3EIWVlVYT7acJLT8BzIHuNLhuF69Z4J9LhkX9C64fKQillclwsLNbNQKk4t4H9CZr1y7cZrNL5Ig4Kngdc2+vegjYLMsh0saAma1rpEScMskwJNPj0JCf7++pwGjZJLeTum1ukmXjdpdHHrelj9Trys8DFhan5e0qtWh4pPYJ7oS6YdTSkof8OKrW09ZC6FyKQpWcvxJIRpSNyvCwHVTFh8g9kD6s9becfBT0S5dm3qnxvin6RBA53Fxyy7CsRdCYIwqDtyXFIV3RgpcLR8q6WNwqRBUjefk/UnySnSYGutMkkcZ7lA+xw42+lIgI2FKuM+fD6NnkWTOGfGxk6M6DTwLTNwXM/cr/iuLdD98777Rjx8xe6B3ioqHsO9w86fRpPovPHcCqOSOZu+bzfjj/HrcHP0+OwF8v0DTNlPA45+ZeDR+e3B5+cTn2AcIbiLymF2GxyuAA35LziuDX7mGoHjHEr2CKct1AX/NHoec7buu3QecVU8YE9ag5tvw4qTjsxkqRgH/U65kRl2JuVc7v/zsm4FepstZLffkd+Yu5rye2wW0DtM97GUVBdga/Wr5Vu4w/+dspR5xZvi/ED5AYzkleNYw3B15Ei7h/Ns//UDhotzZV7d+bltghoQtbitvfRTuxW6XqsFn33iPN6XY/GTLB0jm0bTXsKHx+f0vBJORYEbxS2D/qnVsOlOnLtZPRU2zyV+UU8hdJ/Xb1avf3hij8funpgMBB4PTCXwkNDOCxpfELqnzLbuzlwEo7bnNN1HBbPbao1qjd4wpTbCnvHbDx+jBqMxcUmZiL13ExfcbuIKYx8Legv5eO1S8I1gXJOAPHJ4d3B/7xOmfuXX/AZxnx3Jh3U8Pbus0hoJXnpjtMRknjWeomssr2uMGt4HRjvKK4hwex/OvLZ3Wb+5rUqzEq/LDkgi1zd4mbCGnkZzGfqH4OErWPcr8A==" />

Hay varias formas de cargar modelos en TresJS:

::: warning
Por favor, ten en cuenta que en los ejemplos anteriores utilizamos el await de nivel superior, asegúrate de envolverlo con un componente [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense). Consulta Suspense para obtener más información.
:::

## Usando `useLoader`

El composable `useLoader` te permite pasar cualquier tipo de cargador de three.js y una URL para cargar el recurso. Devuelve una `Promise` con el recurso cargado.

Para obtener una explicación detallada de cómo usar `useLoader`, consulta la documentación de [useLoader](/api/composables#useloader).

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
```

Luego puedes pasar la escena del modelo a un componente [`primitive`](/advanced/primitive) de TresJS para renderizarlo:

```html{2}
<TresCanvas>
    <primitive :object="scene" />
</TresCanvas>
```

> El componente `<primitive />` no es un componente independiente en el código fuente de Tres. En su lugar, es parte de la funcionalidad principal de Tres. Cuando usas `<primitive>`, se traduce a una llamada a `createElement`, que crea el objeto three.js adecuado según la propiedad "object" proporcionada.

Observa en el ejemplo anterior que estamos utilizando el componente `Suspense` para envolver el componente `TresCanvas`. Esto se debe a que `useLoader` devuelve una `Promise` y necesitamos esperar a que se resuelva antes de renderizar la escena.

## Usando `useGLTF`

Una forma más conveniente de cargar modelos es utilizando el composable `useGLTF` disponible en el paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf')
```

Una ventaja de usar `useGLTF` es que puedes pasar una propiedad `draco` para habilitar la [compresión Draco](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) para el modelo. Esto reducirá el tamaño del modelo y mejorará el rendimiento.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

Alternativamente, puedes seleccionar fácilmente objetos dentro del modelo utilizando la propiedad `nodes`.

```vue
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    alpha
  >
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <primitive :object="nodes.MyModel" /> // please note that "MyModel" here is just a placeholder 
  </TresCanvas>
</template>
```

## Usando `GLTFModel`

El componente `GLTFModel` es un envoltorio alrededor de `useGLTF` que está disponible en el paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

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

Este enfoque en particular es más sencillo pero te brinda menos control sobre el modelo.

## useFBX

El composable `useFBX` está disponible en el paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('/models/AkuAku.fbx')
```

Entonces, es tan sencillo como agregar la escena a tu escena:

```html{2}
<TresCanvas shadows alpha>
    <primitive :object="scene" />
</TresCanvas>
```

## FBXModel

El componente `FBXModel` es un envoltorio alrededor de `useFBX` que está disponible en el paquete [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos). Su uso es similar al de `GLTFModel`:

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
