# Primitives

De component `<primitive />` is een veelzijdige component op laag niveau in TresJS waarmee u elk three.js-object direct kunt gebruiken binnen uw Vue-applicatie zonder abstractie. Het fungeert als een brug tussen het reactiviteitssysteem van Vue en de scènegrafiek van three.js.

## Gebruik

```html
<script setup lang="ts">
  // Importeer de benodigde three.js-klassen
  import { Mesh, BoxGeometry, MeshBasicMaterial } from 'three';

  // Maak een doosgeometrie en een basismateriaal
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });

  // Maak een mesh met de geometrie en het materiaal
  const meshWithMaterial = new Mesh(geometry, material);
</script>

<template>
  <TresCanvas>
    <primitive :object="meshWithMaterial" />
  </TresCanvas>  
</template>
```

## Props

`object`: Deze prop verwacht een three.js Object3D of een van de afgeleide klassen ervan. Het is het primaire object dat de component `<primitive />` zal weergeven. In het bijgewerkte voorbeeld wordt een `Mesh`-object met een bijbehorend `Materiaal` aan dit prop doorgegeven.

## Gebruik met modellen

De component `<primitive />` is vooral handig voor het renderen van complexe objecten, zoals modellen die vanuit externe bronnen zijn geladen. Het volgende voorbeeld laat zien hoe u een model uit een GLTF-bestand laadt en het rendert met behulp van de `<primitive />` component.

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
