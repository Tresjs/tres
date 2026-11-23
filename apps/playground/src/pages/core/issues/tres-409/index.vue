<script setup lang="ts">
import { extend, TresCanvas } from '@tresjs/core'
import type { TresRendererSetupContext } from '@tresjs/core'
import { color, normalView, uniform, uv, vec3 } from 'three/tsl'
import { MeshBasicNodeMaterial, WebGPURenderer } from 'three/webgpu'
import type { Node } from 'three/webgpu'

extend({ MeshBasicNodeMaterial })

const createWebGPURenderer = (ctx: TresRendererSetupContext) =>
  new WebGPURenderer({ canvas: toValue(ctx.canvas), antialias: true })

// The two uniforms share a graph shape but still recompile: three keys each node by its id.
const nodes: { label: string, node: Node }[] = [
  { label: 'constant red', node: color('#ff2244') },
  { label: 'uv gradient', node: vec3(uv(), 0) },
  { label: 'normals', node: normalView.mul(0.5).add(0.5) },
  { label: 'uniform A (blue)', node: uniform(color('#2255ff')) },
  { label: 'uniform B (green)', node: uniform(color('#22dd55')) },
]

const index = ref(0)
const current = computed(() => nodes[index.value])

const next = () => {
  index.value = (index.value + 1) % nodes.length
}
</script>

<template>
  <div class="absolute top-4 left-4 z-10 flex flex-col gap-2 p-3 bg-white/90 rounded text-sm">
    <button class="px-3 py-1 bg-black text-white rounded" data-test="swap" @click="next">
      Swap colorNode
    </button>
    <span data-test="label">{{ index }}: {{ current.label }}</span>
  </div>

  <TresCanvas :renderer="createWebGPURenderer" clear-color="#111111">
    <TresPerspectiveCamera :position="[0, 0, 4]" :look-at="[0, 0, 0]" />
    <TresMesh>
      <TresSphereGeometry :args="[1.2, 64, 32]" />
      <TresMeshBasicNodeMaterial :color-node="current.node" />
    </TresMesh>
  </TresCanvas>
</template>
