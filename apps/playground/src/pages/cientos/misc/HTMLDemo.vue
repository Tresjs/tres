<script setup lang="ts">
import { Html, OrbitControls, useVideoTexture } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { reactive, ref } from 'vue'
import Card from '../misc/Card.vue'
import type { VideoTexture } from 'three'
import { CircleGeometry, DoubleSide, MeshStandardMaterial } from 'three'
// import { useWindowSize } from '@vueuse/core'

const uuid = 'misc-html'

const sphereRef = ref(null)
const lightTargetRef = ref(null)
const portalRef = ref<HTMLElement>()

const state = reactive({
  wrapperClass: 'wrapper',
  as: 'div',
  center: true,
})

const isActive = ref(false)

const textBlank = ref('hello')

// const { width, height } = useWindowSize()

const { showHtml } = useControls({
  showHtml: true,
}, { uuid })

const { showTransition } = useControls({
  showTransition: true,
}, { uuid })

useControls({
  updateText: {
    label: 'Update Text',
    type: 'button',
    onClick: () => {
      textBlank.value = 'hello world!'
    },
    size: 'sm',
  },
}, { uuid })

useControls({
  activate: {
    label: 'Switch Theme Class',
    type: 'button',
    onClick: () => {
      isActive.value = !isActive.value
    },
    size: 'sm',
  },
}, { uuid })

const customMaterial = shallowRef(new MeshStandardMaterial({
  color: 'white',
  side: DoubleSide,
  transparent: true,
}))

const videoPath = 'https://raw.githubusercontent.com/'
  + 'Tresjs/assets/main/textures/video-textures/useVideoTexture.mp4'

const videoTexture = shallowRef<VideoTexture | null>(null)
videoTexture.value = await useVideoTexture(videoPath, { loop: true }) as VideoTexture

watch(videoTexture, () => {
  if (!videoTexture.value) { return }

  customMaterial.value.map = videoTexture.value
  customMaterial.value.needsUpdate = true
}, { immediate: true })

const customGeometry = shallowRef(new CircleGeometry(1.25, 32))
</script>

<template>
  <div class="html-demo-wrapper">
    <TresLeches
      :uuid="uuid"
      :style="{ position: 'relative',
                zIndex: 9999999999 }"
    />
    <TresCanvas clear-color="#82DBC5" shadows alpha :clearAlpha="0" :antialias="true">
      <TresPerspectiveCamera :position="[0, 0, 15]" />
      <!-- <TresOrthographicCamera :args="[width / -2, width / 2, height / 2, height / -2]" :zoom="65" :position="[0, 0, 15]" /> -->
      <OrbitControls make-default />

      <TresMesh ref="lightTargetRef" :position="[-6, 1, 1]" cast-shadow receive-shadow>
        <TresBoxGeometry :args="[.25, 8, .25]" />
        <TresMeshStandardMaterial color="red" />

        <!-- BASIC OCCLUDE BLENDING ⬇️ -->
        <Html
          v-bind="state"
          transform
          occlude="blending"
          :position="[-.5, 2, -2]"
          :scale="1"
        >
          <Card :active="isActive" :border-rounded="false">
            <template #default>
              I'm a card w/ occlude blending {{ isActive ? '📦' : '📭' }}
            </template>
          </Card>
        </Html>
        <!--  BASIC OCCLUDE BLENDING ⬆️ -->

        <!-- CUSTOM MATERIAL ⬇️ -->
        <Html
          v-bind="state"
          transform
          occlude="blending"
          receive-shadow
          cast-shadow
          :material="customMaterial"
          :position="[-.5, 0, -2]"
        >
          <div style="width: 300px; height: auto; aspect-ratio: 250/60;"></div>
        </Html>
        <!-- CUSTOM MATERIAL ⬆️ -->

        <!-- OCCLUDE BLENDING — CUSTOM GEOMETRY ⬇️ -->
        <Html
          v-bind="state"
          transform
          occlude="blending"
          :position="[-.5, -3, -2]"
          :scale="1"
          :geometry="customGeometry"
        >
          <div class="bg-[#F6B03B] text-s text-center p-10">
            CUSTOM <br />
            GEOMETRY
          </div>
        </Html>
        <!--  OCCLUDE BLENDING — CUSTOM GEOMETRY ⬆️ -->
      </TresMesh>

      <TresMesh
        :position="[2, 2, 2]"
      >
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
        <!-- GLOBAL OCCLUDE ⬇️ -->
        <Html
          v-bind="state"
          transform
          occlude
          :distance-factor="8"
          :position="[-1, 0, -2]"
        >
          <Card :active="isActive">
            I'm a card w/ occlude {{ isActive ? '📦' : '📭' }}
          </Card>
        </Html>
      <!-- GLOBAL OCCLUDE  ⬆️ -->
      </TresMesh>

      <TresMesh
        :position="[-2, 1, 1]"
      >
        <TresBoxGeometry />
        <TresMeshNormalMaterial />
        <!-- OCCLUDE OBJECT + TRANSFORM SPRITE + TRANSITION ⬇️ -->
        <Html
          v-if="showHtml"
          v-bind="state"
          transform
          sprite
          :occlude="[sphereRef]"
        >
          <Transition name="transition-basic">
            <Card v-if="showTransition" :active="isActive">
              <template #default>
                {{ textBlank }}
              </template>
            </Card>
          </Transition>
        </Html>
      <!-- OCCLUDE OBJECT + TRANSFORM SPRITE + TRANSITION ⬆️ -->
      </TresMesh>

      <TresMesh
        ref="sphereRef"
        :position="[.5, 0, 6.5]"
      >
        <TresSphereGeometry />
        <TresMeshNormalMaterial />
      </TresMesh>

      <TresMesh
        :position="[6, 1, 1]"
      >
        <TresTorusGeometry />
        <TresMeshNormalMaterial />

        <!-- BASIC ⬇️ -->
        <Html
          v-bind="state"
          :position="[0, 1, 0]"
        >
          <Card :active="isActive" />
        </Html>
        <!-- BASIC ⬆️ -->

        <!-- PORTAL ⬇️ -->
        <Html
          v-bind="state"
          transform
          :portal="portalRef"
          :position="[0, -1, .5]"
          :distance-factor="8"
        >
          <Card :active="isActive">
            <template #default>
              PORTAL 🌀
            </template>
          </Card>
        </Html>
      <!-- PORTAL ⬆️ -->
      </TresMesh>

      <TresMesh
        :position="[-8.5, 0.5, 0]"
        cast-shadow
      >
        <TresBoxGeometry :args="[1, 1, 1]" />
        <TresMeshNormalMaterial />
      </TresMesh>

      <TresMesh
        :position="[-4, .5, 0]"
        cast-shadow
      >
        <TresSphereGeometry :args="[.5, 32, 32]" />
        <TresMeshNormalMaterial />
      </TresMesh>

      <TresAmbientLight :intensity="1" />

      <TresDirectionalLight
        v-if="lightTargetRef"
        :position="[-10, -2, 10]"
        :intensity="2.5"
        cast-shadow
        :target="lightTargetRef"
      />
    </TresCanvas>

    <div ref="portalRef" class="html-demo-portal"></div>
  </div>
</template>

<style scoped>
.html-demo-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #82dbc5;
}

.html-demo-portal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.transition-basic-enter-from,
.transition-basic-leave-to {
  opacity: 0;
  transform: translateY(-25px);
}

.transition-basic-enter-active,
.transition-basic-leave-active {
  transition: all 0.5s ease;
}

.transition-basic-enter-to,
.transition-basic-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
