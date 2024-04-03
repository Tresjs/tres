# Votre première scene

Ce guide a pour but de vous aider à construire votre première scène avec Tres. 🍩

<ClientOnly>
<div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
  <DonutExample />
</div>
</ClientOnly>

## Configuration du Canvas

Avant de pouvoir créer un scène, nous avons besoin d'un espace où l'afficher. Avec [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) tel quel, nous aurions besoin de créer un élément HTML `canvas` pour monter le `WebglRenderer` afin d'initialiser la `scène`.

Avec **TresJS**, il vous faut simplement importer le composant prédéfini `<TresCanvas />` et l'ajouter au template de votre composant Vue.

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <!-- Votre scène ici -->
  </TresCanvas>
</template>
```

::: Attention :
Il est important que tous les composants relatifs à la scène soient à l'intérieur de la balise `<TresCanvas />`. Dans le cas contraire, ils ne seront pas affichés lors du rendu.
:::

Le composant `TresCanvas` s'occupe de certaines configurations pour vous:

- Il crée un [**WebGLRenderer**](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer) qui s'actualise à chaque image.
- Il définit la boucle de rendu à appeler à chaque image en fonction du taux de rafraîchissement du navigateur.

## Taille du `TresCanvas`

Par défaut, le composant `TresCanvas` prendra **la hauteur et la largeur de l'élément parent**. Si vous vous retrouvez avec une page blanche, assurez vous que l'élément parent possède bien une taille définie.

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <!-- Votre scène ici -->
  </TresCanvas>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
```

Si votre scène ne fait pas partie de votre UI, vous pouvez forcer le canvas à prendre la taille de la fenêtre entière en utilisant `window-size` comme cela:

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <!-- Votre scène ici -->
  </TresCanvas>
</template>
```

## Créer une scène

Nous avons besoin de 4 éléments principaux pour créer une expérience 3D:

- Une [**scène**](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene) pour contenir la caméra et le/les objet(s).
- Un [**moteur de rendu**](https://threejs.org/docs/index.html?q=renderer#api/en/renderers/WebGLRenderer) pour faire le rendu de la scene dans le DOM.
- Une [**caméra**](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- Un [**Objet**](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)

Avec **TresJS**, il vous suffit d'ajouter le composant `<TresCanvas />` au template de votre composant Vue et il créera automatiquement un `moteur de rendu` (élément DOM `canvas`) et une `scène` pour vous.

```vue
<template>
  <TresCanvas window-size>
    <!-- Votre scène ici -->
  </TresCanvas>
</template>
```

Ensuite, vous pouvez ajouter une [**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/en/cameras/PerspectiveCamera) en utilisant le composant `<TresPerspectiveCamera />`.

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

::: Attention :
Un problème commun est que la position par défaut de la caméra se trouve être l'origine de la scène (0,0,0). TresJS va donc automatiquement positionner la caméra en `[3,3,3]` si la propriété `position` n'est pas définie. Si aucune caméra n'est définie dans votre scène, il se chargera automatiquement de mettre une **PerspectiveCamera**.
:::

## Ajouter un 🍩

Cette scène semble un peu vide, nous allons y ajouter un objet basique. Si nous utilisions du **ThreeJS** pur, nous aurions besoin de créer un objet [**Mesh**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh) et d'y ajouter un [**Material**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material) et une [**Geometry**](https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry) comme ceci:

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32)
const material = new THREE.MeshBasicMaterial({ color: 'orange' })
const donut = new THREE.Mesh(geometry, material)
scene.add(donut)
```

Un **Mesh** est un objet basique de la scène en three.js, son rôle est de contenir la `geometry` et le `material` pour représenter une forme dans un espace 3D.

Maintenant, voyons à quel point il peux être simple de faire la même chose avec **TresJS**. Pour ce faire, nous allons utiliser le composant `<TresMesh />` et entre les balises, nous allons y mettre un `<TresTorusGeometry />` et un `<TresMeshBasicMaterial />`.

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
  </TresCanvas>
</template>
```

::: Info :
Comme vous l'aurez surement constaté, nous n'avons rien besoin d'importer, car **TresJS** genère automatiquement un **composant Vue basé sur l'objet Three que vous souhaitez en CamelCase avec le préfixe Tres**. Par exemple, si vous voulez une `AmbientLight`, vous pouvez utiliser le composant `<TresAmbientLight />`.
:::

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    window-size
  >
    <TresPerspectiveCamera
      :position="[3, 3, 3]"
      :look-at="[0, 0, 0]"
    />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```

À partir de là, vous pouvez commencer à ajouter plus d'objets à votre scène et jouer avec les propriétés des composants pour voir comment ils affectent la scène.
<SandboxDemo url="https://play.tresjs.org/#eNqVVMtu2kAU/ZWRu8iiYIcQoojSikCjqlXTRi27OIuJfYGBeWlmzKOIf+8d2zhD2kZU8oI5955z3+yiiQF7o3W8KiDqRwObGaYdseAKTTiVs/dp5GwafUglE1oZR3bEU8ZUrqglezI1SpCzoUNsYZNMGTh7l8pBUgkhDR8OhObUAb4IGQT0jAM17UxxZTDOm+uLj6NxL43ImslcrduW/ao4NesejNWQObaCMRVgaGUjpK+VZY4piSoP3Rbx32MaNeapWqHlEqUbiCu1bFPnCect4r+GkIQx78DO63eNTJQp7CdQApzZkj41M+tVOigR91qkc4XBL1Cs0QmURtSy7A5bYRjl5FC4MthoCBiD5EXoUuBGPDGQ7iubzR3pM+lAYtVbFOg03IpZtReBQRL0PmpF1Qzbgup4YZXEie88K60NOOg+KRGPhUP1hjSaO6dtP0myXCI/B85WJpbgEqlFEroPu3EvPk9yZl3iYfROo9Yfwr4cVQY9VbtioPxVKF/Dx1HcGuhSU3lK7o3v8DI+jzu18gGMBfOcUHtu4CRd7zdExd415vsWrAjbgDdXWDi5v4H7sIO7hop4J7CJxXF3az87pwby/xCuCK9Jo2M7B8FOED24+uIv46uEs6dQ0ivuU7nHnXQ2U3LKZi82MlNCMw7mu/aHfbyZlHO1/lJizhTQ5JfNIVv+BV/YTZXyPS4LmBW2+3mUeMDgKvPtz2+wwd+NUai84PVw/mH8AVbxwudYuY0KmWPagV+Z7efywJicTeztprzcuqijRN1WQ4k+HP46ml2rgMeycaV/OY7xK116rqwbd5uG738DogXwDg==" />
