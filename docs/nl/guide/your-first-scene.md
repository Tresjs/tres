# Je eerste scene

Deze gids zal jou helpen om je eerste Tres scene te maken. 🍩

<ClientOnly>
<div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
  <DonutExample />
</div>
</ClientOnly>

## De Canvas eexperience opzetten

Voordat we een ThreeJS `Scene` kunnen maken, hebben we ruimte nodig om deze weer te geven. Met gewoon [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) zouden we een `canvas` HTML-element moeten maken om de `WebglRenderer` te mounten en de `Scène` te initialiseren.

Met **TresJS** hoef je alleen de standaardcomponent `<TresCanvas />` te importeren en toe te voegen aan de template van uw Vue-component.

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <!-- Je scene komt hier -->
  </TresCanvas>
</template>
```

::: warning
Het is belangrijk dat alle componenten die verband houden met de scène zich tussen de component `<TresCanvas />` bevinden. Anders worden ze niet weergegeven.
:::

De `TresCanvas` component gaat achter de schermen wat instellingswerk doen:

- Het creëert een [**WebGLRenderer**](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer) die elk frame automatisch bijwerkt.
- Het stelt de render loop in die op elk frame moet worden aangeroepen op basis van de refresh rate van de browser.

## Canvas grootte

Standaard neemt de component `TresCanvas` de **parent breedte en hoogte** over. Als u een lege pagina ervaart, zorg er dan voor dat het bovenliggende element de juiste grootte heeft.

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <!-- Je scene komt hier -->
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

Als je scène geen deel gaat uitmaken van een UI, dan kun je het canvas ook dwingen de breedte en hoogte van het volledige venster te nemen door de `window-size` prop als volgt te gebruiken:

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <!-- Je scene komt hier -->
  </TresCanvas>
</template>
```

## Een scene maken

We hebben 4 kernelementen nodig om een 3D-ervaring te creëren:

- Een [**Scene**](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene) die de camera en objecten samen houd.
- Een [**Renderer**](https://threejs.org/docs/index.html?q=renderer#api/en/renderers/WebGLRenderer) om de scene in de DOM te renderen.
- Een [**Camera**](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- Een [**Object**](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)

Met **TresJS** hoeft u alleen de component `<TresCanvas />` toe te voegen aan de template van uw Vue-component en deze zal automatisch een `Renderer` (`canvas` DOM-element) en `Scene` voor u maken.

```vue
<template>
  <TresCanvas window-size>
    <!-- Je scene komt hier -->
  </TresCanvas>
</template>
```
Vervolgens kunt u een [**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/en/cameras/PerspectiveCamera) toevoegen met behulp van de `<TresPerspectiveCamera />` component.

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

::: warning
Een veel voorkomend probleem is dat de standaardpositie van de camera de oorsprong van de scène is (0,0,0). TresJS zal de positie van uw camera automatisch instellen op `[3,3,3]` als de prop `position` niet door u is ingesteld. Als er in uw scène geen camera is gedefinieerd, wordt er automatisch een perspectiefcamera toegevoegd.
:::

## Een 🍩 toevoegen

Die scène ziet er een beetje leeg uit, laten we een basisobject toevoegen. Als we gewoon **ThreeJS** zouden gebruiken, zouden we een [**Mesh**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh) object moeten maken, er een [**Materiaal**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material) aan toe moeten voegen en een [**Geometrie**]( https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry) zoals dit:

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32)
const material = new THREE.MeshBasicMaterial({ color: 'orange' })
const donut = new THREE.Mesh(geometry, material)
scene.add(donut)
```

Een **Mesh** is een basisscèneobject in three.js en wordt gebruikt om de geometrie en het materiaal vast te houden dat nodig is om een vorm in de 3D-ruimte weer te geven.

Laten we nu eens kijken hoe we gemakkelijk hetzelfde kunnen bereiken met **TresJS**. Om dat te doen gaan we de `<TresMesh />` component gebruiken, en tussen de standaard slots gaan we een `<TresTorusGeometry />` en een `<TresMeshBasicMaterial />` component doorgeven.

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

::: info
Merk op dat we niets hoeven te importeren, omdat **TresJS** automatisch een **Vue-component genereert op basis van de drie objecten die u in UpperCamelCase wilt gebruiken met een Tres-voorvoegsel**. Als u bijvoorbeeld een 'AmbientLight' wilt gebruiken, gebruikt u de component `<TresAmbientLight />`.
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

Vanaf hier kunt u beginnen met het toevoegen van meer objecten aan uw scène en beginnen met spelen met de eigenschappen van de componenten om te zien hoe deze de scène beïnvloeden.

<SandboxDemo url="https://play.tresjs.org/#eNqVVMtu2kAU/ZWRu8iiYIcQoojSikCjqlXTRi27OIuJfYGBeWlmzKOIf+8d2zhD2kZU8oI5955z3+yiiQF7o3W8KiDqRwObGaYdseAKTTiVs/dp5GwafUglE1oZR3bEU8ZUrqglezI1SpCzoUNsYZNMGTh7l8pBUgkhDR8OhObUAb4IGQT0jAM17UxxZTDOm+uLj6NxL43ImslcrduW/ao4NesejNWQObaCMRVgaGUjpK+VZY4piSoP3Rbx32MaNeapWqHlEqUbiCu1bFPnCect4r+GkIQx78DO63eNTJQp7CdQApzZkj41M+tVOigR91qkc4XBL1Cs0QmURtSy7A5bYRjl5FC4MthoCBiD5EXoUuBGPDGQ7iubzR3pM+lAYtVbFOg03IpZtReBQRL0PmpF1Qzbgup4YZXEie88K60NOOg+KRGPhUP1hjSaO6dtP0myXCI/B85WJpbgEqlFEroPu3EvPk9yZl3iYfROo9Yfwr4cVQY9VbtioPxVKF/Dx1HcGuhSU3lK7o3v8DI+jzu18gGMBfOcUHtu4CRd7zdExd415vsWrAjbgDdXWDi5v4H7sIO7hop4J7CJxXF3az87pwby/xCuCK9Jo2M7B8FOED24+uIv46uEs6dQ0ivuU7nHnXQ2U3LKZi82MlNCMw7mu/aHfbyZlHO1/lJizhTQ5JfNIVv+BV/YTZXyPS4LmBW2+3mUeMDgKvPtz2+wwd+NUai84PVw/mH8AVbxwudYuY0KmWPagV+Z7efywJicTeztprzcuqijRN1WQ4k+HP46ml2rgMeycaV/OY7xK116rqwbd5uG738DogXwDg==" />
