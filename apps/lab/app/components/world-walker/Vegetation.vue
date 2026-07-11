<script setup>
import vertex from './vertex.glsl'
import fragment from './fragment.glsl'
import { useLoop } from '@tresjs/core'
import { useTextures } from '@tresjs/cientos'
import { Color, DoubleSide, RepeatWrapping, Vector2, Vector3 } from 'three'
import { createHeightSampler, loadHeightImage } from './heightmap'
import { buildClutterChunks, buildGrassChunks } from './planting'
import {
  CLUTTER_DENSITY,
  CLUTTER_FADE,
  GRASS_DENSITY,
  GRASS_FADE,
  MIN_CLUTTER_NORMAL_Y,
  MIN_GRASS_NORMAL_Y,
} from './constants'

const { textures } = useTextures([
  '/textures/botany/grass-atlas.png',
  '/textures/botany/noise-fbm.png',
])

// same directional/ambient lights as the scene in index.global.vue
const lightDir = new Vector3(0, 20, 40).normalize()
const sunColor = new Color(0xFFFFFF).multiplyScalar(1.05)
const ambientColor = new Color(0xFFFFFF).multiplyScalar(0.45)

const makeUniforms = fade => ({
  uTime: { value: 0 },
  uWindStrength: { value: 0.12 },
  uWindSpeed: { value: 1.5 },
  uWindDir: { value: new Vector2(1, 0.3).normalize() },
  uAtlas: { value: null },
  uNoiseTex: { value: null },
  uLightDir: { value: lightDir },
  uSunColor: { value: sunColor },
  uAmbientColor: { value: ambientColor },
  uFadeStart: { value: fade.start },
  uFadeEnd: { value: fade.end },
  uAlphaCut: { value: 0.35 },
})

const grassShader = {
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: makeUniforms(GRASS_FADE),
  side: DoubleSide,
  transparent: false,
  depthWrite: true,
}

const clutterShader = {
  vertexShader: vertex,
  fragmentShader: fragment,
  uniforms: makeUniforms(CLUTTER_FADE),
  side: DoubleSide,
  transparent: false,
  depthWrite: true,
}

watchEffect(() => {
  const [atlasTex, noiseTex] = textures.value
  if (!atlasTex || !noiseTex) { return }
  noiseTex.wrapS = RepeatWrapping
  noiseTex.wrapT = RepeatWrapping
  noiseTex.needsUpdate = true
  for (const shader of [grassShader, clutterShader]) {
    shader.uniforms.uAtlas.value = atlasTex
    shader.uniforms.uNoiseTex.value = noiseTex
  }
})

// plant on the same displaced surface as the terrain mesh
const img = await loadHeightImage()
const sampler = createHeightSampler(img)

const grassChunks = buildGrassChunks(sampler, GRASS_DENSITY, MIN_GRASS_NORMAL_Y)
const clutterChunks = buildClutterChunks(sampler, CLUTTER_DENSITY, MIN_CLUTTER_NORMAL_Y)

const grassMeshes = []
const clutterMeshes = []

// skip chunks entirely past the dissolve distance; frustum culling handles the rest
const cullChunks = (meshes, chunks, fadeEnd, cameraPosition) => {
  for (let i = 0; i < chunks.length; i++) {
    const mesh = meshes[i]
    if (!mesh) { continue }
    mesh.visible = cameraPosition.distanceTo(chunks[i].center) < fadeEnd + chunks[i].radius
  }
}

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed, camera }) => {
  grassShader.uniforms.uTime.value = elapsed
  clutterShader.uniforms.uTime.value = elapsed
  if (!camera.value) { return }
  cullChunks(grassMeshes, grassChunks, GRASS_FADE.end, camera.value.position)
  cullChunks(clutterMeshes, clutterChunks, CLUTTER_FADE.end, camera.value.position)
})
</script>

<template>
  <TresMesh
    v-for="(chunk, i) in grassChunks"
    :key="`grass-${i}`"
    :ref="el => (grassMeshes[i] = el)"
    :geometry="chunk.geometry"
  >
    <TresShaderMaterial v-bind="grassShader" />
  </TresMesh>

  <TresMesh
    v-for="(chunk, i) in clutterChunks"
    :key="`clutter-${i}`"
    :ref="el => (clutterMeshes[i] = el)"
    :geometry="chunk.geometry"
  >
    <TresShaderMaterial v-bind="clutterShader" />
  </TresMesh>
</template>
