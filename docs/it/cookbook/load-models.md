---
title: Caricare i modelli
description: Carica modelli 3D nella tua scena di Tres.
author: alvarosabu
thumbnail: /recipes/gltf-model.png
difficulty: 1
---

# Caricare i modelli

> Tutti i modelli utilizzati in questa guida provengono da [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c).

I modelli 3D sono disponibili in centinaia di formati di file, ciascuno con scopi diversi, caratteristiche assortite e complessità variabile.

Per questa guida ci concentreremo sul caricamento dei modelli gLTF (GL Transmission Format), che sono il formato più comune per i modelli 3D sul web.

<SandboxDemo url="https://play.tresjs.org/#eNqVVdtu2zgQ/RVC++AsVpacuu12tc7CidsGu+i2Re0+VX2gpbHMhCIJkrLjBvn3DqmLJfeCFPCDNXNmeOZ+H6w0mEulol0FQRLMTKaZssSArdQ/qWClktqSe+JgCyp21JAHstGyJKO5RdmNiTOpYfR3D/tOr5ldSGG15N+BMxBWmoHFFTUsW25pLvf/UxWS5Yfrq4XkUi8VzSAkb+VKCkCVYqLoPNqtBhilonP0sSj44aoS4tAgovgochG6R1ORSWEsKTi5IPepICTjQLV/LiGj317/+eJq+nIUOo3xlExCrK7ASyhXW5qQDeWmFtQQpLY6KEhOI3EIWVlVYT7acJLT8BzIHuNLhuF69Z4J9LhkX9C64fKQillclwsLNbNQKk4t4H9CZr1y7cZrNL5Ig4Kngdc2+vegjYLMsh0saAma1rpEScMskwJNPj0JCf7++pwGjZJLeTum1ukmXjdpdHHrelj9Trys8DFhan5e0qtWh4pPYJ7oS6YdTSkof8OKrW09ZC6FyKQpWcvxJIRpSNyvCwHVTFh8g9kD6s9becfBT0S5dm3qnxvin6RBA53Fxyy7CsRdCYIwqDtyXFIV3RgpcLR8q6WNwqRBUjefk/UnySnSYGutMkkcZ7lA+xw42+lIgI2FKuM+fD6NnkWTOGfGxk6M6DTwLTNwXM/cr/iuLdD98777Rjx8xe6B3ioqHsO9w86fRpPovPHcCqOSOZu+bzfjj/HrcHP0+OwF8v0DTNlPA45+ZeDR+e3B5+cTn2AcIbiLymF2GxyuAA35LziuDX7mGoHjHEr2CKct1AX/NHoec7buu3QecVU8YE9ag5tvw4qTjsxkqRgH/U65kRl2JuVc7v/zsm4FepstZLffkd+Yu5rye2wW0DtM97GUVBdga/Wr5Vu4w/+dspR5xZvi/ED5AYzkleNYw3B15Ei7h/Ns//UDhotzZV7d+bltghoQtbitvfRTuxW6XqsFn33iPN6XY/GTLB0jm0bTXsKHx+f0vBJORYEbxS2D/qnVsOlOnLtZPRU2zyV+UU8hdJ/Xb1avf3hij8funpgMBB4PTCXwkNDOCxpfELqnzLbuzlwEo7bnNN1HBbPbao1qjd4wpTbCnvHbDx+jBqMxcUmZiL13ExfcbuIKYx8Legv5eO1S8I1gXJOAPHJ4d3B/7xOmfuXX/AZxnx3Jh3U8Pbus0hoJXnpjtMRknjWeomssr2uMGt4HRjvKK4hwex/OvLZ3Wb+5rUqzEq/LDkgi1zd4mbCGnkZzGfqH4OErWPcr8A==" />

Esistono diversi modi per caricare i modelli su TresJS:

::: warning
Si prega di notare che negli esempi precedenti usiamo il livello superiore `attendere`s. Assicurati di avvolgere tale codice con un componente [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense). Vedi Suspense per maggiori informazioni.
:::

## Usare `useLoader`

Il `useLoader` composable permette di passare qualsiasi tipo di loader three.js e un URL da cui caricare la risorsa. Restituisce una `promessa` con la risorsa caricata.

Per una spiegazione dettagliata di come usare`useLoader`, controllate la documentazione [useLoader](/api/composables#useloader).

```ts
import { useLoader } from "@tresjs/core";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const { scene } = await useLoader(GLTFLoader, "/models/AkuAku.gltf");
```

Poi si può passare la scena del modello a un componente TresJS [`primitive`](/advanced/primitive) per renderizzarla:

```html{2}
<TresCanvas>
  <primitive :object="scene" />
</TresCanvas>
```

> Il componente `<primitive />` non è un componente autonomo nel codice sorgente di Tres. Invece, fa parte della funzionalità di base di Tres. Quando si usa `<primitive>`, viene tradotto in una chiamata `createelement` che crea l'oggetto.js appropriato basato sul prop "object" fornito.

Notare nell'esempio precedente che stiamo usando il componente `Suspense` per avvolgere il componente `TresCanvas` . Questo perché `useLoader` restituisce una `promessa` e dobbiamo aspettare che si risolva prima di rendere la scena.

## Usare `useGLTF`

Un modo più comodo per caricare i modelli è usare il pacchetto [@tresjs/Cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF("/models/AkuAku.gltf");
```

Un vantaggio dell'uso di `useGLTF`è che si può passare un prop `Draco` per abilitare [compressione Draco](https://threejs.org/docs/index.html"q=drac#examples/en/loaders/DRACOLoader) per il modello. Ciò ridurrà le dimensioni del modello e migliorerà le prestazioni.

```ts
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF("/models/AkuAku.gltf", { draco: true });
```

In alternativa si possono facilmente selezionare gli oggetti all'interno del modello usando la proprietà`nodes` .

```vue
<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF("/models/AkuAku.gltf", { draco: true });
</script>

<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <primitive :object="nodes.MyModel" /> // si prega di notare che "MyModel" qui è solo un segnaposto
  </TresCanvas>
</template>
```

## Usare `GLTFModel`

Il componente `GLTFModel` è un wrapper intorno a `useGLTF` composable, che è disponibile dal pacchetto [@tresjs/Cientos](https://github.com/Tresjs/trese/main/packages/cientos).

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

Questo particolare approccio è più semplice, ma ti dà meno controllo sul modello.

## useFBX

Il pacchetto `useFBX` composable è disponibile dal pacchetto [@tresjs/Cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useFBX } from "@tresjs/cientos";

const model = await useFBX("/models/AkuAku.fbx");
```

Quindi è semplice come aggiungere la scena alla scena:

```html{2}
<TresCanvas shadows alpha>
    <primitive :object="scene" />
</TresCanvas>
```

## FBXModel

Il componente `FBXModel` è un wrapper intorno a `useFBX` composable, che è disponibile dal pacchetto [@tresjs/Cientos](https://github.com/Tresjs/trese/main/packages/cientos). È simile nell'uso a `GLTFModel`:

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
