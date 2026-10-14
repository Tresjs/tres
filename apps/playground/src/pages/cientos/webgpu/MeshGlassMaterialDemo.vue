<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { MeshGlassMaterial, OrbitControls, Sphere } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL MeshGlassMaterial.
import { MeshGlassMaterial as GlslMeshGlassMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping } from 'three'
import { computed } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-mesh-glass-material'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const GlassMaterial = rendererFactory ? GlslMeshGlassMaterial : MeshGlassMaterial

// The glass has no uniforms of its own. These are the MeshPhysicalMaterial props that shape it.
// Start values match the material defaults, so the first frame shows the default glass.
const {
  transmission,
  thickness,
  roughness,
  ior,
  clearcoat,
  clearcoatRoughness,
  color,
  attenuationColor,
  attenuationDistance,
} = useControls({
  transmission: { value: 1, min: 0, max: 1, step: 0.01 },
  thickness: { value: 0.5, min: 0, max: 5, step: 0.05 },
  roughness: { value: 0, min: 0, max: 1, step: 0.01 },
  ior: { value: 1.5, min: 1, max: 2.333, step: 0.01 },
  clearcoat: { value: 0.5, min: 0, max: 1, step: 0.01 },
  clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 },
  color: { type: 'color', value: '#ffffff' },
  attenuationColor: { type: 'color', value: '#ffffff' },
  // 0 stands for no attenuation. The material wants Infinity, which a slider cannot reach.
  attenuationDistance: { value: 0, min: 0, max: 10, step: 0.1 },
}, { uuid })

const materialProps = computed(() => ({
  transmission: transmission.value,
  thickness: thickness.value,
  roughness: roughness.value,
  ior: ior.value,
  clearcoat: clearcoat.value,
  clearcoatRoughness: clearcoatRoughness.value,
  color: color.value,
  attenuationColor: attenuationColor.value,
  attenuationDistance: attenuationDistance.value || Number.POSITIVE_INFINITY,
}))

const checks = [
  'The torus knot and the sphere look like glass: the red plane and the grid show through them, bent',
  'They are not solid white or grey like a plain standard material',
  'The clearcoat adds a sharp highlight from the directional light',
  '`transmission` 0 makes the glass opaque. Back above 0, it is glass again (shader rebuild)',
  '`clearcoat` 0 removes the sharp highlight. Back above 0, it returns (shader rebuild)',
  '`roughness` blurs what shows through. `ior` and `thickness` change how much it bends',
  '`attenuationColor` with an `attenuationDistance` above 0 tints the glass, more where it is thick',
  'Every control gives the same result as `renderer: webgl` (the GLSL MeshGlassMaterial)',
  'No errors and no <MeshGlassMaterial> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#82DBC5" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[3, 3, 3]" />
    <OrbitControls />

    <TresMesh :position-x="2">
      <TresTorusKnotGeometry :args="[1, 0.4, 256, 20]" />
      <component :is="GlassMaterial" v-bind="materialProps" />
    </TresMesh>
    <Sphere :scale="0.5" :position-x="-1">
      <component :is="GlassMaterial" v-bind="materialProps" />
    </Sphere>

    <TresMesh :position="[0, 0, -2]">
      <TresPlaneGeometry :args="[6, 3]" />
      <TresMeshBasicMaterial :color="0xFF1111" />
    </TresMesh>
    <TresGridHelper :args="[10, 10]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="1" :position="[2, 2, 2]" />
  </TresCanvas>
</template>
