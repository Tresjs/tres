---
title: Texte 3D
description: Ajoutez facilement du texte 3D
author: alvarosabu
thumbnail: /recipes/text-3d.png
difficulty: 1
---

# Texte 3D

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) est l'un des moyens par lesquels nous pouvons ajouter du texte 3D à notre scène.

<SandboxDemo url="https://play.tresjs.org/#eNqdVlFv2zYQ/iuEgsEbZkuOnXSd5gxe7G5YsbRF7LcqD7RES0wokiApO0Hg/74jKduUkWbp8hCYdx+/O3684+k5Wiqi/5Ay3jQkSqOJzhWVBmliGokY5uVVFhmdRb9nnNZSKIOe0TXWNF9UuBDbGyz7aHH71/VMMKEWEuekjz6JpeAEXJLyEu3QWoka9UylCOn9FvDY0DPMN1gfQFMDtnud5EJ1sZ/VipqZ4EYJ9gKcEm6EDnYsyaNpQXFiF/aAvYxnPBdcG1QydIWeM45QzghWLv0U9c7ej+bXs8te33q0O6JOkVENcRbMZIVTtMZMe4OHwFGXT5Kkp8pYhGiMbCDzvTzpqVwWZI56pV35wL2DU00SfzFwDbAwpJYMGwIrhCaBjJvBivICrqxk7soQ/Dn/F6K0JLmhGzLDNVEYpVJoaqjggP466o/6v95lEUr2m7p6H8yLBmi49pE9uxX64E9OAC74nCobWnDM/qFlZbqxh3006qMLGz2l3MBmap7AcR6PwJRjbQZe5TbKJDkeGAyTJFADlto8MfuzMjUD8VaiePL3XGNVUp6iIciJkMRF4dT2y4rYxFJ0Phz+4AxbWpjqsN5l/AzuwxP9BxahFc4fSiUaXgxyX1dnw6GNAzRwkS7BqB/5Sh3UWMb3WnDoPkeftQ5outQHtLawMawjiypjpE6TJC847C8IoxsVc2ISLuskhE/H8WU8TAqqTWLNgM4iV3YdYt9C38PtdwD9u5C+NXejmC3BDxLzt+R+wE4v4mF83jLvjXFN7Z6Q2z4sb+G1uCkwXr6HfH8mug5lgOeh0eTN+gbw6fnQCQydRx7juqtui4MKVqT4DmK/4TVqAA4KUtM3kO6h9vAX8buE0VVIaRmhNHdQk0bD87im5UlF5qKWlBH1Wdqu7VYmZkxsPzrb4Z10eyqSP7xgv9ePPuUvUCxEbUDu41VCjxLj3R8Wn+BpCZy1KBrWXs43nLdEC9bYHD3sGnoQ0g5wLtu/XYNB+y/1h0f34rSH6iRq4El31q/7x+5Qa95w54RzeHcds1dUOp5sHI8Dwfej6XT2hvMW6sHCGkVenpPhSAXceP7N+biffjU2OcyslvQK4S2mJojzoztyb19UCm/jkpqqWQFEAQVoZmIoCvcUAz/WkLROakw5PMeOwq5sEJ38Ekte2ol699Prk6ydJuP5Xm/UnRSD8z6CaTGEUXFEKLK2nyiw75asQ8ca0gTP/zqD3auTP6nCM1FAVZUNw8r1RBjhMASR+5T5uDiu3dy7Ibq6cSLAf6IoZij1okBenSsIJ6/7WhnPu6Mt2v0LMkc7LA=="/>

Cependant, cela ne fait pas partie du cœur de ThreeJS. Par conséquent, pour l'utiliser, vous devrez l'importer depuis le module `three/addons/controls/TextGeometry`.

Cela crée un problème car **TresJS** crée automatiquement un catalogue des trois cœurs afin que vous puissiez les utiliser comme composants.

Heureusement, **TresJS** offre un moyen d'étendre le catalogue de composants. Vous pouvez le faire en utilisant la méthode `extend` de la bibliothèque principale.

Pour plus d'informations sur la façon d'étendre votre catalogue TresJS, consultez la section [extending](/advanced/extending.md).

## Avec TextGeometry

Pour utiliser `TextGeometry`, vous devez d'abord importer `three/addons/geometries/TextGeometry`.

```js
import { TextGeometry } from 'three/addons/geometries/TextGeometry'
```

Ensuite, vous devez étendre le catalogue de composants à l'aide de la méthode `extend`.

```js
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

extend({ TextGeometry })
```

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) n'a besoin que d'un seul argument obligatoire, la source. Vous pouvez voir un exemple ci-dessous.

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

Vous pouvez maintenant utiliser le composant `TresTextGeometry` dans un TresMesh dans votre scène.

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

puis, comme dans l'exemple, vous pouvez passer un objet avec les paramètres souhaités.

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

Nous pouvons également transmettre un matcapTexture pour ajouter les derniers détails, en utilisant TresMeshNormalMaterial dans TresMesh.

```ts
const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])

  <TresMesh>
    <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
```

Le code final ressemblerait donc à ceci :

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

Je sais que cela semble demander beaucoup de travail, mais j'ai une bonne nouvelle, il existe un moyen beaucoup plus simple.

## TextGeometry de `cientos`

Le package `cientos` fournit un composant appelé `<Text3D />` qui est un wrapper pour `TextGeometry` du module [`three-stdlib`](https://github.com/pmndrs/three-stdlib).

Le meilleur? Vous n'avez pas besoin d'étendre le catalogue, transmettez simplement l'argument source.
Cela fonctionne tout simplement. 💯 (si aucun texte n'est fourni, le texte sera TresJS)

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

Nous pouvons passer les options comme une propriété:

```html
<Text3D :font="fontPath" :text="my 3d text" :size="0.8" />
```

Dans le cas où les options ne sont pas fournies, les valeurs par défaut sont :

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

Par défaut, le texte dans ThreeJS commence à la position de départ du maillage, donc s'il vaut [0,0,0], le texte commencera là, mais nous pouvons le centrer en passant simplement la props "center".

```vue
<Text3D :font="fontPath" :text="my 3d text" center />
```
