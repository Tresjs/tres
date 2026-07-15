<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { useControls } from '@tresjs/leches'
import { DepthPickingPassPmndrs, EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'
import { useElementBounding, useMouse } from '@vueuse/core'
import type { DepthPickingPass, EffectPass, ShockWaveEffect } from 'postprocessing'
import { NoToneMapping, Shape, Vector3 } from 'three'
import { computed, reactive, ref, shallowRef } from 'vue'

const uuid = inject<string>('uuid')

const gl = {
  clearColor: '#8D404A',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const shockWaveEffectRef = shallowRef<{ pass: EffectPass, effect: ShockWaveEffect } | null>(null)
const elCanvasRef = ref<any>(null)
const mainRef = ref<HTMLElement | null>(null)
const depthPickingPassRef = shallowRef<{ pass: DepthPickingPass } | null>(null)
const meshHeartRef = ref<any>(null)
const mousePosition = ref(new Vector3())

function createHeartShape(scale: number) {
  const shape = new Shape()
  const x = 0
  const y = 0

  shape.moveTo(x, y)
  shape.bezierCurveTo(x, y, x - 0.5 * scale, y + 2.5 * scale, x - 2.5 * scale, y + 2.5 * scale)
  shape.bezierCurveTo(x - 6.5 * scale, y + 2.5 * scale, x - 6.5 * scale, y - 1.5 * scale, x - 6.5 * scale, y - 1.5 * scale)
  shape.bezierCurveTo(x - 6.5 * scale, y - 4.5 * scale, x - 3.5 * scale, y - 7 * scale, x, y - 9.5 * scale)
  shape.bezierCurveTo(x + 3.5 * scale, y - 7 * scale, x + 6.5 * scale, y - 4.5 * scale, x + 6.5 * scale, y - 1.5 * scale)
  shape.bezierCurveTo(x + 6.5 * scale, y - 1.5 * scale, x + 6.5 * scale, y + 2.5 * scale, x + 2.5 * scale, y + 2.5 * scale)
  shape.bezierCurveTo(x + 0.5 * scale, y + 2.5 * scale, x, y, x, y)

  return shape
}

const heartShapeFront = createHeartShape(0.35)

const { x, y } = useMouse({ target: mainRef })
const { width, height, left, top } = useElementBounding(mainRef)

const extrudeSettings = reactive({
  depth: 0.1,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 0.25,
  bevelThickness: 0.25,
})

const materialProps = reactive({
  color: '#FF9999',
  reflectivity: 0.75,
  ior: 1.5,
  roughness: 0.75,
  clearcoat: 0.01,
  clearcoatRoughness: 0.15,
  transmission: 0.7,
})

const { amplitude, waveSize, speed, maxRadius } = useControls({
  amplitude: { value: 0.4, step: 0.01, max: 1.0 },
  waveSize: { value: 0.5, step: 0.01, max: 1.0 },
  speed: { value: 1.5, step: 0.1, max: 10.0 },
  maxRadius: { value: 0.2, step: 0.01, max: 2 },
}, { uuid })

const cursorX = computed(() => ((x.value - left.value - width.value) / width.value) * 2.0 + 1.0)
const cursorY = computed(() => -((y.value - top.value - height.value) / height.value) * 2.0 - 1.0)

async function updateMousePosition() {
  if (!elCanvasRef.value || !shockWaveEffectRef.value || !depthPickingPassRef.value) { return }

  const ndcPosition = new Vector3(cursorX.value, cursorY.value, 0)

  ndcPosition.z = await depthPickingPassRef.value.pass.readDepth(ndcPosition)
  ndcPosition.z = ndcPosition.z * 2.0 - 1.0

  mousePosition.value.copy(ndcPosition.unproject(elCanvasRef.value.context.camera.value))
}

function triggerShockWave() {
  if (!meshHeartRef.value || !shockWaveEffectRef.value) { return }

  updateMousePosition()
  shockWaveEffectRef.value.effect.explode()
}
</script>

<template>
  <div ref="mainRef" class="aspect-16/9 relative">
    <TresCanvas
      ref="elCanvasRef"
      v-bind="gl"
    >
      <TresPerspectiveCamera :position="[0, 0, 10]" />

      <OrbitControls make-default auto-rotate />

      <TresMesh ref="meshHeartRef" :position-y="2" @click="triggerShockWave">
        <TresExtrudeGeometry :args="[heartShapeFront, extrudeSettings]" />
        <TresMeshPhysicalMaterial v-bind="materialProps" />
      </TresMesh>

      <TresDirectionalLight
        :position="[5, 5, 7.5]"
        :intensity="2"
      />

      <ContactShadows
        :opacity="1"
        :position-y="-2.75"
        :blur=".5"
      />

      <Suspense>
        <Environment preset="night" />
      </Suspense>

      <EffectComposerPmndrs v-bind="glComposer">
        <DepthPickingPassPmndrs ref="depthPickingPassRef" />
        <ShockWavePmndrs
          ref="shockWaveEffectRef"
          :position="mousePosition"
          :amplitude="amplitude"
          :wave-size="waveSize"
          :speed="speed"
          :max-radius="maxRadius"
        />
      </EffectComposerPmndrs>
    </TresCanvas>
    <p class="doc-shock-wave-instructions text-xs font-semibold">Click on the heart to distribute love</p>
  </div>
</template>

<style scoped>
.doc-shock-wave-instructions {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.65rem 0.85rem;
  text-align: center;
  color: #fff;
  z-index: 2;
  border-radius: 0px 10px 0px 0px;
  background: linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%);
  margin: 0;
}
</style>
