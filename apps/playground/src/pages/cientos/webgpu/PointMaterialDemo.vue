<script setup lang="ts">
import { TresCanvas } from '@tresjs/core/webgpu'
import { OrbitControls, PointMaterial } from '@tresjs/cientos/webgpu'
// WebGLRenderer cannot run node materials, so `renderer: webgl` shows the GLSL PointMaterial.
import { PointMaterial as GlslPointMaterial } from '@tresjs/cientos'
import { TresLeches, useControls } from '@tresjs/leches'
import { InstancedBufferAttribute, MathUtils, NoToneMapping } from 'three'
import { instancedBufferAttribute } from 'three/tsl'
import { useBackendControl } from '@/composables/useBackendControl'
import { useRendererSwitch } from '@/composables/useRendererSwitch'

const uuid = 'webgpu-point-material'
const onReady = useBackendControl(uuid)
const rendererFactory = useRendererSwitch(uuid)

const count = 1000
const positions = new Float32Array(Array.from({ length: count * 3 }, () => MathUtils.randFloatSpread(8)))
const positionNode = instancedBufferAttribute(new InstancedBufferAttribute(positions, 3))

const { color, size, sizeAttenuation, transparent, onPoints } = useControls({
  color: { type: 'color', value: '#ffa500' },
  size: { value: 10, min: 0.1, max: 30, step: 0.1 },
  sizeAttenuation: false,
  transparent: true,
  onPoints: false,
}, { uuid })

const checks = [
  'A cube of round orange dots with soft edges, not squares',
  '`size` makes the dots bigger and smaller. The edge stays about 1 pixel soft at every size',
  '`sizeAttenuation` on: near dots are bigger than far ones. Off: every dot is `size` pixels wide. Try a size of 1 to 3 when it is on',
  '`transparent` off: solid orange squares with no see-through corners. On again: round dots',
  '`onPoints` on: the material sits on `TresPoints`, the dots are 1 pixel wide and the console shows one <PointMaterial> warning',
  'The result matches `renderer: webgl` (the GLSL PointMaterial on `TresPoints`): same dot sizes for the same `size`. The GLSL dots look more yellow, because that version converts the color to sRGB twice',
  'No errors and no <PointMaterial> WebGPU support warning in the console',
]
</script>

<template>
  <TresLeches :uuid="uuid">
    <ul class="list-disc pl-4 text-xs">
      <li v-for="check in checks" :key="check">{{ check }}</li>
    </ul>
  </TresLeches>
  <TresCanvas :renderer="rendererFactory" clear-color="#222222" :tone-mapping="NoToneMapping" @ready="onReady">
    <TresPerspectiveCamera :position="[10, 10, 10]" />
    <OrbitControls />
    <TresPoints v-if="rendererFactory">
      <TresBufferGeometry :position="[positions, 3]" />
      <GlslPointMaterial
        :color="color"
        :size="size"
        :size-attenuation="sizeAttenuation"
        :transparent="transparent"
      />
    </TresPoints>
    <TresPoints v-else-if="onPoints">
      <TresBufferGeometry :position="[positions, 3]" />
      <PointMaterial :color="color" :size="size" :size-attenuation="sizeAttenuation" :transparent="transparent" />
    </TresPoints>
    <!-- WebGPU draws `Points` at 1 pixel, so each point is one instance of the sprite quad. -->
    <TresSprite v-else :count="count" :frustum-culled="false">
      <PointMaterial
        :color="color"
        :size="size"
        :size-attenuation="sizeAttenuation"
        :transparent="transparent"
        :position-node="positionNode"
      />
    </TresSprite>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
