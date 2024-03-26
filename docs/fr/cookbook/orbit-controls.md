---
title: OrbitControls
description: Comment utiliser OrbitControls pour intéragir avec votre scène.
author: alvarosabu
thumbnail: /recipes/orbit-controls.png
difficulty: 1
---

# OrbitControls

<SandboxDemo url="https://play.tresjs.org/#eNqVVU1z2zYQ/Ss78nR0KEVSlp1JWaejWk7TdmInY+kW5gCRMAkbBDAAKFnj0X/PAhAlyvlydBJ23z7svl0snwYLTc3fSsWrlg6ywYUpNFMWDLWtAk5E9SYfWJMP/soFa5TUFp7gkhhWzGtSyvU1URHMb99dziSXeq5IQSO4kQspKLoUExVs4U7LBoa21pQO/+zxuKtnRKyI2YOmFm33JimkPsZ+0EtmZ1JYLbmJYEEf7eTq6zBGhZXGRSZJiIFiFwTLDWAUFSVmlYtcoMNYqDi8gadcABScEu3ryGB48vr06nJ2Poycx/haTQZWt9RbCFc1yeCOcBMMAYI1LzaKZs8lcgjZWtViCZ1O2XPdHMgehMuOdUT3Fsu6SEKHsB94sLRRnFiKJ4CLnp6r0ZKJEntXcd87wJ/3f6TaKFpYtqIz0lBNIFPSMMukQPSnswgmEfzxOR9A0oUdSX8wz1skEibcHfh9U7ojHDOnEYwjSJH5ALAYgL4ZZ8UD3AzhSpOq77/DS9FfW6tMliSarOOK2bpdtoZq11fsdlzIJnGVYfuJwbk1SUOYSFysSf5hmsxkSW9p1XKi43sjBdbWXbHPfafONTX1jdQN4deoqmaE7+tFRBIK7ARIningGa6YdupKQfh7VtX2KxFOIzhz8mbMpY+uDTrG8SmaCmLsKAzSQWZH+k6z8l/KFdU7O6ay7zUaLpLeIODR2A13f2vbcJybpSw3YcQboismMkhxkgAUKd1b6I41dQlnME7T37xhzUpb78/bXJzgKAain2ABlqR4qLRsRTkqwpM6SVN3D9LgDPsEB9EgvO9RQ5RvDW4gT5/vHLh4snChs/WXg3McJqMoBcaXlLOVjgW1iVBN0odPJ/F5nCYlMzZxZkTnA//ijojD+vgV7hCB9K/69Dvz8S12TcmDIuIlue+x07M4jcc75s4YN8zF9Lndcn0Jr8NNkfH8Neb7OzVNXwb8BuDLerG+Pfh0nHqBcenQx7g5VneHw8nWtPwF4hDwI2oEjkrasBeQdlBX/Fn8KuFs2ad0jDiaW5xJa3C13LHq2UTinlGMU/1Budd8PJmEc7n+39v2nwgfU9Pi4Rv2e/MYUv6Iw0L1CuU+tBLfKLXB/XZ+gyun52xk2fJdc77jvKVG8tblGGCX+AYx7R7OZ/uff2D4/Bfmrfsqmq6oo0Qtfs289VO3BfezFgyfvXAe79sx+4FKh8om8WQv+PYLbBTQQA==" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) est un contrôleur de caméra qui vous permet d'orbiter autour d'une cible. C'est une excellente façon d'explorer votre scène.

Cependant, cela ne fait pas partie du cœur de ThreeJS. Par conséquent, pour l'utiliser, vous devrez l'importer depuis le module `three/addons/controls/OrbitControls`.

Cela crée un problème car **TresJS** crée automatiquement un catalogue du cœur de ThreeJS afin que vous puissiez les utiliser comme composants.

Heureusement, **TresJS** offre un moyen d'étendre le catalogue de composants. Vous pouvez le faire en utilisant la méthode `extend` de la bibliothèque principale.

Pour plus d'informations sur la façon d'étendre votre catalogue TresJS, consultez la section [extension](/advanced/extending.md).

## Usage de OrbitControls

Pour utiliser `OrbitControls`, vous devez d'abord importer le module `three/addons/controls/OrbitControls`.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

Ensuite, vous devez étendre le catalogue de composants à l'aide de la méthode `extend`.

```js
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })
```

Vous pouvez maintenant utiliser le composant `TresOrbitControls` dans votre scène.

```vue
<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <TresOrbitControls
      v-if="state.renderer"
      :args="[state.camera, state.renderer?.domElement]"
    />
  </TresCanvas>
</template>
```

Étant donné que [OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) a besoin d'une référence à la caméra et au moteur de rendu, vous devez les transmettre comme arguments.

Vous pouvez utiliser le composable [useTres](/api/composables#usetres) pour obtenir la caméra et le moteur de rendu.


```ts
import { useTres } from '@tresjs/core'

const { state } = useTres()
```

Le code final ressemblerait donc à ceci :

```vue
<script setup lang="ts">
import { extend, useTres } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })

const { state } = useTres()
</script>

<template>
  <TresCanvas
    shadows
    alpha
  >
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <TresOrbitControls
      v-if="state.renderer"
      :args="[state.camera, state.renderer?.domElement]"
    />
  </TresCanvas>
</template>
```

## OrbitControls de `cientos`

C’est là que commence la partie intéressante. ✨
Le package `cientos` fournit un composant appelé `<OrbitControls />` qui est un wrapper pour `OrbitControls` du module [`three-stdlib`](https://github.com/pmndrs/three-stdlib).

Le meilleur? Vous n'avez pas besoin de développer le catalogue ni de transmettre d'arguments.
Cela fonctionne tout simplement. 💯

```vue
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
