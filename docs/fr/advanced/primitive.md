# Primitives

Le composant `<primitive />` est un composant polyvalent de bas niveau dans TresJS qui vous permet d'utiliser directement n'importe quel objet three.js dans votre application Vue sans abstraction. Il agit comme un pont entre le système de réactivité de Vue et le graphe de scène de three.js.

## Usage

```html
<script setup lang="ts">
  // Importez les classes three.js nécessaires
  import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

  // Créer une géométrie de boîte et un matériau de base
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });

  // Créer un mesh avec la géométrie et le matériau
  const meshWithMaterial = new Mesh(geometry, material);
</script>

<template>
  <TresCanvas>
    <primitive :object="meshWithMaterial" />
  </TresCanvas>  
</template>
```

## Props

`object` : cette propriété attend un objet `Object3D` de three.js ou de l'une de ses classes dérivées. C'est l'objet principal que le composant `<primitive />` rendra. Dans l'exemple mis à jour, un objet « Mesh » avec son « Material » correspondant est transmis à cette propriété.

## Utiliser avec des modèles

Le composant `<primitive />` est particulièrement utile pour restituer des objets complexes tels que des modèles chargés à partir de sources externes. L'exemple suivant montre comment charger un modèle à partir d'un fichier GLTF et le restituer à l'aide du composant `<primitive />`.

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
