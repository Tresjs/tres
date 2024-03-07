---
title: Wczytywanie Modeli
description: Wczytaj modele 3D do swoich scen w Tres.
author: alvarosabu
thumbnail: /recipes/gltf-model.png
difficulty: 1
---

# Wczytywanie Modeli

> Wszystkie modele używane w tej instrukcji pochodzą od [Alvaro Saburido](https://sketchfab.com/3d-models/aku-aku-7dfcb6edf10b4098bbb965c56fd3055c).

Modele 3D są dostępne w setkach różnych formatów plików, z różnymi zastosowaniami, różnymi cechami i zmienną złożonością.

W tej instrukcji skupimy się na wczytywaniu modeli w formacie gLTF (GL Transmission Format), który jest najbardziej powszechnym formatem dla modeli 3D w sieci.

<SandboxDemo url="https://play.tresjs.org/#eNqVVdtu2zgQ/RVC++AsVpacuu12tc7CidsGu+i2Re0+VX2gpbHMhCIJkrLjBvn3DqmLJfeCFPCDNXNmeOZ+H6w0mEulol0FQRLMTKaZssSArdQ/qWClktqSe+JgCyp21JAHstGyJKO5RdmNiTOpYfR3D/tOr5ldSGG15N+BMxBWmoHFFTUsW25pLvf/UxWS5Yfrq4XkUi8VzSAkb+VKCkCVYqLoPNqtBhilonP0sSj44aoS4tAgovgochG6R1ORSWEsKTi5IPepICTjQLV/LiGj317/+eJq+nIUOo3xlExCrK7ASyhXW5qQDeWmFtQQpLY6KEhOI3EIWVlVYT7acJLT8BzIHuNLhuF69Z4J9LhkX9C64fKQillclwsLNbNQKk4t4H9CZr1y7cZrNL5Ig4Kngdc2+vegjYLMsh0saAma1rpEScMskwJNPj0JCf7++pwGjZJLeTum1ukmXjdpdHHrelj9Trys8DFhan5e0qtWh4pPYJ7oS6YdTSkof8OKrW09ZC6FyKQpWcvxJIRpSNyvCwHVTFh8g9kD6s9becfBT0S5dm3qnxvin6RBA53Fxyy7CsRdCYIwqDtyXFIV3RgpcLR8q6WNwqRBUjefk/UnySnSYGutMkkcZ7lA+xw42+lIgI2FKuM+fD6NnkWTOGfGxk6M6DTwLTNwXM/cr/iuLdD98777Rjx8xe6B3ioqHsO9w86fRpPovPHcCqOSOZu+bzfjj/HrcHP0+OwF8v0DTNlPA45+ZeDR+e3B5+cTn2AcIbiLymF2GxyuAA35LziuDX7mGoHjHEr2CKct1AX/NHoec7buu3QecVU8YE9ag5tvw4qTjsxkqRgH/U65kRl2JuVc7v/zsm4FepstZLffkd+Yu5rye2wW0DtM97GUVBdga/Wr5Vu4w/+dspR5xZvi/ED5AYzkleNYw3B15Ei7h/Ns//UDhotzZV7d+bltghoQtbitvfRTuxW6XqsFn33iPN6XY/GTLB0jm0bTXsKHx+f0vBJORYEbxS2D/qnVsOlOnLtZPRU2zyV+UU8hdJ/Xb1avf3hij8funpgMBB4PTCXwkNDOCxpfELqnzLbuzlwEo7bnNN1HBbPbao1qjd4wpTbCnvHbDx+jBqMxcUmZiL13ExfcbuIKYx8Legv5eO1S8I1gXJOAPHJ4d3B/7xOmfuXX/AZxnx3Jh3U8Pbus0hoJXnpjtMRknjWeomssr2uMGt4HRjvKK4hwex/OvLZ3Wb+5rUqzEq/LDkgi1zd4mbCGnkZzGfqH4OErWPcr8A==" />

Istnieje kilka sposobów ładowania modeli w TresJS:

::: warning
Proszę zauważyć, że w powyższych przykładach używamy oczekiwania na najwyższym poziomie (top level await), upewnij się, że owinięto to w komponent [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense). Zobacz Suspense po więcej informacji.
:::

## Użycie `useLoader`

Kompozycja `useLoader` pozwala przekazać dowolny rodzaj ładowacza three.js oraz URL do wczytania zasobu. Zwraca promise `Promise` z wczytanym zasobem.

Dla szczegółowego wyjaśnienia, jak korzystać z `useLoader`, sprawdź dokumentację [useLoader](/api/composables#useloader).

```ts
import { useLoader } from "@tresjs/core";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";

const { scene } = await useLoader(GLTFLoader, "/models/AkuAku.gltf");
```

Następnie możesz przekazać scenę modelu do komponentu [`primitive`](/advanced/primitive) w TresJS, aby go zrenderować:

```html{2}
<TresCanvas>
    <primitive :object="scene" />
</TresCanvas>
```

> Komponent `<primitive />` nie jest oddzielnym komponentem w źródle Tres. Zamiast tego jest częścią głównej funkcji Tres. Gdy używasz `<primitive>`, tłumaczy się to na wywołanie `createElement`, które tworzy odpowiedni obiekt three.js na podstawie dostarczonej właściwości "object".

Zauważ w powyższym przykładzie, że używamy komponentu `Suspense` do owinięcia komponentu `TresCanvas`. Wynika to z tego, że `useLoader` zwraca `Promise` i musimy poczekać, aż zostanie rozwiązana, zanim zrenderujemy scenę.

## Użycie `useGLTF`

Bardziej wygodnym sposobem ładowania modeli jest użycie kompozycji `useGLTF` dostępnej w pakiecie [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF(
  "/models/AkuAku.gltf"
);
```

Zaletą korzystania z `useGLTF` jest możliwość przekazania właściwości `draco` aby włączyć [kompresję Draco](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) dla modelu. Spowoduje to zmniejszenie rozmiaru modelu i poprawi wydajność.

```ts
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF(
  "/models/AkuAku.gltf",
  { draco: true }
);
```

Alternatywnie, możesz łatwo wybierać obiekty wewnątrz modelu, korzystając z właściwości `nodes`.

```vue
<script setup lang="ts">
import { useGLTF } from "@tresjs/cientos";

const { scene, nodes, animations, materials } = await useGLTF(
  "/models/AkuAku.gltf",
  { draco: true }
);
</script>

<template>
  <TresCanvas clear-color="#82DBC5" shadows alpha>
    <TresPerspectiveCamera :position="[11, 11, 11]" />
    <OrbitControls />
    <primitive :object="nodes.MyModel" /> // Proszę zauważyć, że tutaj jest
    "MyModel" just a placeholder
  </TresCanvas>
</template>
```

## Użycie `GLTFModel`

Komponent `GLTFModel` to opakowanie dla `useGLTF` dostępne w pakiecie [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

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

Ten podejście jest bardziej proste, ale oferuje mniej kontroli nad modelem.

## useFBX

Kompozycja `useFBX` jest dostępna w pakiecie [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos).

```ts
import { useFBX } from "@tresjs/cientos";

const model = await useFBX("/models/AkuAku.fbx");
```

W takim razie, to tak proste jak dodanie sceny do twojej sceny:

```html{2}
<TresCanvas shadows alpha>
    <primitive :object="scene" />
</TresCanvas>
```

## FBXModel

Komponent `FBXModel` to opakowanie dla `useFBX` dostępne w pakiecie [@tresjs/cientos](https://github.com/Tresjs/tres/tree/main/packages/cientos). Jego użycie jest podobne do `GLTFModel`:

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
