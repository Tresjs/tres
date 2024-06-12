---
title: Text 3D
description: Aggiungere testo 3D con facilità
author: alvarosabu
thumbnail: /recipes/text-3d.png
difficulty: 1
---

# Text3D

[TextGeometry](https://threejs.org/docs/index.html"q=text#examples/en/geometries/TextGeometry) è uno dei modi in cui possiamo aggiungere testo 3D nella nostra scena.

<SandboxDemo url="https://play.tresjs.org/#eNqdVlFv2zYQ/iuEgsEbZkuOnXSd5gxe7G5YsbRF7LcqD7RES0wokiApO0Hg/74jKduUkWbp8hCYdx+/O3684+k5Wiqi/5Ay3jQkSqOJzhWVBmliGokY5uVVFhmdRb9nnNZSKIOe0TXWNF9UuBDbGyz7aHH71/VMMKEWEuekjz6JpeAEXJLyEu3QWoka9UylCOn9FvDY0DPMN1gfQFMDtnud5EJ1sZ/VipqZ4EYJ9gKcEm6EDnYsyaNpQXFiF/aAvYxnPBdcG1QydIWeM45QzghWLv0U9c7ej+bXs8te33q0O6JOkVENcRbMZIVTtMZMe4OHwFGXT5Kkp8pYhGiMbCDzvTzpqVwWZI56pV35wL2DU00SfzFwDbAwpJYMGwIrhCaBjJvBivICrqxk7soQ/Dn/F6K0JLmhGzLDNVEYpVJoaqjggP466o/6v95lEUr2m7p6H8yLBmi49pE9uxX64E9OAC74nCobWnDM/qFlZbqxh3006qMLGz2l3MBmap7AcR6PwJRjbQZe5TbKJDkeGAyTJFADlto8MfuzMjUD8VaiePL3XGNVUp6iIciJkMRF4dT2y4rYxFJ0Phz+4AxbWpjqsN5l/AzuwxP9BxahFc4fSiUaXgxyX1dnw6GNAzRwkS7BqB/5Sh3UWMb3WnDoPkeftQ5outQHtLawMawjiypjpE6TJC847C8IoxsVc2ISLuskhE/H8WU8TAqqTWLNgM4iV3YdYt9C38PtdwD9u5C+NXejmC3BDxLzt+R+wE4v4mF83jLvjXFN7Z6Q2z4sb+G1uCkwXr6HfH8mug5lgOeh0eTN+gbw6fnQCQydRx7juqtui4MKVqT4DmK/4TVqAA4KUtM3kO6h9vAX8buE0VVIaRmhNHdQk0bD87im5UlF5qKWlBH1Wdqu7VYmZkxsPzrb4Z10eyqSP7xgv9ePPuUvUCxEbUDu41VCjxLj3R8Wn+BpCZy1KBrWXs43nLdEC9bYHD3sGnoQ0g5wLtu/XYNB+y/1h0f34rSH6iRq4El31q/7x+5Qa95w54RzeHcds1dUOp5sHI8Dwfej6XT2hvMW6sHCGkVenpPhSAXceP7N+biffjU2OcyslvQK4S2mJojzoztyb19UCm/jkpqqWQFEAQVoZmIoCvcUAz/WkLROakw5PMeOwq5sEJ38Ekte2ol699Prk6ydJuP5Xm/UnRSD8z6CaTGEUXFEKLK2nyiw75asQ8ca0gTP/zqD3auTP6nCM1FAVZUNw8r1RBjhMASR+5T5uDiu3dy7Ibq6cSLAf6IoZij1okBenSsIJ6/7WhnPu6Mt2v0LMkc7LA=="/>

Tuttavia, non fa parte del nucleo di ThreeJS. Quindi per usarlo dovresti importarlo dal modulo`three/addons/controls/TextGeometry` .

Questo crea un problema perché \*TresJS\*\* crea automaticamente un catalogo del nucleo di Tre in modo da poterli usare come componenti.

Fortunatamente **TresJS** fornisce un modo per estendere il catalogo dei componenti. Puoi farlo usando il metodo `extend` dalla libreria principale.

Per ulteriori informazioni sull'estensione del catalogo TresJS, fare riferimento alla sezione [extending](/advanced/extending.md).

## Usare TextGeometry

Per usare`TextGeometry` è necessario importarlo dal modulo`three/addons/geometries/TextGeometry` .

```js
import { TextGeometry } from "three/addons/geometries/TextGeometry";
```

Quindi è necessario estendere il catalogo dei componenti utilizzando il metodo `extend` .

```js
import { extend } from "@tresjs/core";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

extend({ TextGeometry });
```

[TextGeometry](https://threejs.org/docs/index.html"q=text#examples/en/geometries/TextGeometry) richiede un solo argomento - il carattere. Potete trovare un esempio qui sotto.

```js
const fontPath = "https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json";

const loader = new FontLoader();

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, (font) => {
      resolve(font);
    });
  } catch (error) {
    reject(console.error("cientos", error));
  }
});
```

Successivamente puoi usare il componente `TresTextGeometry` all'interno di un TresMesh nella tua scena

```vue
<template>
  <TresCanvas shadows alpha>
    <TresMesh>
      <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    </TresMesh>
  </TresCanvas>
</template>
```

poi come nell'esempio si può passare un oggetto con le configurazioni desiderate.

```ts
const fontOptions = {
  size: 0.5,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
};
```

Possiamo anche passare un matcapTexture per aggiungere dettagli finali, utilizzando il TresMeshNormalMaterial all'interno del TresMesh.

```ts
const matcapTexture = await useTexture([
  "https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png",
]);
```

```html
<TresMesh>
  <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
  <TresMeshNormalMaterial :matcap="matcapTexture" />
</TresMesh>
```

Quindi il codice finale sarebbe simile a questo:

```vue
<script setup lang="ts">
import { extend } from "@tresjs/core";
import { TextGeometry } from "three/addons/geometries/TextGeometry";
import { FontLoader } from "three/addons/loaders/FontLoader";
import { useTexture } from "/@/composables";

extend({ TextGeometry });

const fontPath = "https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json";

const fontOptions = {
  size: 0.5,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
};

const loader = new FontLoader();

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, (font) => {
      resolve(font);
    });
  } catch (error) {
    reject(console.error("cientos", error));
  }
});

const matcapTexture = await useTexture([
  "https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png",
]);
</script>

<template>
  <TresCanvas shadows alpha>
    <TresMesh>
      <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
      <TresMeshNormalMaterial :matcap="matcapTexture" />
    </TresMesh>
  </TresCanvas>
</template>
```

Sappiamo che questo sembra un sacco di lavoro, ma la buona notizia è, c'è un modo molto più semplice

## TextGeometry da `cientos`

Il pacchetto `Cientos` fornisce un componente chiamato `<Text3D />`, che è un wrapper della `TextGeometria` dal modulo [`three-stdlib``](https://github.com/pms/three-stdlib).

La parte più bella? Non è necessario estendere il catalogo e passare solo l'argomento del carattere.
Funziona. 💯 (se non viene fornito il testo, il testo sarà TresJS)

```vue
<template>
  <TresCanvas shadows alpha>
    <Text3D :font="fontPath" />
  </TresCanvas>
</template>
```

Possiamo passare le opzioni come oggetti di scena

```html
<Text3D :font="fontPath" :text="my 3d text" :size="0.8" />
```

nel caso in cui le opzioni non siano fornite, i valori predefiniti saranno:

```
size: 0.5,
height: 0.2,
curveSegments: 5,
bevelEnabled: true,
bevelThickness: 0.05,
bevelSize: 0.02,
bevelOffset: 0,
bevelSegments: 4,
```

Per impostazione predefinita il testo in ThreeJS inizia dalla posizione iniziale della mesh, quindi è [0,0,0] e il testo inizierà lì, ma possiamo centrarlo semplicemente passando il flag "centro"

```vue
<Text3D :font="fontPath" :text="my 3d text" center />
```
