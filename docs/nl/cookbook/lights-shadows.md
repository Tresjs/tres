---
title: Lichten en schaduwen
description: Leer hoe u licht en schaduw aan uw scène kunt toevoegen.
author: alvarosabu
thumbnail: /recipes/lights-and-shadows.png
difficulty: 0
---

# Light-schaduwen

Deze gids helpt u aan de slag te gaan met eenvoudig licht en schaduwen in TresJS.

We zullen een eenvoudige scène bouwen met drie meshes en een vlak, maar slechts twee zullen schaduwen hebben.

<SandboxDemo url="https://play.tresjs.org/#eNqVVt1y2jwQfRUN30WSKdimhLbjL3Qo9GfaadpM4K7uhbAXUGpLGkn8pJm8e1eSDXZCMmRCGGv37NHZ1XrFXWuqQH+QMlivoBW3LnSqmDREg1lJklO+GCQto5PW+4SzQgplyB3RS5rnYnMNc3JP5koU5ASjT/6vQSzrmPI11W2y0nANPAP1XQhZBQwNIm50mArVjPypZsyMBTdK5HrHv4Mz4EboRsSIapZOljQTm0sq22Ry/WU0FrlQE0lTaJMfYio4oEsyvtgxmqUCOEl4wlPBtSGLnAzIXcIJSXOgyhHE5OS/d68/jsb9k7b1YOK4iY6JUStwFprLJY3JnObaGzwEN5veSogfarMIsTJyhRlWAuOHgi3I7BXHzQTQfb9XPRNbewyD2pmcnu3dd0RwW3XMetA8B4/y3tPTMzJ475Nn81PPGaxpvoIzZ6xbAiUMNUzw4Ja8GpAoiLoWgpruHWXCL0LfRNgyuDBQyJwawBUhF/u+IOvOjPEM22uRJy2ywWex6Wj21yMR2+yEsDJbiitQWkJq2BrGtABFSSyFZlYWEv7qt8nbwH/9Ru54LtZoPu/bZ+oCcdm1K45Hjc9R4FZzt+hGUYSrxoaXoJfNPTqv2wQ/kdugqol1RG1ySc0yuPrqvSVNlTye5BcQBRh1i2LUQtuYbpt0reCeZas2rm09FYIjKShGc5LaVsGosjXrUsMq4JF2BXMM8QeJESnVpuN7tZkWqrefR7pHYntAttVcfb1I+vln+3ec9LrWplisvz2Gx2oncglqX+ejZX0ejaLe6NiKpoD991QVO71DzdEpW4OErnkOab/CqXuoRRC8/3+i2BNDeUZV9jiz+Vv791Rmtdw+FDM7Y7+zxdKQmHEDHPO6LV+YxkvxkWENbGY09/Dnumr3rhym9HL8aEDDRVibG612yw/7TkFlcKMFx5vKDaakdOAFFfv5ZW31u8U6ktbSGKnjMEwzjvEZ5GytAg4m5LII6/BhL+gHUZgxbUJrRnTSchO5QexvoZdw+wikf1OnL83NXcwG6B+JTXAE/w47PA9wiJXMlTEomI2pc9tb7xheixsiY/8d6n0FuqiXAW97vEyOrm8NPuxGrsA47WEbFM3qljhsIAXZC4h9wHPUCOxkULAjSCuoTf48eBPmbFanrO467Emj8ZKds8WDjkxFIVkO6qe03d/sTHdHf3O23U8IF7OE9M8B+43eeslX2Cyg1lju/VHiZADj3Z8mP2CLzztnIbJVXh7OE85r0CJfWY0eNlrxDGXXcE7tV/eC4Q+Pqf60dW9umVRDqMFfO876q5pJu17zht+ucA7vjmP8TJX2mfWC3q7g9/8AWlN6bg==" />

## De scene opzetten (optioneel)

We importeren alle modules die we nodig hebben, voor het comfort kunnen we de orbit-controls van cientos gebruiken,
[kijk hier om te weten hoe](/nl/cookbook/orbit-controls).

Laten we vier objecten in onze scène plaatsen, één zal het vlak zijn dat schaduwen ontvangt, twee ervan zullen schaduwen werpen en de laatste zal helemaal geen schaduw werpen.

Ik ga [MeshToonMaterial](https://threejs.org/docs/index.html?q=toon#api/en/materials/MeshToonMaterial) gebruiken. Simpelweg omdat we de ‘zachte schaduw’ gemakkelijk kunnen zien.

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

## Lichten (uitleg)

Zoals u weet is elke instantie in [ThreeJs](https://threejs.org/) beschikbaar in **TresJs**, en dat geldt ook voor alle lichttypen. We hoeven alleen maar het voorvoegsel `Tres` toe te voegen om ze te gebruiken.

Maar niet alle lichten kunnen schaduwen werpen, deze definitie komt rechtstreeks van ThreeJs en is logisch, bijvoorbeeld het doel van een [ambientLight](https://threejs.org/docs/index.html?q=ambient#api/en/lights/AmbientLight) is bedoeld om elke kant van uw scène te verlichten, dus het heeft geen zin om schaduwen te werpen, integendeel, een [DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/helpers/DirectionalLightHelper) het imiteren van de zon kan en moet schaduwen werpen.

## Schaduwen (uitleg)

Er zijn ook veel soorten schaduwen, de "zachte schaduw" wordt bijvoorbeeld automatisch gegenereerd wanneer een object meer licht van één kant ontvangt, maar kort samengevat moet een "ThreeJS-standaardschaduw" die naar een ander oppervlak is gericht, door een mesh worden geworpen en een ander mesh moet het ontvangen. Zoals we in ons voorbeeld zien, ontvangt het `Plane` een schaduw, maar werpt deze niet. Houd er rekening mee dat niet alle materialen schaduw kunnen werpen of ontvangen.

Intern genereert ThreeJS automatisch een nieuwe mesh met een [ShadowMaterial](https://threejs.org/docs/index.html?q=shado#api/en/materials/ShadowMaterial) die in elk frame wordt bijgewerkt, daarom als je animaties toepast, wordt de schaduw ook geanimeerd, maar ook waarom je schaduwen zorgvuldig moet gebruiken, omdat ze je prestaties kunnen vertragen.

::: warning
Als u op deze manier overmatig gebruik maakt van schaduwen, kunnen uw prestaties afnemen. Er zijn echter manieren om uw prestaties te verbeteren. Voor meer informatie kunt u [deze video](https://youtu.be/WGNvVGrS0kY?si=q7XyL5eABKUh3gbS&t=1256) bekijken.
:::

## Schaduwen aanzetten

We kunnen dit verdelen in drie stappen:

### Activeer schaduwen op de renderer

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
### Stel het licht in om schaduwen te werpen

We kunnen simpel de boolean `cast-shadow` toevoegen, Vue snapt dit als een `prop` met een waarde van `true`.

_Het AmbientLight genereert hier geen enkele vorm van schaduw_

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
### Stel de objecten in om schaduwen te werpen of te ontvangen

Op dezelfde manier als in de vorige stap stellen we de mesh waarop we schaduw willen werpen (onze bol) in met de `cast-shadow` prop, en stellen we het object in om schaduw te ontvangen (ons vlak) met de `receive-shadow` prop.

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

Nu hebben we alle noodzakelijke stappen om schaduwen aan onze scène toe te voegen, en als we toepassen wat we hebben geleerd in [basisanimaties](/nl/cookbook/basic-animations), en we voegen beweging toe aan onze kubus, zul je zien dat de schaduw ook geanimeerd is. 🤩

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

_Merk op dat ik met opzet geen `cast-shadow` heb toegepast op de `Kegel`, zodat deze geen schaduw werpt_
