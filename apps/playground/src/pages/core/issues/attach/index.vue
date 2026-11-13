<script setup lang="ts">
import { extend, TresCanvas } from '@tresjs/core'
import { Color } from 'three'
import type { Mesh, MeshStandardMaterial } from 'three'

class Tint {
  color = new Color('white')
}

const attachTint = (parent: Mesh, child: Tint) => {
  const material = parent.material as MeshStandardMaterial
  const previous = material.color
  material.color = child.color
  return () => { material.color = previous }
}

extend({ Tint: { object: Tint, attach: attachTint } })

const override = ref(true)
const showTint = ref(true)
</script>

<template>
  <div class="absolute top-4 left-4 z-10 flex flex-col gap-2 p-3 bg-white/90 rounded text-sm max-w-xs">
    <p><b>Left</b>: <code>&lt;TresTint /&gt;</code> uses the default attach. Expect pink.</p>
    <p>
      <b>Middle</b>: <code>attach="tint"</code> overrides the default. Expect grey.
      Unset the prop to fall back to the default. Expect blue.
    </p>
    <button class="px-3 py-1 bg-black text-white rounded" data-test="override" @click="override = !override">
      {{ override ? 'Unset' : 'Set' }} attach on middle
    </button>
    <p><b>Right</b>: unmount the tint to run its detach function. Expect grey, then green again.</p>
    <button class="px-3 py-1 bg-black text-white rounded" data-test="toggle" @click="showTint = !showTint">
      {{ showTint ? 'Unmount' : 'Mount' }} right tint
    </button>
  </div>

  <TresCanvas clear-color="#111111">
    <TresPerspectiveCamera :position="[0, 2, 7]" :look-at="[0, 0, 0]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[3, 5, 4]" :intensity="2" />

    <TresMesh name="left" :position="[-2.2, 0, 0]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#888888" />
      <TresTint color="#ff2266" />
    </TresMesh>

    <TresMesh name="middle">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#888888" />
      <TresTint color="#22ccff" :attach="override ? 'tint' : undefined" />
    </TresMesh>

    <TresMesh name="right" :position="[2.2, 0, 0]">
      <TresBoxGeometry />
      <TresMeshStandardMaterial color="#888888" />
      <TresTint v-if="showTint" color="#88ff44" />
    </TresMesh>
  </TresCanvas>
</template>
