# La tua prima scena

Questa guida ti aiuterà a creare la tua prima scena con Tres. 🍩

<ClientOnly>
<div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
  <DonutExample />
</div>
</ClientOnly>

## Impostazione dell'esperienza Canvas

Prima di poter creare una ThreeJS `Scene`, abbiamo bisogno di uno spazio per visualizzarla. Usando plain [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) dovremmo creare un elemento HTML `canvas` per montare il `WebglRenderer` e inizializzare `Scene`.

Con **TresJS** è sufficiente importare il componente predefinito `<TresCanvas />` e aggiungerlo al modello del componente Vue.

```vue
<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas window-size>
    <!-- La tua scena va qui -->
  </TresCanvas>
</template>
```

::: warning
È importante che tutti i componenti relativi alla scena vivano tra il componente `<TresCanvas />` . Altrimenti non saranno renderizzati.
:::

Il componente `TresCanvas` farà qualche lavoro di setup dietro le quinte:

- Crea un [**WebGLRenderer**](https://threejs.org/docs/index.html"q=webglrend#api/en/renderers/WebGLRenderer) che aggiorna automaticamente ogni fotogramma.
- Imposta il ciclo di rendering da richiamare su ogni fotogramma in base alla frequenza di aggiornamento del browser.

## Dimensione del Canvas

Per impostazione predefinita, il componente`TresCanvas` prenderà la **larghezza e l'altezza del parent**, se si verifica una pagina vuota assicurarsi che l'elemento genitore abbia una dimensione corretta.

```vue
<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas>
    <!-- La tua scena va qui -->
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

Se la tua scena non fa parte della UI, puoi anche forzare il canvas a prendere la larghezza e l'altezza dell'intera finestra usando la prop `window-size` in questo modo:

```vue
<script lang="ts" setup>
import { TresCanvas } from "@tresjs/core";
</script>

<template>
  <TresCanvas window-size>
    <!-- La tua scena va qui -->
  </TresCanvas>
</template>
```

## Creare la scena

Abbiamo bisogno di 4 elementi fondamentali per creare un'esperienza 3D:

- Una [**Scene**](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene) che tiene camera ed oggetti insieme.
- Un [**Renderer**](https://threejs.org/docs/index.html?q=renderer#api/en/renderers/WebGLRenderer) per renderizzare la scena nel DOM.
- Una [**Camera**](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- Uno o più [**Object**](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)

Con **TresJS** devi solo aggiungere il componente `<TresCanvas />` al modello del componente Vue e creerà automaticamente un `Renderer` (`canvas` DOM Element) e `Scene` per te.

```vue
<template>
  <TresCanvas window-size>
    <!-- La tua scena va qui -->
  </TresCanvas>
</template>
```

Quindi è possibile aggiungere un [**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/en/cameras/PerspectiveCamera) utilizzando il componente `<TresPerspectiveCamera />`.

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

::: warning
Un problema comune è che la posizione predefinita della fotocamera è l'origine della scena (0,0,0). TresJS imposterà automaticamente la posizione della tua fotocamera su`[3,3,3]` se la posizione``` non è impostata da te. Se nessuna telecamera è definita nella scena, una telecamera di prospettiva viene aggiunta automaticamente.
:::

## Aggiungere una 🍩

Quella scena sembra un po' vuota, aggiungiamo un oggetto di base. Se usassimo plain **ThreeJS** avremmo bisogno di creare un oggetto [**Mesh**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh) e di allegarvi un oggetto [**Material**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material) e un [**Geometry**](https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry) come segue:

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32);
const material = new THREE.MeshBasicMaterial({ color: "orange" });
const donut = new THREE.Mesh(geometry, material);
scene.add(donut);
```

Una **Mesh** è un oggetto di scena di base in three.js, ed è utilizzato per contenere la geometria e il materiale necessario per rappresentare una forma nello spazio 3D.

Ora vediamo come possiamo ottenere facilmente lo stesso risultato con **TresJS**. Per farlo useremo il componente `<TresMesh />` e tra gli slot predefiniti, passeremo un componente `<TresTorusGeometry />` e un componente `<TresMeshBasicMaterial />` .

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
Nota bene che non è necessario importare nulla, perché **TresJS** genera automaticamente un componente **Vue in base ai tre oggetti che si desidera utilizzare in PascalCase con un prefisso Tres**. Per esempio, se vuoi usare una `AmbientLight` dovresti usare il componente `<TresAmbientLight />` .
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

Da qui in poi puoi iniziare ad aggiungere altri oggetti alla tua scena e iniziare a giocare con le proprietà dei componenti per vedere come influenzano la scena.

<SandboxDemo url="https://play.tresjs.org/#eNqVVMtu2kAU/ZWRu8iiYIcQoojSikCjqlXTRi27OIuJfYGBeWlmzKOIf+8d2zhD2kZU8oI5955z3+yiiQF7o3W8KiDqRwObGaYdseAKTTiVs/dp5GwafUglE1oZR3bEU8ZUrqglezI1SpCzoUNsYZNMGTh7l8pBUgkhDR8OhObUAb4IGQT0jAM17UxxZTDOm+uLj6NxL43ImslcrduW/ao4NesejNWQObaCMRVgaGUjpK+VZY4piSoP3Rbx32MaNeapWqHlEqUbiCu1bFPnCect4r+GkIQx78DO63eNTJQp7CdQApzZkj41M+tVOigR91qkc4XBL1Cs0QmURtSy7A5bYRjl5FC4MthoCBiD5EXoUuBGPDGQ7iubzR3pM+lAYtVbFOg03IpZtReBQRL0PmpF1Qzbgup4YZXEie88K60NOOg+KRGPhUP1hjSaO6dtP0myXCI/B85WJpbgEqlFEroPu3EvPk9yZl3iYfROo9Yfwr4cVQY9VbtioPxVKF/Dx1HcGuhSU3lK7o3v8DI+jzu18gGMBfOcUHtu4CRd7zdExd415vsWrAjbgDdXWDi5v4H7sIO7hop4J7CJxXF3az87pwby/xCuCK9Jo2M7B8FOED24+uIv46uEs6dQ0ivuU7nHnXQ2U3LKZi82MlNCMw7mu/aHfbyZlHO1/lJizhTQ5JfNIVv+BV/YTZXyPS4LmBW2+3mUeMDgKvPtz2+wwd+NUai84PVw/mH8AVbxwudYuY0KmWPagV+Z7efywJicTeztprzcuqijRN1WQ4k+HP46ml2rgMeycaV/OY7xK116rqwbd5uG738DogXwDg==" />
