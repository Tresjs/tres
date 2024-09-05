# Composables

La API de Composición de Vue 3 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) te permite crear lógica reutilizable que se puede compartir entre componentes. También te permite crear hooks personalizados que se pueden utilizar en tus componentes.

**TresJS** aprovecha al máximo esta API para crear un conjunto de funciones composables que se pueden utilizar para crear animaciones, interactuar con la escena y más. También te permite crear escenas más complejas que podrían no ser posibles utilizando solo los Componentes de Vue (Texturas, Cargadores, etc.).

El núcleo de **TresJS** utiliza estos composables internamente, por lo que estarías utilizando la misma API que utiliza el núcleo. Por ejemplo, los componentes que necesitan actualizarse en el bucle de renderizado interno utilizan el composable `useRenderLoop` para registrar un callback que se llamará cada vez que el renderizador actualice la escena.

## useRenderLoop

El composable `useRenderLoop` es el núcleo de las animaciones en **TresJS**. Te permite registrar un callback que se llamará en la frecuencia de actualización nativa. Este es el composable más importante en **TresJS**.

```ts
const { onLoop, resume } = useRenderLoop()

onLoop(({ delta, elapsed, clock, dt }) => {
  // I will run at every frame ~60FPS (depending of your monitor)
})
```

::: warning
Ten en cuenta las implicaciones de rendimiento al usar este composable. Se ejecutará en cada fotograma, por lo que si tienes mucha lógica en tu callback, podría afectar el rendimiento de tu aplicación. Especialmente si estás actualizando estados o referencias reactivas.
:::

El callback `onLoop` recibe un objeto con las siguientes propiedades basadas en el [reloj de THREE](https://threejs.org/docs/?q=clock#api/en/core/Clock):

- `delta`: El tiempo transcurrido entre el fotograma actual y el último fotograma. Este es el tiempo en segundos desde el último fotograma.
- `elapsed`: El tiempo transcurrido desde el inicio del bucle de renderizado.

Este composable se basa en `useRafFn` de [vueuse](https://vueuse.org/core/useRafFn/). Gracias a [@wheatjs](https://github.com/wheatjs) por la increíble contribución.

### Antes y después de renderizar

También puedes registrar un callback que se llamará antes y después de que el renderizador actualice la escena. Esto es útil si agregas un perfilador para medir los FPS, por ejemplo.

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop()

onBeforeLoop(({ delta, elapsed }) => {
  // Se ejecutara antes del renderizado de la escena
  fps.begin()
})

onAfterLoop(({ delta, elapsed }) => {
  // Se ejecutara después del renderizado de la escena
  fps.end()
})
```

### Pausar y reanudar

Puedes pausar y reanudar el bucle de renderizado utilizando los métodos `pause` y `resume` expuestos.

```ts
const { pause, resume } = useRenderLoop()

// Pausa el bucle de renderizado
pause()

// Reanuda el bucle de renderizado
resume()
```

También puedes obtener el estado activo del bucle de renderizado utilizando la propiedad `isActive`.

```ts
const { resume, isActive } = useRenderLoop()

console.log(isActive) // false

resume()

console.log(isActive) // true
```

## useLoader

El composable `useLoader` te permite cargar recursos utilizando los [cargadores de THREE.js](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models). Retorna una promesa con el recurso cargado.

```ts
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(THREE.GLTFLoader, 'path/to/asset.gltf')
```

Dado que el composable `useLoader` devuelve una promesa, puedes usarlo con `async/await` o `then/catch`. Si lo estás utilizando en un componente, asegúrate de envolverlo con un componente `Suspense`. Consulta [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) para obtener más información.

```vue
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

El composable `useTexture` te permite cargar texturas utilizando el [cargador de texturas de THREE.js](https://threejs.org/docs/#api/en/loaders/TextureLoader). Retorna una promesa con la(s) textura(s) cargada(s).

```ts
const texture = await useTexture(['path/to/texture.png'])
```

**useTexture** también acepta un objeto con las siguientes propiedades:

- `map`: una textura básica que se aplica a la superficie de un objeto
- `displacementMap`: una textura que se utiliza para agregar protuberancias o indentaciones a la superficie del objeto
- `normalMap`: una textura que se utiliza para agregar detalles de superficie y variaciones en el sombreado al objeto
- `roughnessMap`: una textura que se utiliza para agregar rugosidad o un acabado mate a la superficie del objeto
- `metalnessMap`: una textura que se utiliza para agregar un efecto metálico a la superficie del objeto
- `aoMap`: una textura que se utiliza para agregar oclusión ambiental (sombreado en áreas donde la luz es bloqueada por otros objetos) al objeto.
- `alphaMap`: una textura que se utiliza para agregar transparencia (la parte negra se renderiza como transparente) al objeto. Es necesario establecer :transparent="true" en el material para usar este mapa.
- `matcap`: esta textura codifica el color y el sombreado del material.

En ese caso, devolverá un objeto con las texturas cargadas.

```ts
const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap, alphaMap, matcap } = await useTexture({
  map: 'path/to/albedo.png',
  displacementMap: 'path/to/height.png',
  normalMap: 'path/to/normal.png',
  roughnessMap: 'path/to/roughness.png',
  metalnessMap: 'path/to/metalness.png',
  aoMap: 'path/to/ambien-occlusion.png',
  alphaMap: 'path/to/alpha.png',
  matcap: 'path/to/matcap.png',
})
```

Luego puedes vincular las texturas al material.

```vue
<template>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshStandardMaterial
        :map="map"
        :displacement-map="displacementMap"
        :normal-map="normalMap"
        :roughness-map="roughnessMap"
        :metalness-map="metalnessMap"
        :ao-map="aoMap"
        :alpha-map="alphaMap"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

Similar al composable anterior, el composable `useTexture` devuelve una promesa, puedes usarlo con `async/await` o `then/catch`. Si lo estás utilizando en un componente, asegúrate de envolverlo con un componente `Suspense`.

### UseTexture como componente

Puedes usar `UseTexture` como componente, de la siguiente forma:

```html
<Suspense>
  <UseTexture v-slot="{ textures }" map="path/to/texture.png">
    <TresMesh>
      <TresBoxGeometry />
      <TresMeshStandardMaterial :map="textures.map" />
    </TresMesh>
  </UseTexture>
</Suspense>
```

## Props

| Prop | type |
| ---- | --- |
| **map?** | `String` |
| **displacementMap?** | `String` |
| **normalMap?** | `String` |
| **roughnessMap?** | `String` |
| **metalnessMap?** | `String` |
| **aoMap?** | `String` |
| **alphaMap?** | `String` |
| **matcap?** | `String` |

::: warning
El componente `UseTexture` necesita estar envuelto por un `Suspense` para poder funcionar
:::

## useSeek

El composable `useSeek` proporciona utilidades para recorrer y navegar fácilmente a través de escenas y gráficos de objetos complejos de ThreeJS. Exporta 4 funciones que te permiten encontrar objetos secundarios basados en propiedades específicas.

```ts
const { seek, seekByName, seekAll, seekAllByName } = useSeek()
```

La función `seek` acepta tres parámetros:

- `parent`: Una escena ThreeJS u Object3D.
- `property`: La propiedad que se utilizará en la condición de búsqueda.
- `value`: El valor de la propiedad a coincidir.

La función `seek` y `seekByName` recorren el objeto y devuelven el objeto hijo con la propiedad y valor especificados. Si no se encuentra ningún hijo con la propiedad y valor dados, devuelve null y registra una advertencia.

```ts
const carRef = ref(null)

watch(carRef, ({ model }) => {
  if (model) {
    const car = model.children[0]

    const body = seek(car, 'name', 'Octane_Octane_Body_0')
    body.color.set(new Color('blue'))
  }
})
```

De manera similar, las funciones `seekAll` y `seekAllByName` devuelven un array de objetos secundarios cuya propiedad incluye el valor dado. Si no se encuentran coincidencias, devuelven un array vacío y se registra una advertencia.

```ts
const character = ref(null)

watch(character, ({ model }) => {
  if (model) {
    const bones = seekAll(character, type, 'Bone')
  }
})
```

## useTresContext
Este composable tiene como objetivo proporcionar acceso al modelo de estado que contiene múltiples propiedades útiles.

```ts
const { camera, renderer, camera, cameras } = useTresContext()
```

::: warning
`useTresContext` solo puede ser utilizado dentro de un `TresCanvas`, ya que `TresCanvas` actúa como el proveedor de los datos de contexto. Utiliza [el contexto expuesto por TresCanvas](tres-canvas#propiedades-públicas-expuestas) si necesitas acceder a él en componentes superiores a TresCanvas.
:::

```vue
<TresCanvas>
  <MyModel />
</TresCanvas>
```

```vue
// MyModel.vue

<script lang="ts" setup>
import { useTresContext } from '@tresjs/core'

const context = useTresContext()
</script>
```

### Propiedades del contexto
| Propiedad | Descripción |
| --- | --- |
| **camera** | la cámara actualmente activa |
| **cameras** | las cámaras que existen en la escena |
| **controls** | los controles de tu escena |
| **deregisterCamera** | un método para cancelar el registro de una cámara. Esto solo es necesario si creas una cámara manualmente. Las cámaras en la plantilla se registran automáticamente. |
| **extend** | Extiende el catálogo de componentes. Ver [extending](/advanced/extending) |
| **raycaster** | el raycaster global utilizado para eventos de puntero |
| **registerCamera** | un método para registrar una cámara. Esto solo es necesario si creas una cámara manualmente. Las cámaras en la plantilla se registran automáticamente. |
| **renderer** | el [WebGLRenderer](https://threejs.org/docs/#api/en/renderers/WebGLRenderer) de tu escena |
| **scene** | la [escena](https://threejs.org/docs/?q=sce#api/en/scenes/Scene) |
| **setCameraActive** | un método para establecer una cámara activa |
| **sizes** | contiene el ancho, alto y relación de aspecto de tu lienzo |
