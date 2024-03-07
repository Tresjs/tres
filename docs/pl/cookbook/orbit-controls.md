---
title: OrbitControls
description: Jak korzystać z OrbitControls do interakcji ze sceną.
author: alvarosabu
thumbnail: /recipes/orbit-controls.png
difficulty: 1
---

# OrbitControls

<SandboxDemo url="https://play.tresjs.org/#eNqVVU1z2zYQ/Ss78nR0KEVSlp1JWaejWk7TdmInY+kW5gCRMAkbBDAAKFnj0X/PAhAlyvlydBJ23z7svl0snwYLTc3fSsWrlg6ywYUpNFMWDLWtAk5E9SYfWJMP/soFa5TUFp7gkhhWzGtSyvU1URHMb99dziSXeq5IQSO4kQspKLoUExVs4U7LBoa21pQO/+zxuKtnRKyI2YOmFm33JimkPsZ+0EtmZ1JYLbmJYEEf7eTq6zBGhZXGRSZJiIFiFwTLDWAUFSVmlYtcoMNYqDi8gadcABScEu3ryGB48vr06nJ2Poycx/haTQZWt9RbCFc1yeCOcBMMAYI1LzaKZs8lcgjZWtViCZ1O2XPdHMgehMuOdUT3Fsu6SEKHsB94sLRRnFiKJ4CLnp6r0ZKJEntXcd87wJ/3f6TaKFpYtqIz0lBNIFPSMMukQPSnswgmEfzxOR9A0oUdSX8wz1skEibcHfh9U7ojHDOnEYwjSJH5ALAYgL4ZZ8UD3AzhSpOq77/DS9FfW6tMliSarOOK2bpdtoZq11fsdlzIJnGVYfuJwbk1SUOYSFysSf5hmsxkSW9p1XKi43sjBdbWXbHPfafONTX1jdQN4deoqmaE7+tFRBIK7ARIningGa6YdupKQfh7VtX2KxFOIzhz8mbMpY+uDTrG8SmaCmLsKAzSQWZH+k6z8l/KFdU7O6ay7zUaLpLeIODR2A13f2vbcJybpSw3YcQboismMkhxkgAUKd1b6I41dQlnME7T37xhzUpb78/bXJzgKAain2ABlqR4qLRsRTkqwpM6SVN3D9LgDPsEB9EgvO9RQ5RvDW4gT5/vHLh4snChs/WXg3McJqMoBcaXlLOVjgW1iVBN0odPJ/F5nCYlMzZxZkTnA//ijojD+vgV7hCB9K/69Dvz8S12TcmDIuIlue+x07M4jcc75s4YN8zF9Lndcn0Jr8NNkfH8Neb7OzVNXwb8BuDLerG+Pfh0nHqBcenQx7g5VneHw8nWtPwF4hDwI2oEjkrasBeQdlBX/Fn8KuFs2ad0jDiaW5xJa3C13LHq2UTinlGMU/1Budd8PJmEc7n+39v2nwgfU9Pi4Rv2e/MYUv6Iw0L1CuU+tBLfKLXB/XZ+gyun52xk2fJdc77jvKVG8tblGGCX+AYx7R7OZ/uff2D4/Bfmrfsqmq6oo0Qtfs289VO3BfezFgyfvXAe79sx+4FKh8om8WQv+PYLbBTQQA==" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) to kontroler kamery, który umożliwia obracanie się wokół celu. To doskonały sposób na eksplorację swojej sceny.

Jednakże, nie jest to część rdzenia ThreeJS. Aby go używać, musisz go zaimportować z modułu `three/addons/controls/OrbitControls`.

Powstaje problem, ponieważ **TresJS** automatycznie tworzy katalog rdzenia Three, abyś mógł używać ich jako komponentów.

Na szczęście, **TresJS** dostarcza sposób na rozszerzanie katalogu komponentów. Możesz to zrobić, korzystając z metody `extend` z biblioteki rdzenia.

Aby uzyskać więcej informacji na temat rozszerzania katalogu TresJS, zajrzyj do sekcji [extending](/advanced/extending.md).

## Użycie OrbitControls

Aby używać `OrbitControls`, musisz go zaimportować z modułu `three/addons/controls/OrbitControls`.

```js
import { OrbitControls } from "three/addons/controls/OrbitControls";
```

Następnie musisz rozszerzyć katalog komponentów, korzystając z metody `extend`.

```js
import { extend } from "@tresjs/core";
import { OrbitControls } from "three/addons/controls/OrbitControls";

extend({ OrbitControls });
```

Teraz możesz używać komponentu `TresOrbitControls` w swojej scenie.

```vue
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <TresOrbitControls
      v-if="state.renderer"
      :args="[state.camera, state.renderer?.domElement]"
    />
  </TresCanvas>
</template>
```

Ponieważ [OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) wymaga odniesienia do kamery i renderera, musisz przekazać je jako argumenty.

Możesz skorzystać z komponentu [useTres](/api/composables#usetres) aby uzyskać dostęp do kamery i renderera.

```ts
import { useTres } from "@tresjs/core";

const { state } = useTres();
```

Ostateczny kod wyglądałby mniej więcej tak:

```vue
<script setup lang="ts">
import { extend, useTres } from "@tresjs/core";
import { OrbitControls } from "three/addons/controls/OrbitControls";

extend({ OrbitControls });

const { state } = useTres();
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <TresOrbitControls
      v-if="state.renderer"
      :args="[state.camera, state.renderer?.domElement]"
    />
  </TresCanvas>
</template>
```

## OrbitControls z `cientos`

To jest moment, w którym zaczyna się część interesująca. ✨
Pakiet `cientos` dostarcza komponentu o nazwie `<OrbitControls />` który jest opakowaniem dla `OrbitControls` z modułu [`three-stdlib`](https://github.com/pmndrs/three-stdlib).

Najlepsze w tym wszystkim? Nie musisz rozszerzać katalogu ani przekazywać żadnych argumentów.
Po prostu działa. 💯

```vue
<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" />
    <OrbitControls />
  </TresCanvas>
</template>
```
