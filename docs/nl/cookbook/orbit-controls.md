---
title: OrbitControls
description: Hoe u OrbitControls kunt gebruiken om met de scène te communiceren.
author: alvarosabu
thumbnail: /recipes/orbit-controls.png
difficulty: 1
---

# OrbitControls

<SandboxDemo url="https://play.tresjs.org/#eNqVVU1z2zYQ/Ss78nR0KEVSlp1JWaejWk7TdmInY+kW5gCRMAkbBDAAKFnj0X/PAhAlyvlydBJ23z7svl0snwYLTc3fSsWrlg6ywYUpNFMWDLWtAk5E9SYfWJMP/soFa5TUFp7gkhhWzGtSyvU1URHMb99dziSXeq5IQSO4kQspKLoUExVs4U7LBoa21pQO/+zxuKtnRKyI2YOmFm33JimkPsZ+0EtmZ1JYLbmJYEEf7eTq6zBGhZXGRSZJiIFiFwTLDWAUFSVmlYtcoMNYqDi8gadcABScEu3ryGB48vr06nJ2Poycx/haTQZWt9RbCFc1yeCOcBMMAYI1LzaKZs8lcgjZWtViCZ1O2XPdHMgehMuOdUT3Fsu6SEKHsB94sLRRnFiKJ4CLnp6r0ZKJEntXcd87wJ/3f6TaKFpYtqIz0lBNIFPSMMukQPSnswgmEfzxOR9A0oUdSX8wz1skEibcHfh9U7ojHDOnEYwjSJH5ALAYgL4ZZ8UD3AzhSpOq77/DS9FfW6tMliSarOOK2bpdtoZq11fsdlzIJnGVYfuJwbk1SUOYSFysSf5hmsxkSW9p1XKi43sjBdbWXbHPfafONTX1jdQN4deoqmaE7+tFRBIK7ARIningGa6YdupKQfh7VtX2KxFOIzhz8mbMpY+uDTrG8SmaCmLsKAzSQWZH+k6z8l/KFdU7O6ay7zUaLpLeIODR2A13f2vbcJybpSw3YcQboismMkhxkgAUKd1b6I41dQlnME7T37xhzUpb78/bXJzgKAain2ABlqR4qLRsRTkqwpM6SVN3D9LgDPsEB9EgvO9RQ5RvDW4gT5/vHLh4snChs/WXg3McJqMoBcaXlLOVjgW1iVBN0odPJ/F5nCYlMzZxZkTnA//ijojD+vgV7hCB9K/69Dvz8S12TcmDIuIlue+x07M4jcc75s4YN8zF9Lndcn0Jr8NNkfH8Neb7OzVNXwb8BuDLerG+Pfh0nHqBcenQx7g5VneHw8nWtPwF4hDwI2oEjkrasBeQdlBX/Fn8KuFs2ad0jDiaW5xJa3C13LHq2UTinlGMU/1Budd8PJmEc7n+39v2nwgfU9Pi4Rv2e/MYUv6Iw0L1CuU+tBLfKLXB/XZ+gyun52xk2fJdc77jvKVG8tblGGCX+AYx7R7OZ/uff2D4/Bfmrfsqmq6oo0Qtfs289VO3BfezFgyfvXAe79sx+4FKh8om8WQv+PYLbBTQQA==" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) is een cameracontroller waarmee je rond een doel kunt cirkelen. Het is een geweldige manier om je scène te verkennen.

Het maakt echter geen deel uit van de kern van ThreeJS. Om het te gebruiken moet je het dus importeren vanuit de module `three/addons/controls/OrbitControls`.

Dit levert een probleem op omdat **TresJS** automatisch een catalogus van de kern van Three maakt, zodat u deze als componenten kunt gebruiken.

Gelukkig biedt **TresJS** een manier om de catalogus met componenten uit te breiden. U kunt dit doen door de `extend`-methode uit de kernbibliotheek te gebruiken.

Voor meer informatie over het uitbreiden van uw TresJS-catalogus raadpleegt u de sectie [extending](/nl/advanced/extending.md).

## OrbitControls gebruiken

Om `OrbitControls` te gebruiken moet je die importeren via de `three/addons/controls/OrbitControls` module.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

Vervolgens moet u de catalogus met componenten uitbreiden met behulp van de `extend` methode.

```js
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })
```

Nu kun je de `TresOrbitControls` component gebruiken in je scene.

::: code-group

```vue [OrbitControls.vue]
<template>
  <TresOrbitControls
    v-if="renderer"
    :args="[camera, renderer?.domElement]"
  />
</template>
```
:::

Omdat [OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) een verwijzing naar de camera en de renderer nodig heeft. Moet je die als argumenten doorgeven.U kunt de composable [useTresContext](/nl/api/composables#usetrescontext) gebruiken om de camera en de renderer op te halen.

::: warning
`useTresContext` kan alleen binnen een `TresCanvas` worden gebruikt, omdat `TresCanvas` fungeert als de provider voor de context data. Daarom hebben we een subcomponent gemaakt met de naam `OrbitControls.vue`. Zie meer over [context](/nl/api/composables#usetrescontext).
:::

```ts
import { useTresContext } from '@tresjs/core'

const { camera, renderer } = useTresContext()
```

Dus de eindcode word zoiets als:

::: code-group

```vue [OrbitControls.vue]
<script setup lang="ts">
import { extend, useTresContext } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })

const { camera, renderer } = useTresContext()
</script>

<template>
  <TresOrbitControls
    v-if="renderer"
    :args="[camera, renderer?.domElement]"
  />
</template>
```

```vue [App.vue] {3,12}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import OrbitControls from './OrbitControls.vue'
</script>

<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <OrbitControls />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```
:::


## OrbitControls van `cientos`

Hier begint het fancy gedeelte. ✨  
De `cientos` package bied ons de component `<OrbitControls />` wat een wrapper van de `OrbitControls` is van de [`three-stdlib`](https://github.com/pmndrs/three-stdlib) module.

Het beste gedeelte? Je hoeft de catalogus niet te extenden of arguments door te geven.  
It just works. 💯

```vue {3,12}
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
</script>

<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <OrbitControls />
  </TresCanvas>
</template>
```
