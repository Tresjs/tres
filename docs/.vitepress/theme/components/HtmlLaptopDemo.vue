<script setup lang="ts">
import { ContactShadows, Html, OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'

import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three'

const gl = {
  clearColor: '#241a1a',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}

const { nodes }
  = await useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf', { draco: true })
</script>

<template>
  <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[-5, 4, 3]" />
    <OrbitControls />

    <primitive :object="nodes.Macbook">
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
