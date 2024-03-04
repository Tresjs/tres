---
title: Text 3D
description: Füge mühelos 3D-Text hinzu
author: alvarosabu
thumbnail: /recipes/text-3d.png
difficulty: 1
---

# Text laden

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) ist eine der Möglichkeiten, wie wir 3D-Text zu unserer Szene hinzufügen können.

<SandboxDemo url="https://play.tresjs.org/#eNqdVlFv2zYQ/iuEgsEbZkuOnXSd5gxe7G5YsbRF7LcqD7RES0wokiApO0Hg/74jKduUkWbp8hCYdx+/O3684+k5Wiqi/5Ay3jQkSqOJzhWVBmliGokY5uVVFhmdRb9nnNZSKIOe0TXWNF9UuBDbGyz7aHH71/VMMKEWEuekjz6JpeAEXJLyEu3QWoka9UylCOn9FvDY0DPMN1gfQFMDtnud5EJ1sZ/VipqZ4EYJ9gKcEm6EDnYsyaNpQXFiF/aAvYxnPBdcG1QydIWeM45QzghWLv0U9c7ej+bXs8te33q0O6JOkVENcRbMZIVTtMZMe4OHwFGXT5Kkp8pYhGiMbCDzvTzpqVwWZI56pV35wL2DU00SfzFwDbAwpJYMGwIrhCaBjJvBivICrqxk7soQ/Dn/F6K0JLmhGzLDNVEYpVJoaqjggP466o/6v95lEUr2m7p6H8yLBmi49pE9uxX64E9OAC74nCobWnDM/qFlZbqxh3006qMLGz2l3MBmap7AcR6PwJRjbQZe5TbKJDkeGAyTJFADlto8MfuzMjUD8VaiePL3XGNVUp6iIciJkMRF4dT2y4rYxFJ0Phz+4AxbWpjqsN5l/AzuwxP9BxahFc4fSiUaXgxyX1dnw6GNAzRwkS7BqB/5Sh3UWMb3WnDoPkeftQ5outQHtLawMawjiypjpE6TJC847C8IoxsVc2ISLuskhE/H8WU8TAqqTWLNgM4iV3YdYt9C38PtdwD9u5C+NXejmC3BDxLzt+R+wE4v4mF83jLvjXFN7Z6Q2z4sb+G1uCkwXr6HfH8mug5lgOeh0eTN+gbw6fnQCQydRx7juqtui4MKVqT4DmK/4TVqAA4KUtM3kO6h9vAX8buE0VVIaRmhNHdQk0bD87im5UlF5qKWlBH1Wdqu7VYmZkxsPzrb4Z10eyqSP7xgv9ePPuUvUCxEbUDu41VCjxLj3R8Wn+BpCZy1KBrWXs43nLdEC9bYHD3sGnoQ0g5wLtu/XYNB+y/1h0f34rSH6iRq4El31q/7x+5Qa95w54RzeHcds1dUOp5sHI8Dwfej6XT2hvMW6sHCGkVenpPhSAXceP7N+biffjU2OcyslvQK4S2mJojzoztyb19UCm/jkpqqWQFEAQVoZmIoCvcUAz/WkLROakw5PMeOwq5sEJ38Ekte2ol699Prk6ydJuP5Xm/UnRSD8z6CaTGEUXFEKLK2nyiw75asQ8ca0gTP/zqD3auTP6nCM1FAVZUNw8r1RBjhMASR+5T5uDiu3dy7Ibq6cSLAf6IoZij1okBenSsIJ6/7WhnPu6Mt2v0LMkc7LA=="/>

Allerdings ist es kein Teil des Kerns von Three.js. Daher müsstest du es aus dem Modul `three/addons/geometries/TextGeometry` importieren.

**TresJS** erstellt automatisch einen Katalog aus dem Core von Three, damit du sie als Komponenten nutzen kannst. Allerdings ist standardmäßig `TextGeometry` nicht Teil dieses Katalogs.

Glücklicherweise bietet **TresJS** eine Möglichkeit, den Komponentenkatalog mit der `extend`-Methode zu erweitern.

Für weitere Informationen darüber, wie du deinen TresJS-Katalog erweitern kannst, siehe den Abschnitt [Erweitern](/de/advanced/extending.md).

## Verwendung von TextGeometry

Um `TextGeometry` zu verwenden, musst du es aus dem Modul `three/addons/geometries/TextGeometry` importieren.

```js
import { TextGeometry } from 'three/addons/geometries/TextGeometry'
```

Danach musst du den Komponentenkatalog mit der `extend`-Methode erweitern.

```js
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

extend({ TextGeometry })
```

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) benötigt nur die Schriftart als Argument. Unten siehst du ein Beispiel.

```js
const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const loader = new FontLoader()

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, (font) => {
      resolve(font)
    })
  }
  catch (error) {
    reject(console.error('cientos', error))
  }
})
```

Jetzt kannst du die Komponente `TresTextGeometry` innerhalb eines TresMesh in deiner Szene verwenden.

```vue
<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresMesh>
      <TresTextGeometry
        :args="['TresJS', { font, ...fontOptions }]"
        center
      />
    </TresMesh>
  </TresCanvas>
</template>
```

Dann kannst du, wie im Beispiel, ein Objekt mit den gewünschten Einstellungen übergeben.

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
}
```

Wir können auch eine matcapTexture übergeben, um feine Details hinzuzufügen, indem wir TresMeshNormalMaterial innerhalb von TresMesh verwenden.

```ts
const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])

  <TresMesh>
    <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
```

Also würde der finale Code so aussehen:

```vue
<script setup lang="ts">
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'
import { FontLoader } from 'three/addons/loaders/FontLoader'
import { useTexture } from '/@/composables'

extend({ TextGeometry })

const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const fontOptions = {
  size: 0.5,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
}

const loader = new FontLoader()

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, (font) => {
      resolve(font)
    })
  }
  catch (error) {
    reject(console.error('cientos', error))
  }
})

const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])
</script>

<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresMesh>
      <TresTextGeometry
        :args="['TresJS', { font, ...fontOptions }]"
        center
      />
      <TresMeshNormalMaterial :matcap="matcapTexture" />
    </TresMesh>
  </TresCanvas>
</template>
```

Das scheint viel Arbeit zu sein, aber es gibt eine einfachere Alternative.

## TextGeometry von `cientos`

Das Paket `cientos` bietet eine Komponente namens `<Text3D />`, die ein Wrapper für `TextGeometry` aus dem Modul [`three-stdlib`](https://github.com/pmndrs/three-stdlib) ist.

Das Beste daran? Du musst den Katalog nicht erweitern, gib einfach das Schriftargument an.

Es funktioniert einfach. 💯 (wenn kein Text angegeben wird, wird der Text TresJS sein)

```vue
<template>
  <TresCanvas
    shadows
    alpha
  >
    <Text3D :font="fontPath" />
  </TresCanvas>
</template>
```

Wir können die Optionen als Props übergeben

```html
<Text3D :font="fontPath" :text="my 3d text" :size="0.8" />
```

falls die Optionen nicht bereitgestellt werden, sind die Standardwerte:

```js
const fontOptions = {
  size: 0.5,
  height: 0.2,
  curveSegments: 5,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.02,
  bevelOffset: 0,
  bevelSegments: 4,
}
```

Der Text in Three.js beginnt standardmäßig an der Ausgangsposition des Meshs, also bei [0,0,0]. Um den Text zu zentrieren, können wir einfach das Flag "center" übergeben.

```vue
<Text3D :font="fontPath" :text="my 3d text" center />
```
