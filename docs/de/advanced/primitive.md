# Primitives

Die `<primitive />`-Komponente ist eine vielseitige Low-Level-Komponente in TresJS, die es dir ermöglicht, ohne Abstraktion jedes Objekt von Three.js direkt in deiner Vue-Anwendung zu verwenden. Sie dient als Brücke zwischen dem Reaktivitätssystem von Vue und dem Szenengraph von Three.js.

## Verwendung

```html
<script setup lang="ts">
  // Importieren der notwendigen Klassen von three.js
  import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three'

  // Geometry und Material erstellen
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00ff00 })

  // Mesh mit der Geometrie und dem Material erstellen
  const meshWithMaterial = new Mesh(geometry, material)
</script>

<template>
  <TresCanvas>
    <primitive :object="meshWithMaterial" />
  </TresCanvas>
</template>
```

## Props

`object`: Diese Property erwartet ein `Object3D`-Objekt von three.js oder eine seiner abgeleiteten Klassen. Es ist das Hauptobjekt, das die `<primitive />`-Komponente rendern wird. Im aktualisierten Beispiel wird ein `Mesh`-Objekt mit dem entsprechenden `Material` an diese Property übergeben.

## Verwendung mit Modellen

Die `<primitive />`-Komponente ist besonders nützlich, um komplexe Objekte wie Modelle, die aus externen Quellen geladen werden, zu rendern. Das folgende Beispiel zeigt, wie ein Modell aus einer GLTF-Datei geladen und mit der `<primitive />`-Komponente gerendert wird.

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
