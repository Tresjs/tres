# Licht und Schatten

Diese Anleitung wird dir helfen, mit einfachen Lichtern und Schatten in TresJS zu beginnen.

Wir werden eine einfache Szene mit drei Meshes und einer Ebene erstellen, aber nur zwei davon werden Schatten werfen.

<SandboxDemo url="https://play.tresjs.org/#eNqVVt1y2jwQfRUN30WSKdimhLbjL3Qo9GfaadpM4K7uhbAXUGpLGkn8pJm8e1eSDXZCMmRCGGv37NHZ1XrFXWuqQH+QMlivoBW3LnSqmDREg1lJklO+GCQto5PW+4SzQgplyB3RS5rnYnMNc3JP5koU5ASjT/6vQSzrmPI11W2y0nANPAP1XQhZBQwNIm50mArVjPypZsyMBTdK5HrHv4Mz4EboRsSIapZOljQTm0sq22Ry/WU0FrlQE0lTaJMfYio4oEsyvtgxmqUCOEl4wlPBtSGLnAzIXcIJSXOgyhHE5OS/d68/jsb9k7b1YOK4iY6JUStwFprLJY3JnObaGzwEN5veSogfarMIsTJyhRlWAuOHgi3I7BXHzQTQfb9XPRNbewyD2pmcnu3dd0RwW3XMetA8B4/y3tPTMzJ475Nn81PPGaxpvoIzZ6xbAiUMNUzw4Ja8GpAoiLoWgpruHWXCL0LfRNgyuDBQyJwawBUhF/u+IOvOjPEM22uRJy2ywWex6Wj21yMR2+yEsDJbiitQWkJq2BrGtABFSSyFZlYWEv7qt8nbwH/9Ru54LtZoPu/bZ+oCcdm1K45Hjc9R4FZzt+hGUYSrxoaXoJfNPTqv2wQ/kdugqol1RG1ySc0yuPrqvSVNlTye5BcQBRh1i2LUQtuYbpt0reCeZas2rm09FYIjKShGc5LaVsGosjXrUsMq4JF2BXMM8QeJESnVpuN7tZkWqrefR7pHYntAttVcfb1I+vln+3ec9LrWplisvz2Gx2oncglqX+ejZX0ejaLe6NiKpoD991QVO71DzdEpW4OErnkOab/CqXuoRRC8/3+i2BNDeUZV9jiz+Vv791Rmtdw+FDM7Y7+zxdKQmHEDHPO6LV+YxkvxkWENbGY09/Dnumr3rhym9HL8aEDDRVibG612yw/7TkFlcKMFx5vKDaakdOAFFfv5ZW31u8U6ktbSGKnjMEwzjvEZ5GytAg4m5LII6/BhL+gHUZgxbUJrRnTSchO5QexvoZdw+wikf1OnL83NXcwG6B+JTXAE/w47PA9wiJXMlTEomI2pc9tb7xheixsiY/8d6n0FuqiXAW97vEyOrm8NPuxGrsA47WEbFM3qljhsIAXZC4h9wHPUCOxkULAjSCuoTf48eBPmbFanrO467Emj8ZKds8WDjkxFIVkO6qe03d/sTHdHf3O23U8IF7OE9M8B+43eeslX2Cyg1lju/VHiZADj3Z8mP2CLzztnIbJVXh7OE85r0CJfWY0eNlrxDGXXcE7tV/eC4Q+Pqf60dW9umVRDqMFfO876q5pJu17zht+ucA7vjmP8TJX2mfWC3q7g9/8AWlN6bg==" />

## Einrichten der Szene (optional)

Wir importieren alle Module, die wir benötigen. Für zusätzlichen Komfort können wir Orbit-Controls von Cientos verwenden,
[siehe hier wie das geht](/de/examples/orbit-controls).

Wir platzieren vier Objekte in unserer Szene, eines wird die Ebene sein, die Schatten empfängt, zwei davon werden Schatten werfen und das letzte wird überhaupt keinen Schatten werfen.

Wir werden das [MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial) verwenden. Einfach, weil wir den "weichen Schattierungseffekt" leicht sehen können.

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

Wie du weißt, ist jede Instanz in [ThreeJs](https://threejs.org/) in **TresJs** verfügbar, also sind alle Arten von Lichtern ebenfalls verfügbar, wir müssen nur das Präfix `Tres` hinzufügen, um sie zu nutzen.

Aber nicht alle Lichter können Schatten erzeugen, diese Definition kommt direkt von ThreeJs und macht Sinn. Zum Beispiel ist der Zweck eines [ambientLight](https://threejs.org/docs/index.html?q=ambient#api/en/lights/AmbientLight) alle Seiten deiner Szene zu beleuchten, also macht es keinen Sinn, dass es Schatten erzeugt. Im Gegensatz dazu kann und sollte ein [DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/helpers/DirectionalLightHelper), das die Sonne imitiert, Schatten werfen.

## Schatten (Erklärung)

Es gibt auch viele Arten von Schatten, zum Beispiel wird der "weiche Schatten" automatisch erzeugt, wenn ein Objekt von einer Seite mehr Licht erhält, aber kurz gesagt, ein "Standard Three.js Schatten", der auf eine andere Oberfläche gerichtet wird, muss von einem Mesh ausgeworfen und von einem anderen Mesh empfangen werden. Wie wir in unserem Beispiel sehen, empfängt die `Ebene` einen Schatten, wirft aber keinen. Beachte, dass nicht alle Materialien Schatten werfen oder empfangen können.

Intern generiert Three.js automatisch ein neues Mesh mit einem [ShadowMaterial](https://threejs.org/docs/index.html?q=shado#api/en/materials/ShadowMaterial), das in jedem Frame aktualisiert wird, deshalb, wenn du Animationen anwendest, wird der Schatten auch animiert, aber das ist auch der Grund, warum du Schatten vorsichtig verwenden solltest, da sie die Leistung beeinträchtigen können.

::: warning
Die übermäßige Verwendung von Schatten auf diese Weise kann die Leistung beeinträchtigen. Es gibt jedoch Möglichkeiten, die Leistung zu verbessern. Für weitere Informationen, siehe [dieses Video](https://youtu.be/WGNvVGrS0kY?si=q7XyL5eABKUh3gbS&t=1256)
:::

## Schatten aktivieren

Wir können dies in drei Schritte unterteilen:

### Schatten im Renderer aktivieren

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

## Das Licht zum Werfen von Schatten konfigurieren

Wir können einfach das Boolean `cast-shadow` hinzufügen, Vue interpretiert es als eine `prop` mit dem Wert `true`.

_Umgebungslicht erzeugt hier keine Art von Schatten_


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

### Objekte zum Werfen oder Empfangen von Schatten einstellen

Ähnlich wie im vorherigen Schritt konfigurieren wir das Mesh, von dem wir möchten, dass es Schatten wirft (unsere Kugel), mit der Eigenschaft `cast-shadow`, und wir konfigurieren das Objekt, das Schatten empfangen soll (unsere Ebene), mit der Eigenschaft `receive-shadow`.

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

Jetzt haben wir alle notwendigen Schritte, um Schatten zu unserer Szene hinzuzufügen, und wenn wir das, was wir in [grundlegenden Animationen](/de/examples/basic-animations) gelernt haben, anwenden und unserem Würfel Bewegung hinzufügen, wirst du sehen, dass der Schatten auch animiert wird 🤩

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

_Beachte, dass ich absichtlich `cast-shadow` nicht auf den `Cone` angewendet habe, damit er keinen Schatten wirft_
