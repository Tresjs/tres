---
title: OrbitControls
description: Come usare OrbitControls per interagire con la scena.
author: alvarosabu
thumbnail: /recipes/orbit-controls.png
difficulty: 1
---

# OrbitControls

<SandboxDemo url="https://play.tresjs.org/#eNqVVU1z2zYQ/Ss78nR0KEVSlp1JWaejWk7TdmInY+kW5gCRMAkbBDAAKFnj0X/PAhAlyvlydBJ23z7svl0snwYLTc3fSsWrlg6ywYUpNFMWDLWtAk5E9SYfWJMP/soFa5TUFp7gkhhWzGtSyvU1URHMb99dziSXeq5IQSO4kQspKLoUExVs4U7LBoa21pQO/+zxuKtnRKyI2YOmFm33JimkPsZ+0EtmZ1JYLbmJYEEf7eTq6zBGhZXGRSZJiIFiFwTLDWAUFSVmlYtcoMNYqDi8gadcABScEu3ryGB48vr06nJ2Poycx/haTQZWt9RbCFc1yeCOcBMMAYI1LzaKZs8lcgjZWtViCZ1O2XPdHMgehMuOdUT3Fsu6SEKHsB94sLRRnFiKJ4CLnp6r0ZKJEntXcd87wJ/3f6TaKFpYtqIz0lBNIFPSMMukQPSnswgmEfzxOR9A0oUdSX8wz1skEibcHfh9U7ojHDOnEYwjSJH5ALAYgL4ZZ8UD3AzhSpOq77/DS9FfW6tMliSarOOK2bpdtoZq11fsdlzIJnGVYfuJwbk1SUOYSFysSf5hmsxkSW9p1XKi43sjBdbWXbHPfafONTX1jdQN4deoqmaE7+tFRBIK7ARIningGa6YdupKQfh7VtX2KxFOIzhz8mbMpY+uDTrG8SmaCmLsKAzSQWZH+k6z8l/KFdU7O6ay7zUaLpLeIODR2A13f2vbcJybpSw3YcQboismMkhxkgAUKd1b6I41dQlnME7T37xhzUpb78/bXJzgKAain2ABlqR4qLRsRTkqwpM6SVN3D9LgDPsEB9EgvO9RQ5RvDW4gT5/vHLh4snChs/WXg3McJqMoBcaXlLOVjgW1iVBN0odPJ/F5nCYlMzZxZkTnA//ijojD+vgV7hCB9K/69Dvz8S12TcmDIuIlue+x07M4jcc75s4YN8zF9Lndcn0Jr8NNkfH8Neb7OzVNXwb8BuDLerG+Pfh0nHqBcenQx7g5VneHw8nWtPwF4hDwI2oEjkrasBeQdlBX/Fn8KuFs2ad0jDiaW5xJa3C13LHq2UTinlGMU/1Budd8PJmEc7n+39v2nwgfU9Pi4Rv2e/MYUv6Iw0L1CuU+tBLfKLXB/XZ+gyun52xk2fJdc77jvKVG8tblGGCX+AYx7R7OZ/uff2D4/Bfmrfsqmq6oo0Qtfs289VO3BfezFgyfvXAe79sx+4FKh8om8WQv+PYLbBTQQA==" />

[OrbitControls](https://threejs.org/docs/index.html"q=orbit#examples/en/controls/OrbitControls) è un controller per telecamere che consente di orbitare attorno a un bersaglio. È un ottimo modo per esplorare la tua scena.

Tuttavia, non fa parte del nucleo di ThreeJS. Quindi per usarlo dovresti importarlo dal modulo`three/addons/controls/OrbitControls` .

Questo crea un problema perché **TresJS** crea automaticamente un catalogo del nucleo di Tre in modo da poterli usare come componenti.

Fortunatamente **TresJS** fornisce un modo per estendere il catalogo dei componenti. Puoi farlo usando il metodo `extend` dalla libreria principale.

Per ulteriori informazioni sull'estensione del catalogo TresJS, fare riferimento alla sezione [extending](/advanced/extending.md).

## Usare OrbitControls

Per usare`OrbitControls` è necessario importarlo dal modulo`three/addons/controls/OrbitControls` .

```js
import { OrbitControls } from "three/addons/controls/OrbitControls";
```

Quindi è necessario estendere il catalogo dei componenti utilizzando il metodo `extend` .

```js
import { extend } from "@tresjs/core";
import { OrbitControls } from "three/addons/controls/OrbitControls";

extend({ OrbitControls });
```

Ora puoi usare il componente `TresOrbitControls` nella tua scena.

::: code-group

```vue [OrbitControls.vue]
<template>
  <TresOrbitControls v-if="renderer" :args="[camera, renderer?.domElement]" />
</template>
```

:::

Poiché [OrbitControls](https://threejs.org/docs/index.html"q=orbit#examples/en/controls/OrbitControls) ha bisogno di un riferimento alla fotocamera e al renderer. Devi passarli come argomenti. Puoi usare il [useTresContext](/api/composables#usetrescontext) componibile per ottenere la fotocamera e il renderer.

::: warning
`utilizzare TresContext` può essere utilizzato solo all'interno di un `TresCanvas` poiché`TresCanvas` agisce come fornitore dei dati di contesto. Questo è il motivo per cui abbiamo creato un sottocomponente chiamato `OrbitControls.vue`. Vedi di più su [context](/api/composables#usetrescontext).
:::

```ts
import { useTresContext } from "@tresjs/core";

const { camera, renderer } = useTresContext();
```

Quindi il codice finale sarebbe qualcosa del genere:

::: code-group

```vue [OrbitControls.vue]
<script setup lang="ts">
import { extend, useTresContext } from "@tresjs/core";
import { OrbitControls } from "three/addons/controls/OrbitControls";

extend({ OrbitControls });

const { camera, renderer } = useTresContext();
</script>

<template>
  <TresOrbitControls v-if="renderer" :args="[camera, renderer?.domElement]" />
</template>
```

```vue [App.vue] {3,12}
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import OrbitControls from "./OrbitControls.vue";
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <OrbitControls />
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
```

:::

## OrbitControls da `cientos`

Qui è dove inizia il bello. ✨
Il pacchetto `Cientos` fornisce un componente chiamato `<OrbitControls />` che è un wrapper dei `OrbitControls` dal modulo [`three-stdlib`](https://github.com/pms/pms/threstdlib).

La parte più bella? Non è necessario estendere il catalogo o passare qualsiasi argomento.
Funziona e basta. 💯

```vue {3,12}
<script setup lang="ts">
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <OrbitControls />
  </TresCanvas>
</template>
```
