# WIP
<!-- # Texto3D

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) es una de las formas en las que podemos agregar texto en 3D a nuestra escena.

<SandboxDemo url="https://play.tresjs.org/#eNqdVlFv2zYQ/iuEgsEbZkuOnXSd5gxe7G5YsbRF7LcqD7RES0wokiApO0Hg/74jKduUkWbp8hCYdx+/O3684+k5Wiqi/5Ay3jQkSqOJzhWVBmliGokY5uVVFhmdRb9nnNZSKIOe0TXWNF9UuBDbGyz7aHH71/VMMKEWEuekjz6JpeAEXJLyEu3QWoka9UylCOn9FvDY0DPMN1gfQFMDtnud5EJ1sZ/VipqZ4EYJ9gKcEm6EDnYsyaNpQXFiF/aAvYxnPBdcG1QydIWeM45QzghWLv0U9c7ej+bXs8te33q0O6JOkVENcRbMZIVTtMZMe4OHwFGXT5Kkp8pYhGiMbCDzvTzpqVwWZI56pV35wL2DU00SfzFwDbAwpJYMGwIrhCaBjJvBivICrqxk7soQ/Dn/F6K0JLmhGzLDNVEYpVJoaqjggP466o/6v95lEUr2m7p6H8yLBmi49pE9uxX64E9OAC74nCobWnDM/qFlZbqxh3006qMLGz2l3MBmap7AcR6PwJRjbQZe5TbKJDkeGAyTJFADlto8MfuzMjUD8VaiePL3XGNVUp6iIciJkMRF4dT2y4rYxFJ0Phz+4AxbWpjqsN5l/AzuwxP9BxahFc4fSiUaXgxyX1dnw6GNAzRwkS7BqB/5Sh3UWMb3WnDoPkeftQ5outQHtLawMawjiypjpE6TJC847C8IoxsVc2ISLuskhE/H8WU8TAqqTWLNgM4iV3YdYt9C38PtdwD9u5C+NXejmC3BDxLzt+R+wE4v4mF83jLvjXFN7Z6Q2z4sb+G1uCkwXr6HfH8mug5lgOeh0eTN+gbw6fnQCQydRx7juqtui4MKVqT4DmK/4TVqAA4KUtM3kO6h9vAX8buE0VVIaRmhNHdQk0bD87im5UlF5qKWlBH1Wdqu7VYmZkxsPzrb4Z10eyqSP7xgv9ePPuUvUCxEbUDu41VCjxLj3R8Wn+BpCZy1KBrWXs43nLdEC9bYHD3sGnoQ0g5wLtu/XYNB+y/1h0f34rSH6iRq4El31q/7x+5Qa95w54RzeHcds1dUOp5sHI8Dwfej6XT2hvMW6sHCGkVenpPhSAXceP7N+biffjU2OcyslvQK4S2mJojzoztyb19UCm/jkpqqWQFEAQVoZmIoCvcUAz/WkLROakw5PMeOwq5sEJ38Ekte2ol699Prk6ydJuP5Xm/UnRSD8z6CaTGEUXFEKLK2nyiw75asQ8ca0gTP/zqD3auTP6nCM1FAVZUNw8r1RBjhMASR+5T5uDiu3dy7Ibq6cSLAf6IoZij1okBenSsIJ6/7WhnPu6Mt2v0LMkc7LA=="/>

Sin embargo, no forma parte del núcleo de ThreeJS. Por lo tanto, para usarlo, tendrías que importarlo desde el módulo `three/addons/controls/TextGeometry`.

Esto crea un problema porque **TresJS** crea automáticamente un catálogo del núcleo de Three para que puedas usarlos como componentes.

Afortunadamente, **TresJS** proporciona una forma de ampliar el catálogo de componentes. Puedes hacerlo utilizando el método `extend` de la biblioteca principal.

Para obtener más información sobre cómo ampliar tu catálogo de TresJS, consulta la sección de [extending](/advanced/extending.md).

## Usando TextGeometry

Para usar `TextGeometry`, debes importarlo desde el módulo `three/addons/geometries/TextGeometry`.

```js
import { TextGeometry } from 'three/addons/geometries/TextGeometry'
```

Luego, debes ampliar el catálogo de componentes utilizando el método `extend`.

```js
import { extend } from '@tresjs/core'
import { TextGeometry } from 'three/addons/geometries/TextGeometry'

extend({ TextGeometry })
```

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) necesita solo un argumento requerido, la fuente. Puedes ver un ejemplo a continuación.

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

Ahora puedes usar el componente `TresTextGeometry` dentro de un TresMesh en tu escena.

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

luego, como en el ejemplo, puedes pasar un objeto con las configuraciones deseadas.

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

También podemos pasar una matcapTexture para agregar detalles finales, utilizando TresMeshNormalMaterial dentro de TresMesh.

```ts
const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])

  <TresMesh>
    <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
```

Entonces, el código final sería algo como esto:

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

Sé que parece mucho trabajo, pero tengo buenas noticias, hay una forma mucho más sencilla.

## TextGeometry de `cientos`

El paquete `cientos` proporciona un componente llamado `<Text3D />` que es un envoltorio de `TextGeometry` del módulo [`three-stdlib`](https://github.com/pmndrs/three-stdlib).

¿Lo mejor? No necesitas extender el catálogo, solo pasa el argumento de la fuente.
Simplemente funciona. 💯 (si no se proporciona un texto, el texto será TresJS)

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

Podemos pasar las opciones como props

```html
<Text3D :font="fontPath" :text="my 3d text" :size="0.8" />
```

en caso de que no se proporcionen las opciones, los valores predeterminados son:

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

De forma predeterminada, el texto en ThreeJS comienza en la posición inicial de la malla, por lo que si es [0,0,0], el texto comenzará allí, pero podemos centrarlo simplemente pasando la bandera "center".

```vue
<Text3D :font="fontPath" :text="my 3d text" center />
``` -->
