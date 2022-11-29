# Your first scene

This guide will help you to create your first Tres scene. 🍩

## Setting up the experience Canvas

Before we can create an Scene, we need somewhere to display it. Using plain [ThreeJS](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) we would need yo create a `canvas` html element to mount the `WebglRenderer` and initialize the `scene`

With **TresJS** you only need to add the default component `<TresCanvas />` to the template of your Vue component.

```vue
<template>
  <TresCanvas> // Your scene is going to live here </TresCanvas>
</template>
```

::: warning
It's important that all components related to the scene live between the `<TresCanvas />` component. Otherwise, they will be not rendered.
:::

The `TresCanvas` component is going to do some setup work behind the scene:

- It creates a [**WebGLRenderer**](https://threejs.org/docs/index.html?q=webglrend#api/en/renderers/WebGLRenderer) that automatically updates every frame.
- It sets the render loop to be called on every frame based on the browser refresh rate.

## Creating a scene

We need 3 core elements to create a 3D experience:

- A [**Camera**](https://threejs.org/docs/index.html?q=camera#api/en/cameras/Camera)
- An [**Object**](https://threejs.org/docs/index.html?q=object#api/en/core/Object3D)
- An [**Scene**](https://threejs.org/docs/index.html?q=scene#api/en/scenes/Scene) to hold the camera and the object(s) together.

With **TresJS** you can create a Scene using the `<TresScene />` component.

```vue
<template>
  <TresCanvas>
    <TresScene>
      <!-- Your scene goes here -->
    </TresScene>
  </TresCanvas>
</template>
```

Then you can add a [**PerspectiveCamera**](https://threejs.org/docs/index.html?q=perspectivecamera#api/en/cameras/PerspectiveCamera) using the `<TresPerspectiveCamera />` component.

```vue
<template>
  <TresCanvas>
    <TresPerspectiveCamera />
    <TresScene>
      <!-- Your scene goes here -->
    </TresScene>
  </TresCanvas>
</template>
```

## Adding a Sphere

That scene looks a litle empty, let's add a basic object. If we where using plain **ThreeJS** we would need to create a [**Mesh**](https://threejs.org/docs/index.html?q=mesh#api/en/objects/Mesh) object and attach to it a [**Material**](https://threejs.org/docs/index.html?q=material#api/en/materials/Material) and a [**Geometry**](https://threejs.org/docs/index.html?q=geometry#api/en/core/BufferGeometry) like this:

```ts
const geometry = new THREE.TorusGeometry(1, 0.5, 16, 32)
const material = new THREE.MeshBasicMaterial({ color: 'orange' })
const donut = new THREE.Mesh(geometry, material)
scene.add(donut)
```

A Mesh is a basic scene object in three.js, and it's used to hold the geometry and the material needed to represent a shape in 3D space.

Now let's see how we can easily achieve the same with **TresJS**. To do that we are going to use `<TresMesh />` component, and between the default slots, we are going to pass a `<TresTorusGeometry />` and a `<TresMeshBasicMaterial />`.

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
Notice that we don't need to import anything, thats because **TresJS** automatically generate a **Vue Component based of the Three Object you want to use in CamelCase with a Tres prefix**. For example, if you want to use a `AmbientLight` you would use `<TresAmbientLight />` component.
:::

<FirstScene />

From that on you can start adding more objects to your scene, and start playing with the properties of the components to see how they affect the scene.
