# Migratie Gids

Deze gids is bedoeld om je te helpen migreren van v1 naar de nieuwste versies van TresJS 🤩✨.

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

## Wat is nieuw?

### Vue Custom Renderer

**TresJS** is nu een [Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#createrenderer) 🎉 die leeft in de wrapper component genaamd `TresCanvas` die verantwoordelijk is voor het maken van de `WebGLRenderer` en de `Scene` voor jou en het maken van een **new Vue App instance** om de scene te renderen.

### Typescript ondersteuning and Intellisense 🦾

![TresJS Intellisense](/v2-intellisense.gif)

Dit was hoogstwaarschijnlijk de meest **verzochte functionaliteit voor TresJS**. Nu werken Tres componenten met Volar en doen ze aan type intellisense.

**TresJS** genereert nu type declarations in build time voor alle componenten gebaseerd op de catalogus van ThreeJS. Dit betekent dat je alle componenten van ThreeJS kunt gebruiken en daar type intellisense voor krijgt.

### Tres Plugin is optioneel 👍

De `TresPlugin` is nu optioneel. Je kan TresJS gebruiken zonder het direct te improteren via `tresjs/core`:

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

::: info
Dit is aanbevolen voor prestaties en bundelgrootte redenen, tree-shaking zal beter werken en je zal alleen de componenten importeren die je daadwerkelijk gebruikt.
:::

### TresScene is niet langer nodig

De `<TresScene />` component is nu deprecated omdat de scene nu gemaakt wordt door de `<TresCanvas />`.

In het begin dacht ik dat het een goed idee zou zijn om een aparte component voor de scène te hebben in termen van verbosity en deze vergelijkbaar te houden met gewone ThreeJS, maar het bleek niet echt nuttig te zijn.

Je kunt nu een scène als deze maken:


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

Om uw code te migreren, kunt u eenvoudigweg de component `<TresScene />` verwijderen en de children naar de component `<TresCanvas />` verplaatsen.

### `useCatalog` is nu deprecated

De functie `useCatalog` is nu verouderd. U kunt de catalogus nu rechtstreeks vanuit `@tresjs/core` importeren.

Hier kun je er meer over lezen: [Extending](/nl/advanced/extending.md)

Verander dit:

```ts {2,5,7}
// Verkeerd ❌
import { useCatalog } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

const { extend } = useCatalog()

extend({ TextGeometry })
```

Naar dit:

```ts {2,6}
// Correct ✅
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

// Voeg de element aan de catalogus toe
extend({ TextGeometry })
```

### Model's ref value `getModel` is nu deprecated

The `getModel` functie is nu deprecated. Je kan de `model` eigenschap direct gebruiken.

Verander dit:

```vue {7,9-12}
// Verkeerd ❌
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

Naar dit:

```vue {7,9-12}
// Correct ✅
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })

const modelRef = ref()

watch(modelRef, model => {
  // Doe iets met het model
  model.position.set(0, 0, 0)
})
</script>
<template>
  <primitive :object="nodes.MyModel" />
</template>
```

### Cameras moeten gemaakt worden voor elke control 🎥

De `TresOrbitControls` component Moet gezet worden na de camera in de tree. Dit komt omdat de bedieningselementen de camera moeten kennen om te kunnen werken.

Verander dit:

```vue {3,5}
// Wrong ❌
<template>
  <TresCanvas>
    <TresOrbitControls />
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

Naar dit:

```vue {3,5}
// Correct ✅
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresOrbitControls />
  </TresCanvas>
</template>
```

## UseTres is nu useTresContext <Badge type="warning" text="^3.0.0" />

Voor v3 hebben we de hele state logica herwerkt om deze flexibeler en gemakkelijker te gebruiken te maken voor plugin auteurs en ecosysteempakketten. In plaats van een store te gebruiken zoals in v2, gebruiken we nu een contextprovider gebaseerd op `provide/inject`.

De functie `useTres` is nu een alias van de functie `useTresContext` om te voorkomen dat demo's en experimenten kapot gaan, maar overweeg om voortaan `useTresContext` te gebruiken.

In plaats van een groot reactief object, krijg je nu direct de `scene` en `renderer` refs, tussen andere eigenschappen.

Verander dit:

```ts {2}
// Verkeerd ❌
import { useTres } from '@tresjs/core'

const { state, setState } = useTres()

console.log(state.scene)
```

Naar dit:

```ts {2}
// Correct ✅
import { useTresContext } from '@tresjs/core'

const { scene, renderer } = useTresContext()

console.log(scene.value)
```

Voor meer gedetailleerde informatie over het nieuwe contextprovidersysteem kunt u de sectie [API DOCS](/nl/api/composables.md) lezen.