---
title: Licht und Schatten
description: Erfahren Sie, wie Sie Lichter und Schatten zu Ihrer Szene hinzufügen können.
author: alvarosabu
thumbnail: /recipes/lights-and-shadows.png
difficulty: 0
---

# Licht und Schatten

Diese Anleitung wird dir helfen, mit einfachen Lichtern und Schatten in TresJS zu beginnen.

Wir werden eine einfache Szene mit drei Meshes und einer Ebene erstellen, aber nur zwei der Meshes werden Schatten werfen.

<SandboxDemo url="https://play.tresjs.org/#eNqVVt1y2jwQfRUN30WSKdimhLbjL3Qo9GfaadpM4K7uhbAXUGpLGkn8pJm8e1eSDXZCMmRCGGv37NHZ1XrFXWuqQH+QMlivoBW3LnSqmDREg1lJklO+GCQto5PW+4SzQgplyB3RS5rnYnMNc3JP5koU5ASjT/6vQSzrmPI11W2y0nANPAP1XQhZBQwNIm50mArVjPypZsyMBTdK5HrHv4Mz4EboRsSIapZOljQTm0sq22Ry/WU0FrlQE0lTaJMfYio4oEsyvtgxmqUCOEl4wlPBtSGLnAzIXcIJSXOgyhHE5OS/d68/jsb9k7b1YOK4iY6JUStwFprLJY3JnObaGzwEN5veSogfarMIsTJyhRlWAuOHgi3I7BXHzQTQfb9XPRNbewyD2pmcnu3dd0RwW3XMetA8B4/y3tPTMzJ475Nn81PPGaxpvoIzZ6xbAiUMNUzw4Ja8GpAoiLoWgpruHWXCL0LfRNgyuDBQyJwawBUhF/u+IOvOjPEM22uRJy2ywWex6Wj21yMR2+yEsDJbiitQWkJq2BrGtABFSSyFZlYWEv7qt8nbwH/9Ru54LtZoPu/bZ+oCcdm1K45Hjc9R4FZzt+hGUYSrxoaXoJfNPTqv2wQ/kdugqol1RG1ySc0yuPrqvSVNlTye5BcQBRh1i2LUQtuYbpt0reCeZas2rm09FYIjKShGc5LaVsGosjXrUsMq4JF2BXMM8QeJESnVpuN7tZkWqrefR7pHYntAttVcfb1I+vln+3ec9LrWplisvz2Gx2oncglqX+ejZX0ejaLe6NiKpoD991QVO71DzdEpW4OErnkOab/CqXuoRRC8/3+i2BNDeUZV9jiz+Vv791Rmtdw+FDM7Y7+zxdKQmHEDHPO6LV+YxkvxkWENbGY09/Dnumr3rhym9HL8aEDDRVibG612yw/7TkFlcKMFx5vKDaakdOAFFfv5ZW31u8U6ktbSGKnjMEwzjvEZ5GytAg4m5LII6/BhL+gHUZgxbUJrRnTSchO5QexvoZdw+wikf1OnL83NXcwG6B+JTXAE/w47PA9wiJXMlTEomI2pc9tb7xheixsiY/8d6n0FuqiXAW97vEyOrm8NPuxGrsA47WEbFM3qljhsIAXZC4h9wHPUCOxkULAjSCuoTf48eBPmbFanrO467Emj8ZKds8WDjkxFIVkO6qe03d/sTHdHf3O23U8IF7OE9M8B+43eeslX2Cyg1lju/VHiZADj3Z8mP2CLzztnIbJVXh7OE85r0CJfWY0eNlrxDGXXcE7tV/eC4Q+Pqf60dW9umVRDqMFfO876q5pJu17zht+ucA7vjmP8TJX2mfWC3q7g9/8AWlN6bg==" />

## Einrichten der Szene (optional)

Wir importieren alle Module, die wir benötigen. Zusätzlich können wir Orbit-Controls von Cientos verwenden um unsere Szene besser zu beobachten, [siehe hier wie das geht](/de/examples/orbit-controls).

Das erste Objekt unserer Szene wird die Ebene sein, die Schatten empfängt. Zwei weitere Objekte werden Schatten werfen und das letzte wird überhaupt keinen Schatten werfen.

Wir verwenden das [MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial), weil wir so den "weichen Schattierungseffekt" sehr leicht sehen können.

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

## Lichter (Erklärung)

Wie du weißt, sind alle Teile von [three.js](https://threejs.org/) in **TresJS** verfügbar. Das gilt auch für alle Arten von Lichtern. Wir müssen nur das Präfix `Tres` hinzufügen, um sie als Vue-Komponente zu nutzen.

Aber nicht alle Lichter können Schatten erzeugen! Zum Beispiel ist der Zweck eines [ambientLight](https://threejs.org/docs/index.html?q=ambient#api/en/lights/AmbientLight) alle Seiten deiner Szene zu beleuchten, dabei sollen keine Schatten erzeugt werden. Im Gegensatz dazu kann und sollte ein [DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/helpers/DirectionalLightHelper), das die Sonne imitiert, Schatten werfen.

## Schatten (Erklärung)

Es gibt verschiedene Arten von Schatten. Zum Beispiel wird der "weiche Schatten" automatisch erzeugt, wenn ein Objekt von einer Seite mehr Licht erhält. Ein "Standard Three.js Schatten" auf einer Oberfläche, muss von einem Mesh geworfen und von einem anderen Mesh empfangen werden. Wie wir in unserem Beispiel sehen, empfängt die `Ebene` einen Schatten, wirft aber keinen. Beachte, dass nicht alle Materialien Schatten werfen beziehungsweise empfangen können.

Intern generiert Three.js automatisch ein neues Mesh mit einem [ShadowMaterial](https://threejs.org/docs/index.html?q=shado#api/en/materials/ShadowMaterial), das in jedem Frame aktualisiert wird. Somit werden Schatten automatisch mit animiert, wenn du Animationen verwendest. Das ist aber auch der Grund, warum du Schatten vorsichtig verwenden solltest, da sie die Performance beeinträchtigen können.

::: warning
Die übermäßige Verwendung von Schatten auf diese Weise kann die Performance beeinträchtigen. Es gibt jedoch Möglichkeiten, die Performance zu verbessern. Für weitere Informationen, siehe [dieses Video](https://youtu.be/WGNvVGrS0kY?si=q7XyL5eABKUh3gbS&t=1256)
:::

## Schatten aktivieren

Folgende drei Schritte brauchen wir.

### Schatten im Renderer aktivieren

```vue{6}
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

## Das Licht zum Werfen von Schatten konfigurieren

Wir können einfach das Boolean `cast-shadow` hinzufügen. Vue interpretiert es als ein `prop` mit dem Wert `true`.

_Umgebungslicht erzeugt hier keine Art von Schatten_


```vue{6}
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

### Objekte zum Werfen oder Empfangen von Schatten einstellen

Ähnlich wie im vorherigen Schritt konfigurieren wir das Mesh, von dem wir möchten, dass es Schatten wirft (unsere Kugel), mit der Eigenschaft `cast-shadow`. Zusätzlich konfigurieren wir das Objekt, das Schatten empfangen soll (unsere Ebene), mit der Eigenschaft `receive-shadow`.

```vue{5,12}
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

Jetzt haben wir alle notwendigen Schritte, um Schatten zu unserer Szene hinzuzufügen abgeschlossen. Wenn wir nun das, was wir in [grundlegenden Animationen](/de/examples/basic-animations) gelernt haben, anwenden und unseren Würfel bewegen, wirst du sehen, dass der Schatten auch animiert wird 🤩

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

_Beachte, dass wir absichtlich `cast-shadow` nicht auf den `Cone` angewendet haben, damit er keinen Schatten wirft_
