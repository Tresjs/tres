<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Output, SAO } from '@tresjs/post-processing'
import { ref } from 'vue'
import { useRafFn } from '@vueuse/core'

import { useRouteDisposal } from '../../composables/useRouteDisposal'

const { effectComposer } = useRouteDisposal()

const rotationY = ref(0)
const rotate = ({ elapsed }: { elapsed: number }) => {
  rotationY.value = elapsed * 0.15
}

const spheres = Array.from({ length: 40 }, () => ({
  position: [
    Math.random() * 4 - 2,
    Math.random() * 4 - 2,
    Math.random() * 4 - 2,
  ] as [number, number, number],
  scale: Math.random() * 0.35 + 0.08,
  color: `hsl(${Math.random() * 360}, 70%, 35%)`,
}))

const sides = [
  { css: 'doc-sao-canvas-left', effect: false, label: '⬅️ No SAO', labelCss: 'doc-sao-info-left' },
  { css: 'doc-sao-canvas-right', effect: true, label: 'With SAO ➡️', labelCss: 'doc-sao-info-right' },
]
</script>

<template>
  <div class="aspect-16/9 relative h-full">
    <template v-for="side in sides" :key="side.css">
      <TresCanvas
        clear-color="#121212"
        :alpha="false"
        render-mode="always"
        :class="side.css"
        @loop="rotate"
      >
        <TresPerspectiveCamera
          :position="[0, 0, 7]"
          :look-at="[0, 0, 0]"
          :fov="65"
          :near="3"
          :far="10"
        />

        <TresAmbientLight :intensity="0.2" />
        <TresPointLight color="#efffef" :intensity="900" :position="[-10, -10, 10]" />
        <TresPointLight color="#ffefef" :intensity="900" :position="[-10, 10, 10]" />
        <TresPointLight color="#efefff" :intensity="900" :position="[10, -10, 10]" />

        <TresGroup :rotation-y="rotationY">
          <TresMesh
            v-for="(s, i) in spheres"
            :key="i"
            :position="s.position"
            :scale="[s.scale, s.scale, s.scale]"
          >
            <TresSphereGeometry :args="[3, 32, 16]" />
            <TresMeshStandardMaterial :color="s.color" :roughness="0.7" :metalness="0" />
          </TresMesh>
        </TresGroup>

        <Suspense v-if="side.effect">
          <EffectComposer ref="effectComposer">
            <SAO
              :sao-intensity="0.18"
              :sao-scale="1"
              :sao-kernel-radius="100"
              :sao-blur="true"
              :sao-blur-radius="8"
              :sao-blur-std-dev="4"
            />
            <Output />
          </EffectComposer>
        </Suspense>
      </TresCanvas>

      <p :class="['doc-sao-info text-xs font-semibold', side.labelCss]">{{ side.label }}</p>
    </template>

    <div class="doc-sao-divider"></div>
  </div>
</template>

<style scoped>
.doc-sao-canvas-left {
  position: absolute !important;
  inset: 0;
  z-index: 1;
  clip-path: inset(0 50% 0 0);
  -webkit-clip-path: inset(0 50% 0 0);
}

.doc-sao-canvas-right {
  position: absolute !important;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  clip-path: inset(0 0 0 50%);
  -webkit-clip-path: inset(0 0 0 50%);
}

.doc-sao-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: red;
  z-index: 3;
  pointer-events: none;
}

.doc-sao-info {
  position: absolute;
  bottom: 0;
  padding: 0.45rem 0.75rem;
  margin: 0;
  text-align: center;
  color: #fff;
  z-index: 2;
  background: linear-gradient(90deg, #7a95b1 0%, #517284 100%);
}

.doc-sao-info-left {
  left: 0;
  border-radius: 0px 10px 0px 0px;
}

.doc-sao-info-right {
  right: 0;
  border-radius: 10px 0px 0px 0px;
}
</style>
