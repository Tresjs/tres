# OrbitControls

<SandboxDemo url="https://play.tresjs.org/#eNqVVU1z2zYQ/Ss78nR0KEVSlp1JWaejWk7TdmInY+kW5gCRMAkbBDAAKFnj0X/PAhAlyvlydBJ23z7svl0snwYLTc3fSsWrlg6ywYUpNFMWDLWtAk5E9SYfWJMP/soFa5TUFp7gkhhWzGtSyvU1URHMb99dziSXeq5IQSO4kQspKLoUExVs4U7LBoa21pQO/+zxuKtnRKyI2YOmFm33JimkPsZ+0EtmZ1JYLbmJYEEf7eTq6zBGhZXGRSZJiIFiFwTLDWAUFSVmlYtcoMNYqDi8gadcABScEu3ryGB48vr06nJ2Poycx/haTQZWt9RbCFc1yeCOcBMMAYI1LzaKZs8lcgjZWtViCZ1O2XPdHMgehMuOdUT3Fsu6SEKHsB94sLRRnFiKJ4CLnp6r0ZKJEntXcd87wJ/3f6TaKFpYtqIz0lBNIFPSMMukQPSnswgmEfzxOR9A0oUdSX8wz1skEibcHfh9U7ojHDOnEYwjSJH5ALAYgL4ZZ8UD3AzhSpOq77/DS9FfW6tMliSarOOK2bpdtoZq11fsdlzIJnGVYfuJwbk1SUOYSFysSf5hmsxkSW9p1XKi43sjBdbWXbHPfafONTX1jdQN4deoqmaE7+tFRBIK7ARIningGa6YdupKQfh7VtX2KxFOIzhz8mbMpY+uDTrG8SmaCmLsKAzSQWZH+k6z8l/KFdU7O6ay7zUaLpLeIODR2A13f2vbcJybpSw3YcQboismMkhxkgAUKd1b6I41dQlnME7T37xhzUpb78/bXJzgKAain2ABlqR4qLRsRTkqwpM6SVN3D9LgDPsEB9EgvO9RQ5RvDW4gT5/vHLh4snChs/WXg3McJqMoBcaXlLOVjgW1iVBN0odPJ/F5nCYlMzZxZkTnA//ijojD+vgV7hCB9K/69Dvz8S12TcmDIuIlue+x07M4jcc75s4YN8zF9Lndcn0Jr8NNkfH8Neb7OzVNXwb8BuDLerG+Pfh0nHqBcenQx7g5VneHw8nWtPwF4hDwI2oEjkrasBeQdlBX/Fn8KuFs2ad0jDiaW5xJa3C13LHq2UTinlGMU/1Budd8PJmEc7n+39v2nwgfU9Pi4Rv2e/MYUv6Iw0L1CuU+tBLfKLXB/XZ+gyun52xk2fJdc77jvKVG8tblGGCX+AYx7R7OZ/uff2D4/Bfmrfsqmq6oo0Qtfs289VO3BfezFgyfvXAe79sx+4FKh8om8WQv+PYLbBTQQA==" />

[OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) ist ein Kamerasteuerungselement, das es dir ermöglicht, die Kamera frei um ein Ziel herum zu bewegen. Es ist eine großartige Möglichkeit, deine Szene zu erkunden.

Allerdings ist es kein Teil des Kerns von Three.js. Daher müsstest du es aus dem Modul `three/addons/controls/OrbitControls` importieren.

Das schafft ein Problem, weil **TresJS** automatisch einen Katalog aus dem Kern von Three erstellt, damit du sie als Komponenten nutzen kannst.

Glücklicherweise bietet **TresJS** eine Möglichkeit, den Komponentenkatalog zu erweitern. Dies kannst du tun, indem du die `extend`-Methode der Hauptbibliothek verwendest.

Für weitere Informationen darüber, wie du deinen TresJS-Katalog erweitern kannst, siehe den Abschnitt [Erweitern](/de/advanced/extending.md).

## Verwendung von OrbitControls

Um `OrbitControls` zu verwenden, musst du es aus dem Modul `three/addons/controls/OrbitControls` importieren.

```js
import { OrbitControls } from 'three/addons/controls/OrbitControls'
```

Danach musst du den Komponentenkatalog mit der `extend`-Methode erweitern.

```js
import { extend } from '@tresjs/core'
import { OrbitControls } from 'three/addons/controls/OrbitControls'

extend({ OrbitControls })
```

Jetzt kannst du die Komponente `TresOrbitControls` in deiner Szene verwenden.

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

Da [OrbitControls](https://threejs.org/docs/index.html?q=orbit#examples/en/controls/OrbitControls) eine Referenz zur Kamera und zum Renderer benötigt, musst du sie als Argumente übergeben.

Du kannst das Composable [useTres](/api/composables#usetres) verwenden, um die Kamera und den Renderer zu erhalten.

```ts
import { useTres } from '@tresjs/core'

const { state } = useTres()
```

Dann würde der finale Code etwa so aussehen:

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

## OrbitControls von `cientos`

Hier wird es interessant. ✨
Das Paket `cientos` bietet eine Komponente namens `<OrbitControls />`, die ein Wrapper für die `OrbitControls` aus dem Modul [`three-stdlib`](https://github.com/pmndrs/three-stdlib) ist.

Das Beste daran? Du musst den Katalog nicht erweitern oder irgendwelche Argumente übergeben.
Es funktioniert einfach. 💯

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
