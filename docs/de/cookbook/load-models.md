---
title: Modelle laden
description: Lade 3D-Modelle in deine Tres-Szenen.
author: alvarosabu
thumbnail: /recipes/gltf-model.png
difficulty: 1
---

# Modelle laden

> Alle Modelle, die in dieser Anleitung verwendet werden, stammen von [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c).

3D-Modelle sind in Hunderten von Dateiformaten verfügbar, jedes mit unterschiedlichen Zwecken, variierenden Eigenschaften und Komplexität.

In dieser Anleitung konzentrieren wir uns auf das Laden von gLTF-Modellen (GL Transmission Format), dem häufigsten Format für 3D-Modelle im Web.

<SandboxDemo url="https://play.tresjs.org/#eNqVVdtu2zgQ/RVC++AsVpacuu12tc7CidsGu+i2Re0+VX2gpbHMhCIJkrLjBvn3DqmLJfeCFPCDNXNmeOZ+H6w0mEulol0FQRLMTKaZssSArdQ/qWClktqSe+JgCyp21JAHstGyJKO5RdmNiTOpYfR3D/tOr5ldSGG15N+BMxBWmoHFFTUsW25pLvf/UxWS5Yfrq4XkUi8VzSAkb+VKCkCVYqLoPNqtBhilonP0sSj44aoS4tAgovgochG6R1ORSWEsKTi5IPepICTjQLV/LiGj317/+eJq+nIUOo3xlExCrK7ASyhXW5qQDeWmFtQQpLY6KEhOI3EIWVlVYT7acJLT8BzIHuNLhuF69Z4J9LhkX9C64fKQillclwsLNbNQKk4t4H9CZr1y7cZrNL5Ig4Kngdc2+vegjYLMsh0saAma1rpEScMskwJNPj0JCf7++pwGjZJLeTum1ukmXjdpdHHrelj9Trys8DFhan5e0qtWh4pPYJ7oS6YdTSkof8OKrW09ZC6FyKQpWcvxJIRpSNyvCwHVTFh8g9kD6s9becfBT0S5dm3qnxvin6RBA53Fxyy7CsRdCYIwqDtyXFIV3RgpcLR8q6WNwqRBUjefk/UnySnSYGutMkkcZ7lA+xw42+lIgI2FKuM+fD6NnkWTOGfGxk6M6DTwLTNwXM/cr/iuLdD98777Rjx8xe6B3ioqHsO9w86fRpPovPHcCqOSOZu+bzfjj/HrcHP0+OwF8v0DTNlPA45+ZeDR+e3B5+cTn2AcIbiLymF2GxyuAA35LziuDX7mGoHjHEr2CKct1AX/NHoec7buu3QecVU8YE9ag5tvw4qTjsxkqRgH/U65kRl2JuVc7v/zsm4FepstZLffkd+Yu5rye2wW0DtM97GUVBdga/Wr5Vu4w/+dspR5xZvi/ED5AYzkleNYw3B15Ei7h/Ns//UDhotzZV7d+bltghoQtbitvfRTuxW6XqsFn33iPN6XY/GTLB0jm0bTXsKHx+f0vBJORYEbxS2D/qnVsOlOnLtZPRU2zyV+UU8hdJ/Xb1avf3hij8funpgMBB4PTCXwkNDOCxpfELqnzLbuzlwEo7bnNN1HBbPbao1qjd4wpTbCnvHbDx+jBqMxcUmZiL13ExfcbuIKYx8Legv5eO1S8I1gXJOAPHJ4d3B/7xOmfuXX/AZxnx3Jh3U8Pbus0hoJXnpjtMRknjWeomssr2uMGt4HRjvKK4hwex/OvLZ3Wb+5rUqzEq/LDkgi1zd4mbCGnkZzGfqH4OErWPcr8A==" />

Es gibt verschiedene Möglichkeiten, Modelle in TresJS zu laden.

::: warning
Bitte beachte, dass wir in den vorherigen Beispielen das "top-level" `await` verwendet haben. Stelle sicher, dass du es mit einer [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense)-Komponente umgibst.
:::

## Verwendung von `useLoader`

Das Composable `useLoader` ermöglicht es dir, jeden Typ von three.js-Loader und eine URL zum Laden der Ressource zu übergeben. Es gibt ein `Promise` mit der geladenen Ressource zurück.

Eine detaillierte Erklärung, wie `useLoader` verwendet wird, findest du in der Dokumentation von [useLoader](/de/api/composables#useloader).

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
```

Dann kannst du die Szene des Modells in einer [`primitive`](/de/advanced/primitive)-Komponente von TresJS übergeben, um sie zu rendern:

```html
<primitive :object="scene" />
```

> Die Komponente `<primitive />` ist keine eigenständige Komponente im Quellcode von Tres. Stattdessen ist sie Teil der Kernfunktionalität von Tres. Wenn du `<primitive>` verwendest, wird dies zu einem Aufruf von `createElement`, der das entsprechende three.js-Objekt basierend auf der bereitgestellten "object"-Eigenschaft erstellt.

Beachte im obigen Beispiel, dass wir die `Suspense`-Komponente verwenden, um die `TresCanvas`-Komponente zu umgeben. Dies liegt daran, dass `useLoader` eine `Promise` zurückgibt und wir warten müssen, bis sie erfüllt ist, bevor wir die Szene rendern können.

## Verwendung von `useGLTF`

Eine bequemere Möglichkeit, Modelle zu laden, ist die Verwendung des Composables `useGLTF`, das im Paket [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) verfügbar ist.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf')
```

Ein Vorteil der Verwendung von `useGLTF` ist, dass du eine `draco`-Eigenschaft übergeben kannst, um die [Draco-Kompression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) für das Modell zu aktivieren. Dies wird die Größe des Modells reduzieren und die Performance verbessern.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

Alternativ kannst du Objekte innerhalb des Modells leicht mit der Eigenschaft `nodes` auswählen.

::: code-group

```vue [App.vue]
<script setup lang="ts">
import Model from './Model.vue'
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    alpha
  >
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <Suspense>
      <Model />
    </Suspense>
  </TresCanvas>
</template>
```

```vue [Model.vue]
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { nodes } = await useGLTF('/models/AkuAku.gltf', { draco: true })
</script>

<template>
  <primitive :object="node.AkuAku" />
</template>
```
:::

## Verwendung von `GLTFModel`

Die Komponente `GLTFModel` ist eine Hülle um `useGLTF`, die im Paket [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) verfügbar ist.

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

Dieser Ansatz ist zwar einfacher, bietet aber weniger Kontrolle über das Modell.

## Verwendung von `useFBX`

Das Composable `useFBX` ist im Paket [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) verfügbar.

```ts
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('/models/AkuAku.fbx')
```

Dann muss man nur das dem primitive das model zuweisen:

```html
<primitive :object="model" />
```

## Verwendung von `FBXModel`

Die Komponente `FBXModel` ist eine Hülle um `useFBX`, die im Paket [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) verfügbar ist. Ihre Verwendung ist ähnlich wie bei `GLTFModel`:

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
