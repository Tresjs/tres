# Tu primera scene

Esta guía te va a ayudar a crear tu primera scene Tres. 🍩

<ClientOnly>
    <DonutExample style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;"/>
</ClientOnly>

## Preparando el Canvas

Antes de poder crear una escena, necesitamos un lugar donde mostrarla. Usando [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) simple, necesitaríamos crear un `canvas` html element para montar el `WebglRenderer` y inicializar la `scene`

Con **TresJS** solo necesitas añadir el componente default `<TresCanvas >` a la plantilla de tu componente de Vue.

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>
<template>
  <TresCanvas window-size>
    <!-- Tu escena vivirá aquí -->
  </TresCanvas>
</template>
```

::: warning
Es importante que todos los componentes con relación a la escena vivan entre el `<TresCanvas />` componente. Si no, no se renderizará.
:::

El `TresCanvas` componente internamente va a:

- Crea un [**WebGLRenderer**](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer) que automáticamente se actualiza cada frame.
- Eso crea el render loop una función que se llamará usando el requestAnimationFrame API del navegador.

## Tamaño del canvas

Por defecto el componente `TresCanvas` tomará **La altura y el ancho del elemento padre**, si estas experimentando una pagina en blanco, asegúrate de que los tamaños están correctamente configurados

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>
<template>
  <TresCanvas>
    <!-- Acá va tu escena -->
  </TresCanvas>
</template>
<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
```

Si tu escena no va a ser parte de la UI, puedes forzar el canvas para que tome los tamaños del viewport usando el `window-size` prop, de esta manera:

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>
<template>
  <TresCanvas window-size>
    <!-- Acá va tu escena -->
  </TresCanvas>
</template>
```

## Creando una escena

Necesitamos 4 elementos core para crear una experiencia 3D :

- Una [**Escena**](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene) para agregar la cámara y los objetos juntos.
- Un [**Renderer**](https://threejs.org/docs/index.html?q=renderer#api/en/renderers/WebGLRenderer) para renderizar los objetos dentro de nuestro canvas.
- Una [**Camera**](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- Un [**Objeto**](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)

Con **TresJS** solo necesitas agregar el componente `<TresCanvas />` al template en tu Vue SFC y automáticamente creara el `Renderer` (`canvas` DOM Element) y la `Scene` por ti.

```vue
<template>
  <TresCanvas window-size>
    <!-- Acá va tu escena -->
  </TresCanvas>
</template>
```

Puedes añadir una [**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/en/cameras/PerspectiveCamera) usando el`<TresPerspectiveCamera />` componente.

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

::: warning
Un problema común es que la posición por defecto de la cámara es (0,0,0), TresJs automáticamente configurar la posición de tu camera a `[3,3,3]` si la propiedad `position` no es configurada manualmente. Si no hay una cámara declarada en tu escena, una PerspectiveCamera será añadida automáticamente
:::

## Añadir una 🍩

Esta escena parece un poquito vacía, añadamos un objeto básico. Si estuviéramos usando **ThreeJS** puro, necesitaríamos crear un [**Mesh**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh) objeto y adjuntarlo a una [**Material**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material) y una [**Geometry**](https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry) como eso:

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32)
const material = new THREE.MeshBasicMaterial({ color: 'orange' })
const donut = new THREE.Mesh(geometry, material)
scene.add(donut)
```

Un Mesh es un objeto básico de la escena en three.js, y es usado para contener la geometría y el material necesario para representar una forma en el espacio 3D.

Ahora, vemos como podemos lograr fácilmente el mismo con **TresJS**. Para hacerlo, vamos a usar `<TresMesh />` componente, y entre los puestos por defecto, vamos a pasar un `<TresTorusGeometry />` y un `<TresMeshBasicMaterial />`.

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
  </TresCanvas>
</template>
```

::: info
Nota que no necesitamos importar nada, eso es porque **TresJS** generar automáticamente un **Componente de Vue con base del Three Objeto quieres usar en CamelCase con un prefijo Tres**. Por ejemplo, si quieres usar un `AmbientLight` usarías `<TresAmbientLight />` componente.
:::

<StackBlitzEmbed projectId="tresjs-first-scene" />

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas clear-color="#82DBC5" window-size>
    <TresPerspectiveCamera :position="[3, 3, 3]" :look-at="[0, 0, 0]" />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```

A partir de ahora, puedes empezar a añadir más objetos a tu escena y empezar a jugar con las propiedades de las componentes para ver como se cambian la escena.
