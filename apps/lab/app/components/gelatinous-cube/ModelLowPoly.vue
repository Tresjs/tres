<script setup lang="ts">
import { MeshTransmissionMaterial, useGLTF } from '@tresjs/cientos'
import { Color } from 'three'
import { computed, watch } from 'vue'

const emit = defineEmits<{ ready: [] }>()

// Reactive handle (no await) — the established lab pattern for per-node access.
const { nodes } = useGLTF(
  '/models/gelatinous-cube/gelatinous-cube-kaykit.glb',
  { draco: true },
)

const outside = computed(() => nodes.value.gelatinous_cube_surface_outside)

// GLTF may already be cached from a previous visit, emit sync in that case
if (outside.value?.geometry) {
  emit('ready')
}
else {
  watch(() => outside.value?.geometry, (geometry) => {
    if (geometry) { emit('ready') }
  }, { once: true })
}
const internal = computed(() => nodes.value.gelatinous_cube_surface_internal)
const bubbles = computed(() => nodes.value.gelatinous_cube_surface_bubbles)
const smoke = computed(() => nodes.value.vfx_smoke)

// GLTFLoader strips dots from node names: coin.001 -> coin001
const PROP_NAMES = [
  'Rig_Medium',
  'coin',
  'coin001',
  'coin002',
  'keyring',
  'Skeleton_Arrow',
  'Skeleton_Arrow001',
  'Skeleton_Arrow002',
  'Skeleton_Arrow003',
  'Skeleton_Arrow_Broken',
  'Skeleton_Blade',
  'Skeleton_Shield_Small_B',
]
const stageProps = computed(() =>
  PROP_NAMES.map(name => nodes.value[name]).filter(Boolean),
)

const config = useControls({
  transmission: { value: 1, min: 0, max: 1, step: 0.01 },
  roughness: { value: 0, min: 0, max: 1, step: 0.01 },
  thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
  ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
  chromaticAberration: { value: 0.06, min: 0, max: 1, step: 0.01 },
  anisotropicBlur: { value: 0.1, min: 0, max: 1, step: 0.01 },
  distortion: { value: 0.01, min: 0, max: 1, step: 0.01 },
  distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
  temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
  clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
  attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
  samples: { value: 10, min: 1, max: 32, step: 1 },
  resolution: { value: 2048, min: 256, max: 2048, step: 256 },
  backside: false,
  smoke: true,
  color: '#c9ffa1',
  bg: '#839681',
}, {
  uuid: 'gelatinous-cube-experiment',
})

const backgroundColor = computed(() => new Color(config.bg.value))
</script>

<template>
  <TresGroup v-if="outside?.geometry" :rotation-y="Math.PI / 12">
    <TresMesh :geometry="outside.geometry" :position="outside.position" :scale="outside.scale">
      <MeshTransmissionMaterial :transmission="config.transmission.value" :roughness="config.roughness.value"
        :thickness="config.thickness.value" :ior="config.ior.value"
        :chromatic-aberration="config.chromaticAberration.value" :anisotropic-blur="config.anisotropicBlur.value"
        :distortion="config.distortion.value" :distortion-scale="config.distortionScale.value"
        :temporal-distortion="config.temporalDistortion.value" :clearcoat="config.clearcoat.value"
        :attenuation-distance="config.attenuationDistance.value" :samples="config.samples.value"
        :resolution="config.resolution.value" :backside="config.backside.value" :color="config.color.value"
        :background="backgroundColor" />
    </TresMesh>

    <primitive v-if="internal" :object="internal" :render-order="-100" cast-shadow />
    <primitive v-if="bubbles" :object="bubbles" />
    <primitive v-if="smoke" :object="smoke" :visible="config.smoke.value" />

    <primitive v-for="node in stageProps" :key="node.uuid" :object="node" />
  </TresGroup>
</template>
