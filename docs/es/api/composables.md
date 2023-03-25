# Composables

Vue 3 [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html#what-is-composition-api) te permite crear lógica reutilizable que se puede compartir entre los componentes. También te permite crear hooks personalizados que puede ser usado en tus componentes.

**TresJS** aprovecha mucho está API para crear un grupo de funciones composables que se pueden usar para crear animaciones, interactuar con la escena y más. También te permite crear escenas más complejas que podrían no ser posible solo usando los componentes de Vue (Textures, Loaders, etc.).

El core de **TresJS** usa estos composables internalmente, entonces estarías usando el mismo API que usa el core. Por ejemplo, componentes que se necesitan actualizar en el render loop internal usa el composable `useRenderLoop` para registrar un callback que se llamará cada vez el renderer actualiza la escena.

## useRenderLoop

El composable `useRenderLoop` es el core de los animaciones de **TresJS**. Te permite registrar un callback que se llamará en el ritmo nativo de actualizar. Esto es el composable más importante de **TresJS**.

```ts
const { onLoop, resume } = useRenderLoop()

onLoop(({ delta, elapsed, clock, dt }) => {
  // I will run at every frame ~ 60FPS (depending of your monitor)
})
```

::: precaución
Está consciente de la implicación sobre el rendimiento de usar est composable. Se funcionará a cada frame, entonces si tienes mucha lógica en tu callback, podría impactar el rendimiento de tu app. Especialmente si estás actualizando los estados reactivos o las referencias. 
:::

El callback `onLoop` recibe un objeto con las propiedades siguientes en base del [THREE clock](https://threejs.org/docs/?q=clock#api/en/core/Clock):

- `delta`: El delta tiempo entre el frame actual y frame final. Esto es el tiempo en segundos desde el frame ultimo.
  
- `elapsed`: El tiempo transcurrido desde cuando comenzó el render loop.

Este composable se base en `useRafFn` de [vueuse](https://vueuse.org/core/useRafFn/). Gracias a [@wheatjs](https://github.com/orgs/Tresjs/people/wheatjs) por la contribución increíble.

### Antes y después render

También puedes registrar un callback que se llamará antes y después el renderer actualiza la escena. Eso es útil si añades un profiler para medir el FPS por ejemplo.

```ts
const { onBeforeLoop, onAfterLoop } = useRenderLoop()

onBeforeLoop(({ delta, elapsed }) => {
  // I will run before the renderer updates the scene
  fps.begin()
})

onAfterLoop(({ delta, elapsed }) => {
  // I will run after the renderer updates the scene
  fps.end()
})
```

### Pausa y continua

Puedes pausar y continuar el render loop usando los metodos expuestos de `pause` y `resume`.

```ts
const { pause, resume } = useRenderLoop()

// Pause the render loop
pause()

// Resume the render loop
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

El composable `useLoader` te permite cargar recursos usando el [THREE.js loaders](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models). Se desvuelve una promesa con recurso cargado.

```ts
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const { scene } = await useLoader(THREE.GLTFLoader, 'path/to/asset.gltf')
```

Desde el composable `useLoader` se desvuelve una promesa, puedes usarlo con un `async/await` o `then/catch`. Si estás usándolo en un componente, te aseguras de que es 'wrapped' con un componente `Suspense`. Ve [Suspense](https://vuejs.org/guide/built-ins/suspense.html#suspense) para más información.

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

También **useTexture** se acepta un objeto con las propiedades siguientes:

- `map`:una textura básica que se aplica al superficie de un objeto.
- `displacementMap`: una textura que se usa para añadir protuberancias o abolladuras al superficie del objeto.
- `normalMap`: una textura que se usa para añadir detalles superficiales y variaciones de tonalidad al objeto. 
- `roughnessMap`: una textura que se usa para añadir rugosidad o una terminación mate al superficie del objeto. 
- `metalnessMap`: una textura que se usa para añadir un efecto metálico al superficie del objeto.
- `aoMap`: una textura que se usa para añadir oclusión ambiental (tonalidad en zonas donde la luz se bloquea por otros objetos) al objeto.

En este caso, se desvuelve un objeto con las texturas cargadas.

```ts
const { map, displacementMap, normalMap, roughnessMap, metalnessMap, aoMap } = await useTexture({
  map: 'path/to/albedo.png',
  displacementMap: 'path/to/height.png',
  normalMap: 'path/to/normal.png',
  roughnessMap: 'path/to/roughness.png',
  metalnessMap: 'path/to/metalness.png',
  aoMap: 'path/to/ambien-occlusion.png',
})
```

Puedes atar las texturas al material.

```vue
<template>
  <TresMesh>
    <TresMeshSphereGeometry />
    <TresMeshStandardMaterial
      :map="map"
      :displacementMap="displacementMap"
      :normalMap="normalMap"
      :roughnessMap="roughnessMap"
      :metalnessMap="metalnessMap"
      :aoMap="aoMap"
    />
  </TresMesh>
</template>
```

Similar al composable arriba, el composable `useTexture` se desvuelve una promesa puedes usarlo con `async/await` o `then/catch`. Si estás usándolo con un componente, te aseguras de que es 'wrapped' con un componente `Suspense`.

# useCatalogue

El composable `useCatalogue` te permite extender el catálogo internal de componentes. Se desvuelve una función que puedes usar a registrar componentes nuevos.

Esto es especialmente útil si quieres usar objetos que no son parte del ThreeJS core como [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) o funcionalidad externa, como física.

```ts
import { useCatalogue } from '@tresjs/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const { extend } = useCatalogue()

extend({ OrbitControls })
```

Puedes usar el componente nuevo en tu plantilla. Nota que el nuevo componente se prefije con `Tres` para evitar colisiones de nombres con elementos nativos de HTML , similar al resto de los core components.

```vue
<template>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
    </TresScene>
  </TresCanvas>
</template>
```

# useTres <Badge type="warning" text="experimental" />

Este composable intenta proveer acceso al modelo estado que se contiene el renderer por defacto, la cámara, la escena, y otras propiedades útiles. Todavía es experimental y no se recomienda que lo usas en producción porque hay un probabilidad alto que va a cambiar.

```ts
const { state } = useTres()

console.log(state.camera) // THREE.PerspectiveCamera
console.log(state.renderer) // THREE.WebGLRenderer
```

Hasta que este composable es estable, se recomienda que usas el `provide/inject` API para acceder a los elementos que necesitas. Estos son los llaves disponibles:

- `camera`: se desvuelve la cámara activa actual
- `renderer`: se desvuelve el renderer activo actual
- `local-scene`: se desvuelve la escena activa actual
- `catalogue`: se desvuelve el catálogo activo actual de componentes
- `extend` : se desvuelve la función `extend` del composable `useCatalogue`. Especialmente necesario si eres autor de un plugin.
- `aspect-ratio`: se desvuelve relación de aspecto actual del canvas

```ts
import { provide, inject } from 'vue'

const camera = inject<Ref<Camera>>('camera')
const renderer = inject<Ref<WebGLRenderer>>('renderer')

console.log(camera.value) // THREE.PerspectiveCamera
console.log(renderer.value) // THREE.WebGLRenderer
```
