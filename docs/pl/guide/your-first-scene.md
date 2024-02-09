# Twoja pierwsza scena

Ten przewodnik pomoże Ci stworzyć twoją pierwszą scenę w Tres. 🍩

<ClientOnly>
<div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
  <DonutExample />
</div>
</ClientOnly>

## Configurando el Canvas

Zanim będziemy mogli stworzyć scenę, potrzebujemy miejsca do jej wyświetlenia. Korzystając z czystego [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene), musielibyśmy stworzyć element HTML `canvas` aby zamontować `WebglRenderer` i zainicjować `scene`.

Z **TresJS**, wystarczy zaimportować domyślny komponent `<TresCanvas />` i dodać go do szablonu swojego komponentu Vue.

```vue
<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas window-size>
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

::: warning
Jest ważne, aby wszystkie komponenty związane z sceną znajdowały się między komponentem `<TresCanvas />`. W przeciwnym razie nie zostaną one wyrenderowane.
:::

Komponent `TresCanvas` wykonuje pewne prace konfiguracyjne za kulisami:

- Tworzy [**WebGLRenderer**](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer) który automatycznie aktualizuje się w każdej klatce.
- Ustawia pętlę renderowania, aby była wywoływana w każdej klatce, zgodnie z odświeżaniem przeglądarki.

## Rozmiar płutna

Domyślnie komponent `TresCanvas` przyjmuje **szerokość i wysokość rodzica**. Jeśli doświadczasz pustej strony, upewnij się, że element nadrzędny ma odpowiedni rozmiar.

```vue
<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas>
    <!-- Twoja scena znajduje się tutaj -->
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

Jeśli twoja scena nie będzie częścią interfejsu użytkownika, możesz również wymusić, aby płutno zajmowało szerokość i wysokość całego okna, używając właściwości `window-size` na przykład:

```vue
<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas window-size>
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

## Tworzenie sceny

Potrzebujemy 4 głównych elementów, aby stworzyć doświadczenie w 3D:

- [**Scena**](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene) do zawierania kamery i obiektów razem.
- [**Renderer**](https://threejs.org/docs/index.html?q=renderer#api/en/renderers/WebGLRenderer) do renderowania sceny w DOM.
- [**Kamera**](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- [**Obiekt**](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)

Z **TresJS**, wystarczy dodać komponent `<TresCanvas />` do szablonu swojego komponentu Vue, a automatycznie utworzy dla Ciebie `Renderer` (element DOM `canvas`) i `Scenę`.

```vue
<template>
  <TresCanvas window-size>
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

Następnie możesz dodać [**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/en/cameras/PerspectiveCamera) używając komponentu `<TresPerspectiveCamera />`.

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

::: warning
Częstym problemem jest to, że domyślna pozycja kamery to początek sceny (0,0,0). TresJS automatycznie ustawia pozycję kamery na `[3,3,3]` przy użyciu właściwości `position`. Jeśli nie zdefiniujesz kamery w swojej scenie, automatycznie dodawana jest kamera perspektywiczna.
:::

## Dodawanie 🍩

Ta scena wydaje się trochę pusta, dodajmy podstawowy obiekt. Gdybyśmy używali czystego ThreeJS, musielibyśmy stworzyć obiekt **ThreeJS** puro, necesitaríamos crear un objeto [**Mesh**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh)i dołączyć do niego [**Material**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material) oraz [**Geometry**](https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry) w ten sposób:

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32);
const material = new THREE.MeshBasicMaterial({ color: "orange" });
const donut = new THREE.Mesh(geometry, material);
scene.add(donut);
```

**Mesh** to podstawowy obiekt sceny w three.js i służy do przechowywania geometrii oraz materiału potrzebnego do przedstawienia kształtu w przestrzeni 3D.

Teraz zobaczmy, jak łatwo możemy osiągnąć to samo przy użyciu **TresJS**. Aby to zrobić, skorzystamy z komponentu `<TresMesh />` a między domyślnymi slotami przekażemy `<TresTorusGeometry />` oraz `<TresMeshBasicMaterial />`.

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
Zauważ, że nie musisz nic importować, ponieważ **TresJS** automatycznie generuje **Komponent Vue na podstawie obiektu Three o nazwie CamelCase z prefiksem Tres**. Na przykład, jeśli chcesz użyć `AmbientLight`, użyjesz komponentu `<TresAmbientLight />`.
:::

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```

Od tego momentu możesz zacząć dodawać więcej obiektów do swojej sceny i zacząć eksperymentować z właściwościami komponentów, aby zobaczyć, jak wpływają na scenę.

<SandboxDemo url="https://play.tresjs.org/#eNqVVMtu2kAU/ZWRu8iiYIcQoojSikCjqlXTRi27OIuJfYGBeWlmzKOIf+8d2zhD2kZU8oI5955z3+yiiQF7o3W8KiDqRwObGaYdseAKTTiVs/dp5GwafUglE1oZR3bEU8ZUrqglezI1SpCzoUNsYZNMGTh7l8pBUgkhDR8OhObUAb4IGQT0jAM17UxxZTDOm+uLj6NxL43ImslcrduW/ao4NesejNWQObaCMRVgaGUjpK+VZY4piSoP3Rbx32MaNeapWqHlEqUbiCu1bFPnCect4r+GkIQx78DO63eNTJQp7CdQApzZkj41M+tVOigR91qkc4XBL1Cs0QmURtSy7A5bYRjl5FC4MthoCBiD5EXoUuBGPDGQ7iubzR3pM+lAYtVbFOg03IpZtReBQRL0PmpF1Qzbgup4YZXEie88K60NOOg+KRGPhUP1hjSaO6dtP0myXCI/B85WJpbgEqlFEroPu3EvPk9yZl3iYfROo9Yfwr4cVQY9VbtioPxVKF/Dx1HcGuhSU3lK7o3v8DI+jzu18gGMBfOcUHtu4CRd7zdExd415vsWrAjbgDdXWDi5v4H7sIO7hop4J7CJxXF3az87pwby/xCuCK9Jo2M7B8FOED24+uIv46uEs6dQ0ivuU7nHnXQ2U3LKZi82MlNCMw7mu/aHfbyZlHO1/lJizhTQ5JfNIVv+BV/YTZXyPS4LmBW2+3mUeMDgKvPtz2+wwd+NUai84PVw/mH8AVbxwudYuY0KmWPagV+Z7efywJicTeztprzcuqijRN1WQ4k+HP46ml2rgMeycaV/OY7xK116rqwbd5uG738DogXwDg==" />
