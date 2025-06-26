<script setup lang="ts">
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@tresjs/cientos'
import { TresCanvas } from '@tresjs/core'
import { TresLeches, useControls } from '@tresjs/leches'
import { DotScreenPmndrs, EffectComposerPmndrs } from '@tresjs/post-processing'

import { BlendFunction } from 'postprocessing'
import { NoToneMapping } from 'three'

import '@tresjs/leches/styles'

const gl = {
  clearColor: '#ffffff',
  toneMapping: NoToneMapping,
}

const glComposer = {
  multisampling: 4,
}

const { angle, scale, blendFunction } = useControls({
  angle: { value: 1.57, min: -Math.PI, max: Math.PI, step: 0.001 },
  scale: { value: 1.25, min: 0.1, max: 2.5, step: 0.01 },
  blendFunction: {
    options: Object.keys(BlendFunction).map(key => ({
      text: key,
      value: BlendFunction[key as keyof typeof BlendFunction],
    })),
    value: BlendFunction.NORMAL,
  },
})

const { state } = useGLTF('https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/suzanne/suzanne.glb', { draco: true })
</script>

<template>
  <div class="aspect-16/9">
    <TresCanvas
      v-bind="gl"
    >
      <TresPerspectiveCamera
        :position="[0, 1, 7.5]"
        :look-at="[0, 0, 0]"
      />
      <OrbitControls />

      <primitive
        v-if="state"
        :scale="2"
        :rotation-x="Math.PI / -5"
        :rotation-y="Math.PI"
        :position-y=".25"
        :position-z="0.5"
        :object="state.scene"
      />

      <ContactShadows
        :opacity="1"
        :position-y="-1.5"
      />

      <Suspense>
        <Environment preset="modern" />
      </Suspense>

      <Suspense>
        <EffectComposerPmndrs v-bind="glComposer">
          <DotScreenPmndrs :blendFunction="Number(blendFunction)" :angle="angle" :scale="scale" />
        </EffectComposerPmndrs>
      </Suspense>
    </TresCanvas>
  </div>

  <TresLeches :float="false" />
</template>
