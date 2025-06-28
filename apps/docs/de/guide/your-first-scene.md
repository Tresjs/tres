# Deine erste Szene

Dieser Leitfaden hilft dir, deine erste Szene in Tres zu erstellen. 🍩

<ClientOnly>
<div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
  <DonutExample />
</div>
</ClientOnly>

## Das Canvas einrichten

Bevor wir eine Szene erstellen können, benötigen wir einen Ort, um sie anzuzeigen. Würden wir nur reines [Three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) verwenden, müssten wir ein HTML-`canvas`-Element erstellen, um mit dem `WebglRenderer` eine `scene` zu initialisieren.

Mit **TresJS** kannst du direkt die Standardkomponente `<TresCanvas />` importieren und sie zum Template deiner Vue-Komponente hinzufügen.

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <!-- Deine Szene lebt hier -->
  </TresCanvas>
</template>
```

::: warning
Es ist wichtig, dass alle mit der Szene verbundenen Komponenten *innerhalb* der <TresCanvas />-Komponente sind. Andernfalls werden sie nicht gerendert.
:::

Die TresCanvas-Komponente führt einige Konfigurationen im Hintergrund durch:

Sie erstellt einen [**WebGLRenderer**](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer), der sich automatisch bei jedem Frame aktualisiert.
Und sie stellt den Rendering-Loop so ein, dass er bei jedem Frame basierend auf der Bildwiederholrate des Browsers aufgerufen wird.

## Leinwandgröße

Standardmäßig nimmt die `TresCanvas`-Komponente **die Breite und Höhe des Elternelements** an. Wenn du eine leere Seite erhälst, muss das Elternelement eine angemessene Größe haben.

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <!-- Deine Szene lebt hier -->
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

Wenn deine Szene nicht Teil einer Benutzeroberfläche sein wird, kannst du auch die gesamte Breite und Höhe des Fensters mit der Eigenschaft `window-size` nutzen:

```vue{6}
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <!-- Deine Szene lebt hier -->
  </TresCanvas>
</template>
```

## Eine Szene erstellen

Wir benötigen 4 Hauptelemente, um ein 3D-Erlebnis zu erstellen:

- Eine [**Szene**](https://threejs.org/docs/index.html?q=scene#api/de/scenes/Scene) um die Kamera und Objekte zusammen zu halten.
- Einen [**Renderer**](https://threejs.org/docs/index.html?q=renderer#api/de/renderers/WebGLRenderer), um die Szene im DOM zu rendern.
- Eine [**Kamera**](https://threejs.org/docs/index.html?q=camera#api/de/cameras/Camera)
- Ein [**Objekt**](https://threejs.org/docs/index.html?q=object#api/de/core/Object3D)

Mit TresJS musst du nur die `<TresCanvas />`-Komponente zum Template deiner Vue-Komponente hinzufügen, und sie erstellt automatisch einen `Renderer`  (DOM-`canvas`-Element) und eine Szene für dich.

```vue
<template>
  <TresCanvas window-size>
    <!-- Hier lebt deine Szene! -->
  </TresCanvas>
</template>
```

Dann kannst du eine [**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/de/cameras/PerspectiveCamera) mit der Komponente `<TresPerspectiveCamera />` hinzufügen.

::: warning
Ein häufiges Problem ist, dass die Standardposition der Kamera der Ursprung der Szene (0,0,0) ist. TresJS wird die Position deiner Kamera automatisch auf [3,3,3] setzen, wenn die position-Eigenschaft nicht definiert ist. Wenn in deiner Szene keine Kamera definiert ist, wird automatisch eine Perspektivkamera hinzugefügt.
:::

## Einen 🍩 hinzufügen

Die Szene sieht ein wenig leer aus, fügen wir also ein Objekt hinzu. Wenn wir reines **Three.js** verwenden würden, müssten wir ein [**Mesh**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh)-Objekt erstellen und ihm ein [**Material**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material) sowie eine [**Geometrie**](https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry) wie folgt anhängen:

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32)
const material = new THREE.MeshBasicMaterial({ color: 'orange' })
const donut = new THREE.Mesh(geometry, material)
scene.add(donut)
```

Ein **Mesh** ist ein grundlegendes Szenenobjekt in three.js und wird verwendet, um die Geometrie und das Material zu bündeln, die benötigt werden, um eine Form im 3D-Raum darzustellen.

Jetzt sehen wir, wie wir dasselbe mit **TresJS** erreichen können. Dazu verwenden wir die Komponente `<TresMesh />` und fügen im Standard-Slot eine `<TresTorusGeometry />` und ein `<TresMeshBasicMaterial />` ein.

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
Beachte, dass wir nichts importieren müssen, da **TresJS** automatisch eine **Vue-Komponente basierend auf dem Three-Objekt, das du verwenden möchtest, im PascalCase mit einem Tres-Prefix** generiert. Wenn du zum Beispiel ein `AmbientLight` verwenden möchtest, würdest du die `TresAmbientLight`-Komponente nutzen.
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

Von hier aus kannst du mehr Objekte zu deiner Szene hinzufügen und mit den Eigenschaften der Komponenten spielen, um zu sehen, wie sie die Szene beeinflussen.

<SandboxDemo url="https://play.tresjs.org/#eNqVVMtu2kAU/ZWRu8iiYIcQoojSikCjqlXTRi27OIuJfYGBeWlmzKOIf+8d2zhD2kZU8oI5955z3+yiiQF7o3W8KiDqRwObGaYdseAKTTiVs/dp5GwafUglE1oZR3bEU8ZUrqglezI1SpCzoUNsYZNMGTh7l8pBUgkhDR8OhObUAb4IGQT0jAM17UxxZTDOm+uLj6NxL43ImslcrduW/ao4NesejNWQObaCMRVgaGUjpK+VZY4piSoP3Rbx32MaNeapWqHlEqUbiCu1bFPnCect4r+GkIQx78DO63eNTJQp7CdQApzZkj41M+tVOigR91qkc4XBL1Cs0QmURtSy7A5bYRjl5FC4MthoCBiD5EXoUuBGPDGQ7iubzR3pM+lAYtVbFOg03IpZtReBQRL0PmpF1Qzbgup4YZXEie88K60NOOg+KRGPhUP1hjSaO6dtP0myXCI/B85WJpbgEqlFEroPu3EvPk9yZl3iYfROo9Yfwr4cVQY9VbtioPxVKF/Dx1HcGuhSU3lK7o3v8DI+jzu18gGMBfOcUHtu4CRd7zdExd415vsWrAjbgDdXWDi5v4H7sIO7hop4J7CJxXF3az87pwby/xCuCK9Jo2M7B8FOED24+uIv46uEs6dQ0ivuU7nHnXQ2U3LKZi82MlNCMw7mu/aHfbyZlHO1/lJizhTQ5JfNIVv+BV/YTZXyPS4LmBW2+3mUeMDgKvPtz2+wwd+NUai84PVw/mH8AVbxwudYuY0KmWPagV+Z7efywJicTeztprzcuqijRN1WQ4k+HP46ml2rgMeycaV/OY7xK116rqwbd5uG738DogXwDg==" />
