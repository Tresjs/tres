---
title: Charger des Modèles
description: Charger des modèles 3D dans votre scène Tres.
author: alvarosabu
thumbnail: /recipes/gltf-model.png
difficulty: 1
---

# Charger des Modèles

> Tous les modèles utilisés dans ce guide proviennent de [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c).

Les modèles 3D sont disponibles dans des centaines de formats de fichiers, chacun ayant des objectifs différents, des fonctionnalités variées et une complexité variable.

Pour ce guide, nous allons nous concentrer sur le téléchargement de modèles gLTF (GL Transmission Format), qui sont le format le plus courant pour les modèles 3D sur le Web.

<SandboxDemo url="https://play.tresjs.org/#eNqVVdtu2zgQ/RVC++AsVpacuu12tc7CidsGu+i2Re0+VX2gpbHMhCIJkrLjBvn3DqmLJfeCFPCDNXNmeOZ+H6w0mEulol0FQRLMTKaZssSArdQ/qWClktqSe+JgCyp21JAHstGyJKO5RdmNiTOpYfR3D/tOr5ldSGG15N+BMxBWmoHFFTUsW25pLvf/UxWS5Yfrq4XkUi8VzSAkb+VKCkCVYqLoPNqtBhilonP0sSj44aoS4tAgovgochG6R1ORSWEsKTi5IPepICTjQLV/LiGj317/+eJq+nIUOo3xlExCrK7ASyhXW5qQDeWmFtQQpLY6KEhOI3EIWVlVYT7acJLT8BzIHuNLhuF69Z4J9LhkX9C64fKQillclwsLNbNQKk4t4H9CZr1y7cZrNL5Ig4Kngdc2+vegjYLMsh0saAma1rpEScMskwJNPj0JCf7++pwGjZJLeTum1ukmXjdpdHHrelj9Trys8DFhan5e0qtWh4pPYJ7oS6YdTSkof8OKrW09ZC6FyKQpWcvxJIRpSNyvCwHVTFh8g9kD6s9becfBT0S5dm3qnxvin6RBA53Fxyy7CsRdCYIwqDtyXFIV3RgpcLR8q6WNwqRBUjefk/UnySnSYGutMkkcZ7lA+xw42+lIgI2FKuM+fD6NnkWTOGfGxk6M6DTwLTNwXM/cr/iuLdD98777Rjx8xe6B3ioqHsO9w86fRpPovPHcCqOSOZu+bzfjj/HrcHP0+OwF8v0DTNlPA45+ZeDR+e3B5+cTn2AcIbiLymF2GxyuAA35LziuDX7mGoHjHEr2CKct1AX/NHoec7buu3QecVU8YE9ag5tvw4qTjsxkqRgH/U65kRl2JuVc7v/zsm4FepstZLffkd+Yu5rye2wW0DtM97GUVBdga/Wr5Vu4w/+dspR5xZvi/ED5AYzkleNYw3B15Ei7h/Ns//UDhotzZV7d+bltghoQtbitvfRTuxW6XqsFn33iPN6XY/GTLB0jm0bTXsKHx+f0vBJORYEbxS2D/qnVsOlOnLtZPRU2zyV+UU8hdJ/Xb1avf3hij8funpgMBB4PTCXwkNDOCxpfELqnzLbuzlwEo7bnNN1HBbPbao1qjd4wpTbCnvHbDx+jBqMxcUmZiL13ExfcbuIKYx8Legv5eO1S8I1gXJOAPHJ4d3B/7xOmfuXX/AZxnx3Jh3U8Pbus0hoJXnpjtMRknjWeomssr2uMGt4HRjvKK4hwex/OvLZ3Wb+5rUqzEq/LDkgi1zd4mbCGnkZzGfqH4OErWPcr8A==" />

Il existe plusieurs façons de charger des modèles dans TresJS :

::: warning
Veuillez noter que dans les exemples ci-dessus, nous avons utilisé l'attente de niveau supérieur, assurez-vous de l'envelopper avec un composant [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense). Voir Suspense pour plus d'informations.
:::

## Avec `useLoader`

Le composable `useLoader` vous permet de transmettre n'importe quel type de loader three.js et une URL pour charger la ressource. Renvoie une « Promesse » avec la ressource chargée.

Pour une explication détaillée de la façon d'utiliser `useLoader`, consultez la documentation [useLoader](/api/composables#useloader).

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
```

Ensuite, vous pouvez transmettre la scène du modèle à un composant [`primitive`](/advanced/primitive) de TresJS pour le restituer:

```html
<primitive :object="scene" />
```

> Le composant `<primitive />` n'est pas un composant autonome dans le code source de Tres. Au lieu de cela, cela fait partie des fonctionnalités de base de Tres. Lorsque vous utilisez `<primitive>`, cela se traduit par un appel à `createElement`, qui crée l'objet three.js approprié en fonction de la propriété "object" fournie.

Notez dans l'exemple ci-dessus que nous utilisons le composant `Suspense` pour envelopper le composant `TresCanvas`. En effet, `useLoader` renvoie une `Promesse` et nous devons attendre qu'elle soit résolue avant de restituer la scène.

## Avec `useGLTF`

Un moyen plus pratique de charger des modèles consiste à utiliser le composable `useGLTF` disponible dans le package [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf')
```

Un avantage de l'utilisation de `useGLTF` est que vous pouvez transmettre une propriété `draco` pour activer la [compression Draco](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) pour le modèle. Cela réduira la taille du modèle et améliorera les performances.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

Alternativement, vous pouvez facilement sélectionner des objets dans le modèle à l'aide de la propriété `nodes`.

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

## Avec `GLTFModel`

Le composant `GLTFModel` est un wrapper autour de `useGLTF` qui est disponible dans le package [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

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

Cette approche particulière est plus simple mais vous donne moins de contrôle sur le modèle.

## useFBX

Le composable `useFBX` est disponible dans le package [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('/models/AkuAku.fbx')
```

Ensuite, c'est aussi simple que d'ajouter la scène à votre scène :

```html
<primitive :object="model" />
```

## FBXModel

Le composant `FBXModel` est un wrapper autour de `useFBX` qui est disponible dans le package [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos). Son utilisation est similaire à celle de `GLTFModel`:

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
