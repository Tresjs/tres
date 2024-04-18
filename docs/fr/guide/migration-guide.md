# Guide de migration

Ce guide a pour objectif de vous aider à faire la migration de la version 1 aux versions les plus récentes de TresJS 🤩✨.

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

## Nouveautés

### Vue Custom Renderer

**TresJS** est pour le moment une [Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#createrenderer) 🎉 que l'on retrouve dans un composant englobant `TresCanvas`, qui se charge de créer pour vous le `WebGLRenderer` et la `Scene`, et de créer une **nouvelle instance de l'application Vue** pour retourner la scène.

### Prise en charge de Typescript et Intellisense 🦾

![TresJS Intellisense](/v2-intellisense.gif)

Il s'agit probablement de la caractéristique **la plus attendue de TresJS**. Désormais, les composants Tres fonctionnent avec Volar et fournissent un type intellisense.

### Le Plugin de Tres devient optionnel 👍

Le `TresPlugin` est désormais optionnel. Vous pouvez utiliser TresJS sans ce Plugin en important les composants directement depuis `tresjs/core`:

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
    <TresMesh
      :geometry="geometry"
      :material="material"
    />
  </TresCanvas>
</template>
```
::: info
Ceci est recommandé pour des raisons de performances et de tailles de Bundle, le tree-shaking fonctionnera mieux et vous n'aurez qu'à importer les composants que vous utilisez.
:::

### TresScene n'est plus nécessaire

Le composant `<TresScene />` est désormais obsolète, étant donné qu'il est maintenant possible de créer une scène via le `<TresCanvas />`.

Au début, je pensais que ce serait une bonne idée en terme de verbosité d'avoir un composant disctinct pour la scène, mais il s'est avéré que ce ne soit pas vraiment utile.

Vous pouvez désormais créer une scène de cette façon :

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
    <TresMesh
      :geometry="geometry"
      :material="material"
    />
  </TresCanvas>
</template>
```

Pour migrer votre code, il vous suffit simplement de supprimer le composant `<TresScene />` et de déplacer les composants enfants dans le `<TresCanvas />`.

### Le `useCatalog` est désormais obsolète

La fonction `useCatalog` est désormais obsolète. Vous pouvez maintenant importer le catalogue directement depuis `@tresjs/core`.

Vous pouvez en apprendre d'avantage ici: [Extending](/advanced/extending.md)

Changez ceci:

```ts {2,5,7}
import { useCatalog } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

const { extend } = useCatalog()

extend({ TextGeometry })
```

Par :

```ts {2,6}
// Correction ✅
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

// Ajoutez l'élément au catalogue
extend({ TextGeometry })
```

### La valeur référant au modèle `getModel` est désormais obsolète

La fonction `getModel` est désormais obsolète. Vous pouvez maintenant utiliser la propriété `model`.

Changez ceci:

```vue {7,9-12}
// Incorrect ❌
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

Par :

```vue {7,9-12}
// Correct ✅
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })

const modelRef = ref()

watch(modelRef, (model) => {
  // Faites quelque chose avec le modèle
  model.position.set(0, 0, 0)
})
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```
### Les caméras doivent être instanciées avant tout control 🎥

Le composant `TresOrbitControls` doit se situer après la caméra dans l'arbre. En effet, il faut que les controls aient connaissance de la caméra pour fonctionner.

Changez ceci:

```vue {3,5}
// Incorrect ❌
<template>
  <TresCanvas>
    <TresOrbitControls />
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

Par :

```vue {3,5}
// Correct ✅
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresOrbitControls />
  </TresCanvas>
</template>
```

## UseTres devient useTresContext <Badge type="warning" text="^3.0.0" />

Pour la version 3, nous avons repensé toute la logique des états (state) pour la rendre plus flexible et pour faciliter leur utilisation par les auteurs et les écosystèmes de packages. Au lieu d'utiliser une boutique comme pour la version 2, nous utilisons désormais un fournisseur basé sur `provide/inject`.

La fonction `useTres` est désormais un alias de la fonction `useTresContext` pour éviter de planter les démos et les expériences éxistantes. Toutefois, préférez l'appellation `useTresContext` à partir de maintenant.

Au lieu de retourner un objet complexe réactif, vous obtiendrez désormais les refs de `scene` et de `renderer`, directement entre les différentes propriétés.

Changez ceci :

```ts {2}
// Incorrect ❌
import { useTres } from '@tresjs/core'

const { state, setState } = useTres()

console.log(state.scene)
```

Par :

```ts {2}
// Correct ✅
import { useTresContext } from '@tresjs/core'

const { scene, renderer } = useTresContext()

console.log(scene.value)
```

Si vous souhaitez avoir plus d'informmations sur le nouveau fournisseur de contexte, vous pouvez vous référer à la section [API DOCS](/api/composables.md). -->
