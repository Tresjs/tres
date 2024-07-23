---
title: Tekst 3D
description: Add 3D tekst met gemak
author: alvarosabu
thumbnail: /recipes/text-3d.png
difficulty: 1
---

# Text3D

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) is een van de manieren waarmee we 3D tekst in onze scene kunnen toevoegen.

<SandboxDemo url="https://play.tresjs.org/#eNqdVlFv2zYQ/iuEgsEbZkuOnXSd5gxe7G5YsbRF7LcqD7RES0wokiApO0Hg/74jKduUkWbp8hCYdx+/O3684+k5Wiqi/5Ay3jQkSqOJzhWVBmliGokY5uVVFhmdRb9nnNZSKIOe0TXWNF9UuBDbGyz7aHH71/VMMKEWEuekjz6JpeAEXJLyEu3QWoka9UylCOn9FvDY0DPMN1gfQFMDtnud5EJ1sZ/VipqZ4EYJ9gKcEm6EDnYsyaNpQXFiF/aAvYxnPBdcG1QydIWeM45QzghWLv0U9c7ej+bXs8te33q0O6JOkVENcRbMZIVTtMZMe4OHwFGXT5Kkp8pYhGiMbCDzvTzpqVwWZI56pV35wL2DU00SfzFwDbAwpJYMGwIrhCaBjJvBivICrqxk7soQ/Dn/F6K0JLmhGzLDNVEYpVJoaqjggP466o/6v95lEUr2m7p6H8yLBmi49pE9uxX64E9OAC74nCobWnDM/qFlZbqxh3006qMLGz2l3MBmap7AcR6PwJRjbQZe5TbKJDkeGAyTJFADlto8MfuzMjUD8VaiePL3XGNVUp6iIciJkMRF4dT2y4rYxFJ0Phz+4AxbWpjqsN5l/AzuwxP9BxahFc4fSiUaXgxyX1dnw6GNAzRwkS7BqB/5Sh3UWMb3WnDoPkeftQ5outQHtLawMawjiypjpE6TJC847C8IoxsVc2ISLuskhE/H8WU8TAqqTWLNgM4iV3YdYt9C38PtdwD9u5C+NXejmC3BDxLzt+R+wE4v4mF83jLvjXFN7Z6Q2z4sb+G1uCkwXr6HfH8mug5lgOeh0eTN+gbw6fnQCQydRx7juqtui4MKVqT4DmK/4TVqAA4KUtM3kO6h9vAX8buE0VVIaRmhNHdQk0bD87im5UlF5qKWlBH1Wdqu7VYmZkxsPzrb4Z10eyqSP7xgv9ePPuUvUCxEbUDu41VCjxLj3R8Wn+BpCZy1KBrWXs43nLdEC9bYHD3sGnoQ0g5wLtu/XYNB+y/1h0f34rSH6iRq4El31q/7x+5Qa95w54RzeHcds1dUOp5sHI8Dwfej6XT2hvMW6sHCGkVenpPhSAXceP7N+biffjU2OcyslvQK4S2mJojzoztyb19UCm/jkpqqWQFEAQVoZmIoCvcUAz/WkLROakw5PMeOwq5sEJ38Ekte2ol699Prk6ydJuP5Xm/UnRSD8z6CaTGEUXFEKLK2nyiw75asQ8ca0gTP/zqD3auTP6nCM1FAVZUNw8r1RBjhMASR+5T5uDiu3dy7Ibq6cSLAf6IoZij1okBenSsIJ6/7WhnPu6Mt2v0LMkc7LA=="/>

Het maakt echter geen deel uit van de kern van ThreeJS. Om het te gebruiken moet je het dus importeren vanuit de module `three/addons/controls/TextGeometry`.

Dit levert een probleem op omdat **TresJS** automatisch een catalogus van de kern van Three maakt, zodat u deze als componenten kunt gebruiken.

Gelukkig biedt **TresJS** een manier om de catalogus met componenten uit te breiden. U kunt dit doen door de `extend` methode uit de kernbibliotheek te gebruiken.

Voor meer informatie over het uitbreiden van uw TresJS-catalogus raadpleegt u de sectie [extending](/nl/advanced/extending.md).

## TextGeometry gebruiken

Om `TextGeometry` te gebruiken moet je het eerst importeren via de `three/addons/geometries/TextGeometry` module.

```js
import { TextGeometry } from 'three/addons/geometries/TextGeometry'
```

Daarna moet je de catalogus van componenten extenden middels de `extend` method.

```js
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

extend({ TextGeometry })
```

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) heeft maar één argument nodig - de font. Je vind hieronder een voorbeeld.

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

Vervolgens kunt u de component `TresTextGeometry` in een TresMesh in uw scène gebruiken

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

dan kunt u, net als in het voorbeeld, een object doorgeven met de gewenste configuraties.

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

We kunnen ook een matcapTexture doorgeven om de laatste details toe te voegen, met behulp van het TresMeshNormalMaterial in de TresMesh.

```ts
const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])
```

```html
<TresMesh>
  <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
  <TresMeshNormalMaterial :matcap="matcapTexture" />
</TresMesh>
```

De uiteindelijke code zou er dus ongeveer zo uitzien:

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

We weten dat dit veel werk lijkt, maar het goede nieuws is dat er een veel eenvoudigere manier is

## TextGeometry van `cientos`

De `cientos` package bied een component genaamd `<Text3D />`, wat een wrapper van de `TextGeometry` is van de [`three-stdlib`](https://github.com/pmndrs/three-stdlib) module.

Het beste gedeelte? Je hoeft de catalogus niet te extenden en je hoeft alleen de font als argument mee te geven.
It just works. 💯 (Als er geen tekst is meegegeven dan zal de text TresJS zijn)

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

We kunnen de opties doorgeven als props

```html
<Text3D :font="fontPath" text="my 3d text" :size="0.8" />
```

als de opties niet zijn opgegeven, zijn de standaardwaarden:

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

Standaard begint tekst in ThreeJS op de beginpositie van de mesh, dus het is [0,0,0] en de tekst begint daar, maar we kunnen deze centreren door gewoon de flag "center" door te geven

```vue
<Text3D :font="fontPath" text="my 3d text" center />
```
