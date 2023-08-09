# Composables

Vue 3 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) te permite crear lógica reutilizable que se puede compartir entre los componentes. También te permite crear hooks personalizados que puede ser usado en tus componentes.

**TresJs** aprovecha mucho está API para crear un grupo de funciones composables que se pueden usar para crear animaciones, interactuar con la escena y más. También te permite crear escenas más complejas que podrían no ser posible solo usando los componentes de Vue (Textures, Loaders, etc.).

El core de **TresJs** usa estos composables internamente, entonces estarías usando el mismo API que usa el core. Por ejemplo, componentes que se necesitan actualizar con request animation frame API pueden usar el composable `useRenderLoop` para registrar un callback que se llamará cada vez el renderer actualiza la escena.

## useRenderLoop

El composable `useRenderLoop` es el core de los animaciones de **TresJs**. Te permite registrar un callback que se llamará por cada frame. Este es uno de los composable más importante de **TresJs**.

```ts
const { onLoop, resume } = useRenderLoop()

onLoop(({ delta, elapsed, clock, dt }) => {
  // Me ejecutaré cada frame ~ 60FPS (dependiendo de tu equipo)
})
```

::: warning
Debes estar consciente de la implicación en el rendimiento para usar este composable. Se funcionará a cada frame, entonces si tienes mucha lógica en tu callback, podría impactar el rendimiento de tu app. Especialmente si estás actualizando los estados reactivos o las referencias.
:::

El callback `onLoop` recibe un objeto con las propiedades siguientes en base del [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock):

- `delta`: El delta tiempo entre el frame actual y frame final. Esto es el tiempo en segundos desde el frame ultimo.
- `elapsed`: El tiempo transcurrido desde cuando comenzó el render loop.

Este composable se base en `useRafFn` de [vueuse](https://vueuse.org/core/useRafFn/). Gracias a [@wheatjs](https://github.com/orgs/Tresjs/people/wheatjs) por la increíble contribución.

### Antes y después render

También puedes registrar un callback que se llamará antes y después el renderer actualiza la escena. Eso es útil si añades un profiler para medir el FPS por ejemplo.

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop()

onBeforeLoop(({ delta, elapsed }) => {
  // Me ejecutaré antes que el renderer actualize la escena
  fps.begin()
})

onAfterLoop(({ delta, elapsed }) => {
  // Me ejecutaré después que el renderer actualize la escena
  fps.end()
})
```

### Pausar y continuar

Puedes pausar y continuar el render loop usando los métodos de `pause` y `resume`.

```ts
const { pause, resume } = useRenderLoop()

// Pausar el render loop
pause()

// Continuar el render loop
resume()
```

También puedes conseguir el estado activo del render loop usando la propiedad `isActive`.

```ts
const { resume, isActive } = useRenderLoop()

console.log(isActive) // false

resume()

console.log(isActive) // true
```

## useLoader

El composable `useLoader` te permite cargar recursos usando el [THREE.js loaders](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models). Se desvuelve una promesa con el recurso cargado.

```ts
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

const { scene } = await useLoader(THREE.GLTFLoader, 'path/to/asset.gltf')
```

Desde el composable `useLoader` se desvuelve una promesa, puedes usarlo con un `async/await` o `then/catch`. Si estás usándolo en un componente, te aseguras de que es 'envuelto' con un componente `Suspense`. Ve [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) para más información.

```vue
<template>
  <Suspense>
    <TheComponentUsingLoader />
  </Suspense>
</template>
```

## useTexture

El composable `useTexture` te permite cargar texturas usando el [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader). Se desvuelve una promesa con uno o más texturas cargadas.

```ts
const texture = await useTexture(['path/to/texture.png'])
```

También **useTexture** acepta un objeto con las propiedades siguientes:

- `map`:Una textura básica que se aplica al superficie de un objeto.
- `displacementMap`: Una textura que se usa para añadir protuberancias o abolladuras al superficie del objeto.
- `normalMap`: Una textura que se usa para añadir detalles superficiales y variaciones de tonalidad al objeto.
- `roughnessMap`: Una textura que se usa para añadir rugosidad o una terminación mate al superficie del objeto.
- `metalnessMap`: Una textura que se usa para añadir un efecto metálico al superficie del objeto.
- `aoMap`: Una textura que se usa para añadir oclusión ambiental (tonalidad en zonas donde la luz se bloquea por otros objetos) al objeto.
- `alphaMap`: Una textura que se usa para agregar transparencia (Lo negro renderiza como transparente, o translucido) es necesario configurar :trasparent="true" en el material para que esta textura funciona
- `matcap`: Esta textura codifica el color y la sombra del material

En este caso, se desvuelve un objeto con las texturas cargadas.

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

Puedes hacer la conexión de las texturas al material, así.

```vue
<template>
  <TresCanvas>
    <TresMesh>
      <TresSphereGeometry />
      <TresMeshStandardMaterial
        :map="map"
        :displacementMap="displacementMap"
        :normalMap="normalMap"
        :roughnessMap="roughnessMap"
        :metalnessMap="metalnessMap"
        :aoMap="aoMap"
        :alphaMap="alphaMap"
      />
    </TresMesh>
  </TresCanvas>
</template>
```

Similar al composable anterior, el composable `useTexture` desvuelve una promesa puedes usarlo con `async/await` o `then/catch`. Si estás usándolo con un componente, te aseguras de que es 'envuelto' con un componente `Suspense`.

## useSeek

El composable `useSeek` provee de utilidades para navegar y buscar entre escenas complejas de Threejs. Exporta dos funciones `seek` y `seekByName` que permite encontrar a un objeto hijo, basado en los parámetros proporcionados

```ts
const { seek, seekbyName } = useSeek()
```

la función seek acepta tres parámetros:

- `parent`: Una escena de Threejs o un objeto3D
- `property`: Una propiedad para ser usada como condición de búsqueda.
- `value`: El valor a buscar.

Ambas funciones recorren el objeto y regresan el objeto con las criterios seleccionados. De lo contrario retornará un valor null y logs en warning en la consola

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

## useTresContext (anterior useTres)

Este composable intenta proveer acceso al modelo estado que se contiene el renderer por defacto, la cámara, la escena, y otras propiedades útiles.

```ts
const { camera, renderer } = useTresContext()

console.log(camera.value) // THREE.PerspectiveCamera
console.log(renderer.value) // THREE.WebGLRenderer
```

::: warning
Este composable solo puede ser usado dentro el contexto de `TresCanvas` (dentro de sub-componentes) debido a que el TresCanvas actúa como provider
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
