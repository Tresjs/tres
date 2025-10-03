<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { NoToneMapping, Shape, Vector3 } from 'three'
import { computed, onUnmounted, reactive, ref, shallowRef } from 'vue'
import { DepthPickingPassPmndrs, EffectComposerPmndrs, ShockWavePmndrs } from '@tresjs/post-processing'
import { useElementBounding, useMouse } from '@vueuse/core'
import { gsap } from 'gsap'


const gl = {
  clearColor: '#8D404A',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const shockWaveEffectRef = shallowRef(null)
const elCanvasRef = ref(null)
const mainRef = ref(null)
const depthPickingPassRef = ref(null)
const meshHeartRef = ref(null)
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

let tl: gsap.core.Timeline

const ctx = gsap.context(() => { })

const { amplitude, waveSize, speed, maxRadius } = useControls({
  amplitude: { value: 0.4, step: 0.01, max: 1.0 },
  waveSize: { value: 0.5, step: 0.01, max: 1.0 },
  speed: { value: 1.5, step: 0.1, max: 10.0 },
  maxRadius: { value: 0.2, step: 0.01, max: 2 },
})

const cursorX = computed(() => ((x.value - left.value - width.value) / width.value) * 2.0 + 1.0)
const cursorY = computed(() => -((y.value - top.value - height.value) / height.value) * 2.0 - 1.0)

async function updateMousePosition() {
  if (!elCanvasRef.value || !shockWaveEffectRef.value || !depthPickingPassRef.value) { return }

  const ndcPosition = new Vector3(cursorX.value, cursorY.value, 0)

  // Read depth from depth picking pass
  ndcPosition.z = await depthPickingPassRef.value.pass.readDepth(ndcPosition)

  ndcPosition.z = ndcPosition.z * 2.0 - 1.0

  mousePosition.value.copy(ndcPosition.unproject(elCanvasRef.value.context.camera.value))
}

function triggerShockWave() {
  if (!meshHeartRef.value || !shockWaveEffectRef.value) { return }

  updateMousePosition()

  shockWaveEffectRef.value.effect.explode()

  const duration = getActiveDuration()

  const durationSeconds = duration / 1000

  ctx.add(() => {
    tl?.kill()

    tl = gsap.timeline()

    tl.to(meshHeartRef.value.scale, {
      duration: durationSeconds / 9,
      x: 0.8,
      y: 0.8,
      z: 0.8,
      ease: 'power2.inOut',
    }).to(meshHeartRef.value.scale, {
      duration: durationSeconds / 9,
      x: 1.2,
      y: 1.2,
      z: 1.2,
      ease: 'power2.inOut',
    }).to(meshHeartRef.value.scale, {
      duration: durationSeconds / 9,
      x: 1,
      y: 1,
      z: 1,
      ease: 'power2.inOut',
    })
  })

  // Fallback for onFinish explode Shock Wave
  // setTimeout(() => {
  // console.log('Explode effect animation done')
  // }, duration)
}

function getActiveDuration() {
  // This function retrieves the duration for emitting the shock wave.
  // For more details, see: https://github.com/pmndrs/postprocessing/blob/3d3df0576b6d49aec9e763262d5a1ff7429fd91a/src/effects/ShockWaveEffectRef.js#L258-L301

  // To reduce the duration of the animation, you can decrease the values of maxRadius and waveSize.
  // Note that the speed affects how quickly the shock wave radius increases over time, but not the total duration of the emit explode.

  // Retrieve the values dynamically
  const radiusMax = maxRadius.value
  const wave = waveSize.value

  // Duration formula: 2 * maxRadius + 3 * waveSize
  const duration = 2 * radiusMax + 3 * wave

  // Convert to milliseconds
  return duration * 1000
}

onUnmounted(() => {
  ctx.revert()
})
</script>

<template>
  <div ref="mainRef" class="aspect-16/9 relative">
    <TresCanvas
      ref="elCanvasRef"
      v-bind="gl"
    >
      <TresPerspectiveCamera
        :position="[0, 0, 10]"
      />

      <OrbitControls make-default auto-rotate />

      <TresMesh ref="meshHeartRef" :position-y="2" @click="triggerShockWave">
        <TresExtrudeGeometry :args="[heartShapeFront, extrudeSettings]" />
        <TresMeshPhysicalMaterial
          v-bind="materialProps"
        />
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

      <Suspense>
        <EffectComposerPmndrs v-bind="glComposer">
          <DepthPickingPassPmndrs ref="depthPickingPassRef" />
          <ShockWavePmndrs ref="shockWaveEffectRef" :position="mousePosition" :amplitude="amplitude" :waveSize="waveSize" :speed="speed" :maxRadius="maxRadius" />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
    <p class="doc-shock-wave-instructions text-xs font-semibold text-zinc-600">Click on the heart to distribute love</p>
  </div>

  <TresLeches :float="false" />
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
