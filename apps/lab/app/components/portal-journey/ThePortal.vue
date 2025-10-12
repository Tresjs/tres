<script setup lang="ts">
import type { Mesh } from 'three'
import { DoubleSide, MeshBasicMaterial, ShaderMaterial, Color } from 'three'
import PortalVertex from './shaders/portal/vertex.glsl'
import PortalFragment from './shaders/portal/fragment.glsl'

const experiment = {
  portalColorStart: '#82DBC5',
  portalColorEnd: '#EBFFEE',
}


const { state: portal } = useGLTF(
  'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/portal/portal.glb',
  {
    draco: true,
  },
)

const { state: bakedTexture } = useTexture('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/portal/baked.jpg')

watch(bakedTexture, (value) => {
  if (value) {
    value.flipY = false
  }
})

// Baked material
const bakedMaterial = computed(() => new MeshBasicMaterial({
  map: bakedTexture.value,
  side: DoubleSide,
}))

const portalLightMaterial = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorStart: { value: new Color(experiment.portalColorStart) },
    uColorEnd: { value: new Color(experiment.portalColorEnd) },
  },
  vertexShader: PortalVertex,
  fragmentShader: PortalFragment,
  side: DoubleSide,
})

watch(portal, (value) => {
  if (value) {
    const bakedMesh = value?.scene?.children?.find(child => child.name === 'baked')
      ; (bakedMesh as Mesh).material = bakedMaterial.value
    const portalCircle = value?.scene?.children?.find(child => child.name === 'portalCircle')
      ; (portalCircle as Mesh).material = portalLightMaterial
  }
})

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  portalLightMaterial.uniforms.uTime.value += delta
})
</script>

<template>
  <primitive v-if="portal" :object="portal.scene" />
</template>
