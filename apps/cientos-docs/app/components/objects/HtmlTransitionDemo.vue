<script setup lang="ts">
import { Html, Levioso, OrbitControls } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { ref } from 'vue'
import { useControls } from '@tresjs/leches'

const uuid = inject(`uuid`)

const gl = {
  clearColor: '#82DBC5',
  clearAlpha: 0,
  shadows: true,
  alpha: true,
  antialias: true,
}

const rootRef = ref<HTMLElement>()

const bgColor = ref('#F6B03B')

const geometries = [
  {
    component: 'TresBoxGeometry',
    args: [1, 1, 1],
  },
  {
    component: 'TresSphereGeometry',
    args: [0.7, 32, 32],
  },
  {
    component: 'TresTorusGeometry',
    args: [0.5, 0.2, 16, 100],
  },
  {
    component: 'TresConeGeometry',
    args: [0.7, 1.4, 32],
  },
]

const { showTransition } = useControls({
  showTransition: true,
}, { uuid })

const getRandomBackgroundColor = (): string => {
  const colors = ['#F6B03B', '#82DBC5', '#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5']
  const idx = Math.floor(Math.random() * colors.length)
  return colors[idx] ?? '#F6B03B'
}

const updateBackgroundColor = () => {
  bgColor.value = getRandomBackgroundColor()
}
</script>

<template>
  <div ref="rootRef" class="html-demo-wrapper">
    <TresCanvas v-bind="gl" class="!pointer-events-none">
      <TresPerspectiveCamera :position="[0, 1.5, 7.5]" />
      <OrbitControls :dom-element="rootRef" />

      <Levioso
        v-for="(geometry, index) in geometries"
        :key="`html-occlude-blending-demo-${index}`"
        :speed="3"
        :float-factor="3.5"
        :rotation-factor="1"
        :range="[-0.4, 0.4]"
      >
        <TresMesh :position="[(index - (geometries.length - 1) / 2) * 2, 1, 0]">
          <component :is="geometry.component" :args="geometry.args" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Levioso>

      <Html
        center
        transform
        occlude="blending"
        :position="[0, .75, -2]"
        :scale="1.15"
        :z-index-range="[28, 0]"
      >
        <Transition name="transition-basic">
          <h1
            v-if="showTransition"
            :style="{ backgroundColor: bgColor }"
            class="html-demo-transition-heading will-change-transform transition-transform,background-color cursor-pointer duration-500 text-center p-2 text-light shadow-lg"
            @click="updateBackgroundColor"
          >
            <strong>TRANSITION + </strong><br />
            <em>occlude=blending 💛</em>
          </h1>
        </Transition>
      </Html>

      <TresGridHelper :position-y="-1.25" />
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>
