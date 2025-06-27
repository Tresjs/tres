# Tu primera escena

Esta guía te ayudará a crear tu primera escena en Tres. 🍩

<ClientOnly>
<div style="aspect-ratio: 16/9; height: auto; margin: 2rem 0; border-radius: 8px; overflow:hidden;">
  <DonutExample />
</div>
</ClientOnly>

## Configurando el Canvas

Antes de poder crear una escena, necesitamos un lugar donde mostrarla. Usando solo [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene), tendríamos que crear un elemento HTML `canvas` para montar el `WebglRenderer` e inicializar la `scene`.

Con **TresJS**, solo necesitas importar el componente predeterminado `<TresCanvas />` y agregarlo al template de tu componente Vue.

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

::: warning
Es importante que todos los componentes relacionados con la escena estén dentro del componente `<TresCanvas />`. De lo contrario, no se renderizarán.
:::

El componente `TresCanvas` realizará algunas configuraciones detrás de escena:

- Crea un [**WebGLRenderer**](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer) que se actualiza automáticamente en cada fotograma.
- Establece el bucle de renderizado para que se llame en cada fotograma en función de la frecuencia de actualización del navegador.

## Tamaño del lienzo

De forma predeterminada, el componente `TresCanvas` tomará el **ancho y alto del elemento padre**. Si estás experimentando una página en blanco, asegúrate de que el elemento padre tenga un tamaño adecuado.

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas>
    <!-- Tu escena vive aqui -->
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

Si tu escena no va a formar parte de una interfaz de usuario, también puedes hacer que el lienzo ocupe el ancho y alto de toda la ventana utilizando la propiedad `window-size` de la siguiente manera:

```vue
<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas window-size>
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

## Creando una escena

Necesitamos 4 elementos principales para crear una experiencia en 3D:

- Una [**Escena**](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene) para contener la cámara y el/los objetos juntos.
- Un [**Renderizador**](https://threejs.org/docs/index.html?q=renderer#api/en/renderers/WebGLRenderer) para renderizar la escena en el DOM.
- Una [**Cámara**](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- Un [**Objeto**](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)

Con **TresJS**, solo necesitas agregar el componente `<TresCanvas />` al template de tu componente Vue y automáticamente creará un `Renderizador` (elemento DOM `canvas`) y una `Escena` para ti.

```vue
<template>
  <TresCanvas window-size>
    <!-- Tu escena vive aqui -->
  </TresCanvas>
</template>
```

Then you can add a [**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/en/cameras/PerspectiveCamera) using the `<TresPerspectiveCamera />` component.

```vue
<template>
  <TresCanvas window-size>
    <TresPerspectiveCamera />
  </TresCanvas>
</template>
```

::: warning
Un problema común es que la posición predeterminada de la cámara es el origen de la escena (0,0,0). TresJS establecerá automáticamente la posición de tu cámara en `[3,3,3]` si la propiedad `position` no está definida. Si no se define ninguna cámara en tu escena, se agregará automáticamente una cámara de perspectiva.
:::

## Agregando un 🍩

Esa escena se ve un poco vacía, vamos a agregar un objeto básico. Si estuviéramos usando **ThreeJS** puro, necesitaríamos crear un objeto [**Mesh**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh) y adjuntarle un [**Material**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material) y una [**Geometry**](https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry) de la siguiente manera:

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32)
const material = new THREE.MeshBasicMaterial({ color: 'orange' })
const donut = new THREE.Mesh(geometry, material)
scene.add(donut)
```

Un **Mesh** es un objeto básico de la escena en three.js, y se utiliza para contener la geometría y el material necesarios para representar una forma en el espacio 3D.

Ahora veamos cómo podemos lograr lo mismo fácilmente con **TresJS**. Para hacer eso, vamos a usar el componente `<TresMesh />` y entre los slots predeterminados, vamos a pasar un `<TresTorusGeometry />` y un `<TresMeshBasicMaterial />`.

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
Observa que no necesitamos importar nada, esto se debe a que **TresJS** genera automáticamente un **Componente Vue basado en el objeto Three que deseas usar en PascalCase con un prefijo Tres**. Por ejemplo, si quieres usar una `AmbientLight`, puedes usar el componente `<TresAmbientLight />`.
:::

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
</script>

<template>
  <TresCanvas
    clear-color="#82DBC5"
    window-size
  >
    <TresPerspectiveCamera
      :position="[3, 3, 3]"
      :look-at="[0, 0, 0]"
    />
    <TresMesh>
      <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
      <TresMeshBasicMaterial color="orange" />
    </TresMesh>
    <TresAmbientLight :intensity="1" />
  </TresCanvas>
</template>
```

A partir de aquí puedes comenzar a agregar más objetos a tu escena y jugar con las propiedades de los componentes para ver cómo afectan la escena.

<SandboxDemo url="https://play.tresjs.org/#eNqVVMtu2kAU/ZWRu8iiYIcQoojSikCjqlXTRi27OIuJfYGBeWlmzKOIf+8d2zhD2kZU8oI5955z3+yiiQF7o3W8KiDqRwObGaYdseAKTTiVs/dp5GwafUglE1oZR3bEU8ZUrqglezI1SpCzoUNsYZNMGTh7l8pBUgkhDR8OhObUAb4IGQT0jAM17UxxZTDOm+uLj6NxL43ImslcrduW/ao4NesejNWQObaCMRVgaGUjpK+VZY4piSoP3Rbx32MaNeapWqHlEqUbiCu1bFPnCect4r+GkIQx78DO63eNTJQp7CdQApzZkj41M+tVOigR91qkc4XBL1Cs0QmURtSy7A5bYRjl5FC4MthoCBiD5EXoUuBGPDGQ7iubzR3pM+lAYtVbFOg03IpZtReBQRL0PmpF1Qzbgup4YZXEie88K60NOOg+KRGPhUP1hjSaO6dtP0myXCI/B85WJpbgEqlFEroPu3EvPk9yZl3iYfROo9Yfwr4cVQY9VbtioPxVKF/Dx1HcGuhSU3lK7o3v8DI+jzu18gGMBfOcUHtu4CRd7zdExd415vsWrAjbgDdXWDi5v4H7sIO7hop4J7CJxXF3az87pwby/xCuCK9Jo2M7B8FOED24+uIv46uEs6dQ0ivuU7nHnXQ2U3LKZi82MlNCMw7mu/aHfbyZlHO1/lJizhTQ5JfNIVv+BV/YTZXyPS4LmBW2+3mUeMDgKvPtz2+wwd+NUai84PVw/mH8AVbxwudYuY0KmWPagV+Z7efywJicTeztprzcuqijRN1WQ4k+HP46ml2rgMeycaV/OY7xK116rqwbd5uG738DogXwDg==" />
