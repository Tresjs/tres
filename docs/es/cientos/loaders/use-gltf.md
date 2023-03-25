# useGLTF

Un composable que te permita cargar fácilmente los modelos glTF a tu escena **TresJS**.

## Utilización

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('/models/AkuAku.gltf')
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
Una ventaja de usar `useGLTF`es que puedes pasar un `draco` prop para habilitar [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) por el modelo. Eso reducirá el tamaño del modelo y mejorar rendimiento.

```ts
import { useGLTF } from '@tresjs/cientos'

const { scene } = await useGLTF('/models/AkuAku.gltf', { draco: true })
```

## Opciones

| Nombre            | Tipo      | Defacto     | Descripción                          |
| :-------------- | --------- | ----------- | ------------------------------------ |
| **draco**       | `boolean` | `false`     | determinar si habilitar compresión Draco. |
| **decoderPath** | `string`  | `undefined` | Camino local al Draco decodificador.     |
