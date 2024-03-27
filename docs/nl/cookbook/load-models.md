---
title: Modellen laden
description: Laad 3D modellen in je Tres scenes.
author: alvarosabu
thumbnail: /recipes/gltf-model.png
difficulty: 1
---

# Modellen laden

> Alle modellen in deze gids zijn van [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c).

3D-modellen zijn beschikbaar in honderden bestandsformaten, elk met verschillende doeleinden, diverse functies en variërende complexiteit.

Voor deze handleiding gaan we ons concentreren op het laden van gLTF-modellen (GL Transmission Format), het meest gebruikelijke formaat voor 3D-modellen op het web.

<SandboxDemo url="https://play.tresjs.org/#eNqVVdtu2zgQ/RVC++AsVpacuu12tc7CidsGu+i2Re0+VX2gpbHMhCIJkrLjBvn3DqmLJfeCFPCDNXNmeOZ+H6w0mEulol0FQRLMTKaZssSArdQ/qWClktqSe+JgCyp21JAHstGyJKO5RdmNiTOpYfR3D/tOr5ldSGG15N+BMxBWmoHFFTUsW25pLvf/UxWS5Yfrq4XkUi8VzSAkb+VKCkCVYqLoPNqtBhilonP0sSj44aoS4tAgovgochG6R1ORSWEsKTi5IPepICTjQLV/LiGj317/+eJq+nIUOo3xlExCrK7ASyhXW5qQDeWmFtQQpLY6KEhOI3EIWVlVYT7acJLT8BzIHuNLhuF69Z4J9LhkX9C64fKQillclwsLNbNQKk4t4H9CZr1y7cZrNL5Ig4Kngdc2+vegjYLMsh0saAma1rpEScMskwJNPj0JCf7++pwGjZJLeTum1ukmXjdpdHHrelj9Trys8DFhan5e0qtWh4pPYJ7oS6YdTSkof8OKrW09ZC6FyKQpWcvxJIRpSNyvCwHVTFh8g9kD6s9becfBT0S5dm3qnxvin6RBA53Fxyy7CsRdCYIwqDtyXFIV3RgpcLR8q6WNwqRBUjefk/UnySnSYGutMkkcZ7lA+xw42+lIgI2FKuM+fD6NnkWTOGfGxk6M6DTwLTNwXM/cr/iuLdD98777Rjx8xe6B3ioqHsO9w86fRpPovPHcCqOSOZu+bzfjj/HrcHP0+OwF8v0DTNlPA45+ZeDR+e3B5+cTn2AcIbiLymF2GxyuAA35LziuDX7mGoHjHEr2CKct1AX/NHoec7buu3QecVU8YE9ag5tvw4qTjsxkqRgH/U65kRl2JuVc7v/zsm4FepstZLffkd+Yu5rye2wW0DtM97GUVBdga/Wr5Vu4w/+dspR5xZvi/ED5AYzkleNYw3B15Ei7h/Ns//UDhotzZV7d+bltghoQtbitvfRTuxW6XqsFn33iPN6XY/GTLB0jm0bTXsKHx+f0vBJORYEbxS2D/qnVsOlOnLtZPRU2zyV+UU8hdJ/Xb1avf3hij8funpgMBB4PTCXwkNDOCxpfELqnzLbuzlwEo7bnNN1HBbPbao1qjd4wpTbCnvHbDx+jBqMxcUmZiL13ExfcbuIKYx8Legv5eO1S8I1gXJOAPHJ4d3B/7xOmfuXX/AZxnx3Jh3U8Pbus0hoJXnpjtMRknjWeomssr2uMGt4HRjvKK4hwex/OvLZ3Wb+5rUqzEq/LDkgi1zd4mbCGnkZzGfqH4OErWPcr8A==" />

Er zijn meerdere manieren om modellen te laden in TresJS:

::: warning
Houd er rekening mee dat we in de bovenstaande voorbeelden `await`s op het hoogste niveau gebruiken. Zorg ervoor dat dergelijke code wordt verpakt met een [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) component. Zie Suspense voor meer informatie.
:::

## `useLoader` gebruiken

Met de  `useLoader` composable kunt u elk type three.js-lader en een URL doorgeven waaruit de bron kan worden geladen. Het returned een `Promise` met de geladen bron.

Voor een gedetailleerde uitleg over het gebruik van `useLoader`, bekijk de [useLoader](/nl/api/composables#use-loader) documentatie.

```ts
import { useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(GLTFLoader, '/models/AkuAku.gltf')
```

Vervolgens kunt u de modelscène doorgeven aan een TresJS [`primitive`](/nl/advanced/primitive) component om deze te renderen:

```html{2}
<TresCanvas>
  <primitive :object="scene" />
</TresCanvas>
```

> De component `<primitive />` is geen op zichzelf staande component in de Tres-broncode. In plaats daarvan maakt het deel uit van de kernfunctionaliteit van Tres. Wanneer u `<primitive>` gebruikt, wordt dit vertaald naar een `createElement`-aanroep, die het juiste three.js-object creëert op basis van de opgegeven "object"-prop.

Merk op dat we in het bovenstaande voorbeeld de component `Suspense` gebruiken om de component `TresCanvas` te wrappen. Dit komt omdat `useLoader` een `Promise` returned en we moeten wachten tot dit is resolved voordat de scène wordt weergegeven.

## `useGLTF` gebruiken

Een gemakkelijkere manier om modellen te laden is het gebruik van de `useGLTF` composable die beschikbaar is in het pakket [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf')
```

Een voordeel van het gebruik van `useGLTF` is dat je een `draco` prop kunt doorgeven om [Draco-compressie](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) in te schakelen voor het model. Hierdoor wordt de grootte van het model kleiner en worden de prestaties verbeterd.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

Als alternatief kunt u eenvoudig objecten binnen het model selecteren met behulp van de eigenschap `nodes`.

```vue
<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/AkuAku.gltf', { draco: true })
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    shadows
    alpha
  >
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <primitive :object="nodes.MyModel" /> // Houd er rekening mee dat "MyModel" hier slechts een tijdelijke aanduiding is
  </TresCanvas>
</template>
```

## `GLTFModel` gebruiken

De component `GLTFModel` is een wrapper rond de `useGLTF` composable, die beschikbaar is via het pakket [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

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

Deze specifieke aanpak is eenvoudiger, maar geeft u minder controle over het model.

## useFBX

De `useFBX` composable is beschikbaar via de [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos) package.

```ts
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('/models/AkuAku.fbx')
```

Dan is het net zo eenvoudig als het toevoegen van de scène aan uw scène:

```html{2}
<TresCanvas shadows alpha>
    <primitive :object="scene" />
</TresCanvas>
```

## FBXModel

De component `FBXModel` is een wrapper rond de `useFBX` composable, die beschikbaar is via het pakket [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos). Het is vergelijkbaar in gebruik met `GLTFModel`:

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
