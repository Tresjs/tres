# useFBX

Un composable que te permita cargar fácilmente los modelos glTF a tu escena **TresJS**.

## Utilización

```ts
import { useFBX } from '@tresjs/cientos'

const model = await useFBX('/models/AkuAku.fbx')
```

Entonces, es tan directo como añadir la escena a tu escena:

```html{4}
<Suspense>
  <TresCanvas shadows alpha>
    <TresScene>
      <TresMesh v-bind="scene" />
    </TresScene>
  </TresCanvas>
</Suspense>
```
