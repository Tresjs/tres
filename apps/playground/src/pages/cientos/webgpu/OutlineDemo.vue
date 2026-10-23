<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls, Outline } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL Outline.
import { Outline as GlslOutline } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import type { InstancedMesh, Mesh } from 'three'
import { Float32BufferAttribute, NoToneMapping, Object3D, SphereGeometry } from 'three'
import { onUnmounted, shallowRef, watch } from 'vue'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-outline'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)
const OutlineComponent = rendererFactory ? GlslOutline : Outline

const { color, screenspace, opacity, transparent, thickness, angle, polygonOffset, polygonOffsetFactor, renderOrder } = useControls({
  color: { type: 'color', value: '#fbb03b' },
  screenspace: false,
  opacity: { value: 1, min: 0, max: 1, step: 0.1 },
  transparent: false,
  thickness: { value: 5, min: 0, max: 20, step: 0.5 },
  angle: { value: Math.PI, min: 0, max: Math.PI, step: 0.1 },
  polygonOffset: false,
  polygonOffsetFactor: { value: 0, min: -10, max: 10, step: 1 },
  renderOrder: { value: 0, min: -1, max: 1, step: 1 },
}, { uuid })

// An absolute morph target (`morphTargetsRelative` is false), which stretches the sphere on Y.
const morphGeometry = new SphereGeometry(0.6, 32, 16)
const stretched = Float32Array.from(morphGeometry.attributes.position.array as Float32Array)
for (let i = 1; i < stretched.length; i += 3) { stretched[i] *= 1.8 }
morphGeometry.morphAttributes.position = [new Float32BufferAttribute(stretched, 3)]

// A frame loop of its own: this page is outside TresCanvas, so it cannot call useLoop.
const morphRef = shallowRef<Mesh>()
let frame = 0
const animate = (time: number) => {
  // In place: the outline mesh shares this array.
  if (morphRef.value?.morphTargetInfluences) {
    morphRef.value.morphTargetInfluences[0] = (Math.sin(time / 500) + 1) / 2
  }
  frame = requestAnimationFrame(animate)
}
frame = requestAnimationFrame(animate)
onUnmounted(() => cancelAnimationFrame(frame))

const COUNT = 5
const instancedRef = shallowRef<InstancedMesh>()
watch(instancedRef, (mesh) => {
  if (!mesh) { return }
  const dummy = new Object3D()
  for (let i = 0; i < COUNT; i++) {
    dummy.position.set((i - (COUNT - 1) / 2) * 1.2, -1.5, 0)
    dummy.scale.setScalar(0.3 + i * 0.1)
    dummy.updateMatrix()
    mesh.setMatrixAt(i, dummy.matrix)
  }
  mesh.instanceMatrix.needsUpdate = true
})

const checks = [
  'An orange outline around the box, the torus knot and each of the 5 instanced spheres',
  '`screenspace: false`: the outline is `thickness` pixels wide at any zoom. `screenspace: true`: it is `thickness` world units, so set a small value such as 0.05',
  'The instanced outlines follow the position and scale of each sphere',
  '`angle: 0` shows the box outline split at the corners. `Math.PI` closes it',
  '`opacity` with `transparent: true` fades the outline',
  'The stretching sphere on the right has an outline that follows its shape. With `screenspace: true`, the outline keeps its width when the sphere is fully stretched',
  'Resize the window: the pixel width stays the same',
  'The result matches `renderer: webgl` (the GLSL Outline): same widths and color',
  'No errors and no <Outline> WebGPU warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#4f4f4f" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[0, 1, 7]" />
    <OrbitControls />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :intensity="2" :position="[2, 2, 2]" />
    <TresMesh :position="[-1.5, 0.5, 0]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#82dbc5" />
      <component
        :is="OutlineComponent"
        :color="color"
        :screenspace="screenspace"
        :opacity="opacity"
        :transparent="transparent"
        :thickness="thickness"
        :angle="angle"
        :polygon-offset="polygonOffset"
        :polygon-offset-factor="polygonOffsetFactor"
        :render-order="renderOrder"
      />
    </TresMesh>
    <TresMesh :position="[1.5, 0.5, 0]">
      <TresTorusKnotGeometry :args="[0.6, 0.2, 128, 16]" />
      <TresMeshStandardMaterial color="#82dbc5" />
      <component
        :is="OutlineComponent"
        :color="color"
        :screenspace="screenspace"
        :opacity="opacity"
        :transparent="transparent"
        :thickness="thickness"
        :angle="angle"
        :polygon-offset="polygonOffset"
        :polygon-offset-factor="polygonOffsetFactor"
        :render-order="renderOrder"
      />
    </TresMesh>
    <TresMesh ref="morphRef" :args="[morphGeometry]" :position="[3.5, 0.5, 0]">
      <TresMeshStandardMaterial color="#82dbc5" />
      <component
        :is="OutlineComponent"
        :color="color"
        :screenspace="screenspace"
        :opacity="opacity"
        :transparent="transparent"
        :thickness="thickness"
        :angle="angle"
        :polygon-offset="polygonOffset"
        :polygon-offset-factor="polygonOffsetFactor"
        :render-order="renderOrder"
      />
    </TresMesh>
    <TresInstancedMesh ref="instancedRef" :args="[undefined, undefined, COUNT]">
      <TresSphereGeometry :args="[1, 32, 16]" />
      <TresMeshStandardMaterial color="#82dbc5" />
      <component
        :is="OutlineComponent"
        :color="color"
        :screenspace="screenspace"
        :opacity="opacity"
        :transparent="transparent"
        :thickness="thickness"
        :angle="angle"
        :polygon-offset="polygonOffset"
        :polygon-offset-factor="polygonOffsetFactor"
        :render-order="renderOrder"
      />
    </TresInstancedMesh>
  </TresCanvas>
</template>
