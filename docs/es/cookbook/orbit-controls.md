---
title: OrbitControls
descripción: Cómo usar OrbitControls para interactuar con la escena.
author: alvarosabu
thumbnail: /recipes/orbit-controls.png
difficulty: 1
---

# OrbitControls

<SandboxDemo url="https://play.tresjs.org/#eNqVVU1z2zYQ/Ss78nR0KEVSlp1JWaejWk7TdmInY+kW5gCRMAkbBDAAKFnj0X/PAhAlyvlydBJ23z7svl0snwYLTc3fSsWrlg6ywYUpNFMWDLWtAk5E9SYfWJMP/soFa5TUFp7gkhhWzGtSyvU1URHMb99dziSXeq5IQSO4kQspKLoUExVs4U7LBoa21pQO/+zxuKtnRKyI2YOmFm33JimkPsZ+0EtmZ1JYLbmJYEEf7eTq6zBGhZXGRSZJiIFiFwTLDWAUFSVmlYtcoMNYqDi8gadcABScEu3ryGB48vr06nJ2Poycx/haTQZWt9RbCFc1yeCOcBMMAYI1LzaKZs8lcgjZWtViCZ1O2XPdHMgehMuOdUT3Fsu6SEKHsB94sLRRnFiKJ4CLnp6r0ZKJEntXcd87wJ/3f6TaKFpYtqIz0lBNIFPSMMukQPSnswgmEfzxOR9A0oUdSX8wz1skEibcHfh9U7ojHDOnEYwjSJH5ALAYgL4ZZ8UD3AzhSpOq77/DS9FfW6tMliSarOOK2bpdtoZq11fsdlzIJnGVYfuJwbk1SUOYSFysSf5hmsxkSW9p1XKi43sjBdbWXbHPfafONTX1jdQN4deoqmaE7+tFRBIK7ARIningGa6YdupKQfh7VtX2KxFOIzhz8mbMpY+uDTrG8SmaCmLsKAzSQWZH+k6z8l/KFdU7O6ay7zUaLpLeIODR2A13f2vbcJybpSw3YcQboismMkhxkgAUKd1b6I41dQlnME7T37xhzUpb78/bXJzgKAain2ABlqR4qLRsRTkqwpM6SVN3D9LgDPsEB9EgvO9RQ5RvDW4gT5/vHLh4snChs/WXg3McJqMoBcaXlLOVjgW1iVBN0odPJ/F5nCYlMzZxZkTnA//ijojD+vgV7hCB9K/69Dvz8S12TcmDIuIlue+x07M4jcc75s4YN8zF9Lndcn0Jr8NNkfH8Neb7OzVNXwb8BuDLerG+Pfh0nHqBcenQx7g5VneHw8nWtPwF4hDwI2oEjkrasBeQdlBX/Fn8KuFs2ad0jDiaW5xJa3C13LHq2UTinlGMU/1Budd8PJmEc7n+39v2nwgfU9Pi4Rv2e/MYUv6Iw0L1CuU+tBLfKLXB/XZ+gyun52xk2fJdc77jvKVG8tblGGCX+AYx7R7OZ/uff2D4/Bfmrfsqmq6oo0Qtfs289VO3BfezFgyfvXAe79sx+4FKh8om8WQv+PYLbBTQQA==" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) es un controlador de cámara que te permite orbitar alrededor de un objetivo. Es una excelente manera de explorar tu escena.

Sin embargo, no forma parte del núcleo de ThreeJS. Por lo tanto, para usarlo, necesitarías importarlo desde el módulo `three/addons/controls/OrbitControls`.

Esto crea un problema porque **TresJS** crea automáticamente un catálogo del núcleo de Three para que puedas usarlos como componentes.

Afortunadamente, **TresJS** proporciona una forma de ampliar el catálogo de componentes. Puedes hacerlo utilizando el método `extend` de la biblioteca principal.

Para obtener más información sobre cómo ampliar tu catálogo de TresJS, consulta la sección de [extensión](/advanced/extending.md).

## Uso de OrbitControls

Para usar `OrbitControls`, debes importarlo desde el módulo `three/addons/controls/OrbitControls`.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

Luego, necesitas ampliar el catálogo de componentes utilizando el método `extend`.

```js
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })
```

Ahora puedes usar el componente `TresOrbitControls` en tu escena.

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

Dado que [OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) necesita una referencia a la cámara y al renderizador, debes pasarlos como argumentos. Puedes usar el composable [useTresContext](/es/api/composables#usetrescontext) para obtener la cámara y el renderizador.

::: warning
`useTresContext` solo puede ser utilizado dentro de un `TresCanvas` ya que `TresCanvas` actúa como proveedor de los datos de contexto. Es por eso que creamos un subcomponente llamado `OrbitControls.vue`. Obtén más información sobre [contexto](/api/composables#usetrescontext).
:::

```ts
import { useTresContext } from '@tresjs/core'

const { camera, renderer } = useTresContext()
```

So the final code would be something like this:

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


## OrbitControls de `cientos`

Aquí es donde comienza la parte interesante. ✨  
El paquete `cientos` proporciona un componente llamado `<OrbitControls />` que es un envoltorio de los `OrbitControls` del módulo [`three-stdlib`](https://github.com/pmndrs/three-stdlib).

¿Lo mejor? No necesitas ampliar el catálogo ni pasar ningún argumento.  
Simplemente funciona. 💯

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
