# Text3D

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) es uno de los maneras que podemos añadir texto en 3D en nuestras escenas.

<StackBlitzEmbed projectId="tresjs-text3d-cientos" />

Sin embargo, no es parte del core de ThreeJS. Entonces, para usarlo, necesitarías importarlo del modulo `three/examples/jsm/controls/TextGeometry`.

Eso crea un problema porque automáticamente **TresJS** crea un catálogo del core de Three para que puedes usarlos como componentes.

Afortunadamente, **TresJS** provee una manera para extender el catálogo del componentes. Puedes hacerlo usando el método `extend` usando el composable [useCatalogue](/api/composables#usecatalog).

Para más información sobre come extender tu catálogo TresJS, hacer referencia a la sección [extending](/advanced/extending.md).

## Utilizar TextGeometry

Para usar `TextGeometry` necesitas importarlo del modulo `three/examples/jsm/geometries/TextGeometry`.

```js
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
```

Después, necesitas extender el catálogo de componentes usando el método `extend` del composable [useCatalogue](/api/composables#usecatalog).

```js
import { useCatalogue } from '@tresjs/core'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const { extend } = useCatalogue()

extend({ TextGeometry: TextGeometry })
```

[TextGeometry](https://threejs.org/docs/index.html?q=text#examples/en/geometries/TextGeometry) tiene solo un argumento necesario: el font. Puedes ver un ejemplo debajo. 

```js
const fontPath = 'https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json'

const loader = new FontLoader()

const font = await new Promise((resolve, reject) => {
  try {
    loader.load(fontPath, font => {
      resolve(font)
    })
  } catch (error) {
    reject(console.error('cientos', error))
  }
})
```

Ahora, puedes usar el componente `TresTextGeometry` dentro de un TresMesh en tu escena.

```vue
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresMesh>
        <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
```

Como en el ejemplo, puedes pasar un objeto con las configuraciones deseadas.

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

También podemos pasar un matcapTexture para añadir los detalles finales, usando el TresMeshNormalMaterial dentro del TresMesh

```ts
const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])

  <TresMesh>
    <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
```

Entonces, el código final estaría algo como eso:

```vue
<script setup lang="ts">
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { useCatalogue, useTexture } from '/@/core'
const { extend } = useCatalogue()

extend({ TextGeometry: TextGeometry })

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
    loader.load(fontPath, font => {
      resolve(font)
    })
  } catch (error) {
    reject(console.error('cientos', error))
  }
})

const matcapTexture = await useTexture(['https://raw.githubusercontent.com/Tresjs/assets/main/textures/matcaps/7.png'])
</script>
<template>
  <TresMesh>
    <TresTextGeometry :args="['TresJS', { font, ...fontOptions }]" center />
    <TresMeshNormalMaterial :matcap="matcapTexture" />
  </TresMesh>
</template>
```

Yo sé que parece mucho trabajo, pero hay buena noticia, hay una manera mucho más simple.

## TextGeometry from `cientos`

El paquete `cientos` provee un componente se llama `<Text3D />` que es un wrapper del `TextGeometry` del modulo [`three-stdlib`](https://github.com/pmndrs/three-stdlib).

El parte más amable? No necesitas extender el catálogo. Solo pasa el argumento del font. Ya funciona. 💯 (Si no hay texto provisto, el texto será 'TresJS')

```vue
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <Text3D :font="fontPath" />
    </TresScene>
  </TresCanvas>
</template>
```

Podemos pasar las opciones como props

```html
<Text3D :font="fontPath" :text="my 3d text" :size="0.8" />
```

En el caso que las opciones no son provisto, los valores por defecto son:

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

Por defecto, texto en ThreeJS empece al mesh posición inicial, entonces es [0,0,0]. El texto empece allá, pero podemos centrarlo por simple pasar la bandera "center"

```js
<Text3D :font="fontPath" :text="my 3d text" center  />
```
