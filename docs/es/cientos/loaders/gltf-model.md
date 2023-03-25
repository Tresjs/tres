# Utilizar `GLTFModel`

El componente `GLTFModel` es un wrapper sobre [`useGLTF`](./use-gltf.md) composable y acepta las mismas opciones de props.

```vue{2,10}
<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'
</script>
<template>
  <Suspense>
    <TresCanvas clear-color="#82DBC5" shadows alpha>
      <TresPerspectiveCamera :position="[11, 11, 11]" />
      <OrbitControls />
      <TresScene>
        <GLTFModel path="/models/AkuAku.gltf" draco />
        <TresDirectionalLight :position="[-4, 8, 4]" :intensity="1.5" cast-shadow />
      </TresScene>
    </TresCanvas>
  </Suspense>
</template>
```

## Modelo de referencia

Puedes acceder a l modelo de referencia por pasar un `ref` al `model` prop y pues usar el metodo `getModel()` para conseguir el objeto.

```vue{3,6}
<script setup lang="ts">
import { OrbitControls, GLTFModel } from '@tresjs/cientos'

const modelRef = shallowRef<THREE.Object3D>()

watch(modelRef, ({getModel}) => {
  const model = getModel()

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
})
</script>
```

## Props

| Prop          | Descripción                                                                                                           | Defecto     |
| :------------ | :-------------------------------------------------------------------------------------------------------------------- | ----------- |
| `path`        | Camino de archivo del modelo.                                                                                              | `undefined` |
| `draco`       | Habilitar [Draco compression](https://threejs.org/docs/index.html?q=drac#examples/en/loaders/DRACOLoader) del modelo. | `false`     |
| `decoderPath` | Camino a decodificador local de Draco decoder.                                                                                        | `undefined` |
