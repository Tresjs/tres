# Composables

L'API de composition Vue 3 [Composition API]((https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api)) vous permet de créer une logique réutilisable qui peut être partagée entre les composants. Il vous permet également de créer des hooks personnalisés qui peuvent être utilisés dans vos composants.

**TresJS** tire pleinement parti de cette API pour créer un ensemble de fonctions composables qui peuvent être utilisées pour créer des animations, interagir avec la scène, etc. Il vous permet également de créer des scènes plus complexes qui pourraient ne pas être possibles en utilisant uniquement les composants Vue (textures, loaders, etc.).

Le noyau **TresJS** utilise ces composables en interne, vous utiliserez donc la même API que celle utilisée par le noyau. Par exemple, les composants qui doivent être mis à jour dans la boucle de rendu interne utilisent le composable `useRenderLoop` pour enregistrer un rappel qui sera appelé à chaque fois que le moteur de rendu met à jour la scène.

## useRenderLoop

Le composable `useRenderLoop` est le cœur des animations dans **TresJS**. Permet d'enregistrer un rappel qui sera appelé au taux de rafraîchissement natif. Il s'agit du composable le plus important de **TresJS**.

```ts
const { onLoop, resume } = useRenderLoop()

onLoop(({ delta, elapsed, clock, dt }) => {
  // ~60FPS (depend de votre écran)
})
```

::: warning
Veuillez noter les implications en termes de performances lors de l'utilisation de ce composable. Il sera exécuté à chaque image, donc si vous avez beaucoup de logique dans votre rappel, cela pourrait affecter les performances de votre application. Surtout si vous mettez à jour des états ou des références réactives.
:::

La fonction callback `onLoop` reçoit un objet avec les propriétés suivantes basées sur [l'horloge de THREE](https://threejs.org/docs/?q=clock#api/en/core/Clock):

- `delta` : Le temps écoulé entre la trame actuelle et la dernière trame. Il s'agit du temps en secondes depuis la dernière image.
- `elapsed` : Le temps écoulé depuis le début de la boucle de rendu.

Ce composable est basé sur `useRafFn` de [vueuse](https://vueuse.org/core/useRafFn/). Merci à [@wheatjs](https://github.com/orgs/Tresjs/people/wheatjs) pour son incroyable contribution.

### Avant et après le rendu

Vous pouvez également enregistrer un rappel qui sera appelé avant et après que le moteur de rendu ait mis à jour la scène. Ceci est utile si vous ajoutez un profileur pour mesurer les FPS, par exemple.

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop()

onBeforeLoop(({ delta, elapsed }) => {
  // Il sera exécuté avant le rendu de la scène.
  fps.begin()
})

onAfterLoop(({ delta, elapsed }) => {
  // Il sera exécuté après le rendu de la scène.
  fps.end()
})
```

### Pause et reprise

Vous pouvez suspendre et reprendre la boucle de rendu en utilisant les méthodes `pause` et `resume`.

```ts
const { pause, resume } = useRenderLoop()

// Pause la boucle de rendu
pause()

// Relance la boucle de rendu
resume()
```

Vous pouvez également obtenir l'état d'activité de la boucle de rendu en utilisant la propriété `isActive`.

```ts
const { resume, isActive } = useRenderLoop()

console.log(isActive) // false

resume()

console.log(isActive) // true
```

## useLoader

Le composable `useLoader` vous permet de charger des ressources à l'aide du [loader THREE.js](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models). Renvoie une promesse avec la ressource chargée.

```ts
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(THREE.GLTFLoader, 'path/to/asset.gltf')
```

Puisque le composable `useLoader` renvoie une promesse, vous pouvez l'utiliser avec `async/await` ou `then/catch`. Si vous l'utilisez dans un composant, assurez-vous de l'envelopper avec un composant `Suspense`. Voir [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) pour plus d'informations.

```vue
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

Le composable `useTexture` vous permet de charger des textures à l'aide du [loader de texture THREE.js](https://threejs.org/docs/#api/en/loaders/TextureLoader). Renvoi une promesse avec la(les) texture(s) chargée(s).

```ts
const texture = await useTexture(['path/to/texture.png'])
```

**useTexture** accepte également un objet avec les propriétés suivantes :

- `map`: une texture de base appliquée à la surface d'un objet
- `displacementMap`: une texture utilisée pour ajouter des bosses ou des indentations à la surface de l'objet
- `normalMap`: une texture utilisée pour ajouter des détails de surface et des variations d'ombrage à l'objet
- `roughnessMap`: une texture utilisée pour ajouter de la rugosité ou une finition mate à la surface de l'objet
- `metalnessMap`: une texture utilisée pour ajouter un effet métallique à la surface de l'objet
- `aoMap`: Une texture utilisée pour ajouter une occlusion ambiante (ombrage dans les zones où la lumière est bloquée par d'autres objets) à l'objet.
- `alphaMap`: Une texture utilisée pour ajouter de la transparence (la partie noire est rendue transparente) à l'objet. Vous devez définir :transparent="true" sur le matériau pour utiliser cette carte.
- `matcap`: cette texture code la couleur et les nuances du matériau.

Dans ce cas, il renverra un objet avec les textures chargées.

```ts
const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap, alphaMap, matcap } = await useTexture({
  map: 'path/to/albedo.png',
  displacementMap: 'path/to/height.png',
  normalMap: 'path/to/normal.png',
  roughnessMap: 'path/to/roughness.png',
  metalnessMap: 'path/to/metalness.png',
  aoMap: 'path/to/ambien-occlusion.png',
  alphaMap: 'path/to/alpha.png',
  matcap: 'path/to/matcap.png',
})
```

Vous pouvez ensuite lier les textures au `material`.

```vue
<template>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshStandardMaterial
        :map="map"
        :displacement-map="displacementMap"
        :normal-map="normalMap"
        :roughness-map="roughnessMap"
        :metalness-map="metalnessMap"
        :ao-map="aoMap"
        :alpha-map="alphaMap"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

Semblable au composable précédent, le composable `useTexture` renvoie une promesse, vous pouvez l'utiliser avec `async/await` ou `then/catch`. Si vous l'utilisez dans un composant, assurez-vous de l'envelopper avec un composant `Suspense`.

## useSeek

Le composable `useSeek` fournit des utilitaires permettant de parcourir et de parcourir facilement des scènes ThreeJS et des graphiques d'objets complexes. Exporte 4 fonctions qui vous permettent de rechercher des objets enfants en fonction de propriétés spécifiques.

```ts
const { seek, seekByName, seekAll, seekAllByName } = useSeek()
```

La fonction `seek` accepte trois paramètres:

- `parent` : Une scène ThreeJS ou Object3D.
- `property` : La propriété à utiliser dans la condition de recherche.
- `value` : La valeur de la propriété à correspondre.

Les fonctions `seek` et `seekByName` parcourent l'objet et renvoient l'objet enfant avec la propriété et la valeur spécifiées. Si aucun enfant avec la propriété et la valeur données n'est trouvé, il renvoie null et enregistre un avertissement.

```ts
const carRef = ref(null)

watch(carRef, ({ model }) => {
  if (model) {
    const car = model.children[0]

    const body = seek(car, 'name', 'Octane_Octane_Body_0')
    body.color.set(new Color('blue'))
  }
})
```

De même, les fonctions `seekAll` et `seekAllByName` renvoient un tableau d'objets enfants dont la propriété inclut la valeur donnée. Si aucune correspondance n'est trouvée, ils renvoient un tableau vide et un avertissement est enregistré.

```ts
const character = ref(null)

watch(character, ({ model }) => {
  if (model) {
    const bones = seekAll(character, type, 'Bone')
  }
})
```

## useTresContext
Ce composable vise à donner accès au modèle d'état qui contient plusieurs propriétés utiles.

```ts
const { camera, renderer, camera, cameras } = useTresContext()

```

::: warning
`useTresContext` ne peut être utilisé que dans un `TresCanvas`, puisque `TresCanvas` agit en tant que fournisseur des données de contexte. Utiliser [le contexte fourni par TresCanvas](tres-canvas) si vous avez besoin d'y accéder dans des composants supérieurs à TresCanvas.
:::

```vue
<TresCanvas>
  <MyModel />
</TresCanvas>
```

```vue
// MyModel.vue

<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'

const context = useTresContext()
</script>
```

### Propriétés du contexte
| Propriété | Descriptif |
| --- | --- |
| **camera** | la caméra actuellement active |
| **cameras** | les caméras qui existent dans la scène |
| **controls** | loes controles de la scène |
| **deregisterCamera** | une méthode pour désenregistrer une caméra. Cela n'est nécessaire que si vous créez une caméra manuellement. Les caméras du modèle sont automatiquement enregistrées. |
| **extend** | Étend le catalogue de composants. Voir [étendre](/fr/advanced/extending) |
| **raycaster** | le raycaster global utilisé pour les événements de pointeur |
| **registerCamera** | une méthode d’enregistrement d’une caméra. Cela n'est nécessaire que si vous créez une caméra manuellement. Les caméras du modèle sont automatiquement enregistrées. |
| **renderer** | le [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) de votre scène |
| **scene** | la [scène](https://threejs.org/docs/?q=sce#api/en/scenes/Scene) |
| **setCameraActive** | une méthode pour définir une caméra active |
| **sizes** | contient la largeur, la hauteur et les proportions de votre toile |

