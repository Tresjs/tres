# Primitives

Il componente `<primitive />` è un componente versatile di basso livello in TresJS che consente di utilizzare direttamente qualsiasi oggetto three.js. Funge da ponte tra il sistema di reattività di Vue e il grafico della scena di three.js.

## Utilizzo

```html
<script setup lang="ts">
  // Importa le tre classi necessarie.js
  import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";

  // Crea una geometria box e un materiale di base
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });

  // Crea una mesh con la geometria e il materiale
  const meshWithMaterial = new Mesh(geometry, material);
</script>

<template>
  <TresCanvas>
    <primitive :object="meshWithMaterial" />
  </TresCanvas>
</template>
```

## Props

`object`: Questa prop si aspetta una three.js Object3D o una delle sue classi derivate. È l'oggetto primario che il componente `<primitive />` renderà. Nell'esempio aggiornato, un oggetto `Mesh` con un `Material` associato viene passato a questa prop.

## Utilizzo con i modelli

Il componente `<primitive />` è particolarmente utile per il rendering di oggetti complessi come modelli caricati da fonti esterne. L'esempio seguente mostra come caricare un modello da un file GLTF e renderizzarlo usando il componente `<primitive />` .

```html
<script lang="ts" setup>
  import { useGLTF } from "@tresjs/cientos";

  const { nodes } = await useGLTF("/models/AkuAku.gltf");
</script>

<TresCanvas>
  <Suspense>
    <primitive :object="nodes.AkuAku" />
  </Suspense>
</TresCanvas>
```
