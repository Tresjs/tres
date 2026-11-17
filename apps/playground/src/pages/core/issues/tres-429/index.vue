<script setup lang="ts">
import { extend, TresCanvas } from '@tresjs/core'
import { ConeGeometry, Mesh, MeshNormalMaterial, Vector3 } from 'three'

class Pointer extends Mesh {
  target: Vector3 | null = null

  constructor(target?: Vector3) {
    super(new ConeGeometry(0.2, 0.8, 16).rotateX(Math.PI / 2), new MeshNormalMaterial())
    if (target) { this.target = target }
  }

  override onBeforeRender = () => {
    if (this.target) { this.lookAt(this.target) }
  }
}

extend({ Pointer, ArgsPointer: { object: Pointer, assign: ['target'] } })

const pointA = new Vector3(-2, 1.5, 0)
const pointB = new Vector3(2, -1.5, 0)
const current = shallowRef(pointA)

const left = shallowRef<Pointer>()
const right = shallowRef<Pointer>()
const readout = ref('')

const updateReadout = () => {
  const name = (v?: Vector3 | null) => v === pointA ? 'pointA' : v === pointB ? 'pointB' : 'other'
  readout.value = [
    `pointA = (${pointA.toArray().join(', ')})`,
    `left.target = ${name(left.value?.target)}`,
    `right.target = ${name(right.value?.target)}`,
  ].join('\n')
}

const toggle = async () => {
  current.value = current.value === pointA ? pointB : pointA
  await nextTick()
  updateReadout()
}

watch([left, right], updateReadout)
</script>

<template>
  <div class="absolute top-4 left-4 z-10 flex flex-col gap-2 p-3 bg-white/90 rounded text-sm max-w-xs">
    <p><b>Left</b>: <code>target</code> starts as <code>null</code>.</p>
    <p><b>Right</b>: <code>target</code> comes from <code>args</code>, with <code>assign: ['target']</code>.</p>
    <p>
      Switch the target. Both cones turn to the other sphere. <code>pointA</code> stays
      <code>(-2, 1.5, 0)</code>, and each <code>target</code> names the current point.
    </p>
    <button class="px-3 py-1 bg-black text-white rounded" data-test="toggle" @click="toggle">
      Switch target to {{ current === pointA ? 'pointB' : 'pointA' }}
    </button>
    <pre data-test="readout">{{ readout }}</pre>
  </div>

  <TresCanvas clear-color="#111111">
    <TresPerspectiveCamera :position="[0, 0, 8]" :look-at="[0, 0, 0]" />

    <TresMesh :position="[-2, 1.5, 0]">
      <TresSphereGeometry :args="[0.2]" />
      <TresMeshBasicMaterial color="#ff2266" />
    </TresMesh>
    <TresMesh :position="[2, -1.5, 0]">
      <TresSphereGeometry :args="[0.2]" />
      <TresMeshBasicMaterial color="#22ccff" />
    </TresMesh>

    <TresPointer ref="left" :position="[-1.5, 0, 2]" :target="current" />
    <TresArgsPointer ref="right" :args="[pointA]" :position="[1.5, 0, 2]" :target="current" />
  </TresCanvas>
</template>
