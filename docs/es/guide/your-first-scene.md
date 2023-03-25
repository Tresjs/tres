# Tu primera scene

Esta guía te va a ayudar a crear tu primera escena con TresJs. 🍩

## Preparando el Canvas

Antes de poder crear una escena, necesitamos un lugar donde mostrarla. Usando [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) puro, necesitaríamos crear un `canvas` html element para montar el `WebglRenderer` e inicializar la `scene`

Con **TresJS** solo necesitas añadir el componente default `<TresCanvas />` a la plantilla de tu componente de Vue.

```vue
<template>
  <TresCanvas> // Tu escena va a vivir aquí </TresCanvas>
</template>
```

::: warning
Es importante que todos los componentes con relación a la escena vivan entre el `<TresCanvas />` componente. Si no, no se renderizará.
:::

El `TresCanvas` componente va a armar internamente:

- Crea un [**WebGLRenderer**](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer) que automáticamente se actualiza cada frame.
- Eso crea el render loop una función que se llamará usando el requestAnimationFrame API del navegador.

## Creando una escena

Necesitamos 3 elementos core para crear una experiencia 3D :

- Una [**Cámara**](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- Un [**Objeto**](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)
- Una [**Escena**](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene) para agregar la cámara y los objetos juntos.

Con **TresJS** puedes crear una Escena usando el `<TresScene />` componente.

```vue
<template>
  <TresCanvas>
    <TresScene>
      <!-- Tu escena va aquí -->
    </TresScene>
  </TresCanvas>
</template>
```

Puedes añadir una [**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/en/cameras/PerspectiveCamera) usando el`<TresPerspectiveCamera />` componente.

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresScene>
      <!-- Tu escena va aquí -->
    </TresScene>
  </TresCanvas>
</template>
```

## Añadir una Esfera

Esta escena parece un poquito vacía, añadamos un objeto básico. Si estuviéramos usando **ThreeJS** puro, necesitaríamos crear un [**Mesh**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh) objeto y adjuntarlo a una [**Material**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material) y una [**Geometry**](https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry), algo así como esto:

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32)
const material = new THREE.MeshBasicMaterial({ color: 'orange' })
const donut = new THREE.Mesh(geometry, material)
scene.add(donut)
```

Un Mesh es un objeto básico de la escena en three.js, y es usado para contener la geometría y el material necesario para representar una forma en el espacio 3D.

Ahora, vemos como podemos lograr fácilmente el mismo con **TresJS**. Para hacerlo, vamos a usar `<TresMesh />` componente, y entre los <slots /> por defecto, vamos a pasar un `<TresTorusGeometry />` y un `<TresMeshBasicMaterial />`.

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresScene>
      <TresMesh>
        <TresTorusGeometry />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
    </TresScene>
  </TresCanvas>
</template>
```

::: info
Nota que no necesitamos importar nada, eso es porque **TresJS** generar automáticamente un **Componente de Vue basado en los objetos de ThreeJs en CamelCase con un prefijo Tres**. Por ejemplo, si quieres usar un `AmbientLight` usarías `<TresAmbientLight />` componente.
:::

<FirstScene />

A partir de ahora, puedes empezar a añadir más objetos a tu escena y empezar a jugar con las propiedades de las componentes para ver como se cambian la escena.
