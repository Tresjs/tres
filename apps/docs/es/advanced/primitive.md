# Primitives

El componente `<primitive />` es un componente versátil de bajo nivel en TresJS que te permite utilizar directamente cualquier objeto de three.js dentro de tu aplicación Vue sin una abstracción. Actúa como un puente entre el sistema de reactividad de Vue y el grafo de escena de three.js.

## Usage

```html
<script setup lang="ts">
  // Importa las clases necesarias de three.js
  import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

  // Crea una geometría de caja y un material básico
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00ff00 })

  // Crea un mesh con la geometría y el material
  const meshWithMaterial = new Mesh(geometry, material)
</script>

<template>
  <TresCanvas>
    <primitive :object="meshWithMaterial" />
  </TresCanvas>
</template>
```

## Props

`object`: Esta propiedad espera un objeto `Object3D` de three.js o cualquiera de sus clases derivadas. Es el objeto principal que el componente `<primitive />` renderizará. En el ejemplo actualizado, se pasa un objeto `Mesh` con su correspondiente `Material` a esta propiedad.

## Uso con Modelos

El componente `<primitive />` es especialmente útil para renderizar objetos complejos como modelos cargados desde fuentes externas. El siguiente ejemplo muestra cómo cargar un modelo desde un archivo GLTF y renderizarlo utilizando el componente `<primitive />`.

```html
<script lang="ts" setup>
  import { useGLTF } from '@tresjs/cientos'

  const { nodes } = await useGLTF('/models/AkuAku.gltf')
</script>

<TresCanvas>
  <Suspense>
    <primitive :object="nodes.AkuAku" />
  </Suspense>
</TresCanvas>
```
