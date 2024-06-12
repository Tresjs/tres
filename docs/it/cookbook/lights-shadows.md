---
title: Luci e ombre
description: Scopri come aggiungere luci ed ombre alla tua scena.
author: alvarosabu
thumbnail: /recipes/lights-and-shadows.png
difficulty: 0
---

# Light-shadows

Questa guida ti aiuterà a iniziare con luce e ombre semplici in TresJS.

Costruiremo una scena semplice con tre maglie e un aereo, ma solo due avranno ombre.
<SandboxDemo url="https://play.tresjs.org/#eNqVVt1y2jwQfRUN30WSKdimhLbjL3Qo9GfaadpM4K7uhbAXUGpLGkn8pJm8e1eSDXZCMmRCGGv37NHZ1XrFXWuqQH+QMlivoBW3LnSqmDREg1lJklO+GCQto5PW+4SzQgplyB3RS5rnYnMNc3JP5koU5ASjT/6vQSzrmPI11W2y0nANPAP1XQhZBQwNIm50mArVjPypZsyMBTdK5HrHv4Mz4EboRsSIapZOljQTm0sq22Ry/WU0FrlQE0lTaJMfYio4oEsyvtgxmqUCOEl4wlPBtSGLnAzIXcIJSXOgyhHE5OS/d68/jsb9k7b1YOK4iY6JUStwFprLJY3JnObaGzwEN5veSogfarMIsTJyhRlWAuOHgi3I7BXHzQTQfb9XPRNbewyD2pmcnu3dd0RwW3XMetA8B4/y3tPTMzJ475Nn81PPGaxpvoIzZ6xbAiUMNUzw4Ja8GpAoiLoWgpruHWXCL0LfRNgyuDBQyJwawBUhF/u+IOvOjPEM22uRJy2ywWex6Wj21yMR2+yEsDJbiitQWkJq2BrGtABFSSyFZlYWEv7qt8nbwH/9Ru54LtZoPu/bZ+oCcdm1K45Hjc9R4FZzt+hGUYSrxoaXoJfNPTqv2wQ/kdugqol1RG1ySc0yuPrqvSVNlTye5BcQBRh1i2LUQtuYbpt0reCeZas2rm09FYIjKShGc5LaVsGosjXrUsMq4JF2BXMM8QeJESnVpuN7tZkWqrefR7pHYntAttVcfb1I+vln+3ec9LrWplisvz2Gx2oncglqX+ejZX0ejaLe6NiKpoD991QVO71DzdEpW4OErnkOab/CqXuoRRC8/3+i2BNDeUZV9jiz+Vv791Rmtdw+FDM7Y7+zxdKQmHEDHPO6LV+YxkvxkWENbGY09/Dnumr3rhym9HL8aEDDRVibG612yw/7TkFlcKMFx5vKDaakdOAFFfv5ZW31u8U6ktbSGKnjMEwzjvEZ5GytAg4m5LII6/BhL+gHUZgxbUJrRnTSchO5QexvoZdw+wikf1OnL83NXcwG6B+JTXAE/w47PA9wiJXMlTEomI2pc9tb7xheixsiY/8d6n0FuqiXAW97vEyOrm8NPuxGrsA47WEbFM3qljhsIAXZC4h9wHPUCOxkULAjSCuoTf48eBPmbFanrO467Emj8ZKds8WDjkxFIVkO6qe03d/sTHdHf3O23U8IF7OE9M8B+43eeslX2Cyg1lju/VHiZADj3Z8mP2CLzztnIbJVXh7OE85r0CJfWY0eNlrxDGXXcE7tV/eC4Q+Pqf60dW9umVRDqMFfO876q5pJu17zht+ucA7vjmP8TJX2mfWC3q7g9/8AWlN6bg==" />

## Impostare la scena (opzionale)

Importiamo tutti i moduli che ci servono, per comodità possiamo usare i controlli orbitali di Cientos,
[Controlla qui per sapere come](/cookbook/orbit-controls).

Mettiamo quattro oggetti nella nostra scena, uno sarà il piano che riceve ombre, due di loro getteranno ombre e l'ultimo non getterà alcuna ombra.

Userò [MeshToonMaterial](https://threejs.org/docs/index.html"q=toon#api/en/materials/MeshToonMaterial). Semplicemente perché possiamo vedere l'"ombra morbida" facilmente.

```vue
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
</script>

<template>
  <TresCanvas clear-color="#111" window-size>
    <OrbitControls />
    <TresPerspectiveCamera :position="[5, 7.5, 7.5]" />

    <TresMesh :position="[-2, 2, 0]" :rotation="[0, Math.PI, 0]">
      <TresConeGeometry :args="[1, 1.5, 3]" />
      <TresMeshToonMaterial color="#82DBC5" />
    </TresMesh>
    <TresMesh :position="[0, 0, 0]">
      <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
      <TresMeshToonMaterial color="#4F4F4F" />
    </TresMesh>
    <TresMesh :position="[2, -2, 0]">
      <TresSphereGeometry />
      <TresMeshToonMaterial color="#FBB03B" />
    </TresMesh>
    <TresMesh :position="[0, -3, 0]" :rotation="[-Math.PI / 2, 0, 0]">
      <TresPlaneGeometry :args="[10, 10, 10, 10]" />
      <TresMeshStandardMaterial color="#f7f7f7" />
    </TresMesh>
  </TresCanvas>
</template>
```

## Luci (spiegazioni)

Come sapete ogni istanza in [ThreeJs](https://threejs.org/) è disponibile in **TresJs** così sono tutti i tipi di luce, abbiamo solo bisogno di aggiungere il prefisso `Tres` per usarli.

Ma non tutte le luci possono proiettare ombre, questa definizione viene direttamente da ThreeJs e ha senso, per esempio lo scopo di un [ambientLight](https://threejs.org/docs/index.html"q=ambient#api/en/lights/AmbientLight) è quello di iluminate everysingle lato della vostra scena, quindi non ha senso che getti ombre, al contrario, una [DirectionalLight](https://threejs.org/docs/index.html"q=light#api/en/helpers/DirectionalLightHelper) che immiti il sole può e dovrebbe proiettare ombre.

## Shadows (spiegazioni)

Ci sono anche molti tipi di ombre, per esempio la "soft shadow" viene generata automaticamente quando un oggetto riceve più luce da un lato, ma in sintesi una "ThreeJS default shadow" che è diretto verso un'altra superficie deve essere lanciato da una maglia e un'altra maglia deve riceverlo. Come vediamo nel nostro esempio, il `Plane` riceve un'ombra ma non la proietta. Si prega di notare che non tutti i materiali possono proiettare o ricevere ombre.

Internamente, ThreeJS genera automaticamente una nuova mesh con un [ShadowMaterial](https://threejs.org/docs/index.html"q=shado#api/en/materials/ShadowMaterial) che viene aggiornato in ogni fotogramma, per cui se si applicano animazioni, anche l'ombra è animata, ma anche perché devi usare le ombre con attenzione, perché potrebbero rallentare le tue prestazioni.

::: warning
L'uso eccessivo delle ombre in questo modo potrebbe ridurre le tue prestazioni. Tuttavia, ci sono modi per aumentare le prestazioni, per ulteriori informazioni si prega di controllare [questo video](https://youtu.be/WGNvVGrS0kY"si=q7XyL5eABKUh3gb&t=1256)
:::

## Abilitare le ombre

Potremmo suddividerlo in tre fasi:

### Attiva le ombre nel render

```vue
//...

<template>
  <TresCanvas clear-color="#111" shadows window-size />
  //...
</template>
```

### Imposta la luce per proiettare le ombre

Possiamo semplicemente aggiungere il booleano `cast-shadow`, Vue capisce questo come un `prop` con un valore di `true`.

_L'AmbientLight non genera nessun tipo di ombra qui_

```vue
//...

<template>
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight cast-shadow :position="[0, 2, 0]" :intensity="1" />

  //...
</template>
```

### Imposta gli oggetti per proiettare o ricevere ombre

Analogamente al passo precedente, impostiamo la mesh che vogliamo proiettare ombra (la nostra sfera) con il prop `cast-shadow` e impostiamo l'oggetto per ricevere ombra (il nostro piano) con il prop`receive-shadow` `.

```vue
//...

<template>
  <TresMesh cast-shadow :position="[2, -2, 0]">
    <TresSphereGeometry />
    <TresMeshToonMaterial color="#FBB03B" />
  </TresMesh>
  <TresMesh receive-shadow :position="[0, -3, 0]" :rotation="[-Math.PI / 2, 0, 0]">
    <TresPlaneGeometry :args="[10, 10, 10, 10]" />
    <TresMeshStandardMaterial color="#f7f7f7" />
  </TresMesh>
  //...
</template>
```

Ora abbiamo tutti i passaggi necessari per aggiungere ombre alla nostra scena, e se applichiamo ciò che abbiamo imparato in [animazioni di base](/cookbook/basic-animations), e aggiungiamo movimento al nostro cubo, vedrai che anche l'ombra è animata. 🤩

```vue
<script setup>
import { shallowRef } from "vue";
import { TresCanvas, useRenderLoop } from "@tresjs/core";

const boxRef = shallowRef();

const { onLoop } = useRenderLoop();

onLoop(() => {
  if (boxRef.value) {
    boxRef.value.rotation.y += 0.01;
  }
});
</script>

<template>
  //...
  <TresMesh ref="boxRef" cast-shadow :position="[0, 0, 0]">
    <TresBoxGeometry :args="[1.5, 1.5, 1.5]" />
    <TresMeshToonMaterial color="#4F4F4F" />
  </TresMesh>
  //...
</template>
```

_Nota che intenzionalmente non ho applicato `cast-shadow` al `Cone` in modo da non proiettare alcuna ombra_
