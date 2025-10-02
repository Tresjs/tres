# useTextures

<DocsDemo>
  <PBRTexturesDemo />
</DocsDemo>

A composable that allows you to load multiple textures at once using the [THREE.js texture loader](https://threejs.org/docs/#api/en/loaders/TextureLoader) into your **TresJS** scene.

## Usage

```vue [TexturedObjects.vue]
<script setup lang="ts">
import { useTextures } from '@tresjs/cientos'

// Define an array of texture paths
const texturePaths = [
  '/textures/color.jpg',
  '/textures/normal.jpg',
  '/textures/roughness.jpg'
]

// Load all textures at once
const { textures, isLoading, error } = useTextures(texturePaths)
</script>

<template>
  <TresMesh>
    <TresSphereGeometry />
    <TresMeshStandardMaterial
      :map="textures[0]"
      :normal-map="textures[1]"
      :roughness-map="textures[2]"
    />
  </TresMesh>
</template>
```

## PBR Textures Example

Here's a more advanced example showing how to load and apply PBR (Physically Based Rendering) textures to a material:

```vue [PBRTextures.vue]
<script setup lang="ts">
import { TresCanvas, vLightHelper } from '@tresjs/core'
import { Environment, OrbitControls, useGLTF, useTextures } from '@tresjs/cientos'
import { MeshStandardMaterial } from 'three'

// Load the 3D model
const { state: model } = useGLTF('/blender-cube-draco.glb', { draco: true })
const cube = computed(() => model.value?.nodes?.BlenderCube)
const material = computed(() => model.value?.materials?.Material)

// Define texture paths
const texturePaths = [
  '/textures/Metal053C_4K-JPG/Metal053C_4K-JPG_Color.jpg',
  '/textures/Metal053C_4K-JPG/Metal053C_4K-JPG_NormalGL.jpg',
  '/textures/Metal053C_4K-JPG/Metal053C_4K-JPG_Roughness.jpg',
  '/textures/Metal053C_4K-JPG/Metal053C_4K-JPG_Metalness.jpg',
  '/textures/Metal053C_4K-JPG/Metal053C_4K-JPG_Displacement.jpg'
]

// Load all PBR textures at once
const { textures, isLoading, error } = useTextures(texturePaths)

// Apply textures to material when loaded
watch([material, textures], ([modelMaterial, textures]) => {
  if (modelMaterial && textures && textures.length === texturePaths.length) {
    // Cast to MeshStandardMaterial to access PBR properties
    const pbrMaterial = modelMaterial as MeshStandardMaterial

    // Apply textures
    pbrMaterial.map = textures[0]
    pbrMaterial.normalMap = textures[1]
    pbrMaterial.roughnessMap = textures[2]
    pbrMaterial.metalnessMap = textures[3]
    pbrMaterial.displacementMap = textures[4]

    // Set material properties
    pbrMaterial.displacementScale = 0
    pbrMaterial.metalness = 0.8
    pbrMaterial.roughness = 0.2
  }
})

// Handle loading state and errors
watch(isLoading, (_loading) => {
  // Handle loading state
})

watch(error, (errs) => {
  if (errs) {
    console.error('Error loading textures:', errs)
  }
})
</script>

<template>
  <TresCanvas clear-color="#4f4f4f">
    <Suspense>
      <Environment preset="studio" background :blur="1" />
    </Suspense>
    <TresPerspectiveCamera :position="[8, 8, 8]" />
    <OrbitControls />
    <TresGridHelper />
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight v-light-helper :position="[5, 5, 5]" :intensity="0.5" color="#ff0000" />
    <TresDirectionalLight v-light-helper :position="[-5, 2, 2]" :intensity="0.5" color="#0000ff" />
    <TresGroup position-y="2">
      <primitive v-if="cube" :object="cube" />
    </TresGroup>
  </TresCanvas>
</template>
```

## API

### Parameters

| Name            | Type      | Default     | Description                          |
| :-------------- | --------- | ----------- | ------------------------------------ |
| **paths**       | `string[]` | `undefined` | Array of paths to the textures. |

### Returns

| Name            | Type      | Description                          |
| :-------------- | --------- | ------------------------------------ |
| **textures**    | `Texture[]` | Array of loaded textures. |
| **isLoading**   | `boolean` | Whether any textures are still loading. |
| **error**       | `Error[] \| null` | Array of errors if any occurred during loading. |

## Benefits

- **Simplified API**: Load multiple textures with a single function call
- **Consolidated loading state**: Track loading state for all textures at once
- **Unified error handling**: Collect and report errors from all texture loads
- **Type safety**: Proper TypeScript typing throughout the implementation
