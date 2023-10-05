# MeshGlassMaterial <Badge type="warning" text="^3.2.0" />

<DocsDemo>
  <GlassMaterialDemo />
</DocsDemo> 

The `cientos` package provides a new`<MeshGlassMaterial />` component that makes a geometry look like glass. This is achieved by re-defining the `MeshPhysicalMaterial` so all the default props can be passed normally.

## Usage

### You can use it like you normally do with TresJs

<<< @/.vitepress/theme/components/GlassMaterialDemo.vue{3,9-12}

### You can also replace the material of an existing mesh like this:

```vue{4,6-15,20}
<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { MeshGlassMaterial, Box } from '@tresjs/cientos'

const glassMaterialRef = shallowRef()
const boxRef = shallowRef()

watch(glassMaterialRef, value => {
  // For good practice we dispose the old material
  boxRef.value.value.material.dispose()

  // We assign the new MeshGlassMaterialClass
  boxRef.value.value.material = value.MeshGlassMaterialClass
})
</script>
<template>
  <TresMesh>
    <TresTorusGeometry />
    <MeshGlassMaterial ref="glassMaterialRef" />
  </TresMesh>
  <!-- Mesh to be replaced -->
  <TresMesh ref="boxRef">
    <TresBoxGeometry />
    <MeshBasicMaterial  />
  </TresMesh>
</template>
```
## Tips

For more fine tuning effects you can provide an environment map texture as an envMap and play with the intensity to achieve a more realistic effect

Also, another good option is to provide a normal texture as clearcoatNormalMap to add different results

You can find more information in the official [ThreeJs docs](https://threejs.org/docs/index.html?q=phys#api/en/materials/MeshPhysicalMaterial).
You can play with this [example](https://playground.tresjs.org/experiments/glass-material) and be inspired.
Also worth checking is this [blog](https://tympanus.net/codrops/2021/10/27/creating-the-effect-of-transparent-glass-and-plastic-in-three-js/) 
