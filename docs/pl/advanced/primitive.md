# Prymitywy

Komponent `<primitive />` to wszechstronny, niskopoziomowy komponent w TresJS, który pozwala bezpośrednio używać dowolnego obiektu three.js w ramach Twojej aplikacji Vue bez abstrakcji. Działa jako most między systemem reaktywności Vue a grafem sceny three.js.

## Użycie

```html
<script setup lang="ts">
  // Importuj niezbędne klasy z three.js
  import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";

  // Utwórz geometrię prostopadłościanu i podstawowy materiał
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });

  // Utwórz mesh z geometrią i materiałem
  const meshWithMaterial = new Mesh(geometry, material);
</script>

<template>
  <TresCanvas>
    <primitive :object="meshWithMaterial" />
  </TresCanvas>
</template>
```

## Props

`object`: Ten prop oczekuje obiektu three.js typu `Object3D` lub dowolnej z jego klas pochodnych. To główny obiekt, który komponent `<primitive />` będzie renderować. W zaktualizowanym przykładzie do tego propa przekazywany jest obiekt `Mesh` z powiązanym `Material`.

## Użycie z Modelami

Komponent `<primitive />` jest szczególnie przydatny do renderowania skomplikowanych obiektów, takich jak modele wczytywane z zewnętrznych źródeł. Poniższy przykład pokazuje, jak wczytać model z pliku GLTF i renderować go przy użyciu komponentu `<primitive />`.

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
