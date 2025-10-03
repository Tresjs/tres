<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, Vector3 } from 'three'
import { DepthPickingPassPmndrs, EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'
import { useMouse, useWindowSize } from '@vueuse/core'
import { computed, ref } from 'vue'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { x, y } = useMouse()
const { width, height } = useWindowSize()

const shockWaveEffect = ref(null)
const elCanvas = ref(null)
const effectComposerRef = ref(null)
const depthPickingPassRef = ref(null)
const mousePosition = ref(new Vector3())

const { amplitude, waveSize, speed, maxRadius } = useControls({
  amplitude: { value: 0.15, step: 0.001, max: 0.25 },
  waveSize: { value: 0.3, step: 0.01, max: 2 },
  speed: { value: 1.5, step: 0.01, max: 5 },
  maxRadius: { value: 1, step: 0.01, max: 3.0 },
})

const cursorX = computed(() => (x.value / width.value) * 2.0 - 1.0)
const cursorY = computed(() => -(y.value / height.value) * 2.0 + 1.0)

async function updateMousePosition() {
  if (!elCanvas.value || !shockWaveEffect.value || !depthPickingPassRef.value) { return }

  const ndcPosition = new Vector3(cursorX.value, cursorY.value, 0)

  ndcPosition.z = await depthPickingPassRef.value.pass.readDepth(ndcPosition)
  ndcPosition.z = ndcPosition.z * 2.0 - 1.0

  mousePosition.value.copy(ndcPosition.unproject(elCanvas.value.context.camera.value))
}

function triggerShockWave() {
  if (!elCanvas.value || !shockWaveEffect.value) { return }

  updateMousePosition()

  shockWaveEffect.value.effect.explode()
}
</script>

<template>
  <TresLeches />

  <p class="playground-shock-wave-instructions text-xl font-semibold text-zinc-600">Click on a cube to emit a shock wave.</p>

  <TresCanvas
    ref="elCanvas"
    v-bind="gl"
  >
    <TresPerspectiveCamera
      :position="[5, 5, 5]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />

    <TresMesh :position="[0, .5, 5]" @click="triggerShockWave">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#82DBC5" :roughness=".25" />
    </TresMesh>

    <TresMesh :position="[0, 0, 0]" @click="triggerShockWave">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#82DBC5" :roughness=".25" />
    </TresMesh>

    <TresMesh :position="[0, .5, -5]" @click="triggerShockWave">
      <TresBoxGeometry :args="[2, 2, 2]" />
      <TresMeshPhysicalMaterial color="#82DBC5" :roughness=".25" />
    </TresMesh>

    <ContactShadows
      :scale="25"
      :opacity="1"
      :position-y="-1"
      :far="20"
    />

    <Suspense>
      <Environment background :blur=".2" preset="dawn" />
    </Suspense>

    <Suspense>
      <EffectComposerPmndrs ref="effectComposerRef" v-bind="glComposer">
        <DepthPickingPassPmndrs ref="depthPickingPassRef" />
        <ShockWavePmndrs ref="shockWaveEffect" :position="mousePosition" :amplitude="amplitude" :waveSize="waveSize" :speed="speed" :maxRadius="maxRadius" />
      </EffectComposerPmndrs>
    </Suspense>
  </TresCanvas>
</template>

<style scoped>
.playground-shock-wave-instructions {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
</style>
