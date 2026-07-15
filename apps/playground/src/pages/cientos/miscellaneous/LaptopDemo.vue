<script setup lang="ts">
import { ContactShadows, Html, Levioso, OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

const { nodes }
  = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf', { draco: true })

const laptop = computed(() => nodes.value.Macbook)
</script>

<template>
  <TresCanvas clear-color="#241a1a" shadows>
    <TresPerspectiveCamera :position="[-5, 4, 3]" />
    <OrbitControls />
    <Levioso>
      <primitive v-if="laptop" :object="laptop">
        <Html
          transform
          wrapper-class="webpage"
          :distance-factor="11"
          :position="[0, 10.5, -13.6]"
          occlude
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
    />
    <TresAmbientLight :intensity="1" />
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
  </TresCanvas>
</template>
