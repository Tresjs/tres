<script setup lang="ts">
import { Html } from '@tresjs/cientos'
import { ref } from 'vue'
import Easy from './Easy.vue'
import { EquirectangularReflectionMapping, MathUtils, SRGBColorSpace } from 'three'

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
  { label: 'Balanced', description: 'A balanced adventure full of challenging rewards', x: 0, z: 0, rotationY: 0 },
  { label: 'Tactician', description: 'A tough campaign with strategic depth', x: 2.321, z: 0.389, rotationY: -0.4 },
]

// null = every portal stays a window. Only one portal may blend at a time: the
// blend pass takes over the whole screen, so two at once fight for it.
const focused = ref<string | null>(null)

function toggle(label: string) {
  focused.value = focused.value === label ? null : label
}
// Black fade at the foot of each frame, so the label stays legible over whatever
// the portal happens to show there.
const backdrop = {
  transparent: true,
  depthWrite: false,
  // The plane sits a hair in front of the portal, so a fixed z offset is not
  // enough: at grazing angles both depths land in the same buffer slot and the
  // fade flickers. polygonOffsetFactor scales the bias by the polygon's depth
  // slope, which is the term that grows as the frame turns edge-on.
  polygonOffset: true,
  polygonOffsetFactor: -4,
  polygonOffsetUnits: -4,
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      // Opaque at the bottom edge, gone by the top. smoothstep keeps the band
      // dark where the text sits and avoids banding on the falloff.
      gl_FragColor = vec4(0.0, 0.0, 0.0, smoothstep(1.0, 0.15, vUv.y));
    }
  `,
}

// TODO: ease `blend` instead of snapping, and fly the camera into the frame.
</script>

<template>
  <TresMesh v-for="d in difficulties" :key="d.label" :position="[d.x, 0, d.z]" :rotation="[0, d.rotationY, 0]">
    <TresPlaneGeometry :args="[2, 3]" />

    <MeshPortalMaterial :blend="focused === d.label ? 1 : 0" :resolution="2048">
      <component :is="d.component" v-if="d.component" />
    </MeshPortalMaterial>
    <!-- Child of the frame, so it folds with the angled side panels.
         render-order keeps it after the portal pass it draws on top of. -->
    <TresMesh :position="[0, -0.8, 0.01]" :render-order="1">
      <TresPlaneGeometry :args="[2, 1.4]" />
      <TresShaderMaterial v-bind="backdrop" />
    </TresMesh>

    <Html
      center
      transform
      :distance-factor="4"
      :position="[0, -1.2, 0.021]"
      :scale="[0.65, 0.65, 0.65]"
    >
      <div class="flex flex-col gap-2 items-center">
        <p
          class="font-serif text-2xl font-semibold text-white opacity-60 whitespace-nowrap"
          :style="{ textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)' }"
        >
          {{ d.label }}
        </p>
        <p class="font-serif italic text-sm text-[#B4945F] opacity-60 text-center">
          "{{ d.description }}"
        </p>
      </div>
    </Html>
  </TresMesh>
  <!-- <Easy /> -->
</template>
