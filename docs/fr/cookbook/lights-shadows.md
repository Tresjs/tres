---
title: Lumières et ombres
description: Apprenez à ajouter des lumières et des ombres à votre scène.
author: alvarosabu
thumbnail: /recipes/lights-and-shadows.png
difficulty: 0
---

# Lumières et ombres

Ce guide vous aidera à démarrer avec des lumières et des ombres simples dans TresJS.

Nous allons construire une scène simple avec trois maillages et un plan, mais seulement deux auront des ombres.

<SandboxDemo url="https://play.tresjs.org/#eNqVVt1y2jwQfRUN30WSKdimhLbjL3Qo9GfaadpM4K7uhbAXUGpLGkn8pJm8e1eSDXZCMmRCGGv37NHZ1XrFXWuqQH+QMlivoBW3LnSqmDREg1lJklO+GCQto5PW+4SzQgplyB3RS5rnYnMNc3JP5koU5ASjT/6vQSzrmPI11W2y0nANPAP1XQhZBQwNIm50mArVjPypZsyMBTdK5HrHv4Mz4EboRsSIapZOljQTm0sq22Ry/WU0FrlQE0lTaJMfYio4oEsyvtgxmqUCOEl4wlPBtSGLnAzIXcIJSXOgyhHE5OS/d68/jsb9k7b1YOK4iY6JUStwFprLJY3JnObaGzwEN5veSogfarMIsTJyhRlWAuOHgi3I7BXHzQTQfb9XPRNbewyD2pmcnu3dd0RwW3XMetA8B4/y3tPTMzJ475Nn81PPGaxpvoIzZ6xbAiUMNUzw4Ja8GpAoiLoWgpruHWXCL0LfRNgyuDBQyJwawBUhF/u+IOvOjPEM22uRJy2ywWex6Wj21yMR2+yEsDJbiitQWkJq2BrGtABFSSyFZlYWEv7qt8nbwH/9Ru54LtZoPu/bZ+oCcdm1K45Hjc9R4FZzt+hGUYSrxoaXoJfNPTqv2wQ/kdugqol1RG1ySc0yuPrqvSVNlTye5BcQBRh1i2LUQtuYbpt0reCeZas2rm09FYIjKShGc5LaVsGosjXrUsMq4JF2BXMM8QeJESnVpuN7tZkWqrefR7pHYntAttVcfb1I+vln+3ec9LrWplisvz2Gx2oncglqX+ejZX0ejaLe6NiKpoD991QVO71DzdEpW4OErnkOab/CqXuoRRC8/3+i2BNDeUZV9jiz+Vv791Rmtdw+FDM7Y7+zxdKQmHEDHPO6LV+YxkvxkWENbGY09/Dnumr3rhym9HL8aEDDRVibG612yw/7TkFlcKMFx5vKDaakdOAFFfv5ZW31u8U6ktbSGKnjMEwzjvEZ5GytAg4m5LII6/BhL+gHUZgxbUJrRnTSchO5QexvoZdw+wikf1OnL83NXcwG6B+JTXAE/w47PA9wiJXMlTEomI2pc9tb7xheixsiY/8d6n0FuqiXAW97vEyOrm8NPuxGrsA47WEbFM3qljhsIAXZC4h9wHPUCOxkULAjSCuoTf48eBPmbFanrO467Emj8ZKds8WDjkxFIVkO6qe03d/sTHdHf3O23U8IF7OE9M8B+43eeslX2Cyg1lju/VHiZADj3Z8mP2CLzztnIbJVXh7OE85r0CJfWY0eNlrxDGXXcE7tV/eC4Q+Pqf60dW9umVRDqMFfO876q5pJu17zht+ucA7vjmP8TJX2mfWC3q7g9/8AWlN6bg==" />

## Configurer la scène (facultatif)

Nous importons tous les modules dont nous avons besoin, pour plus de commodité nous pouvons utiliser des centaines de contrôles d'orbite,
[voir ici pour savoir comment](/cookbook/orbit-controls).

Plaçons quatre objets dans notre scène, l'un sera le plan qui recevra les ombres, deux d'entre eux projetteront des ombres et le dernier ne projettera aucune ombre.

Nous allons utiliser [MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial). Tout simplement parce que l’on voit facilement le « soft overlay ».

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas
    clear-color="#111"
    window-size
  >
    <OrbitControls />
    <TresPerspectiveCamera :position="[5, 7.5, 7.5]" />

    <TresMesh
      :position="[-2, 2, 0]"
      :rotation="[0, Math.PI, 0]"
    >
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh
      :position="[0, 0, 0]"
    >
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TresMesh
      :position="[2, -2, 0]"
    >
      <TresSphereGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresMesh
      :position="[0, -3, 0]"
      :rotation="[-Math.PI / 2, 0, 0]"
    >
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshStandardMaterial color="#f7f7f7" />
    </TresMesh>
  </TresCanvas>
</template>
```

## Lumières (explication)

Comme vous le savez, chaque instance dans [ThreeJs](https://threejs.org/) est disponible dans **TresJs**, donc tous les types de lumières sont également disponibles, il suffit d'ajouter le préfixe `Tres` pour les utiliser.

Mais toutes les lumières ne peuvent pas projeter des ombres, cette définition vient directement de ThreeJs et est logique. Par exemple, le but d'un [ambientLight](https://threejs.org/docs/index.html?q=ambient#api/en/lights/AmbientLight) est d'éclairer tous les côtés de votre scène, cela n'a donc aucun sens de projeter des ombres. D'un autre côté, une [DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/helpers/DirectionalLightHelper) qui imite le soleil peut et doit générer des ombres.

## Ombres (explication)

Il existe également de nombreux types d'ombres, par exemple une "ombre douce" est générée automatiquement lorsqu'un objet reçoit plus de lumière d'un côté, mais en bref, une "ombre par défaut ThreeJS" qui est dirigée vers une autre surface doit être projetée par un maillage et une autre maille doit le recevoir. Comme nous le voyons dans notre exemple, le `Plan` reçoit une ombre mais ne la projette pas. Gardez à l’esprit que tous les matériaux ne peuvent pas projeter ou recevoir des ombres.

En interne, ThreeJS génère automatiquement un nouveau maillage avec un [ShadowMaterial](https://threejs.org/docs/index.html?q=shado#api/en/materials/ShadowMaterial) qui met à jour chaque image, donc si vous appliquez des animations, l'ombre s'anime également, mais c'est aussi pourquoi vous devez utiliser les ombres avec précaution car elles peuvent ralentir les performances.

::: warning
Une utilisation excessive des ombres de cette manière peut affecter les performances. Il existe cependant des moyens d’améliorer les performances. Pour plus d'informations, regardez [cette vidéo](https://youtu.be/WGNvVGrS0kY?si=q7XyL5eABKUh3gbS&t=1256)
:::

## Activation des ombres

Nous pouvons décomposer cela en trois étapes :

### Activer les ombres dans le moteur de rendu

```vue
//...

<template>
  <TresCanvas
    clear-color="#111"
    shadows
    window-size
  />
  //...
</template>
```
### Réglez la lumière pour projeter des ombres

Nous pouvons simplement ajouter le booléen `cast-shadow`, Vue l'interprète comme un `prop` avec la valeur `true`.

_La lumière ambiante ne génère ici aucun type d'ombre_

```vue
//...

<template>
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight
    cast-shadow
    :position="[0, 2, 0]"
    :intensity="1"
  />

  //...
</template>
```
### Définir des objets pour projeter ou recevoir des ombres

Semblable à l'étape précédente, nous définissons le maillage sur lequel nous voulons projeter l'ombre (notre sphère) avec la propriété `cast-shadow`, et nous définissons l'objet pour qu'il reçoive l'ombre (notre plan) avec la propriété `receive-shadow`.

```vue
//...

<template>
  <TresMesh
    cast-shadow
    :position="[2, -2, 0]"
  >
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
  <TresMesh
    receive-shadow
    :position="[0, -3, 0]"
    :rotation="[-Math.PI / 2, 0, 0]"
  >
    <TresPlaneGeometry :args="[10, 10, 10, 10]" />
    <TresMeshStandardMaterial color="#f7f7f7" />
  </TresMesh>
  //...
</template>
```

Nous avons maintenant toutes les étapes nécessaires pour ajouter des ombres à notre scène, et si nous appliquons ce que nous avons appris dans [animations de base](/cookbook/basic-animations) et ajoutons du mouvement à notre cube, vous verrez que l'ombre s'anime bien 🤩

```vue
<script setup>
import { shallowRef } from 'vue'
import { TresCanvas, useRenderLoop } from '@tresjs/core'

const boxRef = shallowRef()

const { onLoop } = useRenderLoop()

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01
  }
})
</script>

<template>
  //...
  <TresMesh
    ref="boxRef"
    cast-shadow
    :position="[0, 0, 0]"
  >
    <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
    <TresMeshToonMaterial color="#4F4F4F" />
  </TresMesh>
  //...
</template>
```

_Notez que je n'ai intentionnellement pas appliqué `cast-shadow` au `Cone` afin qu'il ne projette aucune ombre_
