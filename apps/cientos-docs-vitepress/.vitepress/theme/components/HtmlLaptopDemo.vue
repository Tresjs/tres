<script setup lang="ts">
import { ContactShadows, Environment, Html, Levioso, OrbitControls } from '@tresjs/cientos'
import { TresCanvas, useGraph, useLoader } from '@tresjs/core'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { computed } from 'vue'

const gl = {
  clearColor: '#241a1a',
  shadows: true,
  antialias: true,
}

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

const { state: model } = useLoader(
  GLTFLoader,
  'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf',
  {
    extensions: (loader) => {
      if (loader instanceof GLTFLoader) {
        loader.setDRACOLoader(dracoLoader)
      }
    },
  },
)

const scene = computed(() => model.value?.scene)
const graph = useGraph(scene)
const nodes = computed(() => graph.value.nodes)
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[0, 2.5, 3]" />
    <OrbitControls make-default :enable-pan="false" :maxPolarAngle="Math.PI / 2.2" :target="[0, 1.5, 0]" />

    <Levioso>
      <primitive v-if="nodes.Macbook" :object="nodes.Macbook" :position="[0, .5, -1]">
        <Html
          transform
          center
          wrapper-class="webpage"
          :distance-factor="11.25"
          occlude
          :position="[0, 11, -13.5]"
          :rotation-x="-0.256"
        >
          <iframe
            class="rounded-lg w-[1024px] h-[670px]"
            src="https://tresjs.org"
            frameborder="0"
          ></iframe>
        </Html>
      </primitive>
    </Levioso>

    <ContactShadows
      :blur="3.5"
      :resolution="512"
      :opacity="1"
      :position-y="-0.5"
    />

    <TresDirectionalLight
      :intensity="2"
      :position="[2, 3, 0]"
      :cast-shadow="true"
      :shadow-camera-far="50"
      :shadow-camera-left="-10"
      :shadow-camera-right="10"
      :shadow-camera-top="10"
      :shadow-camera-bottom="-10"
    />

    <Suspense>
      <Environment preset="city" />
    </Suspense>
  </TresCanvas>
</template>
