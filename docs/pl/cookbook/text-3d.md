---
title: Text 3D
description: Dodaj tekst 3D z łatwością.
author: alvarosabu
thumbnail: /recipes/text-3d.png
difficulty: 1
---

# Tekst 3D

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) to jedna z metod, dzięki której możemy dodać tekst w 3D do naszej sceny.

<SandboxDemo url="https://play.tresjs.org/#eNqdVlFv2zYQ/iuEgsEbZkuOnXSd5gxe7G5YsbRF7LcqD7RES0wokiApO0Hg/74jKduUkWbp8hCYdx+/O3684+k5Wiqi/5Ay3jQkSqOJzhWVBmliGokY5uVVFhmdRb9nnNZSKIOe0TXWNF9UuBDbGyz7aHH71/VMMKEWEuekjz6JpeAEXJLyEu3QWoka9UylCOn9FvDY0DPMN1gfQFMDtnud5EJ1sZ/VipqZ4EYJ9gKcEm6EDnYsyaNpQXFiF/aAvYxnPBdcG1QydIWeM45QzghWLv0U9c7ej+bXs8te33q0O6JOkVENcRbMZIVTtMZMe4OHwFGXT5Kkp8pYhGiMbCDzvTzpqVwWZI56pV35wL2DU00SfzFwDbAwpJYMGwIrhCaBjJvBivICrqxk7soQ/Dn/F6K0JLmhGzLDNVEYpVJoaqjggP466o/6v95lEUr2m7p6H8yLBmi49pE9uxX64E9OAC74nCobWnDM/qFlZbqxh3006qMLGz2l3MBmap7AcR6PwJRjbQZe5TbKJDkeGAyTJFADlto8MfuzMjUD8VaiePL3XGNVUp6iIciJkMRF4dT2y4rYxFJ0Phz+4AxbWpjqsN5l/AzuwxP9BxahFc4fSiUaXgxyX1dnw6GNAzRwkS7BqB/5Sh3UWMb3WnDoPkeftQ5outQHtLawMawjiypjpE6TJC847C8IoxsVc2ISLuskhE/H8WU8TAqqTWLNgM4iV3YdYt9C38PtdwD9u5C+NXejmC3BDxLzt+R+wE4v4mF83jLvjXFN7Z6Q2z4sb+G1uCkwXr6HfH8mug5lgOeh0eTN+gbw6fnQCQydRx7juqtui4MKVqT4DmK/4TVqAA4KUtM3kO6h9vAX8buE0VVIaRmhNHdQk0bD87im5UlF5qKWlBH1Wdqu7VYmZkxsPzrb4Z10eyqSP7xgv9ePPuUvUCxEbUDu41VCjxLj3R8Wn+BpCZy1KBrWXs43nLdEC9bYHD3sGnoQ0g5wLtu/XYNB+y/1h0f34rSH6iRq4El31q/7x+5Qa95w54RzeHcds1dUOp5sHI8Dwfej6XT2hvMW6sHCGkVenpPhSAXceP7N+biffjU2OcyslvQK4S2mJojzoztyb19UCm/jkpqqWQFEAQVoZmIoCvcUAz/WkLROakw5PMeOwq5sEJ38Ekte2ol699Prk6ydJuP5Xm/UnRSD8z6CaTGEUXFEKLK2nyiw75asQ8ca0gTP/zqD3auTP6nCM1FAVZUNw8r1RBjhMASR+5T5uDiu3dy7Ibq6cSLAf6IoZij1okBenSsIJ6/7WhnPu6Mt2v0LMkc7LA=="/>

ednak nie jest to część rdzenia ThreeJS. Aby go użyć, musisz zaimportować go z modułu `three/addons/controls/TextGeometry`.

To tworzy problem, ponieważ **TresJS** automatycznie tworzy katalog rdzenia Three, abyś mógł używać ich jako komponentów.

Na szczęście **TresJS** zapewnia sposób rozszerzania katalogu komponentów. Możesz to zrobić, używając metody `extend` z głównej biblioteki.

Aby uzyskać więcej informacji na temat rozszerzania katalogu w TresJS, sprawdź sekcję [extending](/advanced/extending.md).

## Użycie TextGeometry

Aby używać `TextGeometry`, musisz go zaimportować z modułu `three/addons/geometries/TextGeometry`.

```js
import { TextGeometry } from "three/addons/geometries/TextGeometry";
```

Następnie musisz rozszerzyć katalog komponentów za pomocą metody `extend`.

```js
import { extend } from "@tresjs/core";
import { TextGeometry } from "three/addons/geometries/TextGeometry";

extend({ TextGeometry });
```

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) wymaga tylko jednego wymaganego argumentu, czyli źródła. Przykład użycia możesz zobaczyć poniżej.

```js
const fontPath =
  "https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json";

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

Teraz możesz użyć komponentu `TresTextGeometry` wewnątrz TresMesh w swojej scenie.

```vue
<template>
  <TresCanvas shadows alpha>
    <TresMesh>
      <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    </TresMesh>
  </TresCanvas>
</template>
```

Następnie, podobnie jak w przykładzie, możesz przekazać obiekt z pożądanymi konfiguracjami.

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

Możemy również przekazać teksturę matcapTexture, aby dodać drobne detale, używając TresMeshNormalMaterial wewnątrz TresMesh.

```ts
const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])

  <TresMesh>
    <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
```

W takim razie, końcowy kod wyglądałby mniej więcej tak:

```vue
<script setup lang="ts">
import { extend } from "@tresjs/core";
import { TextGeometry } from "three/addons/geometries/TextGeometry";
import { FontLoader } from "three/addons/loaders/FontLoader";
import { useTexture } from "/@/composables";

extend({ TextGeometry });

const fontPath =
  "https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json";

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

Rozumiem, że może wydawać się to dużo pracy, ale mam dobre wieści, istnieje znacznie prostsze rozwiązanie.

## TextGeometry z `cientos`

Pakiet `cientos` dostarcza komponentu o nazwie `<Text3D />` który jest opakowaniem dla `TextGeometry` z modułu [`three-stdlib`](https://github.com/pmndrs/three-stdlib).

Co najlepsze? Nie musisz rozszerzać katalogu, po prostu przekaż argument dla źródła.
Po prostu działa. 💯 (jeśli nie podano tekstu, tekst będzie TresJS)

```vue
<template>
  <TresCanvas shadows alpha>
    <Text3D :font="fontPath" />
  </TresCanvas>
</template>
```

Możemy przekazać opcje jako propsy

```html
<Text3D :font="fontPath" :text="my 3d text" :size="0.8" />
```

w przypadku braku dostarczenia opcji, wartości domyślne to:

```js
size: 0.5,
height: 0.2,
curveSegments: 5,
bevelEnabled: true,
bevelThickness: 0.05,
bevelSize: 0.02,
bevelOffset: 0,
bevelSegments: 4,
```

Domyślnie tekst w ThreeJS zaczyna się w pozycji początkowej meshu, więc jeśli jest to [0,0,0], tekst zacznie się tam, ale możemy go wyśrodkować, po prostu przekazując flagę "center".

```vue
<Text3D :font="fontPath" :text="my 3d text" center />
```
