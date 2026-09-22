<script setup lang="ts">
import type { Mesh, Texture } from 'three'
import vertex from './shaders/vertex.glsl'
import fragment from './shaders/fragment.glsl'
import { useLoop } from '@tresjs/core'
import { useTextures } from '@tresjs/cientos'
import { Color, DoubleSide, NoColorSpace, RepeatWrapping, SRGBColorSpace, Vector2, Vector3 } from 'three'
import { getHeightSampler } from './heightmap'
import type { VegetationChunk } from './planting'
import { buildClutterChunks, buildGrassChunks } from './planting'
import {
  AMBIENT_COLOR,
  AMBIENT_INTENSITY,
  CLUTTER_DENSITY,
  CLUTTER_FADE,
  GRASS_DENSITY,
  GRASS_FADE,
  MIN_CLUTTER_NORMAL_Y,
  MIN_GRASS_NORMAL_Y,
  SUN_COLOR,
  SUN_DIR,
  SUN_INTENSITY,
  UNDER_GROUND_FADE,
  UNDERGROUND_MARGIN,
  VEGETATION_LAYER,
} from './constants'

const { textures } = useTextures([
  '/textures/botany/grass-atlas.png',
  '/textures/botany/noise-fbm.png',
])

// the analytic stand-in for the environment the terrain is lit by: same direction, same
// hues, so one frame no longer holds two skies
const lightDir = new Vector3(SUN_DIR.x, SUN_DIR.y, SUN_DIR.z).normalize()
const sunColor = new Color(SUN_COLOR).multiplyScalar(SUN_INTENSITY)
const ambientColor = new Color(AMBIENT_COLOR).multiplyScalar(AMBIENT_INTENSITY)

// a type alias, not an interface: TresShaderMaterial's `uniforms` prop wants an
// index-signature record, and only aliases get an implicit one
type WindUniforms = {
  uTime: { value: number }
  uWindStrength: { value: number }
  uWindSpeed: { value: number }
  uWindDir: { value: Vector2 }
  uAtlas: { value: Texture | null }
  uNoiseTex: { value: Texture | null }
  uLightDir: { value: Vector3 }
  uSunColor: { value: Color }
  uAmbientColor: { value: Color }
  uFadeStart: { value: number }
  uFadeEnd: { value: number }
  uUnderground: { value: number }
  uUnderFade: { value: number }
  uAlphaCut: { value: number }
}

const makeUniforms = (fade: { start: number, end: number }): WindUniforms => ({
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
  uUnderground: { value: 0 },
  uUnderFade: { value: UNDER_GROUND_FADE },
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
  // the atlas is authored art, so it needs decoding to linear before lighting;
  // the noise is data and must stay raw
  atlasTex.colorSpace = SRGBColorSpace
  atlasTex.needsUpdate = true
  noiseTex.colorSpace = NoColorSpace
  noiseTex.wrapS = RepeatWrapping
  noiseTex.wrapT = RepeatWrapping
  noiseTex.needsUpdate = true
  for (const shader of [grassShader, clutterShader]) {
    shader.uniforms.uAtlas.value = atlasTex
    shader.uniforms.uNoiseTex.value = noiseTex
  }
})

// plant on the same surface the terrain mesh and the collider are built from
const sampler = await getHeightSampler()

const grassChunks = buildGrassChunks(sampler, GRASS_DENSITY, MIN_GRASS_NORMAL_Y)
const clutterChunks = buildClutterChunks(sampler, CLUTTER_DENSITY, MIN_CLUTTER_NORMAL_Y)

const grassMeshes: (Mesh | null)[] = []
const clutterMeshes: (Mesh | null)[] = []

const setMeshRef = (meshes: (Mesh | null)[], el: unknown, i: number) => {
  const mesh = el as Mesh | null
  mesh?.layers.set(VEGETATION_LAYER)
  meshes[i] = mesh
}
const setGrassMeshRef = (el: unknown, i: number) => setMeshRef(grassMeshes, el, i)
const setClutterMeshRef = (el: unknown, i: number) => setMeshRef(clutterMeshes, el, i)

// skip chunks entirely past the dissolve distance; frustum culling handles the rest
const cullChunks = (
  meshes: (Mesh | null)[],
  chunks: VegetationChunk[],
  fadeEnd: number,
  cameraPosition: Vector3,
) => {
  for (let i = 0; i < chunks.length; i++) {
    const mesh = meshes[i]
    const chunk = chunks[i]
    if (!mesh || !chunk) { continue }
    mesh.visible = cameraPosition.distanceTo(chunk.center) < fadeEnd + chunk.radius
  }
}

const { onBeforeRender } = useLoop()
onBeforeRender(({ elapsed, camera }) => {
  grassShader.uniforms.uTime.value = elapsed
  clutterShader.uniforms.uTime.value = elapsed
  if (!camera.value) { return }
  // the plants opted out of layer 0 to stay out of the shadow pass, so the view camera has
  // to opt back in
  camera.value.layers.enable(VEGETATION_LAYER)

  // the terrain is front-side only, so once the camera dips under it the ground vanishes
  // and the vegetation would be left hanging in the air — hand the shader how deep we are
  // heightAt clamps out-of-range x/z, so this is safe past the terrain edge
  const cam = camera.value.position
  const sink = (sampler.heightAt(cam.x, cam.z) + UNDERGROUND_MARGIN - cam.y) / UNDERGROUND_MARGIN
  const underground = Math.min(Math.max(sink, 0), 1)
  grassShader.uniforms.uUnderground.value = underground
  clutterShader.uniforms.uUnderground.value = underground

  cullChunks(grassMeshes, grassChunks, GRASS_FADE.end, camera.value.position)
  cullChunks(clutterMeshes, clutterChunks, CLUTTER_FADE.end, camera.value.position)
})
</script>

<template>
  <TresMesh
    v-for="(chunk, i) in grassChunks"
    :key="`grass-${i}`"
    :ref="el => setGrassMeshRef(el, i)"
    :geometry="chunk.geometry"
  >
    <TresShaderMaterial v-bind="grassShader" />
  </TresMesh>

  <TresMesh
    v-for="(chunk, i) in clutterChunks"
    :key="`clutter-${i}`"
    :ref="el => setClutterMeshRef(el, i)"
    :geometry="chunk.geometry"
  >
    <TresShaderMaterial v-bind="clutterShader" />
  </TresMesh>
</template>
