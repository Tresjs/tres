<script setup lang="ts">
import { Html } from '@tresjs/cientos'
import { gsap } from 'gsap'
import { onUnmounted, ref, watch } from 'vue'
import type { Mesh } from 'three'
import Card from './Card.vue'
import Easy from './Easy.vue'
import Balanced from './Balanced.vue'
import Tactician from './Tactician.vue'
import { EquirectangularReflectionMapping, MathUtils, SRGBColorSpace } from 'three'

const props = defineProps<{ revealed?: boolean }>()

const { scene: mainScene } = useTresContext()

// Each 2 x 3 plane covers roughly 600 x 900 device pixels on a phone, so 512 is close
// to native there. Desktop keeps 2048 for the zoomed-in OrbitControls range.
const isPhone = useIsPhone()
const portalResolution = computed(() => (isPhone.value ? 1024 : 2048))

const SKY_YAW = 90

const { state: background } = useTexture('/skyboxes/medieval-bg.png')

watch(() => background.value, (value) => {
  if (value) {
    value.mapping = EquirectangularReflectionMapping
    value.colorSpace = SRGBColorSpace
    mainScene.value.background = value
    mainScene.value.environment = value
    mainScene.value.backgroundRotation.y = MathUtils.degToRad(SKY_YAW)
    mainScene.value.environmentRotation.y = MathUtils.degToRad(SKY_YAW)
    mainScene.value.backgroundIntensity = 0.2
  }
}, { immediate: true })

// Side frames angle inward and move forward (z = sin θ) so the three planes read as one folded panel.
const difficulties = [
  { label: 'Explorer', description: 'A narrative experience placing story before combat', x: -2.321, z: 0.389, rotationY: 0.4, component: Easy },
  { label: 'Balanced', description: 'A balanced adventure full of challenging rewards', x: 0, z: 0, rotationY: 0, component: Balanced },
  { label: 'Tactician', description: 'A tough campaign with strategic depth', x: 2.321, z: 0.389, rotationY: -0.4, component: Tactician },
]

const POP_DELAY = 0.5
const POP_DURATION = 0.8
const POP_STAGGER = 0.55

const frames = ref<Mesh[]>([])

function setFrame(i: number, el: unknown) {
  if (el) {
    frames.value[i] = el as Mesh
  }
}

let popCtx: gsap.Context | undefined

function pop() {
  popCtx = gsap.context(() => {
    const tl = gsap.timeline({ delay: POP_DELAY })
    frames.value.forEach((mesh, i) => {
      tl.to(mesh.scale, { x: 1, y: 1, z: 1, duration: POP_DURATION, ease: 'elastic.out(1, 0.5)' }, i * POP_STAGGER)
    })
  })
}

// `once` would spend its single call on the initial false value.
watch(() => props.revealed, (v) => {
  if (v && !popCtx) {
    pop()
  }
}, { immediate: true })

onUnmounted(() => popCtx?.revert())

// TODO: click-to-focus (blend a portal full screen, fly the camera in); see git history.
</script>

<template>
  <!-- Html sets will-change, so Chrome rasterises the card at the first scale it sees (0).
       Keep it out of the mesh scale; it pops with its own CSS keyframes. -->
  <TresGroup
    v-for="(d, i) in difficulties"
    :key="d.label"
    :position="[d.x, 0, d.z]"
    :rotation="[0, d.rotationY, 0]"
  >
    <TresMesh :ref="(el) => setFrame(i, el)" :scale="0">
      <TresPlaneGeometry :args="[2, 3]" />

      <MeshPortalMaterial :resolution="portalResolution">
        <component :is="d.component" v-if="d.component" />
      </MeshPortalMaterial>
    </TresMesh>
    <!-- distance-factor 4 makes one world unit 100 CSS px, so the 200 x 300 card covers the 2 x 3 plane. -->
    <Html
      center
      transform
      pointer-events="none"
      :distance-factor="4"
      :position="[0, 0, 0.02]"
    >
      <Card
        :label="d.label"
        :description="d.description"
        :popped="revealed"
        :pop-delay="POP_DELAY + i * POP_STAGGER"
        :pop-duration="POP_DURATION"
      />
    </Html>
  </TresGroup>
</template>
