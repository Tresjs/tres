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

// Flipped by the page once the loading screen has faded out.
const props = defineProps<{ revealed?: boolean }>()

const { scene: mainScene } = useTresContext()

// Degrees of yaw applied to the sky, to put the part of the panorama you want
// behind the frames.
const SKY_YAW = 90

const { state: background } = useTexture('/skyboxes/medieval-bg.png')

watch(() => background.value, (value) => {
  if (value) {
    value.mapping = EquirectangularReflectionMapping
    value.colorSpace = SRGBColorSpace
    mainScene.value.background = value
    mainScene.value.environment = value
    // mainScene.value.backgroundBlurriness = 0.01
    mainScene.value.backgroundRotation.y = MathUtils.degToRad(SKY_YAW)
    mainScene.value.environmentRotation.y = MathUtils.degToRad(SKY_YAW)
    mainScene.value.backgroundIntensity = 0.2
  }
}, { immediate: true })

// Side frames are angled inward and pushed forward in z (z = sin θ) so the three
// planes read as one folded panel: inner edge at x = ±(1 + gap).
const difficulties = [
  { label: 'Explorer', description: 'A narrative experience placing story before combat', x: -2.321, z: 0.389, rotationY: 0.4, component: Easy },
  { label: 'Balanced', description: 'A balanced adventure full of challenging rewards', x: 0, z: 0, rotationY: 0, component: Balanced },
  { label: 'Tactician', description: 'A tough campaign with strategic depth', x: 2.321, z: 0.389, rotationY: -0.4, component: Tactician },
]

// null = every portal stays a window. Only one portal may blend at a time: the
// blend pass takes over the whole screen, so two at once fight for it.
const focused = ref<string | null>(null)

function toggle(label: string) {
  focused.value = focused.value === label ? null : label
}

// Stagger is longer than the visible wobble so each frame lands on its own beat.
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
// TODO: ease `blend` instead of snapping, and fly the camera into the frame.
</script>

<template>
  <!-- The Html card must not inherit the mesh scale: Html sets will-change,
       so Chrome rasterises it at the first scale it sees (0) and the card
       stays pixelated. It pops with its own CSS keyframes instead. -->
  <TresGroup
    v-for="(d, i) in difficulties"
    :key="d.label"
    :position="[d.x, 0, d.z]"
    :rotation="[0, d.rotationY, 0]"
  >
    <TresMesh
      :ref="(el) => setFrame(i, el)"
      :scale="0"
      @click="toggle(d.label)"
    >
      <TresPlaneGeometry :args="[2, 3]" />

      <MeshPortalMaterial :blend="focused === d.label ? 1 : 0" :resolution="2048">
        <component :is="d.component" v-if="d.component" />
      </MeshPortalMaterial>
    </TresMesh>
    <!-- distance-factor 4 makes one world unit 100 CSS px, so the card's
         200 x 300 px window lands exactly on the 2 x 3 plane. -->
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
        :faded="focused !== null"
        :popped="revealed"
        :pop-delay="POP_DELAY + i * POP_STAGGER"
        :pop-duration="POP_DURATION"
      />
    </Html>
  </TresGroup>
  <!-- <Easy /> -->
</template>
