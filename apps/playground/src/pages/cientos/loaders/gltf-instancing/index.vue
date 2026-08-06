<script setup lang="ts">
import { Instance, OrbitControls, Stats } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, SRGBColorSpace } from 'three'
import { onUnmounted, ref } from 'vue'
import CyberSamurai from '@/models/CyberSamuraiBatched.gen.vue'
import CyberSamuraiInstances from '@/models/CyberSamuraiBatched.instances.gen.vue'
import CyberSamuraiPlain from '@/models/CyberSamuraiPlain.gen.vue'

// Both halves come from the same source and the same optimized asset:
//   tres gltf public/models/cyber_samurai/cyber_samurai.glb --instanceall --slots all -o src/models/CyberSamuraiBatched.gen.vue
//   tres gltf public/models/cyber_samurai/cyber_samurai.glb --transform --keepmeshes --slots all -o src/models/CyberSamuraiPlain.gen.vue
// Toggling between them on 4 copies: 45 drawcalls batched, 156 plain.
const uuid = 'cientos-loaders-gltf-instancing'

const gl = {
  clearColor: '#1a1a1a',
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

// Booleans have to use the shorthand form: leches infers the control type from the whole
// config object, so `{ value: false, label }` comes out as a text field.
const { copies, batched, tint, optOut, drawcalls, batches, meshes } = useControls({
  copies: { value: 4, min: 1, max: 8, step: 1 },
  batched: true,
  tint: false,
  optOut: false,
  // readouts, refreshed below (leches has no read-only control type)
  drawcalls: { value: '-' },
  batches: { value: '-' },
  meshes: { value: '-' },
}, { uuid })

const canvasRef = ref()

const readout = setInterval(() => {
  const context = canvasRef.value?.context
  const info = context?.renderer?.instance?.info
  drawcalls.value = info ? `${info.render.calls}` : '-'

  const scene = context?.scene?.value
  if (!scene) {
    batches.value = '-'
    meshes.value = '-'
    return
  }

  let instanced = 0
  let plain = 0
  scene.traverse((object: any) => {
    if (object.isInstancedMesh) { instanced++ }
    else if (object.isMesh) { plain++ }
  })
  batches.value = `${instanced}`
  meshes.value = `${plain}`
}, 250)

onUnmounted(() => clearInterval(readout))
</script>

<template>
  <TresLeches :uuid="uuid" />
  <TresCanvas
    ref="canvasRef"
    v-bind="gl"
  >
    <TresPerspectiveCamera :position="[0, 1.5, 6]" :look-at="[0, 1, 0]" />
    <OrbitControls />
    <Stats />

    <CyberSamuraiPlain
      v-for="index in (batched ? 0 : copies)"
      :key="`plain-${index}`"
      :position="[(index - (copies + 1) / 2) * 1.5, 0, 0]"
    />

    <CyberSamuraiInstances v-if="batched">
      <CyberSamurai
        v-for="index in copies"
        :key="index"
        :position="[(index - (copies + 1) / 2) * 1.5, 0, 0]"
      >
        <!-- Staying in the batch: `batch` is the key its InstancedMesh registered under, which
             is not always the slot name. Per-instance color, no extra drawcall. -->
        <template v-if="tint" #Object_2="{ batch, rotation }">
          <Instance :name="batch" :rotation="rotation" color="#00ffff" />
        </template>

        <!-- Leaving it: geometry and material are the batch's, drawn as a mesh of its own. -->
        <template v-if="optOut" #Object_3="{ geometry }">
          <TresMesh :geometry="geometry">
            <TresMeshBasicMaterial color="#ff0055" wireframe />
          </TresMesh>
        </template>
      </CyberSamurai>
    </CyberSamuraiInstances>

    <TresDirectionalLight :position="[5, 10, 5]" :intensity="3" />
    <TresAmbientLight :intensity="2" />
  </TresCanvas>
</template>
