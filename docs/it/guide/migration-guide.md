# Guida alla migrazione

Questa guida è pensata per aiutarti a migrare dalla versione v1 alle più recenti versioni di TresJS 🤩✨.

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

## Che novità ci sono?

### Vue Custom Renderer

TresJS è ora un [Vue Custom Renderer](https://vuejs.org/api/custom-renderer.html#createrenderer) 🎉 che risiede all'interno di un componente wrapper chiamato `TresCanvas`, il quale è responsabile della creazione del `WebGLRenderer` e della `Scene` per te e della creazione di una **nuova istanza di Vue App** per renderizzare la scena.

### Supporto Typescript e Intellisense 🦾

![TresJS Intellisense](/v2-intellisense.gif)

Questa era probabilmente la caratteristica più **richiesta per TresJS**. Ora i componenti Tres funzionano con Volar e forniscono intellisense di tipo.

**TresJS** ora genera la dichiarazione del tipo a build time per tutti i componenti basati sul catalogo di ThreeJS. Ciò significa che è possibile utilizzare tutti i componenti di ThreeJS e ottenere il tipo intellisense per loro.

### Il Plugin di Tres è opzionale 👍

Il `TresPlugin` è ora opzionale. Puoi usare TresJS senza di esso importando i componenti direttamente da `tresjs/core`:

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
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
Questo è consigliato per motivi di prestazioni e bundle size, tree-shaking funzionerà meglio e importerà solo i componenti utilizzati.
:::

### TresScene non è più necessario

Il componente `<TresScene />` è ora deprecato poiché la scena è ora creata dal `<TresCanvas />`.

All'inizio, ho pensato che sarebbe stata una buona idea avere una componente separata per la scena in termini di verbosità e mantenerla simile a ThreeJS, ma si è scoperto che non era davvero utile.

Ora puoi creare una scena in questo modo:

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

Per migrare il tuo codice, puoi semplicemente rimuovere il componente `<TresScene />` e spostare i children dentro al componente `<TresCanvas />` .

### `useCatalog` ora è deprecato

La funzione `useCatalog` è ora deprecata. Ora è possibile importare il catalogo direttamente da `@tresjs/core`

Puoi leggere di più qui: [Extending](/advanced/extending.md)

Cambia questo:

```ts {2,5,7}
// Sbagliato ❌
import { useCatalog } from "@tresjs/core";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

const { extend } = useCatalog();

extend({ TextGeometry });
```

Con questo:

```ts {2,6}
// Corretto ✅
import { extend } from "@tresjs/core";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

// Aggiungi l'elemento al catalogo
extend({ TextGeometry });
```

### Il valore ref del modello `getModel` è ora deprecato

La funzione `getModel` è ora deprecata. Ora puoi usare direttamente la proprietà `model` .

Cambia questo:

```vue {7,9-12}
// Sbagliato ❌
<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF("/models/AkuAku.gltf", { draco: true });

const modelRef = ref();

watch(modelRef, ({ getModel }) => {
  const model = getModel();
  model.position.set(0, 0, 0);
});
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```

Con questo:

```vue {7,9-12}
// Corretto ✅
<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF("/models/AkuAku.gltf", { draco: true });

const modelRef = ref();

watch(modelRef, (model) => {
  // Fai qualcosa con il modello
  model.position.set(0, 0, 0);
});
</script>

<template>
  <primitive :object="nodes.MyModel" />
</template>
```

### Le camere devono essere trovarsi prima di qualsiasi controllo 🎥

Il componente `TresOrbitControls` deve trovarsi dopo la camera nell'tree. Questo perché i controlli devono conoscere la fotocamera per funzionare.

Cambia questo:

```vue {3,5}
// Sbagliato ❌
<template>
  <TresCanvas>
    <TresOrbitControls />
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

Con questo:

```vue {3,5}
// Corretto ✅
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresOrbitControls />
  </TresCanvas>
</template>
```

## UseTres ora è useTresContext <Badge type="warning" text="^3.0.0" />

Per la v3 abbiamo rielaborato l'intera logica dello stato per renderlo più flessibile e più facile da usare per gli autori dei plugin e i pacchetti dell'ecosistema. Invece di usare uno store come in v2, ora usiamo un provider di contesto basato su `provide/inject`.

La funzione `useTres` è ora un alias della funzione `useTresContext` per evitare di rompere demo ed esperimenti online, ma considera di usare `useTresContext` d'ora in poi.

Invece di un grande oggetto reattivo, ora otterrete direttamente la `scena` e il `renderer` tra altre proprietà.

Cambia questo:

```ts {2}
// Sbagliato ❌
import { useTres } from "@tresjs/core";

const { state, setState } = useTres();

console.log(state.scene);
```

Con questo:

```ts {2}
// Corretto ✅
import { useTresContext } from "@tresjs/core";

const { scene, renderer } = useTresContext();

console.log(scene.value);
```

Per informazioni più dettagliate sul nuovo sistema context provider, potete leggere la sezione [API DOCS](/api/composables.md).
